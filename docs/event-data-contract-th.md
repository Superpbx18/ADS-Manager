# Event Data Contract และแนวทางเชื่อมต่อ Meta

**สถานะเอกสาร:** Draft v1.0  
**ผู้รับเอกสาร:** ทีมพัฒนาระบบที่ 1 และทีมพัฒนาระบบ Event Data Hub  
**วัตถุประสงค์:** กำหนดรูปแบบข้อมูลที่ระบบที่ 1 ต้องส่งให้ระบบ Event Data Hub เพื่อเก็บพฤติกรรม เชื่อมตัวตนลูกค้า คัดกลุ่มลูกค้าที่มีคุณภาพ และส่ง Conversion ที่ผ่านการตรวจสอบกลับไปยัง Meta

## 1. ข้อสรุปทางสถาปัตยกรรม

แนวทางที่แนะนำคือให้ระบบที่ 1 ส่งข้อมูลผ่าน **REST API แบบ Event Ingestion** ทันทีเมื่อเหตุการณ์เกิดขึ้น แล้วให้ระบบ Event Data Hub ประมวลผลและส่งข้อมูลกลับ Meta ผ่านคิวงานเบื้องหลัง นอกจากนี้ควรมี **รอบ Reconciliation ทุก 2 ชั่วโมง** เพื่อดึงรายการที่เกิดขึ้นในระบบที่ 1 มาตรวจเทียบกับข้อมูลที่ระบบกลางได้รับแล้ว วิธีนี้ให้ Meta ได้รับ Purchase ที่ยืนยันเร็ว ขณะเดียวกันยังลดความเสี่ยงจาก Network error, API timeout หรือ Event ที่หลุดระหว่างระบบ

การดึงข้อมูลทุก 1–2 ชั่วโมงไม่ควรเป็นช่องทางหลักเพียงช่องทางเดียวสำหรับ Purchase เพราะจะทำให้ Conversion ล่าช้าและอาจทำให้ระบบโฆษณาเรียนรู้ช้าลง ควรใช้เป็นช่องทางตรวจสอบและซ่อมแซมข้อมูลแทน

```text
ระบบที่ 1: SalePage + Website + Pixel + พฤติกรรมธุรกรรม
             │
             │ POST Event ทันทีผ่าน REST API
             ▼
ระบบกลาง: ตรวจลายเซ็น → Validate → Deduplicate → เก็บ Raw Event
             │
             ├─ รวม User + Attribution + Deposit
             ├─ คำนวณ Segment และคุณภาพลูกค้า
             └─ ส่ง Event ที่ผ่านเงื่อนไขเข้าคิว Meta
                              │
                              ├─ Conversions API
                              └─ Custom Audience / Exclusion Audience

ทุก 2 ชั่วโมง: Reconciliation API ตรวจ Event ตกหล่นและสถานะ Deposit ซ้ำ
```

## 2. เปรียบเทียบแนวทางการรับข้อมูล

| แนวทาง | ข้อแลกเปลี่ยน | ค่าใช้จ่าย | ความซับซ้อนในการติดตั้ง |
|---|---|---|---|
| REST API แบบส่งทันที + Reconciliation ทุก 2 ชั่วโมง **(แนะนำ)** | Purchase ถึงระบบกลางเร็ว มีรอบตรวจข้อมูลตกหล่น และรองรับการขยายในอนาคต | ต่ำถึงกลาง | กลาง |
| ดึงข้อมูลจากระบบที่ 1 ทุก 1–2 ชั่วโมงเท่านั้น | ทำง่ายกว่า แต่ Purchase ล่าช้าและต้องจัดการการดึงซ้ำด้วย Cursor/ช่วงเวลา | ต่ำ | ต่ำถึงกลาง |
| ส่งไฟล์เป็นรอบ เช่น CSV | เหมาะกับ MVP ที่ยังไม่มี API แต่ไม่เหมาะกับ Conversion optimization และตรวจซ้ำยาก | ต่ำ | ต่ำ |

## 3. หลักการตั้งชื่อ Event

ระบบที่ 1 สามารถตั้งชื่อ Event ได้ตามมาตรฐานนี้ เพื่อให้ระบบกลางรับไปใช้ต่อได้ทันที

| Event name | ความหมาย | ส่งเมื่อใด | ใช้เป็น Conversion หลักหรือไม่ |
|---|---|---|---|
| `page_view` | เปิด SalePage หรือหน้าที่กำหนด | เมื่อหน้าโหลดสำเร็จ | ไม่ใช่ |
| `ad_click` | คลิกจากโฆษณาเข้ามายัง SalePage | เมื่อมี Click ID หรือ UTM จากโฆษณา | ไม่ใช่ |
| `site_clickthrough` | คลิกจาก SalePage ไปเว็บไซต์จริง | เมื่อ Redirect สำเร็จหรือมีการคลิก | ไม่ใช่ |
| `registration_completed` | สมัครสมาชิกสำเร็จ | เมื่อ User ถูกสร้างและสถานะสมัครเสร็จ | ใช้เป็น Funnel Event |
| `deposit_method_selected` | เลือกช่องทางฝาก | เมื่อ User เลือกช่องทาง | ไม่ใช่ Purchase |
| `deposit_initiated` | เริ่มกระบวนการฝาก | เมื่อสร้างรายการฝากที่ยังไม่สำเร็จ | ไม่ใช่ Purchase |
| `deposit_success` | ฝากเงินสำเร็จและยืนยันแล้ว | เมื่อ `deposit_status=success` | **ใช่** |
| `deposit_failed` | ฝากเงินไม่สำเร็จ | เมื่อระบบยืนยันว่าไม่สำเร็จ | ไม่ใช่ |
| `deposit_refunded` | รายการถูกคืนหรือยกเลิกภายหลัง | เมื่อระบบยืนยันสถานะ | ใช้ปรับคุณภาพภายใน |

> **ข้อสำคัญ:** `deposit_method_selected` และ `deposit_initiated` ไม่ควรถูกส่งในชื่อ `Purchase` เพราะยังไม่มีการฝากเงินจริง ให้ใช้ `Purchase` เฉพาะ `deposit_success` ที่มี `transaction_id` และยอดเงินยืนยันแล้วเท่านั้น

## 4. Data Contract: Endpoint หลัก

### 4.1 รับ Event แบบทันที

```http
POST /v1/events
Authorization: Bearer <SYSTEM_1_API_KEY>
Content-Type: application/json
Idempotency-Key: evt_01JXYZ...
X-Signature: sha256=...
X-Source-System: system_1
```

ระบบที่ 1 ต้องส่ง `Idempotency-Key` เป็นค่าเดียวกับ `event_id` ทุกครั้งที่ Retry Event เดิม ระบบกลางจะตอบผลเดิมแทนการสร้าง Event ซ้ำ

### 4.2 Request body

```json
{
  "event_id": "sys1_evt_01JXYZ123",
  "event_name": "deposit_success",
  "event_version": "1.0",
  "occurred_at": "2026-09-16T03:12:34+07:00",
  "sent_at": "2026-09-16T03:12:36+07:00",
  "source": {
    "system": "system_1",
    "environment": "production",
    "site_id": "site_main",
    "sale_page_id": "sp_202609_campaign_a"
  },
  "user": {
    "user_id": "usr_123456",
    "anonymous_id": "anon_8f31c2",
    "session_id": "sess_7788",
    "email": "customer@example.com",
    "phone": "+66812345678"
  },
  "attribution": {
    "platform": "facebook",
    "fbp": "fb.1.1720000000000.123456789",
    "fbc": "fb.1.1720000000000.AbCdEfGhIj",
    "utm_source": "facebook",
    "utm_medium": "paid_social",
    "utm_campaign": "campaign_2026_q3",
    "utm_campaign_id": "cmp_9876",
    "utm_content": "ad_0042",
    "utm_content_id": "ad_0042",
    "landing_page_url": "https://sale.example.com/a",
    "click_occurred_at": "2026-09-16T03:05:12+07:00"
  },
  "deposit": {
    "transaction_id": "dep_56789",
    "deposit_status": "success",
    "amount": 1500.00,
    "currency": "THB",
    "payment_method": "bank_transfer",
    "is_first_deposit": true,
    "completed_at": "2026-09-16T03:12:30+07:00"
  },
  "consent": {
    "marketing": true,
    "consent_version": "2026-01",
    "consented_at": "2026-09-16T03:01:10+07:00",
    "country": "TH"
  },
  "context": {
    "client_ip": "203.0.113.10",
    "user_agent": "Mozilla/5.0 ...",
    "page_url": "https://real.example.com/deposit/success"
  }
}
```

### 4.3 ฟิลด์ที่จำเป็น

| ฟิลด์ | Type | Required | คำอธิบาย |
|---|---|---:|---|
| `event_id` | string | Yes | รหัส Event ที่ไม่ซ้ำและไม่เปลี่ยนเมื่อ Retry |
| `event_name` | enum | Yes | ชื่อ Event จากรายการที่อนุญาต |
| `event_version` | string | Yes | เวอร์ชันของ Contract เช่น `1.0` |
| `occurred_at` | ISO-8601 | Yes | เวลาที่เกิดเหตุการณ์จริง |
| `sent_at` | ISO-8601 | Yes | เวลาที่ระบบที่ 1 ส่งข้อมูล |
| `source.system` | string | Yes | ต้องเป็น `system_1` |
| `user.user_id` | string | Yes | User ID จากเว็บไซต์จริง |
| `user.anonymous_id` | string | Recommended | รหัสก่อนสมัคร ใช้เชื่อม SalePage กับ User |
| `user.session_id` | string | Recommended | Session ที่เกิดเหตุการณ์ |
| `attribution.fbp` | string | Recommended | Browser identifier จาก Meta Pixel |
| `attribution.fbc` | string | Recommended | Click identifier จาก Meta Ads |
| `consent.marketing` | boolean | Yes | มีสิทธิ์ใช้ข้อมูลเพื่อการตลาดหรือไม่ |

สำหรับ `deposit_success` ต้องมีฟิลด์เพิ่มดังนี้:

| ฟิลด์ | Required | เงื่อนไข |
|---|---:|---|
| `deposit.transaction_id` | Yes | ต้องไม่ซ้ำต่อรายการธุรกรรม |
| `deposit.deposit_status` | Yes | ต้องมีค่า `success` |
| `deposit.amount` | Yes | มากกว่า 0 และเป็นยอดที่ยืนยันแล้ว |
| `deposit.currency` | Yes | แนะนำให้ใช้ `THB` ให้สม่ำเสมอ |
| `deposit.completed_at` | Yes | เวลาที่ระบบยืนยันฝากสำเร็จ |

## 5. Endpoint สำหรับตรวจสอบข้อมูลย้อนหลัง

ระบบกลางควรเรียก API ของระบบที่ 1 ทุก 2 ชั่วโมง เพื่อค้นหา Event ที่อาจส่งไม่สำเร็จหรือมีการเปลี่ยนสถานะ

```http
GET /v1/events/reconciliation?updated_from=2026-09-16T01:00:00Z&updated_to=2026-09-16T03:00:00Z&cursor=abc123&limit=500
Authorization: Bearer <SYSTEM_1_API_KEY>
```

Response:

```json
{
  "data": [
    {
      "event_id": "sys1_evt_01JXYZ123",
      "event_name": "deposit_success",
      "occurred_at": "2026-09-16T03:12:34+07:00",
      "updated_at": "2026-09-16T03:13:00+07:00",
      "user_id": "usr_123456",
      "transaction_id": "dep_56789",
      "deposit_status": "success",
      "amount": 1500.00,
      "currency": "THB"
    }
  ],
  "next_cursor": "abc124",
  "has_more": false
}
```

ระบบกลางต้องบันทึก `cursor` และดึงต่อจน `has_more=false` ห้ามใช้เพียง `updated_at` โดยไม่มี Cursor เพราะอาจเกิดข้อมูลซ้ำหรือข้อมูลที่มีเวลาเดียวกันตกหล่น

## 6. การตอบกลับและ Error Contract

### สำเร็จ

```http
202 Accepted
```

```json
{
  "accepted": true,
  "event_id": "sys1_evt_01JXYZ123",
  "canonical_event_id": "cev_01JXYZ999",
  "status": "queued"
}
```

`202 Accepted` หมายความว่าระบบกลางรับ Event และเข้าคิวแล้ว ยังไม่ใช่การยืนยันว่า Meta รับข้อมูลสำเร็จ

### Event ซ้ำที่ถือว่าปลอดภัย

```http
200 OK
```

```json
{
  "accepted": true,
  "event_id": "sys1_evt_01JXYZ123",
  "status": "already_processed",
  "canonical_event_id": "cev_01JXYZ999"
}
```

### Error ที่ระบบที่ 1 ควร Retry

| HTTP status | ความหมาย | การ Retry |
|---|---|---|
| `408` | Timeout | Retry แบบ Exponential Backoff |
| `429` | ถูกจำกัดอัตราการส่ง | รอ `Retry-After` |
| `500` | ระบบกลางผิดพลาดชั่วคราว | Retry |
| `502`, `503`, `504` | บริการปลายทางไม่พร้อม | Retry |

### Error ที่ไม่ควร Retry จนกว่าจะแก้ข้อมูล

| HTTP status | ความหมาย |
|---|---|
| `400` | JSON หรือรูปแบบข้อมูลผิด |
| `401` | API Key ไม่ถูกต้องหรือหมดอายุ |
| `403` | ไม่มีสิทธิ์ส่งข้อมูล |
| `409` | ข้อมูลขัดแย้ง เช่น Transaction ID ใช้กับ User อื่น |
| `422` | ผ่าน JSON แต่ไม่ผ่านกฎธุรกิจ เช่น `deposit_success` แต่ไม่มี amount |

## 7. กฎเชื่อมตัวตนและข้อมูล Attribution

ระบบที่ 1 ต้องเก็บ `anonymous_id` ตั้งแต่ SalePage และส่งค่าเดิมต่อไปเมื่อผู้ใช้คลิกเข้าเว็บไซต์จริง ระบบเว็บไซต์จริงต้อง map ค่าเดิมเข้ากับ `user_id` เมื่อสมัครสำเร็จ ผลลัพธ์ที่ต้องได้คือ:

```text
anonymous_id → session_id → user_id → transaction_id
```

`fbp` และ `fbc` ควรส่งต่อจาก SalePage ไปยังเว็บไซต์จริงโดยไม่ถูกสร้างใหม่ระหว่างทาง หากมีการสร้างใหม่ ระบบจะจับคู่ Event กับโฆษณาได้ยากขึ้น

สำหรับการวิเคราะห์โฆษณา ควรเก็บ Campaign ID, Ad Set ID และ Ad ID ที่เป็นค่าจริงจากระบบที่ 1 ไม่ควรพึ่งพาเพียงชื่อ UTM เพราะชื่ออาจถูกเปลี่ยนภายหลัง

## 8. กฎคัดลูกค้าคุณภาพสูง

จากเกณฑ์ของพี่ที่ต้องการใช้ **จำนวนครั้งที่ฝาก** และ **ยอดฝากสูง** แนะนำให้คำนวณ Segment แยกจาก Event ดังนี้

### Qualified Customer

```text
registration_completed = true
AND deposit_success_count >= 1
AND marketing_consent = true
```

### High-value Customer

```text
deposit_success_count >= HIGH_VALUE_MIN_DEPOSITS
AND total_success_deposit_90d >= HIGH_VALUE_MIN_AMOUNT
AND refunded_amount_90d = 0
AND marketing_consent = true
```

ค่า `HIGH_VALUE_MIN_DEPOSITS` และ `HIGH_VALUE_MIN_AMOUNT` ควรเป็นค่าที่แก้ได้จากหน้า Settings ไม่ควรฝังตายตัวในโค้ด เช่น:

```text
HIGH_VALUE_MIN_DEPOSITS = 2
HIGH_VALUE_MIN_AMOUNT = 5,000 THB
```

ในระยะแรกควรสร้าง 3 กลุ่ม:

1. **Qualified Customer:** ฝากสำเร็จอย่างน้อย 1 ครั้ง
2. **High-value Customer:** ฝากสำเร็จหลายครั้งและยอดรวมเกินเกณฑ์
3. **Existing Customer Exclusion:** เคยฝากสำเร็จแล้ว เพื่อไม่ให้แคมเปญหาลูกค้าใหม่ยิงซ้ำ

การส่งกลุ่ม High-value ไปใช้เป็น Seed หรือ Audience ควรใช้เฉพาะข้อมูลที่มี Consent และต้องตรวจสอบนโยบายโฆษณาของ Meta รวมถึงข้อกำกับของประเภทธุรกิจ ก่อนเปิดใช้งานจริง หากธุรกิจหรือ Audience เข้าข่ายหมวดที่ Meta จำกัด ระบบควรหยุดการส่งและแสดงสถานะ `policy_review_required` แทนการส่งอัตโนมัติ

## 9. แนวทางส่งกลับ Meta ที่แนะนำ

### 9.1 Conversions API

ส่ง `CompleteRegistration` เมื่อสมัครสำเร็จ และส่ง `Purchase` เมื่อ `deposit_success` ผ่านการตรวจสอบแล้ว โดย Payload ควรมี `event_id`, `event_name`, `event_time`, `action_source`, `user_data` และ `custom_data` ที่เหมาะสม

หากระบบที่ 1 ส่ง Pixel Event สำหรับเหตุการณ์เดียวกัน ต้องใช้ `event_id` เดียวกันระหว่าง Browser Pixel และ Server Event เพื่อให้ Meta Deduplicate ได้ถูกต้อง [1]

### 9.2 Audience / Exclusion

ระบบกลางควร Sync กลุ่มเป็นรอบ เช่น ทุก 2 ชั่วโมงหรือทุก 6 ชั่วโมงตามความต้องการของแคมเปญ:

- High-value Customer
- Qualified Customer
- Existing Customer Exclusion
- New Registered but No Deposit

รายชื่อที่ใช้ Customer Audience ต้อง Normalize และ Hash identifiers ก่อนส่ง Meta ระบบควรเก็บ Hash หรือ Customer ID ภายในแทนการเขียนข้อมูลส่วนตัวดิบลง Log [2]

### 9.3 ลำดับการ Optimize

ลำดับที่แนะนำคือ:

1. เริ่มวัด `CompleteRegistration` เพื่อให้มีสัญญาณ Conversion ระดับต้น
2. ใช้ `Purchase` หรือ `deposit_success` เป็น Conversion หลักเมื่อมีปริมาณเพียงพอและข้อมูลถูกต้อง
3. สร้าง High-value Audience จากลูกค้าที่ฝากหลายครั้งและยอดสูง
4. ใช้ Existing Customer Exclusion แยกจากกลุ่ม Acquisition
5. ทดสอบแคมเปญที่ Optimize ไปยัง Purchase/Qualified Customer ตามปริมาณข้อมูลจริง

ไม่ควรส่ง `High-value Customer` เป็น Purchase ทุกครั้งที่มีการคำนวณ Segment เพราะจะทำให้เกิด Conversion ซ้ำ ควรส่ง Purchase หนึ่งครั้งต่อธุรกรรม และใช้ Segment เป็น Audience หรือ Custom Event แยกต่างหาก

## 10. ความปลอดภัย

ระบบที่ 1 ต้องส่งข้อมูลผ่าน HTTPS เท่านั้น ระบบกลางควรตรวจทั้ง API Key และ HMAC Signature โดย Signature ควรคำนวณจาก Raw Request Body และ Timestamp เพื่อป้องกันการแก้ Payload และ Replay Attack

ระบบควรใช้แนวทางต่อไปนี้:

- แยก API Key ระหว่าง Test และ Production
- จำกัดสิทธิ์ Key ให้ส่ง Event ได้เท่านั้น
- ใช้ `X-Request-Timestamp` และปฏิเสธ Request ที่เก่าเกินช่วงเวลาที่กำหนด
- Mask Email, Phone, IP และ Token ใน Log
- ไม่ส่ง Access Token ของ Meta กลับไปยังระบบที่ 1
- เก็บ Consent version และเวลาที่ให้ Consent
- รองรับการ Opt-out และการลบข้อมูลตามนโยบายของธุรกิจ
- เก็บ Audit Log สำหรับการแก้ Rule และการเปิด/ปิด Meta Sync

## 11. หน้าจอ UI ที่ควรพัฒนาต่อจาก Prototype เดิม

Prototype เดิมมี Overview, Event Stream, Segments และ Meta Sync แล้ว ควรเพิ่มหรือปรับดังนี้:

### Inbound Events

แสดง `event_id`, `event_name`, `user_id`, `transaction_id`, `deposit_status`, `amount`, `consent`, `validation_status`, `duplicate_status` และเวลาที่รับเข้า

### Customer Journey

แสดงเส้นทางของ User ตั้งแต่ `ad_click` ถึง `deposit_success` และ Meta delivery เพื่อให้ทีมตรวจได้ว่า Event ขาดหายตรงจุดใด

### Reconciliation Center

แสดงรอบตรวจข้อมูลล่าสุด จำนวน Event ที่ดึงมา จำนวนที่พบในระบบกลาง จำนวนที่ขาดหาย และรายการที่ถูกนำกลับเข้าคิว

### Rule Settings

ให้ตั้งค่า:

- จำนวนฝากขั้นต่ำ
- ยอดฝากขั้นต่ำ
- ช่วงเวลาคำนวณ เช่น 30 หรือ 90 วัน
- เงื่อนไข Refund
- Consent requirement
- รอบ Sync ไป Meta

### Meta Delivery Detail

ต้องแยกสถานะ `queued`, `sent`, `accepted`, `failed`, `retrying`, `blocked_policy` และ `already_deduplicated` ไม่ควรใช้คำว่า “ส่งแล้ว” เพียงค่าเดียว

## 12. Checklist ก่อนเริ่มเชื่อมจริง

ทีมระบบที่ 1 ควรเตรียมข้อมูลต่อไปนี้:

- รายการ Event ที่เกิดขึ้นจริงทั้งหมด
- ตัวอย่าง Payload ของแต่ละ Event
- วิธีสร้างและคงค่า `anonymous_id`
- วิธีผูก `anonymous_id` กับ `user_id`
- นิยาม `deposit_success` ที่เชื่อถือได้
- รูปแบบ `transaction_id`
- รูปแบบจำนวนเงินและสกุลเงิน
- รายการ UTM และ Meta identifiers ที่เก็บได้
- วิธีบันทึก Consent
- Endpoint สำหรับ Reconciliation
- วิธีแจ้ง Event ที่ถูก Refund หรือเปลี่ยนสถานะ

## 13. ข้อเสนอแนะสุดท้าย

พี่ควรเริ่มจาก **MVP ที่เน้น Purchase ที่เชื่อถือได้** มากกว่าการส่ง Event จำนวนมาก ระบบแรกควรส่ง `registration_completed`, `deposit_initiated` และ `deposit_success` ให้ครบ แต่ระบบกลางควรส่งกลับ Meta โดยใช้ `deposit_success` เป็นสัญญาณธุรกรรมหลัก และใช้จำนวนครั้งฝากกับยอดฝากเพื่อสร้าง High-value Audience

การออกแบบนี้ทำให้ระบบโฆษณาแยกได้ระหว่างผู้ที่สนใจ ผู้ที่สมัคร และผู้ที่สร้างมูลค่าจริง โดยไม่ทำให้ Purchase ถูกนับเกินจริง ระบบยังสามารถเปลี่ยนเกณฑ์ลูกค้าคุณภาพได้ภายหลังโดยไม่ต้องแก้ระบบที่ 1 ทุกครั้ง

## References

[1]: https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events "Meta: Handling Duplicate Pixel and Conversions API Events"

[2]: https://developers.facebook.com/documentation/ads-commerce/marketing-api/audiences/guides/custom-audiences "Meta: Customer File Custom Audiences"

[3]: https://developers.facebook.com/documentation/ads-commerce/conversions-api "Meta: Conversions API"


## 14. การเชื่อม Business Manager เพื่อดู Campaign

สามารถเชื่อม Business Manager และ Ad Account เพื่ออ่าน Campaign, Ad Set, Ad และ Ads Insights ได้ โดยควรเริ่มจากโหมด **Read-only** ก่อน ระบบกลางจะอ่านข้อมูลเพื่อเปรียบเทียบ Spend, Purchases, CPA และ ROAS แต่ไม่ควรให้สิทธิ์แก้ไขงบประมาณหรือเปิด/ปิดแคมเปญในระยะแรก

สิทธิ์ที่เกี่ยวข้องโดยทั่วไปคือ `ads_read` สำหรับอ่านรายงานและข้อมูลโฆษณา และ `ads_management` หากต้องอ่าน/จัดการบัญชีโฆษณาในขอบเขตที่ Meta อนุญาต สิทธิ์จริงต้องผูกกับ App, Business และ Ad Account ที่ได้รับอนุมัติ รวมทั้ง Task Permission ของผู้ใช้หรือ System User ที่ทำ API call [4] [5]

ควรแยก Connection ออกเป็น 3 ชุดเพื่อควบคุมความเสี่ยง: Token สำหรับ Conversions API, Token สำหรับ Audience Management และ Token สำหรับ Campaign Insights แบบ Read-only หากใช้ App/Business เดียวกัน ควรบันทึก Scope ที่ได้รับจริงและแสดงในหน้า UI ให้ผู้ดูแลตรวจสอบได้

### Token Health

ระบบควรตรวจ Token ด้วยรอบ Health Check ทุก 15 นาที และบันทึก `last_checked_at`, `expires_at`, `days_remaining`, `scopes`, `token_status` และ `last_error` โดยแบ่งสถานะเป็น `active`, `expiring_soon`, `expired`, `revoked` และ `permission_error` เมื่อเหลือ 14 วันควรแจ้งเตือนบน Dashboard และส่ง Notification ให้ผู้ดูแล เมื่อหมดอายุให้หยุดการส่งข้อมูลและแสดงสาเหตุอย่างชัดเจน แทนการ Retry แบบไม่มีที่สิ้นสุด

อายุ Token ไม่ควร hard-code เพราะ Meta ระบุว่าอายุ Short-lived และ Long-lived Token อาจเปลี่ยนแปลงได้ โดย Long-lived User Token โดยทั่วไปอยู่ประมาณ 60 วัน ขณะที่ System User Token แบบมีอายุอาจมีรอบประมาณ 60 วันเช่นกัน จึงควรใช้ค่า `expires_at` และผลจาก Token Debugging เป็นแหล่งตัดสินใจหลัก [6] [7]

### ข้อแนะนำเพิ่มเติม

ควรเก็บ Campaign ID, Ad Set ID และ Ad ID ไว้ตั้งแต่ระบบที่ 1 ส่ง Event เข้ามา แล้วทำ Attribution Join กับ Insights ของ Meta ในระบบกลาง นอกจากนี้ควรมี Data Freshness บอกว่า Insights อัปเดตล่าสุดเมื่อใด เพราะข้อมูล Campaign และ Conversion อาจเข้ามาคนละเวลา ระบบควรเริ่มจาก Read-only ก่อน และเปิดสิทธิ์ `ads_management` เฉพาะเมื่อมี Use Case ที่ต้องแก้ Campaign จริงพร้อม Approval ที่ชัดเจน

[4]: https://developers.facebook.com/documentation/ads-commerce/marketing-api/get-started/authorization "Meta: Marketing API Authorization"

[5]: https://developers.facebook.com/documentation/ads-commerce/marketing-api/insights "Meta: Ads Insights API"

[6]: https://developers.facebook.com/documentation/facebook-login/guides/access-tokens "Meta: Access Tokens for Meta Technologies"

[7]: https://developers.facebook.com/docs/business-management-apis/system-users/install-apps-and-generate-tokens/ "Meta: Install Apps and Generate System User Tokens"

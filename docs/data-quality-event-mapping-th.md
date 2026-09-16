# Data Quality และ Event Mapping

## Data Quality

Data Quality คือด่านตรวจสอบก่อนนำ Event ไปวิเคราะห์หรือส่ง Meta ทำหน้าที่ตอบว่า Event ครบ ถูกต้อง ปลอดภัย และพร้อมใช้งานหรือไม่

### สิ่งที่ตรวจ

| Rule | เป้าหมาย | ตัวอย่างผลลัพธ์ |
|---|---|---|
| Schema & required fields | ตรวจ event_name, event_id, timestamp, value และ currency | Passed / Blocked |
| Privacy & consent | ตรวจ Marketing Consent และการจัดการข้อมูลโทรศัพท์ | Passed / Blocked |
| Identity & match | ตรวจ phone, external_id, fbp และ fbc | Passed / Warning |
| Deduplication | ป้องกัน Event ซ้ำระหว่าง Pixel และ CAPI | Passed / Blocked |
| Freshness & latency | ตรวจเวลาจากเว็บไซต์ถึงระบบกลาง | Passed / Warning |
| Mapping readiness | ตรวจว่ามี Mapping ไป Meta Event | Passed / Review |

### วิธีใช้งาน

1. เลือกช่วงเวลาและ Source ที่ต้องการตรวจ
2. กด Scan now หรือเปิดผลการตรวจรอบล่าสุด
3. อ่าน Quality Score และจำนวน Passed, Warning, Blocked
4. เปิดรายการ Issue เพื่อดู Event ตัวอย่างและสาเหตุ
5. แก้ที่ระบบต้นทางหรือปรับ Rule/Mapping
6. Scan ซ้ำและตรวจว่าคุณภาพดีขึ้นก่อนเปิดใช้งานจริง

การ Retry ไม่ควรใช้แทนการแก้ Data Quality เพราะจะส่งข้อมูลเสียซ้ำ ระบบควร Block Event ที่ผิดเงื่อนไขสำคัญ และเก็บเหตุผลไว้สำหรับ Audit

## Event Mapping

Event Mapping คือ Registry ที่กำหนดความสัมพันธ์ระหว่าง Event จากระบบที่ 1, Event มาตรฐานภายใน และ Meta Event ที่จะส่งผ่าน Conversions API

### ตัวอย่าง

```text
deposit_success
→ Normalize: value, currency, transaction_id, phone, consent
→ Meta Purchase
```

### Field ที่ควรกำหนดต่อ Mapping

- Source event name และ version
- Meta event name
- Required fields และ Optional fields
- Transform เช่น แปลงยอดเงินเป็นตัวเลขหรือ normalize เบอร์โทร
- Identity fields เช่น phone, external_id, fbp, fbc
- Consent rule
- Deduplication key
- Validation rule
- Owner, Reviewer และวันแก้ไขล่าสุด

### วิธีใช้งาน

1. เพิ่ม Mapping ใหม่หรือเลือก Mapping เดิม
2. ระบุ Source Event และ Meta Event
3. จับคู่ Required Fields พร้อม Transform
4. ตั้ง Validation และ Consent Rule
5. ส่ง Test Event เพื่อตรวจ Payload
6. บันทึกเป็น Draft หรือส่ง Review
7. Publish เป็น Version ใหม่เมื่อผ่านการอนุมัติ

ไม่ควรแก้ Mapping ที่ใช้งานอยู่โดยทับ Version เดิม ควรสร้าง Version ใหม่เพื่อให้ย้อนกลับได้ และควรมีสถานะ Draft, Review, Ready, Deprecated

## การทำงานร่วมกัน

```text
Event Stream
→ Data Quality
→ Event Mapping
→ Test Events
→ Meta Sync
```

Data Quality ตรวจว่า Event มีคุณภาพ ส่วน Event Mapping ตรวจว่า Event ถูกแปลงไปยังปลายทางที่ถูกต้อง ทั้งสองหน้าจึงควรแยกกันแต่เชื่อมด้วย Issue และ Test Event เดียวกัน

# รายงาน Milestone: Test Events Interactive Developer Console

## สรุป

พัฒนาเมนู Test Events จากหน้า History เดิมให้เป็น **Interactive Developer Console** สำหรับจำลองการตรวจ Event ตั้งแต่ Source Payload จนถึง Meta Delivery โดยใช้ Sample Data, Demo Connection และ Simulation เท่านั้น ไม่มี Production Meta API, Token จริง หรือ Request จริงถูกส่งออกจาก Prototype

## สิ่งที่พัฒนา

### Payload Editor

เพิ่มช่องแก้ไข JSON แบบสองคอลัมน์ รองรับ Sample Payload ที่ใช้ Entity เดียวกับระบบ ได้แก่ `evt_test_001`, `usr_test_001`, `txn_test_001` และ `mapping_v12` ผู้ใช้สามารถ Load Sample, แก้ Payload, Run Validation และ Reset ได้ พร้อมแสดงป้าย PII masked และ `NO PRODUCTION ACTION`

### Validation Result

เมื่อกด Run Validation ระบบจำลองผลตรวจ 7 รายการ ได้แก่ Schema, Consent, Identity, Transaction, Deduplication, Freshness และ Mapping โดยแสดงสถานะ Passed หรือ Warning ตัวอย่าง Warning คือ fbp/fbc บางส่วน เพื่อให้เห็นกรณีข้อมูลพร้อมใช้งานแต่ควรปรับปรุง Match Signal

### Normalized Event

เพิ่ม Tab แสดง Flow การแปลงข้อมูลจาก `deposit_success` ไปสู่ Normalized Event และ Meta Event `Purchase` พร้อมอธิบาย Transform Rules เช่น phone → normalize → hash, value → number validation, currency → uppercase และ transaction_id → order_id

### Simulated Meta Payload

เพิ่ม Tab JSON Preview ของ Payload ที่จะถูกส่ง โดย Mask ค่า PII เช่น phone hash และ fbp พร้อมแสดง `action_source`, `custom_data`, `value`, `currency` และ `order_id` อย่างชัดเจน

### Simulated Delivery Result

เพิ่ม Flow จำลอง 5 ขั้นตอน: Validating → Mapping → Queue → Sending Simulation → Success ผลลัพธ์แสดง `Delivered — Simulated`, `HTTP 200 Demo Response`, Latency 1.1 sec และข้อความ `NO REQUEST SENT` รวมถึง Event Match Signals ได้แก่ external_id, phone, fbp และ fbc warning

### Responsive UX

Desktop ใช้ Layout แบบสองคอลัมน์, Tablet เปลี่ยนเป็น Stack และ Mobile รองรับการเลื่อน Tab, ปุ่มแบบเต็มพื้นที่ และ Normalized Flow แบบแนวตั้ง

## การทดสอบที่ผ่านแล้ว

| รายการ | ผลลัพธ์ |
|---|---|
| เปิด Test Events จาก Sidebar | ผ่าน |
| Load Sample / Reset controls | แสดงและใช้งานได้ |
| Run Validation | แสดง Passed/Warning ครบ |
| Normalized Event tab | แสดง Source → Normalize → Meta Event |
| Simulated Meta Payload tab | แสดง JSON และ Mask PII |
| Delivery Trace tab | แสดงลำดับ Simulation |
| Simulate Delivery | แสดง Delivered — Simulated และ Success ครบ |
| TypeScript check | ผ่าน |
| Production build | ผ่าน |
| Production Meta request | ไม่มีการส่ง |

## ขอบเขตที่ยังเป็น Prototype

ยังไม่มีการ Parse JSON แบบ Production, Schema Engine จริง, Backend Validation, Meta API Request, Retry Queue, Persistence, Authentication, Token จริง หรือ Real-time Delivery Trace ปุ่มทั้งหมดทำงานด้วย Frontend State เพื่อพิสูจน์ UX และเตรียม Contract สำหรับ Backend ในอนาคต

## Milestone ถัดไปที่แนะนำ

ควรเพิ่ม Error Simulation ให้ผู้ใช้เลือกกรณี Validation Failed, Invalid Mapping, Duplicate Event, Demo API Timeout และ Consent Missing ต่อด้วย Event Detail ที่เชื่อมกลับไป Campaign, Ad, Customer และ Delivery Trace จาก Entity ID เดียวกัน รวมถึงเพิ่ม Test History ที่บันทึกผล Simulation ล่าสุดใน Frontend State

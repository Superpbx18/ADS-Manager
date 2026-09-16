# Report Milestone: Shared Event Inspector และ Relationship Navigation

## สรุป

รอบนี้ต่อยอดจาก Test Events Developer Console โดยสร้างแกนกลาง **Shared Event Inspector** สำหรับตรวจ Event จาก Event Stream และ Test History พร้อมเพิ่ม Relationship Visualization, Delivery Trace แบบคลิกดูรายละเอียด และ Customer Journey Drawer ใช้ Demo Dataset เดิมทั้งหมด โดยยังไม่มี Production Meta API, Token จริง หรือ Request จริงออกจากระบบ

## สิ่งที่พัฒนาแล้ว

### 1. Shared Event Inspector

อัปเกรด Drawer เดิมให้เป็น Inspector กลางที่มี Tabs ได้แก่ Overview, Payload, Identity, Attribution, Data Quality, Mapping, Delivery และ Relationships

หน้า Overview แสดง Event ID, Timestamp, Source System, Customer ID, Transaction ID, Value, Consent Status และ Mapping Status พร้อม Related Entity Links ของ Campaign, Ad Set, Ad, Customer และ Mapping

### 2. Payload และ Data Quality

เพิ่ม Raw → Normalized Event Preview, Identity/Consent Signals และ Quality Gate ที่แสดง Passed หรือ Blocked ตาม Scenario เช่น Consent Missing และ Duplicate Event

### 3. Attribution และ Mapping

เพิ่ม Campaign Attribution ได้แก่ `cmp_q3_deposit`, `adset_high_value_01`, `ad_video_03`, `creative_video_03`, UTM และ fbp/fbc พร้อม Event Mapping Flow จาก `deposit_success` → `mapping_v12` → `Purchase`

### 4. Delivery Trace แบบ Interactive

เพิ่ม Delivery Steps ที่กดเลือกได้ ได้แก่ Received, Validation, Mapping, Deduplication, Queue และ Sending Simulation เมื่อเลือก Step จะแสดง Status, Input/Output, Duration และ Retry Eligibility

### 5. Relationship Visualization

เพิ่ม Flow:

`Workspace → Ad Account → Campaign → Ad Set → Ad → Event → Customer`

และ:

`Event → Data Quality → Event Mapping → Delivery Trace`

### 6. Customer Journey Drawer

เพิ่ม Journey สำหรับ `usr_123456` แสดง Ad Click → Landing View → Registration Completed → Deposit Pending → Deposit Success → Repeat Deposit พร้อม Timestamp, Entity ID, Value และ Delivery Status

### 7. Test History Integration

Test History row สามารถคลิกเพื่อเปิด Shared Event Inspector เดียวกับ Event Stream โดยใช้ Scenario ของ Test Run เดิม เช่น Happy path, Invalid Mapping, Consent Missing หรือ Demo API Timeout

## Flow ที่ทดสอบแล้ว

| Flow | ผลลัพธ์ |
|---|---|
| Event Stream → Purchase Event → Shared Inspector | ผ่าน |
| Inspector Overview → Related Campaign/Ad/Customer/Mapping | แสดงและกดเปลี่ยน Tab ได้ |
| Inspector → Delivery → Mapping Step | แสดง Passed, Input/Output และ Duration 8 ms |
| Inspector → Customer Journey | เปิด Timeline 6 ขั้นสำเร็จ |
| Test History → test_001 → Shared Inspector | ผ่าน |
| Error Scenario เดิมจากรอบก่อน | ยังทำงานและส่ง Scenario เข้า Inspector ได้ |
| Production Meta Request | ไม่มีการส่ง |

## Acceptance Criteria ที่ผ่านในรอบนี้

ผ่านบางส่วนตามขอบเขต Milestone:

1. Event จาก Event Stream เปิด Event Inspector ได้
2. Event จาก Test History เปิด Inspector เดียวกันได้
3. Event เชื่อม Campaign, Ad Set, Ad และ Customer ได้
4. Event เปิด Delivery Trace ได้
5. Delivery Trace แต่ละ Step เปิดรายละเอียดได้
6. Event เปิด Customer Journey ได้
7. Error Simulation เดิมยังทำงาน
8. Test History เดิมยังทำงาน
9. TypeScript Check ผ่าน
10. Production Build ผ่าน
11. Responsive Drawer รองรับ Mobile เป็น Full-screen Inspector
12. ไม่มี Production Meta Request

## สิ่งที่ยังเป็น Prototype

Relationship Links ในรอบนี้เปลี่ยน Tab ภายใน Inspector เพื่อพิสูจน์ Navigation Pattern ยังไม่ได้เปิด Inspector เฉพาะ Campaign, Ad หรือ Customer จริง ส่วนข้อมูลทั้งหมดใช้ Referentially Consistent Demo Dataset และเก็บ State ใน Frontend เท่านั้น ยังไม่มี Backend Persistence, Real Schema Engine, Meta OAuth, Production Queue หรือ Database Audit

## Milestone ถัดไปที่แนะนำ

รอบต่อไปควรพัฒนา Campaign Inspector Conversion Tab และ Ad Inspector Conversion Section ให้ Conversion Metric คลิกไป Event List ได้ จากนั้นเพิ่ม AI Recommendation Evidence Drawer, Create Draft, Draft Review, Approval Modal, Guardrail Check, Simulated Execution และ Audit Entry ตามลำดับในสเปกแนบ

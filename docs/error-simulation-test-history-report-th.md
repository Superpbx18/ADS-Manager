# Report การทำงานรอบนี้: Error Simulation และ Test History

## สรุป

รอบนี้พัฒนา Test Events Interactive Developer Console ต่อจาก Milestone ก่อนหน้า โดยเพิ่มสถานการณ์จำลองความผิดพลาดและระบบประวัติการทดสอบฝั่ง Frontend เพื่อให้ทีมเห็นพฤติกรรมของระบบก่อนถึง Delivery Layer ทั้งหมดใช้ Sample Data / Demo Connection / Simulated Action และไม่มี Production Meta Request

## สิ่งที่พัฒนา

### 1. Error Simulation Scenarios

เพิ่มตัวเลือกสถานการณ์ 5 แบบโดยไม่เพิ่ม Sidebar Menu ใหม่ ได้แก่:

| Scenario | ผลลัพธ์ที่จำลอง |
|---|---|
| Happy path | Validation ผ่านและพร้อม Simulate Delivery |
| Invalid Mapping | Blocked เพราะไม่พบ `mapping_v12` สำหรับ `deposit_success` |
| Duplicate Event | Blocked เพราะ `event_id` ซ้ำกับ Event ที่เคยส่ง |
| Consent Missing | Blocked เพราะไม่มี marketing consent และไม่ใช้ User Identifier ในการส่ง |
| Demo API Timeout | Error หลังเข้าคิว เนื่องจาก Demo Endpoint จำลอง Timeout |

### 2. Validation State

แต่ละ Scenario เปลี่ยนผล Validation ตามเหตุการณ์จริงที่ต้องการสื่อ เช่น Schema/Consent/Identity/Mapping/Delivery โดยรองรับสถานะ Passed, Warning, Blocked และ Error พร้อมเปลี่ยน Banner ด้านบนเป็น `BLOCKED · SIMULATED` หรือ `ERROR · SIMULATED`

### 3. Delivery Trace

เพิ่ม Trace ที่แสดงลำดับ Validating → Mapping → Queue → Sending Simulation → Result และเปลี่ยนสถานะของแต่ละ Step ตาม Scenario เพื่อให้เห็นว่าระบบหยุดตรงจุดใด เช่น Invalid Mapping หยุดที่ Mapping, Consent Missing หยุดก่อน Queue และ Demo API Timeout ผิดพลาดที่ Sending Simulation

### 4. Test History

เพิ่ม Test History แบบ Frontend Demo State เมื่อผู้ใช้กด Run Validation ระบบจะเพิ่มรายการทดสอบล่าสุดพร้อม:

- Test ID
- Event Name
- Scenario
- Result
- Timestamp
- สีและ Badge แยก Success/Blocked/Error

เมื่อกด Simulate Delivery สำเร็จ ระบบจะเพิ่มรายการ `Delivered — Simulated` เข้า History โดยไม่ทำให้เข้าใจว่า Meta จริงได้รับ Event

### 5. Reset Scenario

เพิ่มปุ่ม Reset Scenario เพื่อคืนค่า Happy path, Sample Payload, Validation Tab และสถานะเริ่มต้นของ Console

## การทดสอบที่ทำแล้ว

| รายการ | ผลลัพธ์ |
|---|---|
| เปิด Test Events จาก Sidebar | ผ่าน |
| เลือก Invalid Mapping | ผ่าน |
| Run Invalid Mapping Validation | แสดง Mapping/Delivery = Blocked |
| เลือก Consent Missing | ผ่าน |
| Run Consent Missing Validation | แสดง Consent = Blocked และ Identity = Warning |
| Test History | เพิ่ม `test_002 · Consent Missing` ได้ |
| Happy Path จากรอบก่อนหน้า | ยังแสดง `Delivered — Simulated` |
| TypeScript Check | ผ่าน |
| Production Build | ผ่าน |
| Production Meta API | ไม่ได้เรียกใช้งาน |

## ขอบเขตที่ยังเป็น Prototype

Test History ยังเก็บใน React Frontend State และจะหายเมื่อ Refresh หน้าเว็บ ยังไม่มี Backend Persistence, Real Schema Engine, Real Retry Queue, Meta API Error Response, Authentication หรือ Role-based Approval การเลือก Error Scenario เป็นตัวจำลองเพื่อทดสอบ UX และ Guardrail เท่านั้น

## งานแนะนำรอบถัดไป

ควรเพิ่ม Conversion Detail และ Customer Journey Drawer ให้เริ่มจาก `cmp_q3_deposit` → `adset_high_value_01` → `ad_video_03` → `evt_01JXYZ123` → `usr_123456` รวมถึงเชื่อม Test History ให้เปิด Event Inspector และ Delivery Trace ที่สัมพันธ์กับ Entity เดียวกัน ต่อด้วยเพิ่ม AI Recommendation Evidence Drawer และ Draft Review Screen ให้ครบ Decision-to-Action Workflow

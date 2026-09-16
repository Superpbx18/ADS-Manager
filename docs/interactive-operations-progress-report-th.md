# รายงานความคืบหน้า Interactive Operations Prototype

## สถานะปัจจุบัน

Signalroom ได้ยกระดับจาก Dashboard Prototype ไปสู่ Interactive Operations Prototype รุ่นแรกแล้ว โดยใช้ Sample Data และ Demo Connection เท่านั้น ยังไม่มีการเชื่อม Production API, ใช้ Token จริง หรือดำเนินการจริงกับ Meta

## สิ่งที่พัฒนาแล้ว

### 1. End-to-End Demo Scenario

หน้า Overview แสดง Workflow 9 ขั้นตอนตั้งแต่ Ad Traffic, Event Received, Data Quality, Event Mapping, Meta Delivery, Customer Segment, Campaign Analysis, AI Recommendation ไปจนถึง Simulated Result ผู้ใช้สามารถเลือก Step, จำลองขั้นถัดไป และเห็นสถานะความคืบหน้าได้

### 2. Referentially Consistent Demo Dataset

ขั้นตอนต่าง ๆ ใช้ข้อมูลชุดเดียวกันและ ID ที่เชื่อมโยงกัน เช่น `evt_01JXYZ123`, `cmp_q3_deposit`, `usr_123456`, `quality_scan_2026_09_16` และ `mapping_v12` เพื่อให้การ Drill-down ข้าม Workflow รู้สึกเป็น Dataset เดียวกัน

### 3. Entity Inspector Drawer

เพิ่ม Drawer กลางสำหรับดูรายละเอียด Entity จาก Demo Scenario โดยแสดง Context, Relationships ระหว่าง Workspace/Campaign/Customer/Event, Sample Data status, Result state และปุ่มเปิดหน้าที่เกี่ยวข้อง

### 4. Event Stream Inspector

Event Stream สามารถเปิด Inspector จากแต่ละ Event ได้ โดยแสดง Raw Event Payload, Event ID, User ID, Value, Currency, Consent Status, Identity & Consent checks และ Meta Delivery result เช่น Mapping, Deduplication และ Latency

Inspector มี Tabs สำหรับ Raw Event, Normalized Event, Attribution และ Delivery เพื่อรองรับการพัฒนารายละเอียดในรอบถัดไป

### 5. Ads Manager Tabs

Ads Manager เพิ่ม Tabs สำหรับ Campaigns, Ad Sets และ Ads พร้อมจำนวนตัวอย่างของแต่ละ Entity และยังคง Read-only/Controlled Actions พร้อม Approval Guardrail เดิม

### 6. UI และ Responsive

รักษา Dark Operations Console, Workflow Sidebar ที่ยุบ/ขยายและเลื่อนได้, Entity Drawer แบบ Responsive และป้ายกำกับ Sample Data, Demo Connection และ Simulation เพื่อแยก Prototype ออกจาก Production อย่างชัดเจน

## สิ่งที่ตรวจสอบแล้ว

| รายการ | ผลลัพธ์ |
|---|---|
| TypeScript check | ผ่าน |
| Production build | ผ่าน |
| Overview Demo Scenario | ทดสอบเลือก Step และจำลองขั้นถัดไปแล้ว |
| Entity Detail Drawer | ทดสอบเปิดและปิดแล้ว |
| Event Stream Inspector | ทดสอบเปิด Purchase Event และดู Payload/Delivery แล้ว |
| Ads Manager Tabs | ทดสอบแสดง Campaigns, Ad Sets และ Ads แล้ว |
| Production Meta action | ไม่ได้ดำเนินการ |

## ขอบเขตที่ยังเป็น Prototype

ข้อมูลทั้งหมดเป็น Sample Data แบบสัมพันธ์กัน แต่ยังไม่มี Backend State จริง, Persistence, Authentication, Role Enforcement, API Retry จริง, Meta API Call, Campaign Mutation หรือ Audit Log แบบบันทึกลงฐานข้อมูล ปุ่มและ Workflow ที่เกี่ยวข้องกับ Ads เป็นการจำลองเพื่อพิสูจน์ UX และ Product Flow เท่านั้น

## งานแนะนำใน Milestone ถัดไป

ควรเพิ่ม Inspector แบบมี Tabs ที่เปลี่ยนข้อมูลได้จริงสำหรับ Campaign, Ad Set และ Ad พร้อม Campaign-to-Conversion relationship จาก First-party Data ต่อด้วย Test Events Payload Editor, Validation Result และ Simulated Meta Payload จากนั้นจึงรวม AI Recommendation, AI Drafts, Approval และ Audit Log ให้เป็น Workflow เดียวตั้งแต่ Recommendation ถึง Simulated Result

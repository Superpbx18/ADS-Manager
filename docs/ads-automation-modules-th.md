# คู่มือหมวดจัดการโฆษณาและอัตโนมัติ

เอกสารนี้อธิบายหน้าที่ของเมนูใหม่ใน Signalroom โดยทุกเมนูเป็น Prototype UI จนกว่าจะเชื่อม Meta API จริงและกำหนดสิทธิ์ของ Workspace

## หมวดจัดการโฆษณา

### Ads Manager

ศูนย์กลางดู Campaign, Ad Set และ Ad จากหลาย Ad Account ใน Workspace เดียว พร้อม Spend, Conversion, Cost per Deposit และ ROAS ระยะแรกควรเป็น Read-only และการ Pause, Resume, Duplicate หรือปรับ Budget ต้องผ่าน Approval และ Audit Log

### AI Ad Creator

ช่วยสร้าง Concept, Hook, Primary Text, Headline และ Creative Brief โดยอ้างอิง Objective, Audience, Offer, Brand Tone และ Creative ที่เคยสร้าง Deposit Success ได้ดี AI ควรสร้าง Draft เท่านั้น ไม่ควร Publish โดยอัตโนมัติ ต้องตรวจ Claim, Policy และ Brand Safety ก่อน

### AI Drafts

คิวร่างโฆษณาที่ AI สร้างไว้ แสดง Version, Prompt, Source Insight, ผู้สร้าง, Reviewer และสถานะ Draft/Needs Review/Approved/Published การ Approve และ Publish ควรแยกสิทธิ์ และควรเก็บประวัติการแก้ไขทุกครั้ง

## หมวดอัตโนมัติ

### Auto-Pause Rules

ตั้งกฎแบบ Deterministic เพื่อแจ้งเตือนหรือหยุดโฆษณาเมื่อเกิดเงื่อนไข เช่น Cost per Deposit สูงเกินเกณฑ์, API Hard Failure สูง, Token ใกล้หมดอายุ หรือ Event Match Quality ลดลง ควรเริ่มจาก Alert และ Simulation mode ก่อนเปิด Auto-pause จริง และต้องมี Cooldown, Scope, Approval และ Rollback

### ตรวจสอบอัตโนมัติ

รวม Health Checks ที่รันตามรอบ เช่น Token Health, API heartbeat, Event Schema, Deduplication, Consent, Match Quality, Data Freshness และ Attribution Coverage ผลลัพธ์ควรมี Passed/Warning/Failed, เวลา, หลักฐาน, ผู้รับผิดชอบ และการแจ้งเตือน

### รายงาน

สร้างและตั้งเวลาส่งรายงาน Campaign Performance, Meta Delivery Health, Customer Quality และ Deposit Funnel โดยต้องกำหนด Workspace, Timezone, Attribution Model, Source, Recipient และรอบส่งให้ชัดเจน ตัวเลขในรายงานต้องแยก Meta-reported กับ First-party attributed

## Approval และความปลอดภัยร่วม

การกระทำที่เปลี่ยน Campaign, Budget, Ad Status, Audience หรือ Publish Creative ต้องตรวจสิทธิ์ตาม Workspace และบันทึก Audit Log ทุกครั้ง ควรมี Role อย่างน้อย Owner, Admin, Analyst, Operator และ Viewer พร้อม Two-person approval สำหรับการแก้ Budget ระดับสูง ส่วน AI ควรเป็นผู้ช่วยเสนอหรือสร้างร่าง ไม่ใช่ผู้มีสิทธิ์ปฏิบัติการแทนทีมโดยไม่มีการควบคุม

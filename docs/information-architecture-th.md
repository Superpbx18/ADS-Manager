# Information Architecture และ Workflow ของ Signalroom

โครงสร้างใหม่แบ่งระบบตาม **เป้าหมายของงาน** ไม่ใช่ตามชื่อ Feature เพื่อให้ผู้ใช้รู้ว่าควรเริ่มที่ไหนและลดการทำงานซ้ำ

## Overview

ใช้ตอบคำถามว่า “วันนี้เกิดอะไรขึ้นและต้องจัดการอะไร” รวม KPI, Alert, Meta health และ Priority actions โดยไม่ลงรายละเอียดลึก

## Data & Events

ใช้รับและตรวจข้อมูลจากระบบที่ 1 ตั้งแต่ Event Stream, Test Events, Event Mapping, Schema, Consent, Deduplication และ Error ก่อนนำไปวิเคราะห์หรือส่ง Meta

## Customers & Audiences

ใช้เปลี่ยน Event ให้เป็น Customer Profile, Quality Score และ Segment จากนั้นส่งกลุ่มไป Meta ผ่าน Audience Sync โดยมีลำดับ Profile → Quality → Segment → Sync

## Marketing Analytics

ใช้ตอบว่า Campaign และองค์ประกอบใดสร้างผลลัพธ์ทางธุรกิจจริง ภายในประกอบด้วย Campaign Overview, Funnel, Creative, A/B Testing, Time & GEO และ Recommendations

## Ads & Activation

ใช้ลงมือทำกับ Meta หลังวิเคราะห์แล้ว เช่น ดู/จัดการ Campaign, สร้าง Creative Draft, ส่ง Conversion, ส่ง Audience และตรวจ Delivery โดยมีโหมด Read-only, Review และ Execute แยกชัดเจน

## Automation

ใช้ตั้ง Rule, ตรวจ Health, จัดการ Approval และส่ง Reports โดยทุก Automation ที่กระทบ Ads ต้องมี Simulation/Alert, Approval, Execute และ Rollback ตามลำดับ

## Workspace

ใช้จัดการ Workspace, Team & Roles, Privacy, Consent, Data Retention, Notifications และความปลอดภัย ไม่ควรปนกับหน้าวิเคราะห์หรือหน้าลงมือทำ

## Flow ที่ไม่ซ้ำกัน

```text
Data & Events
  → Customers & Audiences
  → Marketing Analytics
  → Ads & Activation
  → Automation
```

การออกแบบนี้แยก **View/Analyze** ออกจาก **Act/Execute** ลดการมี Campaign หรือ Meta Sync ซ้ำหลายที่ และทำให้ AI อยู่ในบริบทของงาน เช่น Recommendations ใน Analytics และ Creative Drafts ใน Ads & Activation

## แนวทางสำหรับการพัฒนาหน้าแต่ละเมนู

แต่ละหน้าควรมี Title และคำอธิบายเป้าหมาย, Global filters, KPI ที่สัมพันธ์กับงาน, Primary action เดียว, Data source, Last updated, Empty/Error state และ Audit/Approval state เมื่อมีการกระทำที่กระทบข้อมูลหรือโฆษณา

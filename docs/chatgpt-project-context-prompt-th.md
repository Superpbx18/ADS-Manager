# Manus AI Implementation Brief: Signalroom Interactive Operations Prototype

เอกสารนี้เป็นคำสั่งปฏิบัติงานสำหรับ Manus AI ให้พัฒนาต่อยอด Prototype ของโครงการ Signalroom โดยตรง

---

## คำสั่งหลักสำหรับ Manus AI

คุณคือ Manus AI ที่ทำหน้าที่เป็น Senior Product Architect, UX Designer, Frontend Engineer และ Martech/Meta Ads Integration Specialist ให้ลงมือวิเคราะห์ ออกแบบ พัฒนา ทดสอบ และส่งมอบระบบชื่อ **Signalroom** ซึ่งเป็นระบบกลางสำหรับเก็บ วิเคราะห์ คัดกรอง และส่งข้อมูลพฤติกรรมลูกค้ากลับเข้า Meta เพื่อเพิ่มประสิทธิภาพโฆษณา โดยต้องคิดทั้งด้าน Product, UX/UI, Data Architecture, Event Tracking, Meta Conversions API, Marketing API, Data Quality, Automation และ Governance

### 0. วิธีปฏิบัติงานของ Manus AI

ให้ทำงานแบบ Autonomous Collaborator: วิเคราะห์ Repository และ UI ปัจจุบันก่อนแก้ไข, สรุปแผนสั้น ๆ, ลงมือพัฒนาในขอบเขตที่กำหนด, ตรวจ TypeScript และ Production Build, ทดสอบ Navigation และ Interactive Workflow ด้วย Browser, แก้ Error ที่พบ, แล้วสรุปสิ่งที่ทำและขั้นตอนถัดไป ห้ามหยุดเพียงคำแนะนำหรือ Mockup หากสามารถพัฒนาใน Prototype ได้จริง

ขอบเขตของรอบนี้คือ Frontend/UI Prototype และ Sample Data เท่านั้น ห้ามเชื่อม Production API, ห้ามใช้ Token จริง, ห้ามส่งข้อมูลจริงเข้า Meta, ห้ามเปลี่ยน Campaign/Budget/Creative/Audience จริง และห้ามแก้ Backend, Database หรือ Server Logic เว้นแต่ผู้ใช้สั่งโดยตรง ทุก Action ที่เกี่ยวกับ Ads ต้องเป็น Simulation และต้องแสดงผลลัพธ์พร้อม Audit Log

ก่อนเพิ่มเมนูหรือหน้าใหม่ ให้ตรวจ Information Architecture เดิมก่อนและรวม Workflow เข้ากับเมนูที่มีอยู่ถ้าทำได้ ให้รักษา Dark Operations Console Design System, Sidebar แบบ Workflow-based, Responsive Desktop/Tablet/Mobile และ Referentially Consistent Sample Data ระหว่างหน้า

ทุก Feature ใหม่ต้องมี: เป้าหมายหน้า, Primary Workflow, Input/Analysis/Decision/Action/Result, Loading/Success/Warning/Error/Empty State, Detail Drawer หรือ Detail Page เมื่อเป็น Entity สำคัญ, ป้าย Sample Data/Demo Connection/Simulated Action และ Menu Guide ที่อธิบายการใช้งาน

เมื่อจบงานต้องรายงานไฟล์หรือหน้า UI ที่แก้, Flow ที่ทดสอบ, ผล TypeScript/Build, ข้อจำกัดของ Prototype และข้อเสนอแนะงานรอบถัดไป หากต้องเลือก ให้เลือกแนวทางที่รักษาความปลอดภัยและไม่ทำให้ผู้ใช้เข้าใจว่าเป็น Production Integration

### 1. ภาพรวมระบบ

Signalroom เป็นระบบ Customer Data Operations และ Ads Intelligence ที่อยู่ระหว่าง “ระบบที่ 1” กับ Meta โดยระบบที่ 1 คือ Sale Page/Tracking System ที่รับ Traffic จาก Facebook Ads และส่งข้อมูลพฤติกรรมจากเว็บไซต์จริงเข้ามายัง Signalroom ผ่าน REST API

ระบบนี้ยังเป็น **UI Prototype ที่ใช้ Sample Data** ไม่ใช่ระบบ Production และยังไม่ได้เชื่อม Meta API จริง การแสดงผลต่าง ๆ เช่น จำนวน Event, Token, Campaign, ROAS, Match Quality, Delivery Status และ Error เป็นข้อมูลจำลองเพื่อสาธิต Flow และประสบการณ์ใช้งาน

### 2. Business Flow ตั้งแต่ต้นทางถึง Meta

Flow ที่ต้องรองรับมีดังนี้

1. ลูกค้าเห็นโฆษณาบน Facebook/Instagram
2. ลูกค้าคลิกโฆษณา
3. ลูกค้าเข้าสู่ Sale Page ที่สร้างโดยระบบที่ 1
4. ลูกค้าคลิกเข้าสู่เว็บไซต์จริง
5. เว็บไซต์จริงเก็บพฤติกรรมลูกค้า เช่น สมัครสมาชิกสำเร็จ, เลือกช่องทางฝากเงิน, ฝากเงิน Pending และฝากเงิน Success
6. เมื่อฝากเงินสำเร็จ ระบบที่ 1 ต้องส่ง Event และข้อมูลที่จำเป็นมายัง Signalroom ผ่าน REST API
7. Signalroom รับ Event, ตรวจ Schema, Consent, Identity, Deduplication, Freshness และ Data Quality
8. Signalroom แปลง Event ผ่าน Event Mapping ให้เป็น Meta Event ที่เหมาะสม
9. Signalroom ส่งข้อมูลไป Meta ผ่าน Conversions API หรือปลายทางอื่นที่เกี่ยวข้อง
10. Signalroom เก็บ API Response, Error, Retry, Delivery Log และผลการส่ง
11. Signalroom นำข้อมูล Event, Customer, Campaign และ Conversion มาวิเคราะห์
12. ระบบแนะนำกลุ่มลูกค้า, Campaign, Creative, ช่วงเวลา และพื้นที่ที่มีประสิทธิภาพ
13. การกระทำที่มีผลต่อ Ads ต้องอยู่ภายใต้สิทธิ์, Approval และ Audit Log

### 3. Event สำคัญที่ควรสนับสนุน

Event จากระบบที่ 1 ควรรองรับอย่างน้อย:

- page_view
- ad_click
- landing_view
- site_visit
- registration_started
- registration_completed
- deposit_method_selected
- deposit_pending
- deposit_success
- purchase หรือ conversion ที่มีมูลค่าจริง
- repeat_deposit
- customer_qualified

Event ที่สำคัญต่อการ Optimize Ads คือ `registration_completed`, `deposit_success`, `repeat_deposit` และ `purchase` เพราะสะท้อน Conversion ที่มีคุณค่าจริงมากกว่า Page View หรือ Click

### 4. ข้อมูลที่ Event ควรส่งเข้าระบบกลาง

ทุก Event ควรมีข้อมูลหลักต่อไปนี้เท่าที่มีและได้รับ Consent อย่างถูกต้อง:

- event_id: ID ไม่ซ้ำ ใช้ Deduplication
- event_name: ชื่อ Event จากระบบต้นทาง
- event_time: เวลาที่เกิด Event
- source_system: ระบบต้นทาง
- source_url หรือ page_url
- user_id หรือ external_id ที่ไม่เปิดเผยข้อมูลเกินจำเป็น
- phone: เบอร์โทรศัพท์ โดยระบบกลางควร Normalize และ Hash ก่อนส่ง Meta
- fbp และ fbc ถ้ามี
- client_ip_address และ client_user_agent ตามข้อกำหนดและ Consent
- action_source: website หรือ source ที่เหมาะสม
- event_source_url
- transaction_id สำหรับฝากเงินหรือ Purchase
- deposit_status: pending หรือ success
- value และ currency
- consent_status และ consent_timestamp
- campaign_id, adset_id, ad_id ถ้ามี
- utm_source, utm_medium, utm_campaign, utm_content, utm_term
- metadata ที่ไม่เป็นข้อมูลอ่อนไหวเกินจำเป็น

ห้ามส่งข้อมูลที่ไม่จำเป็น, ข้อมูลบัตร, รหัสผ่าน หรือข้อมูลส่วนบุคคลที่ไม่ผ่าน Consent ไปยัง Meta

### 5. แนวคิด Data Quality

Data Quality คือ Quality Gate ก่อนส่ง Event ไป Meta โดยต้องแยกผลเป็น Passed, Warning และ Blocked

Rules หลัก:

- Schema & Required Fields: event_name, event_id, timestamp, value, currency
- Privacy & Consent: ตรวจ Marketing Consent และการจัดการเบอร์โทรศัพท์
- Identity & Match: ตรวจ phone, external_id, fbp, fbc
- Deduplication: ป้องกัน Event ซ้ำระหว่าง Pixel และ CAPI ด้วย event_id
- Freshness & Latency: ตรวจระยะเวลาจาก Website ถึงระบบกลาง
- Mapping Readiness: ตรวจว่ามี Meta Event ที่พร้อมใช้งาน
- Transaction Integrity: ฝากเงินสำเร็จควรมี transaction_id
- Currency/Value Integrity: ตรวจ value และ currency ให้ถูกต้อง

ตัวอย่าง Issue:

- Missing transaction_id
- Low fbc/fbp coverage
- Unknown custom field
- Invalid event timestamp
- Missing consent
- Duplicate event_id
- Unmapped source event

ไม่ควรแก้ปัญหาด้วยการ Retry ซ้ำอย่างเดียว ต้องแก้ที่ระบบต้นทางหรือ Mapping และเก็บเหตุผลสำหรับ Audit

### 6. แนวคิด Event Mapping

Event Mapping เป็น Registry ที่กำหนดความสัมพันธ์ระหว่าง Event จากระบบที่ 1 กับ Meta Event

Flow:

```text
Source Event
→ Normalize
→ Validate Consent & Required Fields
→ Meta Event
→ Deduplicate
→ Queue / Retry
→ Meta API Delivery
```

ตัวอย่าง Mapping:

```text
deposit_success
→ Normalize: value, currency, transaction_id, phone, consent
→ Meta Purchase
```

Mapping แต่ละรายการควรมี:

- Source event name
- Meta event name
- Required fields
- Optional fields
- Transform rules
- Consent rule
- Deduplication key
- Validation rules
- Version
- Owner
- Reviewer
- Status: Draft, Review, Ready, Deprecated
- Last test result

ไม่ควรแก้ Mapping ที่ใช้งานอยู่โดยทับ Version เดิม ควรสร้าง Version ใหม่และมี Rollback ได้

### 7. โครงสร้าง UI Prototype ปัจจุบัน

ระบบใช้รูปแบบ Dark Operations Console ชื่อ Signalroom โดยมี Sidebar แบบ Workflow-based Information Architecture, ยุบ/ขยายได้ และมี Scroll แยกจากพื้นที่ Dashboard

Sidebar มี 7 หมวดหลัก:

#### 7.1 ภาพรวม

- ภาพรวม: Control Room สำหรับดูสถานะระบบรวม

#### 7.2 Data & Events

- Event Stream: ดู Event ที่ไหลเข้าระบบแบบ Live
- Data Quality: ตรวจคุณภาพ Event, Quality Score, Passed/Warning/Blocked และ Issue
- Event Mapping: จัดการ Source Event → Meta Event, Version, Required Fields และ Test Result
- Test Events: ตรวจ Payload และ Debug ก่อนส่งจริง

#### 7.3 Customers & Audiences

- Segments: สร้างกลุ่มลูกค้า เช่น High-value customers, Repeat buyers, Qualified leads และ At-risk customers
- Audience Insights: วิเคราะห์คุณภาพและพฤติกรรมของลูกค้าแต่ละกลุ่ม
- คัดกรองลูกค้า: ให้คะแนนและคัดกลุ่มลูกค้าตามมูลค่า, จำนวนครั้งฝาก, ยอดฝาก และคุณภาพข้อมูล

#### 7.4 Marketing Analytics

- Campaigns: ดู Campaign Overview และผลจากหลาย Ad Account
- Sale Funnel: วิเคราะห์ Funnel ตั้งแต่ Ad Click ถึง Registration, Deposit และ Purchase
- Creative Performance: วิเคราะห์ประสิทธิภาพของ Creative/Ad Asset
- A/B Testing: จัดการการทดลองและเปรียบเทียบผลลัพธ์
- Dayparting: วิเคราะห์ช่วงเวลาที่มี Conversion หรือ ROAS ดี
- GEO จังหวัด: วิเคราะห์ผลลัพธ์แยกตามจังหวัด
- AI แนะนำ: รวม Recommendation และ Next Best Action

#### 7.5 Ads & Activation

- Ads manager: ดู Campaign, Ad Set, Ad, Spend, Conversion และ ROAS จากหลายบัญชี โดยเริ่มจาก Read-only
- AI Ad Creator: สร้างแนวคิดโฆษณาและ Creative Concept
- AI Drafts: ทบทวน Draft ก่อน Publish
- Meta Sync: ดู Conversions API Delivery, Token, Match Quality, Retry และ API Log
- Integrations: Setup Center สำหรับเชื่อม Business Manager, Ad Account, Dataset/Pixel, System User Token, CAPI และ Audience destinations

#### 7.6 Automation

- Auto-Pause Rules: ตั้งกฎหยุดโฆษณาเมื่อ CPA สูง, ROAS ต่ำ หรือ Conversion ไม่ดี
- ตรวจสอบอัตโนมัติ: ตั้ง Health Check, Token Check, Delivery Check และ Data Quality Check
- รายงาน: ตั้ง Scheduled Report และ Notification

#### 7.7 Workspace

- รองรับหลาย Workspace โดยหนึ่ง Workspace ควรแทนหนึ่งธุรกิจ/แบรนด์
- แต่ละ Workspace แยก Ad Account, Dataset/Pixel, Token, Event, Segment, Campaign และ Permission
- ผู้ใช้หนึ่งคนสามารถเป็นสมาชิกหลาย Workspace ตาม Role

### 8. หน้า Meta Sync ที่มีอยู่

หน้า Meta API Delivery Dashboard แสดง:

- API Health และ Last Successful Delivery
- System User Token และวันหมดอายุ
- Token Warning เมื่อใกล้หมดอายุ
- Events Received
- Delivered to Meta
- Retry Queue
- Event Match Quality
- Delivery Funnel: Received → Validated → Queued → Delivered
- Delivery Performance: Success Rate, Latency, Hard Failure Rate
- API Destinations: CAPI, Customer File Audience, Exclusion Audiences
- Delivery Log
- Top Error Reasons เช่น 422, 429, Low Match Identifiers
- Data Quality Guardrails เช่น Deduplication, Consent และ Phone Hashing

### 9. Meta Integration ที่ระบบควรรองรับในอนาคต

ระบบควรมี Integration Setup Wizard สำหรับ:

1. Meta Business Manager
2. Meta App
3. System User
4. Access Token
5. Ad Account
6. Dataset หรือ Pixel
7. Conversions API
8. Events Manager Test Events
9. Customer File Custom Audiences
10. Exclusion Audiences
11. Campaign/Ad Set/Ad Read Access
12. Marketing API Insights
13. Token Health และ Expiry Monitoring
14. Audit Log และ Permission Review

การเชื่อม Campaign และการแก้ไข Ads ควรเริ่มจาก Read-only ก่อน การ Pause, Resume, เปลี่ยน Budget หรือ Publish Creative ต้องมี Approval และ Audit Log ทุกครั้ง

### 10. Multi-workspace และ Security

ต้องออกแบบแบบ Multi-tenant โดยมีหลักการ:

- ทุกข้อมูลต้องมี workspace_id
- ห้ามข้อมูลข้าม Workspace โดยไม่มีสิทธิ์
- แยก Token และ Credentials ต่อ Workspace
- รองรับ Role เช่น Owner, Admin, Analyst, Operator, Viewer
- เก็บ Secret แบบเข้ารหัส
- Mask ข้อมูลโทรศัพท์และ User ID ใน UI
- ใช้ Least Privilege สำหรับ Meta Permission
- มี Audit Log สำหรับการแก้ Mapping, Token, Campaign และ Automation
- มี Consent, Retention และ Deletion Policy

### 11. แนวคิด AI และ Automation

AI ควรใช้เพื่อช่วยวิเคราะห์และแนะนำ ไม่ควรเปลี่ยน Ads โดยไม่มี Guardrail

ตัวอย่างคำแนะนำ:

- Campaign ที่ Cost per Deposit ต่ำกว่าค่าเฉลี่ย
- กลุ่มลูกค้าที่มี Deposit สูงหรือฝากซ้ำ
- Creative ที่มี Conversion สูงแต่ Spend ยังต่ำ
- ช่วงเวลาหรือจังหวัดที่มีคุณภาพลูกค้าดี
- Event ที่มี Match Quality ต่ำ
- Mapping หรือ Data Quality Rule ที่ควรแก้

Automation ควรมี:

- Dry Run
- Threshold
- Cooldown
- Maximum daily actions
- Approval mode
- Rollback
- Audit Log
- Notification เมื่อ Rule ถูก Trigger

### 12. เป้าหมาย Product

เป้าหมายสูงสุดของ Signalroom คือทำให้ทีม Marketing และทีม Data สามารถ:

1. เห็นพฤติกรรมลูกค้าจริงจากเว็บไซต์
2. ตรวจสอบและแก้คุณภาพข้อมูลก่อนส่งออก
3. ส่ง Conversion ที่มีคุณค่าจริงกลับไปยัง Meta
4. สร้าง Audience จากลูกค้าคุณภาพสูง
5. วิเคราะห์ Campaign, Funnel, Creative, Time และ GEO จากหลายบัญชี
6. ใช้ AI ช่วยหา Insight และ Next Best Action
7. ตั้ง Automation ที่ปลอดภัยและตรวจสอบย้อนหลังได้
8. ทำงานหลายธุรกิจ/หลายบัญชีผ่าน Workspace เดียว
9. เริ่มจาก Read-only และค่อยเพิ่ม Controlled Actions เมื่อมี Permission และ Approval

### 13. ข้อกำหนดเมื่อต้องออกแบบหรือพัฒนาต่อ

เมื่อได้รับคำสั่งให้พัฒนาระบบนี้ต่อ ให้ทำตามหลักการดังนี้:

- อธิบายก่อนว่า Feature นั้นแก้ปัญหาอะไรและอยู่ในหมวดใด
- รักษาโครงสร้าง Sidebar แบบ Workflow-based ไม่เพิ่มเมนูใหม่โดยไม่วิเคราะห์ว่ารวมกับเมนูเดิมได้หรือไม่
- ทุกหน้าต้องมี Page Goal, KPI, Main Workflow, Empty/Error State และ Menu Guide
- ระบุชัดเจนว่าอะไรเป็น Prototype/Sample Data และอะไรคือการเชื่อมจริง
- ใช้ข้อมูลภาษาไทยใน UI แต่คงชื่อ Technical Field และ Meta API ที่จำเป็นเป็นภาษาอังกฤษ
- ออกแบบ Responsive สำหรับ Desktop, Tablet และ Mobile
- ให้ Sidebar อ่านง่าย มี Scroll และพื้นที่กดเพียงพอ
- ทุก Action ที่มีผลต่อ Ads ต้องมี Approval, Permission และ Audit Log
- ไม่สร้าง Backend หรือเชื่อม API จริงโดยอัตโนมัติ หากยังไม่ได้กำหนด Security, Token, Permission และ Data Contract
- ถ้าต้องเพิ่ม Data Contract ให้ระบุ Request, Response, Validation, Error และ Idempotency
- ถ้าต้องเพิ่ม Meta Integration ให้ระบุ Meta Object, Permission, Token Lifetime, Rate Limit, Retry และ Error Handling
- ก่อนจบงานต้องตรวจ TypeScript, Production Build, Responsive Layout และ Navigation ของ Prototype

### 14. รูปแบบการทำงานและรายงานผลที่ต้องการจาก Manus AI

ก่อนลงมือ ให้สรุปแผนตามโครงสร้างด้านล่างอย่างกระชับ จากนั้นพัฒนาและทดสอบจริง เมื่อจบงานให้รายงานผลตามโครงสร้างเดียวกัน:

1. เข้าใจเป้าหมายและปัญหา
2. วิเคราะห์ว่าควรอยู่ใน Workflow หรือเมนูใด
3. สรุป User Flow
4. ระบุข้อมูลและ State ที่ต้องใช้
5. ออกแบบ UI Sections และ Components
6. ระบุ API/Data Contract ถ้าเกี่ยวข้อง
7. ระบุ Security, Consent และ Permission
8. ระบุ Prototype Scope กับ Production Scope
9. เสนอ Acceptance Criteria และ Test Cases
10. สรุปขั้นตอนพัฒนาที่เหมาะสม

หากข้อมูลไม่พอ ให้ตั้งสมมติฐานที่ปลอดภัยและระบุไว้ชัดเจน แต่อย่าออกแบบให้ระบบยิง Ads, เปลี่ยน Budget หรือส่งข้อมูลส่วนบุคคลจริงโดยไม่มีการยืนยันสิทธิ์และ Approval

---

## สรุปสั้นสำหรับเริ่ม Task ใหม่ใน Manus AI

Signalroom คือระบบ Customer Data Operations และ Ads Intelligence ที่รับ Event จากระบบ Sale Page/Website จริงผ่าน REST API ตรวจ Data Quality แปลง Event ด้วย Mapping แล้วส่ง Conversion คุณภาพกลับ Meta ผ่าน CAPI จากนั้นวิเคราะห์ Customer, Audience, Funnel, Campaign, Creative, Time และ GEO พร้อม AI Recommendation และ Automation แบบมี Guardrail ระบบปัจจุบันเป็น Dark Dashboard Prototype มี Sidebar แบบ Workflow-based และ Multi-workspace โดยยังใช้ Sample Data และยังไม่เชื่อม Meta API จริง ต้องการพัฒนาต่อแบบ Product ที่ปลอดภัย ตรวจสอบได้ รองรับ Approval, Permission, Audit Log, Consent และ Versioning

---

## ตัวอย่างคำสั่ง Task สำหรับสั่ง Manus AI ต่อ

> จาก Implementation Brief ของ Signalroom ด้านบน ให้พัฒนาหน้า [ชื่อฟีเจอร์] โดยระบุเป้าหมาย, User Flow, UI Sections, Data Model, States, API Contract, Permission, Error Handling, Acceptance Criteria และแยก Prototype Scope กับ Production Scope ให้ชัดเจน

> จาก Implementation Brief ของ Signalroom ให้ปรับ Information Architecture และพัฒนาว่าเมนู [ชื่อเมนู] ควรรวมกับเมนูเดิมหรือควรเป็นหน้าใหม่ พร้อมเสนอ Information Architecture ที่ไม่ซ้ำ Flow และอธิบายเหตุผลด้าน UX

> จาก Implementation Brief ของ Signalroom ให้จัดทำ Data Contract และ Prototype API Specification สำหรับ [ชื่อ Event] พร้อม Request/Response, Validation, Idempotency, Error Code, Retry Policy, Consent และตัวอย่าง Payload ภาษาไทย/อังกฤษ

> จาก Implementation Brief ของ Signalroom ให้พัฒนา Meta Integration Wizard แบบ Demo Connection สำหรับ [CAPI / Ads Insights / Custom Audience] พร้อมขั้นตอนในระบบเรา, ขั้นตอนใน Meta Business Manager, Permission, Token Health, Test Event และ Approval Flow

---

เอกสารนี้อธิบายระบบในระดับ Product และ UI Prototype ไม่ใช่เอกสารรับรองทางกฎหมายหรือคำแนะนำด้าน Compliance ผู้พัฒนาต้องตรวจข้อกำหนดล่าสุดของ Meta, PDPA และนโยบายของธุรกิจก่อนเชื่อมข้อมูลจริง


## 15. สเปกงานต่อยอดที่ Manus AI ต้องพัฒนา: Interactive Operations Prototype

รอบพัฒนาถัดไปต้องยกระดับจาก Dashboard Prototype ที่เน้นการแสดงผล ไปเป็น **Interactive Operations Prototype** ที่สาธิต Workflow และผลลัพธ์ได้จริงด้วย Sample Data โดยยังไม่เชื่อม Production API และไม่ดำเนินการจริงกับ Meta

เป้าหมายของทุกหน้าคือให้ผู้ใช้เห็นเส้นทาง **Input → Analysis → Decision → Action → Result** และ Drill-down ข้ามข้อมูลที่เกี่ยวข้องได้ ไม่ควรสร้างหน้าแบบ KPI Cards, Charts และ Tables ที่ไม่มี Interaction ทุกหน้าต้องมี Primary Workflow ที่ทดลองกดได้ ทุก Entity สำคัญ เช่น Event, Customer, Segment, Campaign, Ad Set, Ad, Creative, Recommendation และ Error ต้องเปิด Detail Drawer หรือ Detail Page ได้ พร้อม Context และ Relationship กับ Entity อื่น

ทุก Action ต้องมี Loading, Success, Warning, Error และ Empty State ส่วน Action ที่เกี่ยวข้องกับ Ads ต้องเป็น Simulation เท่านั้น การ Pause, Resume, เปลี่ยน Budget, Publish, Audience Activation และ Automation ต้องผ่าน Draft, Review และ Approval ก่อน เมื่อ Simulate สำเร็จต้องแสดง Result และสร้าง Audit Log ต้องติดป้าย Sample Data, Demo Connection หรือ Simulated Action ให้เห็นในตำแหน่งเหมาะสมเสมอ รักษา Dark Operations Console, Sidebar เดิม, Responsive Desktop/Tablet/Mobile และไม่เพิ่ม Sidebar Menu ใหม่หากรวม Workflow ในเมนูที่มีอยู่ได้

### Global Entity Relationship และ Referential Consistency

ข้อมูลใน Prototype ต้องใช้ Sample Dataset ร่วมกัน ไม่สุ่มแยกกันในแต่ละหน้า โดยใช้ ID ที่สัมพันธ์กันตลอดระบบ เช่น Workspace ID, Ad Account ID, Campaign ID, Ad Set ID, Ad ID, Creative ID, Customer ID และ Event ID

```text
Workspace → Ad Account → Campaign → Ad Set → Ad → Creative
Customer → Event → Segment → Audience
Website Event → Data Quality → Event Mapping → Meta Delivery
Conversion → Customer → Campaign → Ad Set → Ad → Creative → Audience → GEO → Time
```

ผู้ใช้ต้องสามารถ Drill-down จาก Entity หนึ่งไปยัง Entity ที่เกี่ยวข้องและรู้สึกว่าเป็น Dataset เดียวกันจริง

### Workflow ที่ต้องเพิ่มในหน้าหลัก

**Ads Manager** ต้องมี Tabs: Campaigns, Ad Sets และ Ads โดย Campaign แสดง Status, Name, Objective, Budget, Spend, Results, Cost per Result, Registration, Deposit, Revenue, ROAS และ Customer Quality; Ad Set แสดง Campaign, Audience, Optimization, Budget, Schedule, Placement, Attribution, Spend, Conversion, CPA และ ROAS; Ad แสดง Creative Preview, Ad Set, Spend, Impressions, CTR, CPC, Conversion, CPA, Revenue และ ROAS เมื่อคลิกต้องเปิด Inspector Drawer ที่มี Overview, Performance, Funnel, Audience, Creative, Events และ Change History และต้องเชื่อม Meta Metrics กับ First-party Website/Customer Conversion Data เพื่อเปรียบเทียบกันได้

**Event Stream** ต้องเปิดรายละเอียด Event เป็น Raw Event, Normalized Event, Customer Identity, Attribution, Transaction, Consent, Data Quality, Mapping และ Meta Delivery

**Data Quality** ต้อง Drill-down Issue ไปยัง Affected Events, Example Payload, Probable Cause, Recommended Fix, Owner และ Resolution Status

**Event Mapping** ต้องมี Versioning Workflow: Draft → Test → Review → Ready → Deprecated และห้ามแก้ Version ที่ Active โดยตรง

**Test Events** ต้องมี Payload Editor, Validation Result, Normalized Event, Simulated Meta Payload และ Simulated Test Result

**Segments** ต้องมี Segment Builder ที่รองรับ Conditions, Estimated Customers, Matchable Customers, Consent Eligible และ Destination Preview

**Audience Insights** ต้องเชื่อม Audience กับ Campaign Performance, Deposit Quality, Repeat Rate, CPA และ ROAS ส่วน Customer Filtering ต้องแสดง Customer Score Breakdown และ Customer Journey

**Sale Funnel** ต้อง Drill-down แต่ละ Funnel Stage ตาม Campaign, Ad Set, Creative, Audience, Device, GEO และ Time

**Creative Performance** ต้องใช้ Creative Gallery พร้อม Preview และ Detail Page ที่แสดง Campaign Usage, Audience Performance, GEO Performance และ Time Performance

**A/B Testing** ต้องแสดง Control, Variant, Experiment Progress และ Performance Metrics ด้วย Sample Data

**Dayparting** ต้องใช้ Interactive Heatmap และ **GEO** ต้องมี Interactive Geographic Visualization พร้อม Ranking Table

### AI, Draft และ Automation Workflow

ทุก AI Recommendation ต้องมี Observation, Evidence, Impact, Suggested Action และ Risk พร้อมปุ่ม View Evidence, Create Draft และ Dismiss โดย Create Draft ต้องส่งข้อมูลต่อไปยัง AI Drafts

AI Drafts ต้องมี Workflow: Draft → Review → Approval → Simulated Execution → Result

Auto-Pause Rules ต้องมี Rule Builder สำหรับ Conditions, Threshold, Evaluation Window, Dry Run, Approval, Cooldown, Maximum Daily Actions, Preview Affected Ads และ Simulation Result

Automated Checks ต้องแสดง Health Check Timeline และเปิดรายละเอียดของแต่ละ Check ได้ Reports ต้องมี Report Builder และ Report Preview

### Meta Integration และ Workspace Operations

Meta Sync ต้อง Trace Event ตามเส้นทาง Website → Signalroom → Validation → Mapping → Queue → Meta → Response พร้อม Latency และ Error Detail

Integrations ต้องมี Setup Wizard ตามลำดับ Business Manager → Ad Account → Dataset/Pixel → System User → Token → CAPI → Test Event → Connection Health โดยทั้งหมดเป็น Demo Connection

Workspace ต้องมี Workspace Switcher และหน้าสำหรับ Members, Ad Accounts, Dataset, Connections, Permissions และ Audit Log

### End-to-End Demo Scenario

ต้องมี Demo Scenario อย่างน้อยหนึ่งชุดที่ผู้ใช้ทดลองตั้งแต่ต้นจนจบ:

```text
Ad Traffic
→ Event Received
→ Data Quality
→ Event Mapping
→ Meta Delivery
→ Customer Segment
→ Audience Insight
→ Campaign Analysis
→ Funnel Analysis
→ Creative Analysis
→ AI Recommendation
→ Create Draft
→ Approval
→ Simulated Ads Action
→ Result
→ Audit Log
```

เป้าหมายของรอบนี้ไม่ใช่ความสมบูรณ์ของ Production Backend แต่คือการพิสูจน์ Product Workflow, UX, Information Architecture และ End-to-End User Journey ให้ผู้ใช้ทดลองระบบได้เหมือน Product จริง โดยใช้ Referentially Consistent Sample Data และแยก Prototype, Demo Connection และ Simulated Action ให้ชัดเจน

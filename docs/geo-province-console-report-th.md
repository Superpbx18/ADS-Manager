# Report Milestone: GEO Province Interactive Console

## สรุป

พัฒนาเมนู **GEO จังหวัด** ภายใต้ Marketing Analytics เดิมให้เป็น Interactive Prototype สไตล์ Dark Operations Console สำหรับวิเคราะห์ผลลัพธ์โฆษณาแยกตามจังหวัด โดยใช้ Sample Data, Demo Analytics และ Simulation เท่านั้น ไม่มีการเชื่อม Production API หรือดึงข้อมูลจริง

## สิ่งที่พัฒนาแล้ว

### Province Map และ Metric Switcher

เพิ่ม Province Map แบบ Choropleth-style ที่แสดง 9 จังหวัดตัวอย่างด้วยสีตามระดับ Metric พร้อม Hover Tooltip และ Click Selection โดยไม่เพิ่ม Sidebar Menu ใหม่

Metric ที่รองรับ:

- Spend
- CTR
- CPA
- CPM
- Registrations
- Deposit Success
- Revenue
- ROAS
- Customer Quality

เมื่อเปลี่ยน Metric ค่าใน Province Map และ Province Ranking จะเปลี่ยนตาม Metric ที่เลือก

### Province Drill-down Panel

Panel จังหวัดแสดงข้อมูลของจังหวัดที่เลือก ได้แก่ Province Name, Region, Spend, Revenue, ROAS, Deposit Success, CTR, CPA, Frequency และ Opportunity Score พร้อม Trend 7 วัน

Tabs ใน Panel:

- Campaigns
- Creatives
- Audience
- Funnel
- Events
- AI Insight

แต่ละ Tab แสดงข้อมูล Related Entity ที่ใช้ ID สัมพันธ์กับ Demo Dataset เดิม เช่น `cmp_q3_deposit`, `adset_high_value_01`, `ad_video_03`, `evt_01JXYZ123` และ `usr_123456`

### Province Ranking

เพิ่ม Ranking Table ที่เรียงข้อมูลตาม Metric ปัจจุบันและแสดง Rank, Province, Region, Metric Value และ Opportunity Score การกด Row จะเปลี่ยน Province Drill-down ที่เลือก

### Compare Provinces

เพิ่ม Compare Provinces Mode เพื่อเปรียบเทียบ 2 จังหวัดแบบ Side-by-side ได้แก่ ROAS, CTR, CPA, Deposit Success และ Opportunity Score พร้อม Guard ไม่ให้เลือกจังหวัดเดียวกันทั้งสองฝั่ง

### AI Insight

เพิ่ม AI Insight Card ที่สรุปจังหวัดที่มี Opportunity สูงกว่าค่าเฉลี่ย, ความสัมพันธ์ระหว่าง CTR กับ Deposit และคำแนะนำเชิง Simulation เช่น ตรวจ Audience และช่วงเวลา 20:00–23:00 ก่อนเพิ่มงบ

### Responsive และ Data Guardrails

เพิ่ม Responsive Layout สำหรับ Desktop, Tablet และ Mobile โดยเปลี่ยนจากสองคอลัมน์เป็นหนึ่งคอลัมน์ในจอแคบ พร้อมป้าย `SAMPLE DATA`, `DEMO ANALYTICS · SIMULATION` และ `NO PRODUCTION API` รวมถึงข้อความ Aggregated Data และ Minimum Threshold

## Flow ที่ทดสอบแล้ว

| Flow | ผลลัพธ์ |
|---|---|
| เปิด GEO จังหวัดจาก Marketing Analytics เดิม | ผ่าน |
| เปลี่ยน ROAS → Spend | Map และ Ranking เปลี่ยนตาม Metric |
| Hover จังหวัดชลบุรี | Tooltip แสดงชื่อจังหวัดและ Metric |
| Click จังหวัดชลบุรี | Province Drill-down เปลี่ยนเป็นชลบุรี |
| เปิด Campaigns Tab | แสดง Campaign IDs และ ROAS |
| เปิด Creatives / Audience / Funnel / Events | แสดง Related Data ตาม Tab |
| เปิด AI Insight | แสดง Insight ที่สัมพันธ์กับจังหวัดที่เลือก |
| Compare Provinces | แสดง Side-by-side Comparison |
| เลือกจังหวัดซ้ำใน Compare | Guard เลือกอีกจังหวัดให้อัตโนมัติ |
| Province Ranking Row Click | เปลี่ยน Province Drill-down |
| TypeScript check | ผ่าน |
| Production build | ผ่าน |
| Production API / Meta request | ไม่มีการส่ง |

## ส่วนที่ยังเป็น Prototype

Map ในรอบนี้เป็น Choropleth-style Interactive Visualization ที่สร้างจาก Demo Province Cells ไม่ใช่ GeoJSON boundary ของประเทศไทยจริง ข้อมูล Campaign, Creative, Audience, Funnel และ Event เป็น Referentially Consistent Demo Dataset และ State ยังอยู่ใน Frontend ไม่มี Backend Query, Database, Geo Aggregation Pipeline, Real Meta Insights หรือ Production Attribution

## ข้อเสนอแนะรอบถัดไป

1. เพิ่ม GeoJSON Boundary จริงของจังหวัดไทยพร้อม Projection, Zoom และ Map Legend ที่คำนวณจากข้อมูลจริง
2. สร้าง Province → Campaign/Creative/Event Inspector เชื่อมกับ Shared Inspector โดยตรง แทนการแสดง Related List ใน Panel
3. เพิ่ม Date Range, Ad Account, Campaign และ Minimum Threshold Filters พร้อม Empty, Loading, Warning, Error และ No Data State จริง
4. ต่อ AI Insight Evidence Drawer ให้แสดง Metric Source, Formula, Sample Size และ Confidence ก่อนสร้าง Recommendation Draft

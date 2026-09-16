# คู่มือหมวดวิเคราะห์ (Analysis Modules)

เอกสารนี้อธิบายหน้าที่ของเมนูวิเคราะห์ใน Signalroom Marketing Intelligence ซึ่งใช้ข้อมูลจาก First-party Events, Meta Ads Insights, Customer Profile และ Conversion Attribution ของ Workspace ปัจจุบัน

## AI แนะนำ

**หน้าที่:** สรุปสัญญาณสำคัญและเสนอ Action ถัดไป เช่น Campaign ที่ควรเพิ่มงบ, Campaign ที่ควรตรวจสอบ, Segment ที่ควรสร้าง หรือ Event ที่มี Match Quality ต่ำ

**ข้อมูลหลัก:** Spend, Cost per Deposit Success, Deposit Value, Repeat Rate, Quality Score, Delivery และ Trend

**ผลลัพธ์:** คำแนะนำพร้อมเหตุผล, ขนาดผลกระทบที่คาดการณ์, ระดับความมั่นใจ และปุ่มให้ผู้ใช้ตรวจสอบ/อนุมัติ

**หลักการควบคุม:** ระยะแรกเป็นคำแนะนำเท่านั้น ห้ามเปลี่ยน Budget หรือสถานะ Campaign อัตโนมัติโดยไม่มี Approval และ Audit Log

## A/B Testing

**หน้าที่:** ออกแบบและติดตามการทดลองเปรียบเทียบ Campaign, Ad Set, Creative, Audience หรือ Landing Page

**ข้อมูลหลัก:** Hypothesis, Control/Variant, Sample Size, Primary Metric, Deposit Success Rate, Cost per Deposit และ Confidence

**ผลลัพธ์:** ระบุ Variant ที่ทำผลงานดีกว่า พร้อมบอกว่าข้อมูลเพียงพอหรือยัง และแยกผลเชิงธุรกิจออกจาก CTR เพียงอย่างเดียว

**หลักการควบคุม:** กำหนดช่วงเวลาทดสอบและเกณฑ์หยุดล่วงหน้า ไม่สรุปผู้ชนะจากข้อมูลระยะสั้นหรือกลุ่มตัวอย่างเล็กเกินไป

## Sale Funnel

**หน้าที่:** แสดงเส้นทางตั้งแต่โฆษณาและ Sale Page ไปจนถึง Registration, Deposit Pending, Deposit Success และ Repeat Deposit

**ข้อมูลหลัก:** Event sequence, Conversion rate, Drop-off, Time-to-convert และมูลค่าฝากในแต่ละขั้น

**ผลลัพธ์:** ระบุจุดที่ผู้ใช้หลุดสูงสุดของแต่ละ Campaign และช่วยให้ทีมแก้ Landing Page หรือขั้นตอนฝากเงินได้ตรงจุด

**หลักการควบคุม:** แยก Deposit Pending ออกจาก Deposit Success เสมอ และใช้ Event ID/Transaction ID เพื่อป้องกันการนับซ้ำ

## Audience Insights

**หน้าที่:** วิเคราะห์โครงสร้างและคุณค่าของกลุ่มลูกค้า เช่น New, Repeat, High-value, At-risk และ Registered-but-never-deposited

**ข้อมูลหลัก:** Recency, Frequency, Monetary Value, จำนวนครั้งฝาก, ยอดฝากสะสม, LTV และ Consent

**ผลลัพธ์:** กลุ่มลูกค้าที่ควร Retarget, Exclude หรือส่งไปสร้าง Custom/Lookalike Audience

**หลักการควบคุม:** ใช้ข้อมูลแบบ Aggregated ในหน้า Insight และส่ง Audience เฉพาะโปรไฟล์ที่มีสิทธิ์และ Marketing Consent ตามนโยบาย

## คัดกรองลูกค้า

**หน้าที่:** ให้คะแนนและจัดกลุ่มคุณภาพลูกค้าตามกติกาธุรกิจที่ตรวจสอบได้

**ข้อมูลหลัก:** Deposit Success, จำนวนครั้งฝาก, ยอดฝากสะสม, Recency, Refund/Chargeback status และ Consent

**ผลลัพธ์:** Quality tier, Qualified Customer list, High-value segment และ Exclusion candidates

**หลักการควบคุม:** แสดงเหตุผลของคะแนนทุกครั้ง หลีกเลี่ยงการตัดสินใจจาก AI เพียงอย่างเดียว และมีการตรวจสอบ Bias/Privacy สำหรับเกณฑ์คัดกรอง

## Creative Performance

**หน้าที่:** เปรียบเทียบประสิทธิภาพของภาพ, วิดีโอ, Copy, Hook และ Creative ID ในมุม Conversion จริง

**ข้อมูลหลัก:** Impressions, CTR, CPM, Landing Page View, Registration, Deposit Success, Cost per Deposit และ Deposit Value

**ผลลัพธ์:** Creative ที่สร้าง Click สูง, Creative ที่สร้างลูกค้าคุณภาพสูง และความแตกต่างระหว่าง Click performance กับ Business outcome

**หลักการควบคุม:** เชื่อมข้อมูลด้วย Ad ID/Creative ID และกำหนด Minimum Delivery ก่อนสรุปผล เพื่อป้องกันการตัดสินจาก Impression ต่ำ

## Dayparting

**หน้าที่:** วิเคราะห์ประสิทธิภาพตามชั่วโมงและวันในสัปดาห์ เพื่อดูช่วงเวลาที่ได้ Conversion คุณภาพและต้นทุนเหมาะสม

**ข้อมูลหลัก:** Spend, Click, Deposit Success, Cost per Deposit, Deposit Value และ Volume ตาม Workspace timezone

**ผลลัพธ์:** Best window, Weak window และคำแนะนำให้จัดตารางโฆษณาหรือจัดสรรงบอย่างมีหลักฐาน

**หลักการควบคุม:** ใช้ข้อมูลหลายวันและตรวจ Volume/Confidence ก่อนปรับงบ เพราะช่วงเวลาที่ Conversion rate สูงอาจมีจำนวนข้อมูลน้อย

## GEO จังหวัด

**หน้าที่:** วิเคราะห์ผลโฆษณาและคุณภาพลูกค้าแยกตามจังหวัดหรือภูมิภาค

**ข้อมูลหลัก:** Province, Spend, Registration, Deposit Success, Cost per Deposit, Deposit Value และ Match/coverage rate

**ผลลัพธ์:** จังหวัดที่สร้าง Volume สูง, จังหวัดที่ต้นทุนต่ำ, จังหวัดที่สร้างลูกค้าคุณภาพ และพื้นที่ที่ควรทดสอบแยก Campaign

**หลักการควบคุม:** แสดงผลแบบ Aggregated, กำหนด Minimum Threshold และไม่อนุมานข้อมูลส่วนบุคคลจากพื้นที่ที่มีตัวอย่างน้อย

## ข้อกำหนดร่วมของทุกเมนู

ทุกโมดูลต้องแสดง Workspace, ช่วงเวลา, Source ของข้อมูล, Attribution Model และเวลาที่อัปเดตล่าสุดอย่างชัดเจน ควรแยกตัวเลขจาก **Meta reported** และ **First-party attributed** ไม่รวมเป็นตัวเลขเดียวโดยไม่บอกที่มา การ Export และการใช้ Recommendation ที่อาจกระทบ Budget ต้องบันทึก Audit Log เสมอ

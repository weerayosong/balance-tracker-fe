# Balance Tracker | Full Stack MERN To-do-List App

**Sync your professional works and personal well-being.**

Balance Tracker (Work & Life Balance Management App)

## System Design & Architecture

https://www.figma.com/board/QAeHnuHJaByl92i3KV0u34/Balance-Tracker-App?node-id=0-1&t=IS5GQM6OpCqDrzb6-1

### Presentation Layer - Frontend

พัฒนาด้วย React.js + Vite +TailwindCss v4 โค้ดทั้งหมดจะถูกคอมไพล์และ Build ออกมาเป็นทรัพยากรนิ่ง (Static Assets ประกอบด้วยไฟล์ HTML, CSS และ JavaScript) จากนั้นนำไปฝากไว้บนระบบคลาวด์โฮสติ้งของ Vercel

Vercel: จะไม่ทําหน้าที่ประมวลผลโค้ดตรรกะหลังบ้าน แต่จะทำหน้าที่กระจายไฟล์นิ่งเหล่านี้ไปเก็บไว้ในเซิร์ฟเวอร์เครือข่ายกระจายเนื้อหา CDN (Content Delivery Network / Edge Network) ที่อยู่ใกล้ตัวผู้ใช้งานทั่วโลกมากที่สุด ส่งผลให้หน้าจอ UI ของ Balance Tracker โหลดขึ้นมาแสดงผลได้อย่างรวดเร็ว

### Application Logic Layer - Backend

พัฒนาด้วย Node.js ร่วมกับ Express.js Web Framework หน้าที่เป็นเซิร์ฟเวอร์ผู้ให้บริการ RESTful API แบบไร้สถานะ (Stateless API) โดนนำไปจัดวางและรันอยู่บนโครงสร้างพื้นฐานของ Render (Web Service Compute)

Render: ต่างจาก Vercel โดยสิ้นเชิง เนื่องจาก Render ทำการประมวลผล เสมือนคอมพิวเตอร์เซิร์ฟเวอร์ที่เปิดทํางานทิ้งไว้ตลอด 24 ชั่วโมง คอยรัน Node.js Runtime เพื่อรับสัญญาณความต้องการ (HTTP Requests) ที่เบราว์เซอร์ของผู้ใช้ยิงเข้ามา แกะกล่อง JSON ประมวลผลลอจิก คัดกรองความปลอดภัย และคุยกับฐานข้อมูล

### Data Layer - Database

ใช้บริการ MongoDB Atlas ซึ่งเป็นฐานข้อมูลประเภท NoSQL Document Store แบบ Managed Cloud Cluster ช่วยจัดการระบบสำรองข้อมูลอัตโนมัติ การทํา Replication เพื่อป้องกันข้อมูลสูญหาย และการต่อสายตรงผ่านโปรโตคอลความปลอดภัยไปยัง Render API Server

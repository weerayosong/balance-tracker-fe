# Balance Tracker | Full-Stack Practice Application (Frontend Repository)

**An exploratory project designed to manage daily routines while practically learning React, Node.js, and MongoDB integration.**  
(โปรเจกต์เชิงทดลองที่ออกแบบมาเพื่อจัดการกิจวัตรประจำวัน ควบคู่ไปกับการเรียนรู้ภาคปฏิบัติในการเชื่อมต่อระบบ React, Node.js และ MongoDB)

![app-image](public/proj2c.gif)

## Project Purpose

จุดประสงค์หลักของการพัฒนาแอปพลิเคชันนี้ เกิดจากการแก้ปัญหา Pain point ส่วนตัวในการจัดการชีวิตประจำวัน เพื่อรักษาสมดุลระหว่างการทำงานที่หนักหน่วง (Professional Work) และกิจวัตรส่วนตัว (Personal Life) ให้ลงตัว นอกจากนี้ โปรเจกต์นี้ยังสร้างขึ้นเพื่อเป็นพื้นที่ลงมือปฏิบัติจริง (Hands-on Practice) ในการสร้างแอปพลิเคชัน Full-Stack แบบ End-to-End ตั้งแต่การออกแบบระบบไปจนถึงการใช้งานจริง

## System Design & Architecture

https://www.figma.com/board/QAeHnuHJaByl92i3KV0u34/Balance-Tracker-App?node-id=0-1&t=IS5GQM6OpCqDrzb6-1

## API Design & Mongoose Schema Table

https://docs.google.com/spreadsheets/d/1bO5TQJRtacuc0NAsVFe7rWIM6PT-9N5-W83dwIb0EH4/edit?usp=sharing

## Repository Structure & Architectural Decision

โปรเจกต์ Balance Tracker ได้รับการออกแบบสถาปัตยกรรมในรูปแบบ Decoupled Architecture โดยแยกส่วนการทำงาน (Codebase) ออกเป็น 2 Repositories อย่างเด็ดขาด เพื่อประสิทธิภาพสูงสุดในการพัฒนาและการขยายระบบ (Scalability):

1. **[Frontend Repository](https://github.com/weerayosong/balance-tracker-fe.git) (Client-side):** - จัดการส่วนแสดงผลและสถานะระบบ (UI/UX & Global State Management)
2. **[Backend Repository](https://github.com/weerayosong/balance-tracker-be.git) (Server-side):** - จัดการระบบสถาปัตยกรรม RESTful API, การประมวลผลลอจิก, ระบบรักษาความปลอดภัย และการติดต่อฐานข้อมูล

### ทำไมถึงเลือกแยก Repository?

- **Independent CI/CD Pipeline:** ปลดล็อกความสามารถในการติดตั้งระบบแบบแยกอิสระ เมื่อมีการปรับแต่ง UI บน Vercel ระบบจะทำการ Build เฉพาะไฟล์ Static เท่านั้น โดยไม่ส่งผลกระทบหรือสร้างภาระการประมวลผลให้กับ Web Service Compute บน Render
- **Strict Separation of Concerns:** แยก Dependency และสภาพแวดล้อมในการพัฒนาออกจากกันอย่างสิ้นเชิง ลดความซับซ้อนของโครงสร้างไฟล์และป้องกันความสับสนในการ Debug ระบบ
- **Future-Proof Extensibility:** การออกแบบ API ให้แยกตัวเป็นเอกเทศ (Stateless API Server) ช่วยให้แอปพลิเคชันพร้อมสำหรับการขยายตัว เช่น การสร้าง Client บนแพลตฟอร์มอื่นๆ (Mobile App/Desktop App) มาต่อพ่วงใช้งานร่วมกับฐานข้อมูลเดิมได้ทันทีในอนาคต
- **Enhanced Security Control:** เพิ่มความปลอดภัยในการจัดการ Environment Variables โดยจำกัดพื้นที่การเข้าถึงข้อมูลความลับ เช่น รหัสผ่านฐานข้อมูล และคีย์เข้ารหัส JWT ให้จบอยู่ภายในระบบหลังบ้านเท่านั้น

## Request-Response Pipeline & Data Flow

แผนภาพแสดงวงจรการสื่อสารและการเดินทางของข้อมูลภายในระบบ (Client ↔ Server ↔ Database):

```
[Client] React + Context API (Frontend)
 │
 │   1. HTTP Request (POST /api/tasks)
 ▼
[Server] Express (Backend)
 │
 │   2. Middleware Pipeline: cors() ➔ express.json() ➔ Security Filters
 │   3. Controller: เรียกใช้งาน Mongoose ODM (เช่น Task.create())
 ▼
[Database] MongoDB Atlas
 │
 │   4. Database Operation: บันทึกข้อมูลและส่งผลลัพธ์ (Success/Error) กลับไป
 ▼
[Server] Express (Backend)
 │
 │   5. Response Formatting: จัดรูปแบบ JSON (res.status(201).json(data))
 ▼
[Client] React + Context API (Frontend)
     6. State Update: นำข้อมูลไปอัปเดต Global State ➔ UI อัปเดตอัตโนมัติ
```

## Tech Stack & Deployment Architecture

แอปพลิเคชันนี้ออกแบบสถาปัตยกรรมเป็น 3-Tier Architecture แยกส่วนการทำงานและกระจายการติดตั้งบนระบบคลาวด์เพื่อประสิทธิภาพและความปลอดภัย:

- **Presentation Layer (Frontend):** พัฒนาด้วย React.js (Vite) + Tailwind CSS v4 คอมไพล์เป็น Static Assets และ Deploy บน **Vercel** เพื่อกระจายเนื้อหาผ่านระบบ Global CDN ช่วยให้หน้าจอ UI โหลดได้อย่างรวดเร็ว
- **Application Logic Layer (Backend):** พัฒนาด้วย Node.js + Express.js บริการ Stateless RESTful API ติดตั้งและรันบน **Render** (Web Service Compute) ทำงานแบบ 24/7 เพื่อประมวลผล Business Logic และคัดกรองความปลอดภัย
- **Data Layer (Database):** ใช้บริการ **MongoDB Atlas** ระบบฐานข้อมูล NoSQL Document Store แบบ Managed Cloud Cluster พร้อมระบบ Replication และต่อสายตรงผ่านโปรโตคอลความปลอดภัยไปยัง API Server

## Changelog

- **2026-05-17 | Initial System & Architecture Design**
  ร่างสถาปัตยกรรมระบบและออกแบบโครงสร้างแอปพลิเคชัน โดยกำหนดเป้าหมายแรก (Phase 1) ให้เป็นแอปพลิเคชันสำหรับใช้งานส่วนบุคคล (Single-user) ที่มีฟังก์ชันพื้นฐานครบถ้วน ทำงานบนฐานข้อมูลชุดเดียว (`tasks` collection) เพื่อให้ระบบหลักทำงานได้อย่างถูกต้องและมีประสิทธิภาพสูงสุดก่อน

- **2026-05-18 | Database Schema Planning & Technology Selection**
  ตัดสินใจเลือกใช้ MongoDB เป็นระบบฐานข้อมูลหลัก เนื่องจากตอบโจทย์เรื่องความยืดหยุ่น (Schema Flexibility) ซึ่งจะช่วยให้การปรับเปลี่ยนโครงสร้างในอนาคต เช่น การเพิ่ม `users` collection หรือการปรับเปลี่ยนฟิลด์ข้อมูล ทำได้ง่ายและคล่องตัวเมื่อแอปพลิเคชันเข้าสู่ Phase ถัดไป

- **2026-05-19 | Security & Authentication Strategy**
  วางแผนระบบยืนยันตัวตน (Authentication) และการกำหนดสิทธิ์ (Authorization) เพื่อเตรียมขยายระบบให้รองรับผู้ใช้งานหลายคน (Multi-user) โดยออกแบบให้แยกเก็บข้อมูลงานและกิจวัตรของแต่ละบุคคลออกจากกันอย่างปลอดภัย ผ่านการเข้ารหัสรหัสผ่านด้วย `bcrypt` และจัดการ Session ด้วย `JWT` (JSON Web Token)

- **2026-05-31 | Architecture Refactoring for Scalability**
  ปรับปรุง System Design ใหม่ทั้งหมดเพื่อรองรับการขยายตัวของแอปพลิเคชันตามแผนที่วางไว้ เตรียมความพร้อมโครงสร้างฝั่ง Frontend โดยเปลี่ยนจากการเป็น Single-page ธรรมดา มาเป็นการวางโครงสร้าง `React Router` เพื่อรองรับหน้า Login/Register และนำ `Context API` มาใช้จัดการ Global State สำหรับเตรียมรับข้อมูล User Auth ที่จะเพิ่มเข้ามาในอนาคต

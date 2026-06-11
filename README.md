# CareFlow CMMS 🏥💼

**CareFlow CMMS** คือระบบบริหารจัดการงานบำรุงรักษาและจัดการครุภัณฑ์การแพทย์ (Computerized Maintenance Management System) ระดับ Clinical-Grade ที่ออกแบบมาเพื่อโรงพยาบาลและสถานพยาบาล เพื่อความรวดเร็ว ถูกต้อง และความปลอดภัยสูงสุดในการดูแลรักษาเครื่องมือแพทย์

---

## 🚀 คุณสมบัติเด่น (Key Features)

### 1. ระบบจัดการครุภัณฑ์การแพทย์ (Asset Management)
*   **Asset Catalog & Profiles**: บันทึกข้อมูลรายละเอียดทางเทคนิค ประวัติการจัดซื้อ และตำแหน่งที่ตั้งของเครื่องมือแพทย์แต่ละชิ้น
*   **Asset Health Scoring**: คำนวณและแสดงคะแนนสุขภาพเครื่องมือแพทย์ (Health Score) เพื่อประเมินความเสี่ยงในการชำรุดล่วงหน้า
*   **Maintenance Timeline**: ตรวจสอบประวัติการบำรุงรักษาย้อนหลังทั้งหมดของครุภัณฑ์แต่ละชิ้นในรูปแบบไทม์ไลน์

### 2. ระบบบำรุงรักษาเชิงป้องกัน (Preventive Maintenance - PM)
*   **PM Calendar**: ปฏิทินแสดงตารางนัดหมายทำ PM ล่วงหน้าของเครื่องมือแพทย์ ช่วยวางแผนและกระจายงานให้ช่างได้ดียิ่งขึ้น
*   **Interactive Checklists**: รายการตรวจสอบมาตรฐาน (Checklist) แยกตามประเภทเครื่องมือ ป้องกันการข้ามขั้นตอนสำคัญ
*   **Status Management**: ติดตามสถานะงาน PM ตั้งแต่เริ่มวางแผน กำลังดำเนินการ จนถึงตรวจสอบเรียบร้อย

### 3. ระบบแจ้งซ่อมและจัดการใบสั่งซ่อม (Ticket & Work Order Management)
*   **Ticket Creation**: ส่งคำแจ้งซ่อมพร้อมระบุรายละเอียดอาการเสีย สถานที่ และระดับความสำคัญ (Priority Selector)
*   **Technician Workspace**: พื้นที่ทำงานของช่างเทคนิคเพื่ออัปเดตขั้นตอนการตรวจซ่อม อะไหล่ที่ใช้ และบันทึกผลการปฏิบัติงาน
*   **Dynamic Workflows**: ลำดับขั้นตอนการอนุมัติและการทำงานของใบสั่งซ่อมที่มีความยืดหยุ่นสูง

### 4. ระบบแจ้งเตือนแบบเรียลไทม์ (Real-time Notifications)
*   **Notification Drawer**: กล่องรับการแจ้งเตือนด่วนสำหรับช่างและแอดมินเมื่อมีตั๋วงานใหม่หรือตั๋วงานด่วนเข้ามา
*   **Socket Ready**: โครงสร้างระบบเตรียมการเชื่อมต่อเรียลไทม์ผ่าน Socket Service

### 5. รายงานเชิงวิเคราะห์และแดชบอร์ด (Dashboard & Reporting)
*   **Executive Metrics**: แสดงสรุปตัวเลขงานค้าง ตั๋วที่เสร็จสิ้น และอัตราความพร้อมใช้งานของอุปกรณ์ (Availability Rate)
*   **Data Visualization**: กราฟแสดงสัดส่วนประเภทความชำรุดและกราฟแท่งเปรียบเทียบภาระงานรายสัปดาห์ด้วย Recharts

### 6. การควบคุมสิทธิ์ตามบทบาท (Role-based Authentication & Guards)
*   **Role Guards**: จัดการการเข้าถึงหน้าจอและปุ่มดำเนินการตามสิทธิ์ผู้ใช้งาน เช่น Administrator, Technician, และ General User (Staff)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

### **Frontend Core**
*   **Framework**: [React 19](https://react.dev/) — มอบประสิทธิภาพที่ยอดเยี่ยมและการจัดการ UI ที่รวดเร็ว
*   **Language**: [TypeScript](https://www.typescriptlang.org/) — เพื่อโครงสร้างโค้ดที่ทนทาน ปลอดภัยจาก Type Error
*   **Build Tool**: [Vite](https://vite.dev/) — เพื่อความเร็วสูงในการรัน Development Server และ Build Production
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — สำหรับแต่งหน้าจอด้วย Utility-first CSS รุ่นล่าสุด

### **Libraries & State Management**
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) — จัดการ Global State อย่างเบาตัวและเข้าใจง่าย
*   **Routing**: [React Router DOM v7](https://reactrouter.com/) — จัดการเส้นทางในเว็บอย่างสมบูรณ์แบบ
*   **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest) — ซิงค์ข้อมูลกับ Backend API ได้อย่างราบรื่น
*   **Data Visualization**: [Recharts](https://recharts.org/) — คอมโพเนนต์กราฟแสดงสถิติที่สวยงามและตอบสนองตามขนาดหน้าจอ (Responsive)
*   **Icons**: [Tabler Icons React](https://tabler.io/icons) — ไอคอนสไตล์ลายเส้นพรีเมียม สวยงาม ทันสมัย

---

## 📂 โครงสร้างโฟลเดอร์โครงการ (Folder Structure)

```text
src/
├── api/                  # ตัวเชื่อมต่อ API (Auth, Asset, Workorder, Report, Notification)
├── assets/               # ไฟล์รูปภาพและทรัพยากร static ของระบบ
├── components/           # UI Components ส่วนกลางและ Layout (AppShell, Sidebar, Topbar)
├── data/                 # ไฟล์ข้อมูลจำลองสำหรับพัฒนา (Mock Data)
├── features/             # ฟังก์ชันการทำงานแยกตามโมดูลหลัก (Feature-based Architecture)
│   ├── assets/           # หน้าจอและคอมโพเนนต์เกี่ยวกับ ครุภัณฑ์การแพทย์
│   ├── auth/             # การจัดการสิทธิ์ Role Guard และสิทธิ์ผู้ใช้
│   ├── notifications/    # กล่องแจ้งเตือนและการทำงานแบบเรียลไทม์
│   └── pm/               # ปฏิทินและระบบ Preventive Maintenance
├── pages/                # หน้าจอดั้งเดิมและหน้าจอเดี่ยว (Dashboard, CreateTicket, Login, etc.)
├── services/             # คลาสบริการเสริม เช่น socket.service.ts
├── store/                # ตัวจัดการสเตทด้วย Zustand (useAppStore, notificationStore)
├── types/                # ไฟล์กำหนด Type และ Interface ของโมเดลต่างๆ ในระบบ
└── main.tsx              # จุดเริ่มต้นการทำงานของแอปพลิเคชัน
```

---

## ⚙️ เริ่มต้นใช้งาน (Getting Started)

### **ขั้นเตรียมการ**
ติดตั้ง Node.js (แนะนำ v18+) จากนั้นติดตั้ง Dependencies :

```bash
npm install
```

### **พัฒนาแอปพลิเคชัน (Development)**
รัน Development Server เพื่อทดลองเข้าชมแอปพลิเคชันที่หน้าเครื่องคอมพิวเตอร์ :

```bash
npm run dev
```

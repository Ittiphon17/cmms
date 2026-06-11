# CMMS 🏥💼

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

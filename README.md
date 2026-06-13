#  CMMS (Computerized Maintenance Management System)

**CMMS** is a clinical-grade Computerized Maintenance Management System (CMMS) designed for medical facilities to manage medical device lifecycles, schedule preventive maintenance calibration calendars, and streamline service tickets.

---

## 🔍 Project Description

In a clinical setting, medical equipment uptime is directly tied to patient safety and operational throughput. CareFlow CMMS bridges the gap between biomedical technicians, administrative managers, and clinical staff. It provides an all-in-one system to log tickets, assign technicians, check sensor calibrations, track asset health scores, and comply with safety audits.

### Key Features

1. **Asset Management (Medical Registry)**
   - Technical specifications, acquisition history, and live location mapping.
   - Dynamic **Health Score calculation** to flag equipment failure risks.
   - Interactive historical maintenance timeline detailing every service action.

2. **Preventive Maintenance (PM)**
   - Monthly calendar planning interface specifically designed for calibration schedules.
   - Interactive checklist items ensuring technicians verify sensors and sign off calibration logs.
   - Compliance boost: Completing a PM task automatically restores asset health score metrics.

3. **Ticket & Work Order System**
   - Incident reporting with quick priority selection (low, medium, high, critical).
   - Dedicated **Technician Workspace** showing assigned work queues, active progress, checklist items, and history.
   - Dynamic timeline log records updates, notes, and state changes.

4. **Real-time Notifications**
   - Notification Drawer containing list of emergency tickets and newly dispatched schedules.
   - Integrated floating toast overlay powered by a simulated WebSocket feed.

5. **Analytics & BI Dashboard**
   - High-level KPIs: equipment availability rate, active work orders, and resolution ratios.
   - Responsive charts showcasing breakdown distributions and weekly work distribution using Recharts.

---

### Tech Stack & Rationale

- **React 19**: Leverages modern React features, declarative UI patterns, and efficient rendering for interactive, high-density dashboard layouts.
- **TypeScript**: Establishes static type safety across complex structures (e.g., `Ticket`, `Equipment`, `PMTask`), mitigating run-time errors and acting as self-documenting code.
- **Tailwind CSS v4**: Built with the modern, high-performance `@tailwindcss/vite` engine. Utilizes CSS variables and custom design tokens for rapid, flexible styling and dark/light mode optimization.
- **Vite**: Ultra-fast bundler offering hot module replacement (HMR) for instant development feedback and highly optimized production assets.
- **Zustand**: A lightweight, performant state manager for sharing session details, ticket updates, and active notifications without the boilerplate of Redux or context re-render penalties.
- **TanStack React Query v5**: Simplifies asynchronous data fetching, local caching, and background synchronizations with backend APIs.
- **Recharts**: Beautiful, fully responsive SVG chart library to plot clinical equipment status and workload distributions.
- **Tabler Icons**: Clean, consistent wireframe vector icons that complement the medical design aesthetic.

---

### Directory Structure

Below is the feature-based folder structure designed to isolate components, models, and pages according to domain logic:

```text
src/
├── api/                  # API client layer & mock database seeder
├── assets/               # Static images, global styles
├── components/           # Reusable UI parts & structure layouts
│   ├── forms/            # Input components & controls
│   ├── layout/           # Page wrappers: AppShell, Sidebar, and Topbar
│   └── ui/               # Low-level primitives: buttons, cards, badges
├── data/                 # Static mock catalogs & configurations
├── features/             # Feature-based modular architecture
│   ├── assets/           # Equipment registry features (AssetList, AssetDetail)
│   ├── auth/             # Login sessions, role protections, and guards
│   ├── notifications/    # Slide-over alert drawer & socket listeners
│   └── pm/               # Preventive maintenance scheduling & calendars
├── pages/                # Router root pages (Dashboard, TechnicianPage, CreateTicket, Login, etc.)
├── services/             # Simulated background services (WebSocket socket.service.ts)
├── store/                # Zustand global stores (useAppStore, notificationStore)
├── types/                # Shared TypeScript models and enum definitions
├── App.css               # App-specific layout overrides
├── App.tsx               # Root routes, page layouts, and top-level toasts
├── index.css             # Tailwind directives & design system variables
└── main.tsx              # App mount point
```

---

## ⚙️ How to Install and Run the Project

### Prerequisites
- **Node.js**: `v18.0.0` or higher (LTS recommended)
- **npm**: `v9.0.0` or higher

### Installation Steps

1. **Clone the repository and enter the directory:**
   ```bash
   git clone <repository-url>
   cd cmms
   ```

2. **Install all project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *The application will boot up at `http://localhost:5173`.*

4. **Build the production package (Optional):**
   ```bash
   npm run build
   ```
   *This compiles TypeScript and outputs production-ready files in the `/dist` directory.*

### Available Scripts
- `npm run dev`: Runs the development server.
- `npm run build`: Compiles TypeScript files and builds the project for production.
- `npm run lint`: Analyzes code quality using ESLint.
- `npm run preview`: Previews the local production build.

---

## 💡 How to Use the Project

### 1. Login Credentials
When accessing the application for the first time, you will be directed to the sign-in screen.
- **Email / Username**: `user`
- **Password**: `1`

---

### 2. Dynamic Role Swapping
The application has built-in Role-Based Access Control (RBAC). To make testing easy, there is a **Role Dropdown** in the top header bar next to the notification bell:
- Changing the role here (e.g. from `Admin` to `Technician`) automatically changes navigation panels, buttons, and permissions throughout the application without logging out.

---

### 3. Role-Specific Workflows

#### A. Requester (Clinical Staff)
- **File a ticket**: Navigate to `/tickets/new` when equipment breaks down. Select the malfunctioning asset, set the priority level (e.g., Critical for life-support systems), fill in the description, and assign it to a tech.
- **Track Status**: Monitor live progress via the ticket's visual timeline.

#### B. Technician
- **My Work Queue**: Navigate to `/my-work` to see your assigned active tickets and scheduled Preventive Maintenance (PM) runs.
- **Checklist Compliance**: Click an active work order, complete the clinical checklist items, mark the ticket status (e.g., In Progress, Waiting on Parts, Completed), and add labor/parts notes.
- **Complete PM Calibration**: Open a scheduled PM task, complete the equipment checks, and click "Complete PM." This automatically resets the target medical device status back to "Operational" and boosts its overall Health Score.

#### C. Administrator / Manager
- **Asset Management**: View the complete equipment inventory under `/assets`. Create new assets, inspect machine histories, or investigate details for a device whose Health Score has dropped.
- **PM Calendar Planning**: Navigate to `/pm` to see a full calendar of upcoming maintenance schedules. Schedule a new PM run by selecting an asset, assigning a technician, and setting a target date.
- **Dashboard Reporting**: Check the high-level operational dashboards under `/reports` to monitor system availability, breakdown distribution, and technician workload allocations.
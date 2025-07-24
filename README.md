# 🏥 Medwork – Patient Management Platform

Medwork is a full-stack application to manage patients, their statuses, and assigned healthcare providers. It supports patient creation, updates, status history, provider assignment, and timeline tracking.

<img width="1253" height="501" alt="image" src="https://github.com/user-attachments/assets/2aa7e6f7-5de0-43df-bbfe-d49ee7bd82fa" />
<img width="1275" height="423" alt="image" src="https://github.com/user-attachments/assets/cc4e3d50-a0cc-4174-932f-8a9fae899e2e" />
<img width="1166" height="663" alt="Screenshot 2025-07-19 110804" src="https://github.com/user-attachments/assets/42749439-c685-46ba-8404-2587fcf80004" />
<img width="2041" height="229" alt="image" src="https://github.com/user-attachments/assets/c3b8aae4-8427-424f-b773-dc977f65c4d8" />


---

## 🚀 Getting Started

### 📦 Prerequisites

* Node.js `>=18`
* Docker + Docker Compose (for database)
* (Optional) Yarn / npm

### 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/<your-user>/medwork.git
cd medwork
```

2. **Start PostgreSQL with Docker:**

```bash
docker-compose up -d
```

3. **Install dependencies:**

```bash
# From root folder
cd backend
npm install

cd ../web
npm install
```

4.  **Start the microservices**

In separate terminals (or with a process manager like pm2), run:

```bash
# Start Patients Microservice
cd backend
npx nest start api-gateway 

# Start Providers Microservice
cd backend
npx nest start providers-ms

# Start Statuses Microservice
cd backend
npx run start statuses-ms

# Finally, start the API Gateway
cd backend
npx nest start api-gateway
```

5. **Run the frontend (Next.js):**

```bash
cd web
npm run dev
```

> Frontend: [http://localhost:3000](http://localhost:3000)
> Backend: [http://localhost:3001](http://localhost:3001) (if exposed)

---

## 🌱 Seed Script 

Currently, only statuses are seeded.

```bash
cd backend/apps/statuses-ms
npm run seed:statuses
```

This preloads some default status values like Pending, Under review, Approved.

A similar seed script for providers can be created later in seed:providers
---

## 🧱 Architecture Notes

### Backend

* Framework: **NestJS** (TypeScript)
* ORM: **TypeORM**
* DB: **PostgreSQL**
* Structure:

  * `patients-service`, `providers-service`, `statuses-service`
  * RESTful endpoints (e.g. `/api/patients`)
  * Seeders using a custom `SeedService`

### Frontend

* Framework: **Next.js (App Router)**
* Styling: **TailwindCSS**
* State/Data: Local component state + Axios
* Structure:

  * `app/dashboard`: Patient dashboard and actions
  * `app/dashboard/patients/[id]/edit`: Patient edit screen
  * `app/dashboard/status/[id]`: Status change
  * `app/dashboard/assign`: Assign provider

---
### Architecture Overview

This project uses a modular microservices architecture with NestJS:

* Each core domain (Patients, Providers, Statuses) is an isolated microservice.

*Microservices communicate via message patterns using the built-in transport layer.

T* he API Gateway exposes a REST API and acts as the entry point for frontend apps.

*The frontend (Next.js + TailwindCSS) consumes the gateway and provides admin-level UIs.


## ✅ Features Implemented

* ✅ Patient creation and edit
* ✅ Assign provider to patient
* ✅ Update patient status
* ✅ View patient history (timeline)
* ✅ Pagination in patient list

---

## 📁 Folder Structure (Simplified)

```
/
├── backend/           # NestJS app
│   └── apps/
│       ├── api-gateway/ # Next.js App Router
│       ├── patients-ms/
│       ├── providers-ms/
│       ├── statuses-ms/
│           └── seed/
├── web/          #frontend
│   └── app/
│       └── dashboard/
│           ├── patients/
│           ├── assign/
│           ├── status/
│           └── history/
└── docker-compose.yml
```

---

## 🧪 Technologies Used

| Layer     | Tech                                   |
| --------- | -------------------------------------- |
| Backend   | NestJS, TypeORM, PostgreSQL            |
| Frontend  | Next.js, TailwindCSS, Axios            |
| Database  | Supabase / Docker PostgreSQL           |
| Dev Tools | ESLint, Prettier, ts-node, seed script |

---

## 👤 Author
[@ezesubu](https://github.com/ezesubu)

# WePark — Smart & Seamless Parking System

A full-stack, mobile-responsive parking slot reservation platform designed with an **Apple VisionOS / Glassmorphism UI aesthetic**. Built with a Node.js/Express backend, native Vanilla JavaScript frontend,and cloud-based Supabase PostgreSQL integration for persistent user data storage.

---

## Features

* **Apple VisionOS Aesthetic**: High-end dark mode UI featuring frosted glass, backdrop blur filters, and SF Pro typography.
* **Real-Time Slot Reservation**: Interactive sections (Hero, Slots, Booking, Gallery, Pricing) with instant slot availability management.
* **Supabase PostgreSQL Integration**: Server-side user details persistence (Name, Vehicle Type, Email, Phone Number) using Supabase.
* **Dynamic Navigation Badge**: Responsive navigation bar updating with a glowing user profile badge upon successful sign-in.
* **Serverless Deployment**: Configured with `vercel.json` for deployment on Vercel.

---

## Tech Stack

* **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
* **Backend**: Node.js, Express.js
* **Database**: Supabase (PostgreSQL) + Local JSON DB (`db.json`) fallback
* **Deployment**: Vercel

---

Getting Started Locally
Prerequisites
Node.js (v18 or higher)

npm

Installation
Clone the repository:

Bash
git clone [https://github.com/praveenv2807/WePark.git](https://github.com/praveenv2807/WePark.git)
cd WePark
Install dependencies:

Bash
npm install
Start the local server:

Bash
node server.js
Open in browser:
Navigate to http://localhost:5000.
API EndpointsMethodEndpointDescriptionGET/api/slotsFetch real-time availability of all parking slots.POST/api/bookReserve an available slot with a vehicle license plate.POST/api/loginRegister/upsert user details into the Supabase database.

i used supabase to make the database more efficient and proceessed.


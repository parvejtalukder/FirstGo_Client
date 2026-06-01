# 🚚 ZapShift Client

**ZapShift Client** is a modern, responsive React-based frontend application for the ZapShift Parcel Management System. It provides a seamless user experience for booking parcels, tracking deliveries, and managing shipments with role-based access control for users, admins, and riders.

**Live Demo:** https://the-first-go.vercel.app

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Key Pages & Routes](#key-pages--routes)
- [System Roles](#system-roles)
- [Project Architecture](#project-architecture)
- [Dependencies](#dependencies)
- [Author](#author)

---

## 📖 Overview

ZapShift is a comprehensive parcel management solution that streamlines the delivery process from booking to confirmation. The client application serves as the primary interface for all user interactions with the system, featuring:

- **Intelligent Parcel Booking** - Easy-to-use interface for creating shipments
- **Real-time Tracking** - Track parcels throughout their delivery lifecycle
- **Dashboard Management** - Personalized dashboards for users, admins, and riders
- **Multi-role System** - Role-based access control ensuring secure and appropriate access
- **Nationwide Coverage** - Support for delivery across 64 districts

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19.2** | UI Library & Component Framework |
| **Vite 7.3** | Lightning-fast build tool & dev server |
| **React Router 7.13** | Client-side routing & navigation |
| **React Hook Form 7.71** | Form state management & validation |
| **TanStack React Query 5.96** | Server state management & data fetching |
| **Tailwind CSS 4.2** | Utility-first CSS framework |
| **DaisyUI 5.5** | Component library built on Tailwind |
| **Axios 1.13** | HTTP client for API requests |
| **Firebase 12.14** | Authentication & backend services |
| **React Leaflet 5.0** | Interactive map integration |
| **Recharts 3.8** | Data visualization & charts |
| **Lucide React 0.577** | Modern icon library |
| **SweetAlert2 11.26** | Beautiful alert dialogs |
| **Swiper 12.1** | Touch slider carousel |
| **ESLint 9.39** | Code quality & linting |

---

## 📁 Project Structure

```
FirstGo_Client/
├── public/
│   └── locations.json          # District & location data
│
├── src/
│   ├── assets/                 # Images, icons, and static resources
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Arrow/              # Navigation arrow component
│   │   ├── Button/             # Custom button components
│   │   ├── Forbidden/          # Access denied component
│   │   └── Logo/               # Brand logo component
│   │
│   ├── Context/                # React Context for state management
│   │   └── AuthContext/
│   │       ├── AuthProvider.jsx    # Authentication provider
│   │       └── AuthContext.jsx     # Auth context definition
│   │
│   ├── firebase/               # Firebase configuration
│   │   └── firebase.init.js    # Firebase initialization
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.jsx         # Auth context hook
│   │   ├── useAxiosSecure.jsx  # Secure API requests hook
│   │   └── useRole.jsx         # User role detection hook
│   │
│   ├── layouts/                # Page layouts
│   │   ├── Root/               # Main application layout
│   │   ├── Auth/               # Authentication page layout
│   │   └── Dashboard/          # Dashboard layout with sidebar
│   │
│   ├── pages/                  # Application pages/views
│   │   ├── Home/               # Landing page
│   │   ├── Auth/
│   │   │   ├── Login/          # User login page
│   │   │   └── Register/       # User registration page
│   │   ├── SendAPercel/        # Parcel booking interface
│   │   ├── TrackAParcel/       # Parcel tracking page
│   │   ├── BeARider/           # Rider registration/application
│   │   ├── Coverage/           # Service coverage map
│   │   ├── Dashboard/          # Dashboard pages
│   │   │   ├── Index/          # Dashboard home
│   │   │   ├── MyParcel/       # User's parcels
│   │   │   ├── Payment/        # Payment processing
│   │   │   ├── PaymentHistory/ # Payment records
│   │   │   ├── ApproveRiders/  # Admin: Rider approval
│   │   │   ├── UsersManagement/# Admin: User management
│   │   │   ├── AssignRiders/   # Admin: Assign riders to parcels
│   │   │   ├── AssignedTasks/  # Rider: Assigned deliveries
│   │   │   └── DeliveredTasks/ # Rider: Completed deliveries
│   │   └── Error/              # 404/Error page
│   │
│   ├── routes/                 # Route configuration
│   │   ├── router.jsx          # Main router configuration
│   │   ├── PrivateRoute.jsx    # Protected routes (authenticated users)
│   │   ├── AdminRoute.jsx      # Admin-only routes
│   │   └── RiderRoute.jsx      # Rider-only routes
│   │
│   ├── utility/                # Helper functions and shared components
│   │   ├── Header/             # Navigation header
│   │   ├── Footer/             # Page footer
│   │   └── Loader/             # Loading spinner
│   │
│   ├── App.jsx                 # Root app component
│   ├── App.css                 # App-level styles
│   ├── main.jsx                # Application entry point
│   ├── index.css               # Global styles
│   └── styles/                 # Additional stylesheets
│
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

---

## ✨ Features

### 🎯 Core Features
- ✅ **User Authentication** - Email/password and Google authentication via Firebase
- ✅ **Parcel Booking System** - Intuitive form for creating new shipments
- ✅ **Real-time Tracking** - Monitor parcel status and location throughout delivery
- ✅ **Payment Integration** - Seamless payment processing for delivery charges
- ✅ **Role-Based Dashboard** - Customized interfaces for different user types

### 👤 User Features
- Create and manage parcel bookings
- Track parcel status in real-time
- View payment history
- Review delivery services
- Access personal dashboard

### 🛠️ Admin Features
- Approve and manage rider applications
- User management and account control
- Assign riders to parcel deliveries
- Monitor system operations
- View parcel routing information

### 🚴 Rider Features
- View assigned delivery tasks
- Update delivery status
- Confirm deliveries with OTP verification
- Track completed deliveries
- Manage rider profile and availability

### 🎨 UI/UX Features
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast performance with Vite
- 🎨 Beautiful UI with Tailwind CSS & DaisyUI
- 🗺️ Interactive map for coverage visualization
- 📊 Data visualization with Recharts
- 🎪 Smooth animations & transitions with Swiper

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** package manager
- **Git**

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parvejtalukder/FirstGo_Client.git
   cd FirstGo_Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Install git hooks (Optional):**
   ```bash
   npm run prepare
   ```

---

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Generates optimized production build in the `dist/` directory

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```
Checks code for style and quality issues

---

## 🗺️ Key Pages & Routes

| Route | Component | Access | Purpose |
|-------|-----------|--------|---------|
| `/` | Home | Public | Landing page |
| `/login` | Login | Public | User authentication |
| `/register` | Register | Public | User registration |
| `/send-percel` | SendAPercel | Private | Create new parcel booking |
| `/track-percel/:trackingId` | TrackAParcel | Public | Track parcel status |
| `/be-rider` | BeARider | Private | Apply to become a rider |
| `/coverage` | Coverage | Public | View service coverage areas |
| `/dashboard` | Dashboard | Private | Main dashboard hub |
| `/dashboard/my-parcels` | MyParcels | Private | View user's parcels |
| `/dashboard/payment/:parcelId` | Payment | Private | Process payment |
| `/dashboard/payment-history` | PaymentHistory | Private | View payment records |
| `/dashboard/approve-riders` | ApproveRiders | Admin | Manage rider applications |
| `/dashboard/users-management` | UsersManagement | Admin | Manage users |
| `/dashboard/assign-riders` | AssignRiders | Admin | Assign riders to parcels |
| `/dashboard/assigned-tasks` | AssignedTasks | Rider | View assigned deliveries |
| `/dashboard/delivered-tasks` | DeliveredTasks | Rider | View completed deliveries |

---

## 👥 System Roles

### 👤 **User (Customer)**
- Book parcels for delivery
- Track shipment status in real-time
- Manage payment information
- View delivery history
- Rate and review services

### 🛠️ **Admin**
- Approve new rider applications
- Manage user accounts and permissions
- Assign riders to parcel deliveries
- Monitor system performance
- Manage warehouse locations
- Control pricing and rates

### 🚴 **Rider (Delivery Agent)**
- View assigned delivery tasks
- Update parcel status during delivery
- Confirm delivery via OTP verification
- Track earnings and commissions
- Manage delivery schedule
- View completed deliveries

---

## 🏗️ Project Architecture

### State Management
- **Firebase Auth** - User authentication state
- **React Context (AuthProvider)** - Global authentication context
- **React Query** - Server state & API caching
- **React Hook Form** - Form state management

### Routing Architecture
```
Root Layout
├── Public Routes (Home, Coverage, TrackAParcel)
├── Auth Routes (Login, Register)
├── Private Routes (Protected by PrivateRoute)
│   ├── User Routes (SendAPercel, BeARider)
│   ├── Dashboard Routes
│   │   ├── Admin Routes (ApproveRiders, UsersManagement)
│   │   ├── Rider Routes (AssignedTasks, DeliveredTasks)
│   │   └── Common Routes (MyParcels, Payment, PaymentHistory)
```

### Authentication Flow
1. User registers with email/password or Google
2. Firebase handles authentication
3. AuthProvider stores user state
4. PrivateRoute components check authentication
5. Role-specific routes validate user role
6. Unauthorized access redirected to Forbidden page

---

## 📚 Dependencies

### Production Dependencies
```json
{
  "@tailwindcss/vite": "^4.2.1",
  "@tanstack/react-query": "^5.96.1",
  "axios": "^1.13.6",
  "firebase": "^12.14.0",
  "leaflet": "^1.9.4",
  "lucide-react": "^0.577.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.71.2",
  "react-icons": "^5.6.0",
  "react-leaflet": "^5.0.0-rc.2",
  "react-responsive-carousel": "^3.2.23",
  "react-router": "^7.13.1",
  "recharts": "^3.8.1",
  "sweetalert2": "^11.26.24",
  "swiper": "^12.1.2",
  "tailwindcss": "^4.2.1"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.39.1",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "daisyui": "^5.5.19",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "globals": "^16.5.0",
  "vite": "^7.3.1"
}
```

---

## 🚀 Performance Optimizations

- **Vite** - Fast module bundling and hot module replacement
- **React Query** - Efficient data fetching and caching
- **Code Splitting** - Route-based lazy loading
- **Tailwind CSS** - Optimized CSS with purging
- **React 19** - Latest performance improvements and concurrent rendering

---

## 📖 API Integration

The application integrates with a backend API through:
- **Axios** with secure interceptors (`useAxiosSecure` hook)
- **React Query** for data caching and synchronization
- **Firebase** for authentication services

---

## 🔐 Security Features

- ✅ Protected routes with authentication checks
- ✅ Role-based access control (RBAC)
- ✅ Secure API calls with token-based auth
- ✅ Firebase authentication security
- ✅ OTP-based delivery confirmation

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Parvej Husen Talukder**

- GitHub: [@parvejtalukder](https://github.com/parvejtalukder)
- Repository: [FirstGo_Client](https://github.com/parvejtalukder/FirstGo_Client)
- Live Demo: [https://the-first-go.vercel.app](https://the-first-go.vercel.app)

---

## 📞 Support

For issues, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/parvejtalukder/FirstGo_Client/issues).

---

## 🙏 Acknowledgments

- React & Vite communities for excellent tools
- Firebase for reliable authentication
- Tailwind CSS & DaisyUI for beautiful design components
- All contributors and users of this project

---

**Last Updated:** June 1, 2026

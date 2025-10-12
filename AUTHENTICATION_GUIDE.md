# 🔐 MediSpa Authentication Guide

## Backend API Integration

The application now supports both **backend API authentication** and **demo mode** for testing.

### 🌐 Backend API Mode (Primary)

**API Endpoint:** `http://127.0.0.1:8000/api/`

#### Login Process:
1. User enters email and password
2. Frontend calls `POST /api/login`
3. Backend returns JWT token
4. Token is stored in localStorage
5. User data is fetched from `GET /api/user`
6. User is automatically redirected to dashboard

#### Signup Process:
1. User enters name, email, password
2. Frontend calls `POST /api/register`
3. Backend creates new user account
4. User is redirected to login page
5. User can then login with new credentials

### 🎭 Demo Mode (Fallback)

If the backend API is not available, the app falls back to demo mode with these test accounts:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `admin@medispa.com` | `demo123` | Admin | Full access to all features |
| `provider@medispa.com` | `demo123` | Provider | Medical provider access |
| `reception@medispa.com` | `demo123` | Reception | Front desk access |
| `client@medispa.com` | `demo123` | Client | Client portal access |

### 🔄 Authentication Flow

```
1. App loads → Check for existing token
2. If token exists → Verify with backend
3. If valid → Load user data → Show dashboard
4. If invalid → Show login page
5. User logs in → Get token → Redirect to dashboard
6. User logs out → Clear token → Show login page
```

### 🛡️ Security Features

- **JWT Token Storage**: Secure token storage in localStorage
- **Token Verification**: Automatic token validation on app load
- **Auto Logout**: Invalid tokens are automatically cleared
- **Error Handling**: Graceful fallback to demo mode
- **Loading States**: Proper loading indicators during auth

### 🚀 How to Test

1. **Start the app**: `npm run dev`
2. **Try demo login**: Use any demo credentials above
3. **Test signup**: Create new account (will redirect to login)
4. **Test logout**: Click logout button in sidebar
5. **Test persistence**: Refresh page - should stay logged in

### 🔧 Backend Requirements

If using the backend API, ensure your Laravel backend has:

- JWT authentication configured
- CORS enabled for `http://localhost:3000`
- User model with proper fields
- Login/Register endpoints
- User profile endpoint

### 📱 User Experience

- **Seamless Login**: Automatic redirect to dashboard after login
- **Persistent Sessions**: Users stay logged in across browser sessions
- **Role-based Access**: Different dashboards based on user role
- **Responsive Design**: Works on all device sizes
- **Error Messages**: Clear feedback for login errors

---

**Note**: The app automatically detects if the backend is available and falls back to demo mode if needed, ensuring it always works for testing and development.

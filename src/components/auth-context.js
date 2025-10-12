"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Mock users for demo (fallback)
const mockUsers = {
  "admin@medispa.com": {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "admin@medispa.com",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  },
  "provider@medispa.com": {
    id: "2",
    name: "Dr. Michael Chen",
    email: "provider@medispa.com",
    role: "provider",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  },
  "reception@medispa.com": {
    id: "3",
    name: "Emma Williams",
    email: "reception@medispa.com",
    role: "reception",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332b82?w=150&h=150&fit=crop&crop=face",
  },
  "client@medispa.com": {
    id: "4",
    name: "Jessica Martinez",
    email: "client@medispa.com",
    role: "client",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Verify token and get user data
      fetchUserData(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        localStorage.removeItem("expires_in");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Remove invalid token
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("expires_in");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Invalid email or password");
      }

      // Save token
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token_type", data.token_type || "bearer");
        localStorage.setItem("expires_in", data.expires_in);

        // Fetch user data
        await fetchUserData(data.access_token);
      } else {
        throw new Error("No access token returned from server");
      }
    } catch (error) {
      // Fallback to mock users for demo
      const mockUser = mockUsers[email];
      if (mockUser && password === "demo123") {
        setUser(mockUser);
      } else {
        throw error;
      }
    }
  };

  const signup = async (email, password) => {
    // Mock signup - in real app would call API
    // For demo purposes, we'll create a new user with client role
    const newUser = {
      id: Date.now().toString(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      role: "client", // Default role for new signups
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=00A8E8&color=fff`,
    };
    
    // Store in localStorage for persistence (in real app, this would be handled by backend)
    const existingUsers = JSON.parse(localStorage.getItem('medispa_users') || '{}');
    existingUsers[email] = newUser;
    localStorage.setItem('medispa_users', JSON.stringify(existingUsers));
    
    setUser(newUser);
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("expires_in");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

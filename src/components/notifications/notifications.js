"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { 
  ArrowLeft,
  Bell,
  BellOff,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  CreditCard,
  User,
  Settings,
  Filter,
  Search,
  Trash2,
  Archive,
  Check
} from "lucide-react";

const mockNotifications = [
  {
    id: "notif-001",
    type: "appointment",
    title: "Appointment Reminder",
    message: "You have an appointment with Dr. Chen tomorrow at 2:00 PM",
    priority: "high",
    isRead: false,
    timestamp: "2025-12-19T10:30:00Z",
    actionUrl: "/appointments/list"
  },
  {
    id: "notif-002",
    type: "payment",
    title: "Payment Received",
    message: "Payment of $400.00 received from Emma Johnson for Botox treatment",
    priority: "medium",
    isRead: false,
    timestamp: "2025-12-19T09:15:00Z",
    actionUrl: "/payments/history"
  },
  {
    id: "notif-003",
    type: "client",
    title: "New Client Registration",
    message: "Sarah Davis has registered as a new client",
    priority: "low",
    isRead: true,
    timestamp: "2025-12-18T16:45:00Z",
    actionUrl: "/clients/list"
  },
  {
    id: "notif-004",
    type: "system",
    title: "System Update Available",
    message: "A new system update is available. Please update when convenient.",
    priority: "low",
    isRead: true,
    timestamp: "2025-12-18T14:20:00Z",
    actionUrl: "/settings"
  },
  {
    id: "notif-005",
    type: "appointment",
    title: "Appointment Cancelled",
    message: "Jessica Martinez cancelled her appointment for Dec 20th",
    priority: "medium",
    isRead: false,
    timestamp: "2025-12-18T11:30:00Z",
    actionUrl: "/appointments/list"
  },
  {
    id: "notif-006",
    type: "payment",
    title: "Payment Failed",
    message: "Payment attempt failed for Amanda Wilson. Please follow up.",
    priority: "high",
    isRead: false,
    timestamp: "2025-12-17T15:20:00Z",
    actionUrl: "/payments/history"
  },
  {
    id: "notif-007",
    type: "client",
    title: "Client Birthday",
    message: "Today is Lisa Anderson's birthday! Send a special message.",
    priority: "low",
    isRead: true,
    timestamp: "2025-12-17T08:00:00Z",
    actionUrl: "/clients/list"
  },
  {
    id: "notif-008",
    type: "system",
    title: "Backup Completed",
    message: "Daily backup completed successfully at 2:00 AM",
    priority: "low",
    isRead: true,
    timestamp: "2025-12-17T02:00:00Z",
    actionUrl: "/settings"
  }
];

const notificationTypes = {
  appointment: { icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-100" },
  payment: { icon: CreditCard, color: "text-green-600", bgColor: "bg-green-100" },
  system: { icon: Settings, color: "text-gray-600", bgColor: "bg-gray-100" },
  client: { icon: User, color: "text-purple-600", bgColor: "bg-purple-100" }
};

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-gray-100 text-gray-800 border-gray-200"
};

export function Notifications({ onPageChange }) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterRead, setFilterRead] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === "all" || notification.type === filterType;
    const matchesPriority = filterPriority === "all" || notification.priority === filterPriority;
    const matchesRead = filterRead === "all" || 
      (filterRead === "read" && notification.isRead) || 
      (filterRead === "unread" && !notification.isRead);
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesPriority && matchesRead && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const archiveNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getNotificationIcon = (type) => {
    const IconComponent = notificationTypes[type]?.icon || Bell;
    return IconComponent;
  };

  const getNotificationColor = (type) => {
    return notificationTypes[type]?.color || "text-gray-600";
  };

  const getNotificationBgColor = (type) => {
    return notificationTypes[type]?.bgColor || "bg-gray-100";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange("dashboard")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="border-border hover:bg-primary/5"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* The rest of the component remains unchanged */}
      {/* ... */}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { 
  ArrowLeft,
  Calendar,
  Search,
  Plus,
  Eye,
  Clock,
  User,
  MapPin,
  Stethoscope,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2
} from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  no_show: "bg-orange-100 text-orange-800 border-orange-200",
  rescheduled: "bg-purple-100 text-purple-800 border-purple-200"
};

const statusIcons = {
  pending: Clock,
  scheduled: Clock,
  completed: CheckCircle,
  cancelled: XCircle,
  no_show: AlertCircle,
  rescheduled: Clock
};

export function MyAppointments({ onPageChange }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadMyAppointments();
  }, []);

  const loadMyAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      // Prepare headers with authentication
      const headers = {
        'Content-Type': 'application/json'
      };

      // Add Authorization header if user is authenticated
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Fetch user's appointments
      const response = await axios.get('/api/bookings?mine=true', { headers });
      
      console.log('My appointments loaded:', response.data);
      setAppointments(response.data.bookings || []);
      
    } catch (error) {
      console.error('Load my appointments error:', error);
      
      // Handle different error scenarios
      if (error.response?.status === 401) {
        setError("Please log in to view your appointments");
      } else if (error.response?.status === 404) {
        setError("No appointments found");
        setAppointments([]);
      } else {
        setError("Failed to load appointments. Please try again.");
        setAppointments([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      (appointment.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.about || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusIcon = (status) => {
    const IconComponent = statusIcons[status] || Clock;
    return <IconComponent className="h-3 w-3" />;
  };

  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      scheduled: 0,
      completed: 0,
      cancelled: 0,
      no_show: 0,
      rescheduled: 0
    };
    
    appointments.forEach(apt => {
      counts[apt.status] = (counts[apt.status] || 0) + 1;
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

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
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>
            <p className="text-muted-foreground">
              {user ? `Welcome back, ${user.name}` : "Your appointment history"}
            </p>
          </div>
        </div>
        <Button
          onClick={() => onPageChange("appointments/book")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Book New Appointment
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {statusCounts.pending}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Scheduled
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {statusCounts.scheduled}
            </div>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {statusCounts.completed}
            </div>
            <p className="text-xs text-muted-foreground">Finished</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter your appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>My Appointments ({filteredAppointments.length})</CardTitle>
          <CardDescription>
            View and manage your appointment bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadMyAppointments}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading your appointments...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {appointments.length === 0 ? "No appointments found" : "No appointments match your search criteria"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-mono text-sm">
                        {appointment.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{formatDate(appointment.createdAt)}</div>
                            <div className="text-sm text-muted-foreground">{formatTime(appointment.createdAt)}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{appointment.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{appointment.email}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{appointment.phone}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground max-w-xs truncate">
                          {appointment.about || "No notes"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${statusColors[appointment.status]} border`}
                        >
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(appointment.status)}
                            <span className="capitalize">{appointment.status.replace('_', ' ')}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common appointment tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => onPageChange("appointments/book")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Book New Appointment
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={loadMyAppointments}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Refresh List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


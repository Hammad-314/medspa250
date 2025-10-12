"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { 
  ArrowLeft,
  Users,
  Search,
  Filter,
  Download,
  TrendingUp,
  Calendar,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Award,
  Target,
  BarChart3,
  Eye
} from "lucide-react";

const mockStaffPerformance = [
  {
    id: "STAFF-001",
    name: "Dr. Sarah Chen",
    role: "Medical Director",
    department: "Medical",
    joinDate: "2022-01-15",
    totalClients: 156,
    totalRevenue: 62400.00,
    avgRating: 4.9,
    completedAppointments: 312,
    cancelledAppointments: 8,
    status: "active",
    performance: "excellent",
    monthlyTarget: 5000.00,
    monthlyAchieved: 5200.00
  },
  {
    id: "STAFF-002",
    name: "Dr. Michael Johnson",
    role: "Aesthetic Physician",
    department: "Medical",
    joinDate: "2022-03-22",
    totalClients: 98,
    totalRevenue: 39200.00,
    avgRating: 4.7,
    completedAppointments: 196,
    cancelledAppointments: 12,
    status: "active",
    performance: "good",
    monthlyTarget: 4000.00,
    monthlyAchieved: 3800.00
  },
  {
    id: "STAFF-003",
    name: "Lisa Rodriguez",
    role: "Aesthetician",
    department: "Spa Services",
    joinDate: "2023-06-10",
    totalClients: 67,
    totalRevenue: 13400.00,
    avgRating: 4.8,
    completedAppointments: 134,
    cancelledAppointments: 6,
    status: "active",
    performance: "excellent",
    monthlyTarget: 2000.00,
    monthlyAchieved: 2100.00
  },
  {
    id: "STAFF-004",
    name: "Jennifer Smith",
    role: "Receptionist",
    department: "Administration",
    joinDate: "2023-11-05",
    totalClients: 0,
    totalRevenue: 0.00,
    avgRating: 4.6,
    completedAppointments: 0,
    cancelledAppointments: 0,
    status: "active",
    performance: "good",
    monthlyTarget: 0.00,
    monthlyAchieved: 0.00
  }
];

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  on_leave: "bg-yellow-100 text-yellow-800 border-yellow-200"
};

const performanceColors = {
  excellent: "bg-green-100 text-green-800 border-green-200",
  good: "bg-blue-100 text-blue-800 border-blue-200",
  average: "bg-yellow-100 text-yellow-800 border-yellow-200",
  needs_improvement: "bg-red-100 text-red-800 border-red-200"
};

export function StaffPerformance({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");

  const filteredStaff = mockStaffPerformance.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    const matchesPerformance = performanceFilter === "all" || staff.performance === performanceFilter;
    
    return matchesSearch && matchesDepartment && matchesPerformance;
  });

  const formatCurrency = (amount) => 
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const totalStaff = mockStaffPerformance.length;
  const activeStaff = mockStaffPerformance.filter(s => s.status === "active").length;
  const totalRevenue = mockStaffPerformance.reduce((sum, s) => sum + s.totalRevenue, 0);
  const avgRating = mockStaffPerformance.reduce((sum, s) => sum + s.avgRating, 0) / mockStaffPerformance.length;

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
            <h1 className="text-2xl font-bold text-foreground">Staff Performance</h1>
            <p className="text-muted-foreground">Track team performance, metrics, and achievements</p>
          </div>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Staff
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalStaff}
            </div>
            <p className="text-xs text-muted-foreground">All team members</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Active Staff
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeStaff}
            </div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Generated by staff</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {avgRating.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Client satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search staff by name, role, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Medical">Medical</SelectItem>
                <SelectItem value="Spa Services">Spa Services</SelectItem>
                <SelectItem value="Administration">Administration</SelectItem>
              </SelectContent>
            </Select>
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-border hover:bg-primary/5 hover:border-primary/30"
            >
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Staff Performance Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Staff Performance Overview</CardTitle>
          <CardDescription>
            {filteredStaff.length} staff member{filteredStaff.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Total Clients</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Avg Rating</TableHead>
                <TableHead>Target vs Achieved</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-mono text-sm">
                    {staff.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {staff.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {staff.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(staff.joinDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {staff.totalClients}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(staff.totalRevenue)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{staff.avgRating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        Target: {formatCurrency(staff.monthlyTarget)}
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        Achieved: {formatCurrency(staff.monthlyAchieved)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {staff.monthlyTarget > 0 ? 
                          `${((staff.monthlyAchieved / staff.monthlyTarget) * 100).toFixed(1)}%` : 
                          'N/A'
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${performanceColors[staff.performance]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span className="capitalize">{staff.performance}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[staff.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {staff.status === "active" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : staff.status === "inactive" ? (
                          <AlertCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        <span className="capitalize">{staff.status.replace('_', ' ')}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common staff management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Report
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Target className="h-4 w-4 mr-2" />
              Set Targets
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Award className="h-4 w-4 mr-2" />
              Recognition
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

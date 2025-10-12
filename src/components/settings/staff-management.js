"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  ArrowLeft,
  Users,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Plus
} from "lucide-react";

const mockStaff = [
  {
    id: "STAFF-001",
    name: "Dr. Michael Chen",
    email: "michael.chen@medispa.com",
    phone: "(555) 123-4567",
    role: "provider",
    department: "Cosmetic Dermatology",
    hireDate: "2023-01-15",
    status: "active",
    avatar: null,
    specialties: ["Botox", "Fillers", "Laser Treatments"],
    licenseNumber: "MD-2023-001",
    schedule: "Mon-Fri 9AM-6PM"
  },
  {
    id: "STAFF-002",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@medispa.com",
    phone: "(555) 234-5678",
    role: "provider",
    department: "Aesthetic Medicine",
    hireDate: "2023-03-20",
    status: "active",
    avatar: null,
    specialties: ["Dermal Fillers", "Hydrafacial", "IV Therapy"],
    licenseNumber: "MD-2023-002",
    schedule: "Mon-Fri 8AM-5PM"
  },
  {
    id: "STAFF-003",
    name: "Dr. Emily Smith",
    email: "emily.smith@medispa.com",
    phone: "(555) 345-6789",
    role: "provider",
    department: "Laser Treatments",
    hireDate: "2023-06-10",
    status: "active",
    avatar: null,
    specialties: ["Laser Hair Removal", "Skin Rejuvenation"],
    licenseNumber: "MD-2023-003",
    schedule: "Tue-Sat 10AM-7PM"
  },
  {
    id: "STAFF-004",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@medispa.com",
    phone: "(555) 456-7890",
    role: "reception",
    department: "Administration",
    hireDate: "2023-02-01",
    status: "active",
    avatar: null,
    specialties: ["Client Relations", "Scheduling"],
    licenseNumber: null,
    schedule: "Mon-Fri 9AM-6PM"
  },
  {
    id: "STAFF-005",
    name: "Robert Wilson",
    email: "robert.wilson@medispa.com",
    phone: "(555) 567-8901",
    role: "admin",
    department: "Management",
    hireDate: "2022-11-15",
    status: "active",
    avatar: null,
    specialties: ["Operations", "Finance"],
    licenseNumber: null,
    schedule: "Mon-Fri 8AM-6PM"
  },
  {
    id: "STAFF-006",
    name: "Lisa Anderson",
    email: "lisa.anderson@medispa.com",
    phone: "(555) 678-9012",
    role: "reception",
    department: "Administration",
    hireDate: "2023-08-05",
    status: "inactive",
    avatar: null,
    specialties: ["Client Relations", "Billing"],
    licenseNumber: null,
    schedule: "Part-time"
  }
];

const roleColors = {
  admin: "bg-red-100 text-red-800 border-red-200",
  provider: "bg-blue-100 text-blue-800 border-blue-200",
  reception: "bg-green-100 text-green-800 border-green-200",
  client: "bg-purple-100 text-purple-800 border-purple-200"
};

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  suspended: "bg-red-100 text-red-800 border-red-200"
};

export function StaffManagement({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);

  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    hireDate: "",
    specialties: [],
    licenseNumber: "",
    schedule: ""
  });

  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || staff.role === roleFilter;
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getDepartments = () => {
    const departments = [...new Set(mockStaff.map(staff => staff.department))];
    return departments;
  };

  const getRoleCounts = () => {
    const counts = {
      admin: 0,
      provider: 0,
      reception: 0,
      client: 0
    };
    
    mockStaff.forEach(staff => {
      counts[staff.role] = (counts[staff.role] || 0) + 1;
    });
    
    return counts;
  };

  const roleCounts = getRoleCounts();
  const activeStaff = mockStaff.filter(s => s.status === "active").length;

  const handleAddStaff = () => {
    // In a real app, this would make an API call
    console.log("Adding new staff:", newStaff);
    setShowAddForm(false);
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      hireDate: "",
      specialties: [],
      licenseNumber: "",
      schedule: ""
    });
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
            <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
            <p className="text-muted-foreground">Manage your team members and their roles</p>
          </div>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Staff
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockStaff.length}
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
              Providers
            </CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {roleCounts.provider}
            </div>
            <p className="text-xs text-muted-foreground">Medical staff</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Reception
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {roleCounts.reception}
            </div>
            <p className="text-xs text-muted-foreground">Support staff</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Administrators
            </CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {roleCounts.admin}
            </div>
            <p className="text-xs text-muted-foreground">Management</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Staff Form */}
      {showAddForm && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Add New Staff Member
            </CardTitle>
            <CardDescription>Enter the details for the new team member</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-input-background border-border"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-input-background border-border"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-input-background border-border"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newStaff.role} 
                  onValueChange={(value) => setNewStaff(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger className="bg-input-background border-border">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="reception">Reception</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newStaff.department}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, department: e.target.value }))}
                  className="bg-input-background border-border"
                  placeholder="Enter department"
                />
              </div>
              <div>
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={newStaff.hireDate}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, hireDate: e.target.value }))}
                  className="bg-input-background border-border"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="border-border hover:bg-primary/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddStaff}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Add Staff Member
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search staff by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
                <SelectItem value="reception">Reception</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {getDepartments().map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Staff Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <CardDescription>
            {filteredStaff.length} staff member{filteredStaff.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {staff.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-muted-foreground">{staff.id}</div>
                        {staff.licenseNumber && (
                          <div className="text-xs text-muted-foreground">
                            License: {staff.licenseNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{staff.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{staff.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${roleColors[staff.role]} border capitalize`}
                    >
                      {staff.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {staff.department}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(staff.hireDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[staff.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {staff.status === "active" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        <span className="capitalize">{staff.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{staff.schedule}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
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
              <Users className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Mail className="h-4 w-4 mr-2" />
              Send Notifications
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Management
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Shield className="h-4 w-4 mr-2" />
              Role Permissions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

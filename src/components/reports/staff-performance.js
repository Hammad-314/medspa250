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
  Plus,
  Eye,
  Edit,
  Download,
  TrendingUp,
  Calendar,
  BarChart3,
  Star,
  RefreshCw,
  Award,
  Target
} from "lucide-react";
import { toast } from "sonner";

const mockStaffData = [
  {
    id: "STAFF-001",
    name: "Dr. Sarah Chen",
    role: "Provider",
    department: "Injectables",
    joinDate: "2022-01-15",
    totalClients: 156,
    totalSessions: 324,
    revenue: 125400.00,
    rating: 4.9,
    efficiency: 98,
    status: "active",
    specialization: "Botox & Fillers"
  },
  {
    id: "STAFF-002",
    name: "Dr. Michael Johnson",
    role: "Provider",
    department: "Laser",
    joinDate: "2022-03-22",
    totalClients: 89,
    totalSessions: 187,
    revenue: 67800.00,
    rating: 4.7,
    efficiency: 94,
    status: "active",
    specialization: "Laser Treatments"
  },
  {
    id: "STAFF-003",
    name: "Emma Rodriguez",
    role: "Receptionist",
    department: "Front Desk",
    joinDate: "2023-06-10",
    totalClients: 0,
    totalSessions: 0,
    revenue: 0,
    rating: 4.8,
    efficiency: 96,
    status: "active",
    specialization: "Client Relations"
  },
  {
    id: "STAFF-004",
    name: "Dr. Lisa Wang",
    role: "Provider",
    department: "Skincare",
    joinDate: "2021-09-05",
    totalClients: 203,
    totalSessions: 456,
    revenue: 89200.00,
    rating: 4.6,
    efficiency: 92,
    status: "active",
    specialization: "Hydrafacial & Skincare"
  }
];

export function StaffPerformance({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredData = mockStaffData.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || staff.role === roleFilter;
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesDepartment;
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

  const totalStaff = mockStaffData.length;
  const avgEfficiency = mockStaffData.reduce((sum, s) => sum + s.efficiency, 0) / totalStaff;
  const topPerformer = mockStaffData.reduce((max, staff) => 
    staff.efficiency > max.efficiency ? staff : max, mockStaffData[0]);
  const avgRating = mockStaffData.reduce((sum, s) => sum + s.rating, 0) / totalStaff;

  const handleGenerateReport = () => {
    toast.success("Staff performance report generated");
  };

  const handleExportData = () => {
    toast.success("Staff performance data exported");
  };

  const handleRefresh = () => {
    toast.success("Staff performance data refreshed");
  };

  const handleViewStaff = (staffId) => {
    toast.info(`Viewing staff details for ${staffId}`);
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
            <h1 className="text-2xl font-bold text-foreground">Staff Performance</h1>
            <p className="text-muted-foreground">Monitor staff productivity and performance metrics</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="border-border hover:bg-primary/5 hover:border-primary/30"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={handleGenerateReport}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Staff
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {totalStaff}
            </div>
            <p className="text-xs text-muted-foreground">Active staff</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg. Efficiency
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {avgEfficiency.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall efficiency</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Top Performer
            </CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {topPerformer.name.split(' ')[1]}
            </div>
            <p className="text-xs text-muted-foreground">{topPerformer.efficiency}% efficiency</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg. Rating
            </CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {avgRating.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Client satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Staff efficiency and productivity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Performance visualization</p>
              <p className="text-sm text-muted-foreground">Interactive charts coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search staff by name, specialization, or ID..."
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
                <SelectItem value="Provider">Provider</SelectItem>
                <SelectItem value="Receptionist">Receptionist</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Injectables">Injectables</SelectItem>
                <SelectItem value="Laser">Laser</SelectItem>
                <SelectItem value="Skincare">Skincare</SelectItem>
                <SelectItem value="Front Desk">Front Desk</SelectItem>
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
          <CardTitle>Staff Performance</CardTitle>
          <CardDescription>
            {filteredData.length} staff member{filteredData.length !== 1 ? 's' : ''} found
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
                <TableHead>Specialization</TableHead>
                <TableHead>Total Clients</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-mono text-sm">
                    {staff.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {staff.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{staff.department}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {staff.specialization}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{staff.totalClients}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(staff.revenue)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{staff.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        staff.efficiency >= 95 ? 'bg-green-500' :
                        staff.efficiency >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium">{staff.efficiency}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-200 border"
                    >
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3" />
                        <span className="capitalize">{staff.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewStaff(staff.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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
          <CardDescription>Common staff performance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={handleExportData}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Performance reports coming soon")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Reports
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Goal setting coming soon")}
            >
              <Target className="h-4 w-4 mr-2" />
              Goal Setting
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Training plans coming soon")}
            >
              <Award className="h-4 w-4 mr-2" />
              Training Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

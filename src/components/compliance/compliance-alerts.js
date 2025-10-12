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
  Shield,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  AlertTriangle,
  Calendar,
  Clock,
  RefreshCw,
  CheckCircle,
  FileText,
  Bell
} from "lucide-react";
import { toast } from "sonner";

const mockComplianceAlerts = [
  {
    id: "COMP-001",
    title: "HIPAA Training Expiring",
    description: "Dr. Sarah Chen's HIPAA training certificate expires in 15 days",
    type: "TRAINING",
    priority: "HIGH",
    dueDate: "2026-01-05",
    assignedTo: "Dr. Sarah Chen",
    status: "PENDING",
    category: "Training",
    lastUpdated: "2025-12-20",
    daysRemaining: 15
  },
  {
    id: "COMP-002",
    title: "Consent Form Audit Required",
    description: "Quarterly consent form audit is due for completion",
    type: "AUDIT",
    priority: "MEDIUM",
    dueDate: "2025-12-31",
    assignedTo: "Emma Rodriguez",
    status: "IN_PROGRESS",
    category: "Audit",
    lastUpdated: "2025-12-19",
    daysRemaining: 11
  },
  {
    id: "COMP-003",
    title: "Equipment Certification Expired",
    description: "Laser equipment certification has expired and needs renewal",
    type: "EQUIPMENT",
    priority: "CRITICAL",
    dueDate: "2025-12-15",
    assignedTo: "Dr. Michael Johnson",
    status: "OVERDUE",
    category: "Equipment",
    lastUpdated: "2025-12-18",
    daysRemaining: -5
  },
  {
    id: "COMP-004",
    title: "Privacy Policy Update",
    description: "Privacy policy needs to be updated per new regulations",
    type: "POLICY",
    priority: "LOW",
    dueDate: "2026-02-01",
    assignedTo: "Admin Team",
    status: "PENDING",
    category: "Policy",
    lastUpdated: "2025-12-17",
    daysRemaining: 43
  },
  {
    id: "COMP-005",
    title: "Staff Background Check",
    description: "Annual background check required for all staff members",
    type: "BACKGROUND_CHECK",
    priority: "MEDIUM",
    dueDate: "2026-01-15",
    assignedTo: "HR Department",
    status: "PENDING",
    category: "Background Check",
    lastUpdated: "2025-12-16",
    daysRemaining: 26
  }
];

export function ComplianceAlerts({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAlerts = mockComplianceAlerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === "all" || alert.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const criticalCount = mockComplianceAlerts.filter(a => a.priority === "CRITICAL").length;
  const highCount = mockComplianceAlerts.filter(a => a.priority === "HIGH").length;
  const overdueCount = mockComplianceAlerts.filter(a => a.status === "OVERDUE").length;
  const pendingCount = mockComplianceAlerts.filter(a => a.status === "PENDING").length;

  const handleConfigureAlerts = () => {
    toast.success("Compliance alert configuration opened");
  };

  const handleRefresh = () => {
    toast.success("Compliance alerts refreshed");
  };

  const handleMarkResolved = (alertId) => {
    toast.success(`Compliance alert ${alertId} marked as resolved`);
  };

  const handleViewDetails = (alertId) => {
    toast.info(`Viewing compliance alert details for ${alertId}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "CRITICAL": return "bg-red-100 text-red-800 border-red-200";
      case "HIGH": return "bg-orange-100 text-orange-800 border-orange-200";
      case "MEDIUM": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "LOW": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "IN_PROGRESS": return "bg-blue-100 text-blue-800 border-blue-200";
      case "OVERDUE": return "bg-red-100 text-red-800 border-red-200";
      case "COMPLETED": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
            <h1 className="text-2xl font-bold text-foreground">Compliance Alerts</h1>
            <p className="text-muted-foreground">Monitor compliance requirements and regulatory alerts</p>
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
            onClick={handleConfigureAlerts}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Bell className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Critical Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {criticalCount}
            </div>
            <p className="text-xs text-muted-foreground">Urgent action needed</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              High Priority
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {highCount}
            </div>
            <p className="text-xs text-muted-foreground">Attention required</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Overdue
            </CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {overdueCount}
            </div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingCount}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
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
                placeholder="Search alerts by title, description, or assigned user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="OVERDUE">Overdue</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
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

      {/* Compliance Alerts Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Compliance Alerts</CardTitle>
          <CardDescription>
            {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-mono text-sm">
                    {alert.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>{alert.title}</span>
                      </div>
                      <div className="text-sm text-muted-foreground max-w-xs truncate">
                        {alert.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {alert.type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getPriorityColor(alert.priority)} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {alert.priority === "CRITICAL" ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : alert.priority === "HIGH" ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : alert.priority === "MEDIUM" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        <span>{alert.priority}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{alert.assignedTo}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(alert.dueDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${
                      alert.daysRemaining < 0 ? 'text-red-600' : 
                      alert.daysRemaining <= 7 ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {alert.daysRemaining < 0 ? `${Math.abs(alert.daysRemaining)} days overdue` : 
                       alert.daysRemaining === 0 ? 'Due today' : 
                       `${alert.daysRemaining} days`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(alert.status)} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {alert.status === "PENDING" ? (
                          <Clock className="h-3 w-3" />
                        ) : alert.status === "IN_PROGRESS" ? (
                          <Clock className="h-3 w-3" />
                        ) : alert.status === "OVERDUE" ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        <span>{alert.status.replace('_', ' ')}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(alert.lastUpdated)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleMarkResolved(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(alert.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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
          <CardDescription>Common compliance management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Compliance checklist coming soon")}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Compliance Checklist
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Regulatory updates coming soon")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Regulatory Updates
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Training schedules coming soon")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Training Schedules
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Audit reports coming soon")}
            >
              <Shield className="h-4 w-4 mr-2" />
              Audit Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

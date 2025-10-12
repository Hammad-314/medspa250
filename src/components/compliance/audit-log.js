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
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  Shield,
  Calendar,
  User,
  Clock,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const mockAuditLogs = [
  {
    id: "AUDIT-001",
    timestamp: "2025-12-20T10:30:00Z",
    user: "Dr. Sarah Chen",
    userId: "USER-001",
    action: "LOGIN",
    resource: "System",
    details: "User logged in successfully",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "SUCCESS",
    severity: "INFO"
  },
  {
    id: "AUDIT-002",
    timestamp: "2025-12-20T10:35:00Z",
    user: "Dr. Sarah Chen",
    userId: "USER-001",
    action: "UPDATE",
    resource: "Client Record",
    details: "Updated client Emma Johnson's contact information",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "SUCCESS",
    severity: "INFO"
  },
  {
    id: "AUDIT-003",
    timestamp: "2025-12-20T11:15:00Z",
    user: "Emma Rodriguez",
    userId: "USER-003",
    action: "CREATE",
    resource: "Appointment",
    details: "Created new appointment for client Sarah Davis",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    status: "SUCCESS",
    severity: "INFO"
  },
  {
    id: "AUDIT-004",
    timestamp: "2025-12-20T11:45:00Z",
    user: "Dr. Michael Johnson",
    userId: "USER-002",
    action: "DELETE",
    resource: "Treatment Record",
    details: "Deleted treatment record for client Jessica Martinez",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "SUCCESS",
    severity: "WARNING"
  },
  {
    id: "AUDIT-005",
    timestamp: "2025-12-20T12:00:00Z",
    user: "Unknown User",
    userId: "UNKNOWN",
    action: "LOGIN_FAILED",
    resource: "System",
    details: "Failed login attempt with invalid credentials",
    ipAddress: "192.168.1.200",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "FAILED",
    severity: "WARNING"
  }
];

export function AuditLog({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    
    return matchesSearch && matchesAction && matchesSeverity;
  });

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalEvents = mockAuditLogs.length;
  const loginEvents = mockAuditLogs.filter(l => l.action.includes("LOGIN")).length;
  const dataChanges = mockAuditLogs.filter(l => ["CREATE", "UPDATE", "DELETE"].includes(l.action)).length;
  const securityEvents = mockAuditLogs.filter(l => l.severity === "WARNING" || l.status === "FAILED").length;

  const handleExportLog = () => {
    toast.success("Audit log exported successfully");
  };

  const handleRefresh = () => {
    toast.success("Audit log refreshed");
  };

  const handleViewDetails = (logId) => {
    toast.info(`Viewing audit log details for ${logId}`);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "INFO": return "bg-blue-100 text-blue-800 border-blue-200";
      case "WARNING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ERROR": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SUCCESS": return "bg-green-100 text-green-800 border-green-200";
      case "FAILED": return "bg-red-100 text-red-800 border-red-200";
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
            <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
            <p className="text-muted-foreground">Track system activities and user actions for compliance</p>
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
            onClick={handleExportLog}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Log
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Events
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {totalEvents}
            </div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Login Events
            </CardTitle>
            <User className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {loginEvents}
            </div>
            <p className="text-xs text-muted-foreground">User logins</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Data Changes
            </CardTitle>
            <Edit className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {dataChanges}
            </div>
            <p className="text-xs text-muted-foreground">Data modifications</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Security Events
            </CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {securityEvents}
            </div>
            <p className="text-xs text-muted-foreground">Security alerts</p>
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
                placeholder="Search logs by user, action, resource, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="LOGIN">Login</SelectItem>
                <SelectItem value="LOGOUT">Logout</SelectItem>
                <SelectItem value="CREATE">Create</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
                <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
                <SelectItem value="WARNING">Warning</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
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

      {/* Audit Log Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>
            {filteredLogs.length} log entr{filteredLogs.length !== 1 ? 'ies' : 'y'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {log.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatDateTime(log.timestamp)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{log.resource}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {log.details}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(log.status)} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {log.status === "SUCCESS" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        <span>{log.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getSeverityColor(log.severity)} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {log.severity === "INFO" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : log.severity === "WARNING" ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        <span>{log.severity}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(log.id)}
                      >
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
          <CardDescription>Common audit log management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Log retention settings coming soon")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Log Retention
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Compliance reports coming soon")}
            >
              <Shield className="h-4 w-4 mr-2" />
              Compliance Reports
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Security monitoring coming soon")}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Security Monitoring
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Log archiving coming soon")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Log Archiving
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

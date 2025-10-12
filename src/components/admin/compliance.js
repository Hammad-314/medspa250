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
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  FileText,
  Users,
  Award,
  AlertCircle,
  Eye,
  Edit,
  Settings,
  BookOpen
} from "lucide-react";

const mockComplianceItems = [
  {
    id: "COMP-001",
    name: "HIPAA Compliance",
    category: "Privacy & Security",
    status: "compliant",
    lastReview: "2025-12-01",
    nextReview: "2026-03-01",
    responsible: "Dr. Sarah Chen",
    priority: "high",
    description: "Health Insurance Portability and Accountability Act compliance",
    requirements: 15,
    completed: 15,
    documents: ["Privacy Policy", "Security Procedures", "Training Records"]
  },
  {
    id: "COMP-002",
    name: "OSHA Safety Standards",
    category: "Workplace Safety",
    status: "compliant",
    lastReview: "2025-11-15",
    nextReview: "2026-02-15",
    responsible: "Jennifer Smith",
    priority: "high",
    description: "Occupational Safety and Health Administration standards",
    requirements: 12,
    completed: 12,
    documents: ["Safety Manual", "Incident Reports", "Training Certificates"]
  },
  {
    id: "COMP-003",
    name: "State Medical Board",
    category: "Licensing",
    status: "pending",
    lastReview: "2025-10-20",
    nextReview: "2025-12-20",
    responsible: "Dr. Michael Johnson",
    priority: "medium",
    description: "State medical board licensing and renewal requirements",
    requirements: 8,
    completed: 6,
    documents: ["License Renewal", "Continuing Education", "Background Check"]
  },
  {
    id: "COMP-004",
    name: "FDA Device Registration",
    category: "Equipment",
    status: "non_compliant",
    lastReview: "2025-09-10",
    nextReview: "2025-12-10",
    responsible: "Lisa Rodriguez",
    priority: "high",
    description: "FDA registration for medical devices and equipment",
    requirements: 5,
    completed: 2,
    documents: ["Device Registration", "Calibration Records", "Maintenance Logs"]
  }
];

const statusColors = {
  compliant: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  non_compliant: "bg-red-100 text-red-800 border-red-200",
  under_review: "bg-blue-100 text-blue-800 border-blue-200"
};

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200"
};

export function Compliance({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredCompliance = mockComplianceItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const totalItems = mockComplianceItems.length;
  const compliantItems = mockComplianceItems.filter(i => i.status === "compliant").length;
  const pendingItems = mockComplianceItems.filter(i => i.status === "pending").length;
  const nonCompliantItems = mockComplianceItems.filter(i => i.status === "non_compliant").length;

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
            <h1 className="text-2xl font-bold text-foreground">Compliance Management</h1>
            <p className="text-muted-foreground">Track regulatory compliance and requirements</p>
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
              Total Requirements
            </CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalItems}
            </div>
            <p className="text-xs text-muted-foreground">All compliance items</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Compliant
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {compliantItems}
            </div>
            <p className="text-xs text-muted-foreground">Fully compliant</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingItems}
            </div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Non-Compliant
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {nonCompliantItems}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
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
                placeholder="Search compliance items by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="non_compliant">Non-Compliant</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Privacy & Security">Privacy & Security</SelectItem>
                <SelectItem value="Workplace Safety">Workplace Safety</SelectItem>
                <SelectItem value="Licensing">Licensing</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
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

      {/* Compliance Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>
            {filteredCompliance.length} compliance item{filteredCompliance.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requirement ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Responsible</TableHead>
                <TableHead>Last Review</TableHead>
                <TableHead>Next Review</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompliance.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">
                    {item.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {item.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {item.completed}/{item.requirements}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(item.completed / item.requirements) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.responsible}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(item.lastReview)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(item.nextReview)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${priorityColors[item.priority]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span className="capitalize">{item.priority}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[item.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {item.status === "compliant" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : item.status === "pending" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        <span className="capitalize">{item.status.replace('_', ' ')}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
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
          <CardDescription>Common compliance management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <BookOpen className="h-4 w-4 mr-2" />
              Compliance Guide
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Award className="h-4 w-4 mr-2" />
              Certifications
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Settings className="h-4 w-4 mr-2" />
              Compliance Settings
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

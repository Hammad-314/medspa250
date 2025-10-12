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
  PieChart,
  FileText,
  RefreshCw,
  UserPlus,
  Heart
} from "lucide-react";
import { toast } from "sonner";

const mockClientData = [
  {
    id: "CLIENT-001",
    name: "Emma Johnson",
    email: "emma.johnson@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15",
    lastVisit: "2025-12-20",
    totalVisits: 12,
    totalSpent: 4500.00,
    status: "active",
    age: 34,
    gender: "Female",
    preferredService: "Botox Injections"
  },
  {
    id: "CLIENT-002",
    name: "Sarah Davis",
    email: "sarah.davis@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2023-03-22",
    lastVisit: "2025-12-19",
    totalVisits: 8,
    totalSpent: 3200.00,
    status: "active",
    age: 28,
    gender: "Female",
    preferredService: "Dermal Fillers"
  },
  {
    id: "CLIENT-003",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2023-06-10",
    lastVisit: "2025-12-18",
    totalVisits: 6,
    totalSpent: 1800.00,
    status: "active",
    age: 42,
    gender: "Male",
    preferredService: "Hydrafacial"
  },
  {
    id: "CLIENT-004",
    name: "Jessica Martinez",
    email: "jessica.martinez@email.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-09-05",
    lastVisit: "2025-11-15",
    totalVisits: 4,
    totalSpent: 1200.00,
    status: "inactive",
    age: 31,
    gender: "Female",
    preferredService: "IV Therapy"
  }
];

export function ClientAnalytics({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");

  const filteredData = mockClientData.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesGender = genderFilter === "all" || client.gender === genderFilter;
    
    return matchesSearch && matchesStatus && matchesGender;
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

  const totalClients = mockClientData.length;
  const activeClients = mockClientData.filter(c => c.status === "active").length;
  const avgVisitsPerClient = mockClientData.reduce((sum, c) => sum + c.totalVisits, 0) / totalClients;
  const avgSpentPerClient = mockClientData.reduce((sum, c) => sum + c.totalSpent, 0) / totalClients;

  const handleGenerateReport = () => {
    toast.success("Client analytics report generated");
  };

  const handleExportData = () => {
    toast.success("Client data exported to CSV");
  };

  const handleRefresh = () => {
    toast.success("Client analytics refreshed");
  };

  const handleViewClient = (clientId) => {
    toast.info(`Viewing client details for ${clientId}`);
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
            <h1 className="text-2xl font-bold text-foreground">Client Analytics</h1>
            <p className="text-muted-foreground">Analyze client behavior and engagement patterns</p>
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
              Total Clients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {totalClients}
            </div>
            <p className="text-xs text-muted-foreground">All clients</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Active Clients
            </CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeClients}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg. Visits
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {avgVisitsPerClient.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Per client</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg. Spent
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(avgSpentPerClient)}
            </div>
            <p className="text-xs text-muted-foreground">Per client</p>
          </CardContent>
        </Card>
      </div>

      {/* Client Demographics Chart Placeholder */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Client Demographics</CardTitle>
          <CardDescription>Age and gender distribution of your client base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Demographics visualization</p>
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
                placeholder="Search clients by name, email, or ID..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gender</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
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

      {/* Client Analytics Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Client Analytics</CardTitle>
          <CardDescription>
            {filteredData.length} client{filteredData.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Total Visits</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-mono text-sm">
                    {client.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{client.email}</div>
                      <div className="text-xs text-muted-foreground">{client.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{client.age}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {client.gender}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{client.totalVisits}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(client.totalSpent)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(client.lastVisit)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        client.status === "active" 
                          ? "bg-green-100 text-green-800 border-green-200" 
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      } border`}
                    >
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span className="capitalize">{client.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewClient(client.id)}
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
          <CardDescription>Common client analytics tasks</CardDescription>
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
              onClick={() => toast.info("Client insights coming soon")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Client Insights
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Behavior analysis coming soon")}
            >
              <PieChart className="h-4 w-4 mr-2" />
              Behavior Analysis
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Retention reports coming soon")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Retention Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

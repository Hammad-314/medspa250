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
  Phone,
  Mail,
  MapPin,
  Eye
} from "lucide-react";

const mockClientAnalytics = [
  {
    id: "CLIENT-001",
    name: "Emma Johnson",
    email: "emma.johnson@email.com",
    phone: "(555) 123-4567",
    joinDate: "2024-01-15",
    totalVisits: 12,
    totalSpent: 2400.00,
    lastVisit: "2025-12-20",
    status: "active",
    loyaltyTier: "Gold",
    avgSpending: 200.00,
    preferredServices: ["Botox", "Hydrafacial"],
    location: "New York, NY"
  },
  {
    id: "CLIENT-002",
    name: "Sarah Davis",
    email: "sarah.davis@email.com",
    phone: "(555) 234-5678",
    joinDate: "2024-03-22",
    totalVisits: 8,
    totalSpent: 1440.00,
    lastVisit: "2025-12-20",
    status: "active",
    loyaltyTier: "Silver",
    avgSpending: 180.00,
    preferredServices: ["Hydrafacial", "Skincare"],
    location: "Los Angeles, CA"
  },
  {
    id: "CLIENT-003",
    name: "Jessica Martinez",
    email: "jessica.martinez@email.com",
    phone: "(555) 345-6789",
    joinDate: "2024-06-10",
    totalVisits: 5,
    totalSpent: 900.00,
    lastVisit: "2025-12-19",
    status: "active",
    loyaltyTier: "Bronze",
    avgSpending: 180.00,
    preferredServices: ["Juvederm", "Botox"],
    location: "Chicago, IL"
  },
  {
    id: "CLIENT-004",
    name: "Amanda Wilson",
    email: "amanda.wilson@email.com",
    phone: "(555) 456-7890",
    joinDate: "2023-11-05",
    totalVisits: 2,
    totalSpent: 300.00,
    lastVisit: "2025-11-15",
    status: "inactive",
    loyaltyTier: "Bronze",
    avgSpending: 150.00,
    preferredServices: ["Laser Hair Removal"],
    location: "Miami, FL"
  }
];

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  vip: "bg-purple-100 text-purple-800 border-purple-200"
};

const tierColors = {
  Gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Silver: "bg-gray-100 text-gray-800 border-gray-200",
  Bronze: "bg-orange-100 text-orange-800 border-orange-200"
};

export function ClientAnalytics({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const filteredClients = mockClientAnalytics.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesTier = tierFilter === "all" || client.loyaltyTier === tierFilter;
    
    return matchesSearch && matchesStatus && matchesTier;
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

  const totalClients = mockClientAnalytics.length;
  const activeClients = mockClientAnalytics.filter(c => c.status === "active").length;
  const totalRevenue = mockClientAnalytics.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpending = mockClientAnalytics.reduce((sum, c) => sum + c.avgSpending, 0) / mockClientAnalytics.length;

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
            <p className="text-muted-foreground">Client insights, behavior patterns, and loyalty metrics</p>
          </div>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Analytics
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Clients
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalClients}
            </div>
            <p className="text-xs text-muted-foreground">All registered clients</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Active Clients
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeClients}
            </div>
            <p className="text-xs text-muted-foreground">Recently active</p>
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
            <p className="text-xs text-muted-foreground">From all clients</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg Spending
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(avgSpending)}
            </div>
            <p className="text-xs text-muted-foreground">Per client</p>
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
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Loyalty Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Bronze">Bronze</SelectItem>
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
          <CardTitle>Client Analytics Overview</CardTitle>
          <CardDescription>
            {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Total Visits</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Avg Spending</TableHead>
                <TableHead>Loyalty Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-mono text-sm">
                    {client.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate max-w-[150px]">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(client.joinDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {client.totalVisits}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(client.totalSpent)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatCurrency(client.avgSpending)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${tierColors[client.loyaltyTier]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{client.loyaltyTier}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[client.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {client.status === "active" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : client.status === "inactive" ? (
                          <AlertCircle className="h-3 w-3" />
                        ) : (
                          <Star className="h-3 w-3" />
                        )}
                        <span className="capitalize">{client.status}</span>
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
          <CardDescription>Common client analytics tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <TrendingUp className="h-4 w-4 mr-2" />
              Behavior Analysis
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Star className="h-4 w-4 mr-2" />
              Loyalty Program
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Users className="h-4 w-4 mr-2" />
              Client Segmentation
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

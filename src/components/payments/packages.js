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
  Package,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  DollarSign,
  Star
} from "lucide-react";

const mockPackages = [
  {
    id: "PKG-001",
    name: "Botox VIP Package",
    description: "3 Botox sessions with 20% discount",
    price: 960.00,
    originalPrice: 1200.00,
    sessions: 3,
    validity: 6,
    status: "active",
    clientsCount: 15,
    revenue: 14400.00,
    createdAt: "2025-01-15"
  },
  {
    id: "PKG-002",
    name: "Hydrafacial Monthly",
    description: "Monthly Hydrafacial treatments",
    price: 150.00,
    originalPrice: 180.00,
    sessions: 1,
    validity: 1,
    status: "active",
    clientsCount: 8,
    revenue: 1200.00,
    createdAt: "2025-02-01"
  },
  {
    id: "PKG-003",
    name: "Complete Skin Rejuvenation",
    description: "Laser treatments + Hydrafacial combo",
    price: 800.00,
    originalPrice: 1000.00,
    sessions: 4,
    validity: 12,
    status: "active",
    clientsCount: 5,
    revenue: 4000.00,
    createdAt: "2025-03-10"
  },
  {
    id: "PKG-004",
    name: "Hair Removal Series",
    description: "6-session laser hair removal package",
    price: 750.00,
    originalPrice: 900.00,
    sessions: 6,
    validity: 18,
    status: "inactive",
    clientsCount: 12,
    revenue: 9000.00,
    createdAt: "2024-11-20"
  }
];

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200"
};

export function Packages({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredPackages = mockPackages.filter(pkg => {
    const matchesSearch = 
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter;
    
    let matchesPrice = true;
    if (priceFilter !== "all") {
      if (priceFilter === "under-500") matchesPrice = pkg.price < 500;
      else if (priceFilter === "500-1000") matchesPrice = pkg.price >= 500 && pkg.price <= 1000;
      else if (priceFilter === "over-1000") matchesPrice = pkg.price > 1000;
    }
    
    return matchesSearch && matchesStatus && matchesPrice;
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

  const activeCount = mockPackages.filter(p => p.status === "active").length;
  const totalRevenue = mockPackages.reduce((sum, p) => sum + p.revenue, 0);
  const totalClients = mockPackages.reduce((sum, p) => sum + p.clientsCount, 0);

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
            <h1 className="text-2xl font-bold text-foreground">Packages & Memberships</h1>
            <p className="text-muted-foreground">Manage treatment packages and membership programs</p>
          </div>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Package
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Packages
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockPackages.length}
            </div>
            <p className="text-xs text-muted-foreground">All packages</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Active Packages
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeCount}
            </div>
            <p className="text-xs text-muted-foreground">Currently available</p>
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
            <p className="text-xs text-muted-foreground">From packages</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Package Clients
            </CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalClients}
            </div>
            <p className="text-xs text-muted-foreground">Active members</p>
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
                placeholder="Search packages by name, description, or ID..."
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
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-500">Under $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1000</SelectItem>
                <SelectItem value="over-1000">Over $1000</SelectItem>
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

      {/* Packages Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Packages & Memberships</CardTitle>
          <CardDescription>
            {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Validity (Months)</TableHead>
                <TableHead>Clients</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-mono text-sm">
                    {pkg.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>{pkg.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {pkg.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-green-600">
                        {formatCurrency(pkg.price)}
                      </div>
                      <div className="text-xs text-muted-foreground line-through">
                        {formatCurrency(pkg.originalPrice)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{pkg.sessions}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {pkg.validity} months
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{pkg.clientsCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-green-600">
                      {formatCurrency(pkg.revenue)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[pkg.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {pkg.status === "active" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : pkg.status === "inactive" ? (
                          <AlertCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        <span className="capitalize">{pkg.status}</span>
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
          <CardDescription>Common package management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Plus className="h-4 w-4 mr-2" />
              Package Templates
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export Packages
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Star className="h-4 w-4 mr-2" />
              Popular Packages
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <DollarSign className="h-4 w-4 mr-2" />
              Revenue Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  Calendar,
  DollarSign,
  ShoppingCart,
  Bell
} from "lucide-react";

const mockStockAlerts = [
  {
    id: "ALERT-001",
    productName: "Hydrafacial Serum",
    sku: "HF-SERUM",
    currentStock: 2,
    minStock: 10,
    category: "Skincare",
    supplier: "Hydrafacial",
    lastOrdered: "2025-11-20",
    status: "critical",
    estimatedDaysLeft: 3,
    reorderQuantity: 50,
    cost: 20.00
  },
  {
    id: "ALERT-002",
    productName: "Botox 50 Units",
    sku: "BOT-50",
    currentStock: 4,
    minStock: 5,
    category: "Injectables",
    supplier: "Allergan",
    lastOrdered: "2025-12-15",
    status: "warning",
    estimatedDaysLeft: 7,
    reorderQuantity: 20,
    cost: 200.00
  },
  {
    id: "ALERT-003",
    productName: "Juvederm Ultra",
    sku: "JUV-U",
    currentStock: 1,
    minStock: 3,
    category: "Fillers",
    supplier: "Allergan",
    lastOrdered: "2025-12-10",
    status: "critical",
    estimatedDaysLeft: 2,
    reorderQuantity: 15,
    cost: 300.00
  },
  {
    id: "ALERT-004",
    productName: "Laser Handpiece",
    sku: "LASER-HP",
    currentStock: 0,
    minStock: 1,
    category: "Equipment",
    supplier: "Candela",
    lastOrdered: "2025-10-05",
    status: "out_of_stock",
    estimatedDaysLeft: 0,
    reorderQuantity: 1,
    cost: 1500.00
  }
];

const statusColors = {
  critical: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  out_of_stock: "bg-red-100 text-red-800 border-red-200",
  low_stock: "bg-orange-100 text-orange-800 border-orange-200"
};

export function StockAlerts({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredAlerts = mockStockAlerts.filter(alert => {
    const matchesSearch = 
      alert.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || alert.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
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

  const criticalCount = mockStockAlerts.filter(a => a.status === "critical").length;
  const warningCount = mockStockAlerts.filter(a => a.status === "warning").length;
  const outOfStockCount = mockStockAlerts.filter(a => a.status === "out_of_stock").length;
  const totalReorderCost = mockStockAlerts.reduce((sum, a) => sum + (a.reorderQuantity * a.cost), 0);

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
            <h1 className="text-2xl font-bold text-foreground">Stock Alerts</h1>
            <p className="text-muted-foreground">Monitor inventory levels and manage reorders</p>
          </div>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Bell className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
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
            <p className="text-xs text-muted-foreground">Urgent reorder needed</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Warning Alerts
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {warningCount}
            </div>
            <p className="text-xs text-muted-foreground">Low stock warning</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Out of Stock
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {outOfStockCount}
            </div>
            <p className="text-xs text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Reorder Cost
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalReorderCost)}
            </div>
            <p className="text-xs text-muted-foreground">Total reorder value</p>
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
                placeholder="Search alerts by product name, SKU, or ID..."
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
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Injectables">Injectables</SelectItem>
                <SelectItem value="Fillers">Fillers</SelectItem>
                <SelectItem value="Skincare">Skincare</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
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

      {/* Alerts Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Stock Alerts</CardTitle>
          <CardDescription>
            {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Reorder Qty</TableHead>
                <TableHead>Status</TableHead>
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
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>{alert.productName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {alert.sku}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {alert.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {alert.currentStock}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground">
                      {alert.minStock}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className={alert.estimatedDaysLeft <= 3 ? "text-red-600 font-medium" : ""}>
                        {alert.estimatedDaysLeft} days
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {alert.supplier}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {alert.reorderQuantity}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[alert.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span className="capitalize">{alert.status.replace('_', ' ')}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ShoppingCart className="h-4 w-4" />
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
          <CardDescription>Common stock management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Bulk Reorder
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export Alerts
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Bell className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
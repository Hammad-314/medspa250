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
  DollarSign,
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
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const mockRevenueData = [
  {
    id: "REV-001",
    service: "Botox Injections",
    revenue: 12500.00,
    sessions: 45,
    avgPrice: 277.78,
    growth: "+15.2%",
    period: "2025-12",
    category: "Injectables"
  },
  {
    id: "REV-002",
    service: "Dermal Fillers",
    revenue: 9800.00,
    sessions: 28,
    avgPrice: 350.00,
    growth: "+8.7%",
    period: "2025-12",
    category: "Fillers"
  },
  {
    id: "REV-003",
    service: "Hydrafacial",
    revenue: 7200.00,
    sessions: 36,
    avgPrice: 200.00,
    growth: "+12.3%",
    period: "2025-12",
    category: "Skincare"
  },
  {
    id: "REV-004",
    service: "IV Therapy",
    revenue: 5900.00,
    sessions: 42,
    avgPrice: 140.48,
    growth: "+5.1%",
    period: "2025-12",
    category: "Wellness"
  },
  {
    id: "REV-005",
    service: "Laser Hair Removal",
    revenue: 4800.00,
    sessions: 24,
    avgPrice: 200.00,
    growth: "-2.1%",
    period: "2025-12",
    category: "Laser"
  }
];

const monthlyData = [
  { month: "Jan", revenue: 32000, appointments: 145 },
  { month: "Feb", revenue: 28000, appointments: 132 },
  { month: "Mar", revenue: 35000, appointments: 156 },
  { month: "Apr", revenue: 41000, appointments: 178 },
  { month: "May", revenue: 38000, appointments: 165 },
  { month: "Jun", revenue: 47000, appointments: 198 },
];

export function RevenueReports({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");

  const filteredData = mockRevenueData.filter(item => {
    const matchesSearch = 
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesPeriod = periodFilter === "all" || item.period === periodFilter;
    
    return matchesSearch && matchesCategory && matchesPeriod;
  });

  const formatCurrency = (amount) => 
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const totalRevenue = mockRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSessions = mockRevenueData.reduce((sum, item) => sum + item.sessions, 0);
  const avgTransactionValue = totalRevenue / totalSessions;
  const topService = mockRevenueData.reduce((max, item) => 
    item.revenue > max.revenue ? item : max, mockRevenueData[0]);

  const handleGenerateReport = () => {
    toast.success("Revenue report generated successfully");
  };

  const handleExportData = () => {
    toast.success("Revenue data exported to CSV");
  };

  const handleRefresh = () => {
    toast.success("Revenue data refreshed");
  };

  const handleViewDetails = (serviceId) => {
    toast.info(`Viewing details for service ${serviceId}`);
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
            <h1 className="text-2xl font-bold text-foreground">Revenue Reports</h1>
            <p className="text-muted-foreground">Analyze revenue trends and financial performance</p>
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
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Growth Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +12.5%
            </div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Top Service
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {topService.service}
            </div>
            <p className="text-xs text-muted-foreground">{formatCurrency(topService.revenue)}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg. Transaction
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(avgTransactionValue)}
            </div>
            <p className="text-xs text-muted-foreground">Per session</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
          <CardDescription>Revenue and appointment trends over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Revenue chart visualization</p>
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
                placeholder="Search services by name, category, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Injectables">Injectables</SelectItem>
                <SelectItem value="Fillers">Fillers</SelectItem>
                <SelectItem value="Skincare">Skincare</SelectItem>
                <SelectItem value="Wellness">Wellness</SelectItem>
                <SelectItem value="Laser">Laser</SelectItem>
              </SelectContent>
            </Select>
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                <SelectItem value="2025-12">December 2025</SelectItem>
                <SelectItem value="2025-11">November 2025</SelectItem>
                <SelectItem value="2025-10">October 2025</SelectItem>
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

      {/* Revenue Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Service Revenue Breakdown</CardTitle>
          <CardDescription>
            {filteredData.length} service{filteredData.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">
                    {item.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span>{item.service}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{item.sessions}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(item.avgPrice)}
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(item.revenue)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        item.growth.startsWith('+') 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      } border`}
                    >
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`h-3 w-3 ${
                          item.growth.startsWith('+') ? '' : 'rotate-180'
                        }`} />
                        <span>{item.growth}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {item.period}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(item.id)}
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
          <CardDescription>Common revenue reporting tasks</CardDescription>
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
              onClick={() => toast.info("Financial analytics coming soon")}
            >
              <PieChart className="h-4 w-4 mr-2" />
              Financial Analytics
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Custom reports coming soon")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Custom Reports
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:bg-primary/5"
              onClick={() => toast.info("Forecasting coming soon")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Forecasting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

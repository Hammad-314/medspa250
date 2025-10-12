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
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText
} from "lucide-react";

const mockPayments = [
  {
    id: "PAY-001",
    date: "2025-12-20",
    client: "Emma Johnson",
    service: "Botox Injections",
    amount: 400.00,
    method: "Credit Card",
    status: "completed",
    transactionId: "TXN-789456123",
    provider: "Dr. Chen",
    location: "Downtown Clinic"
  },
  {
    id: "PAY-002",
    date: "2025-12-19",
    client: "Sarah Davis",
    service: "Dermal Fillers",
    amount: 600.00,
    method: "Credit Card",
    status: "completed",
    transactionId: "TXN-789456124",
    provider: "Dr. Johnson",
    location: "Westside Location"
  },
  {
    id: "PAY-003",
    date: "2025-12-18",
    client: "Jessica Martinez",
    service: "Hydrafacial",
    amount: 180.00,
    method: "Cash",
    status: "completed",
    transactionId: "TXN-789456125",
    provider: "Dr. Smith",
    location: "Northside Branch"
  },
  {
    id: "PAY-004",
    date: "2025-12-17",
    client: "Amanda Wilson",
    service: "Laser Hair Removal",
    amount: 150.00,
    method: "Credit Card",
    status: "pending",
    transactionId: "TXN-789456126",
    provider: "Dr. Chen",
    location: "Downtown Clinic"
  },
  {
    id: "PAY-005",
    date: "2025-12-16",
    client: "Lisa Anderson",
    service: "IV Therapy",
    amount: 200.00,
    method: "Credit Card",
    status: "completed",
    transactionId: "TXN-789456127",
    provider: "Dr. Johnson",
    location: "Westside Location"
  },
  {
    id: "PAY-006",
    date: "2025-12-15",
    client: "Michael Chen",
    service: "PRP Treatment",
    amount: 500.00,
    method: "Credit Card",
    status: "refunded",
    transactionId: "TXN-789456128",
    provider: "Dr. Smith",
    location: "Northside Branch"
  },
  {
    id: "PAY-007",
    date: "2025-12-14",
    client: "Emma Johnson",
    service: "Package Deal - 3 Sessions",
    amount: 1200.00,
    method: "Credit Card",
    status: "completed",
    transactionId: "TXN-789456129",
    provider: "Dr. Chen",
    location: "Downtown Clinic"
  },
  {
    id: "PAY-008",
    date: "2025-12-13",
    client: "Sarah Davis",
    service: "Consultation Fee",
    amount: 75.00,
    method: "Cash",
    status: "completed",
    transactionId: "TXN-789456130",
    provider: "Dr. Johnson",
    location: "Westside Location"
  }
];

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  refunded: "bg-red-100 text-red-800 border-red-200",
  failed: "bg-gray-100 text-gray-800 border-gray-200"
};

const statusIcons = {
  completed: CheckCircle,
  pending: Clock,
  refunded: AlertCircle,
  failed: AlertCircle
};

export function PaymentHistory({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = 
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = mockPayments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = mockPayments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const refundedAmount = mockPayments
    .filter(p => p.status === "refunded")
    .reduce((sum, p) => sum + p.amount, 0);

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

  const getStatusIcon = (status) => {
    const IconComponent = statusIcons[status];
    return <IconComponent className="h-4 w-4" />;
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
            <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
            <p className="text-muted-foreground">View and manage all payment transactions</p>
          </div>
        </div>
        <Button
          onClick={() => onPageChange("payments/pos")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          New Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Pending Amount
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Refunded Amount
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(refundedAmount)}
            </div>
            <p className="text-xs text-muted-foreground">Total refunds</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Transactions
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockPayments.length}
            </div>
            <p className="text-xs text-muted-foreground">All time</p>
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
                placeholder="Search payments by client, service, or transaction ID..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Check">Check</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
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

      {/* Payment Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            {filteredPayments.length} payment{filteredPayments.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-sm">
                    {payment.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(payment.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {payment.client}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.service}</div>
                      <div className="text-sm text-muted-foreground">
                        {payment.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>{payment.method}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[payment.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(payment.status)}
                        <span className="capitalize">{payment.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {payment.provider}
                    </div>
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

      {/* Export Options */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>Download payment data in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


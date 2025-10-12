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
  Camera,
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
  Image,
  Upload
} from "lucide-react";

const mockPhotos = [
  {
    id: "PHOTO-001",
    clientName: "Emma Johnson",
    treatment: "Botox Injections",
    date: "2025-12-20",
    provider: "Dr. Chen",
    status: "approved",
    beforeCount: 3,
    afterCount: 3,
    consentStatus: "signed"
  },
  {
    id: "PHOTO-002",
    clientName: "Sarah Davis",
    treatment: "Dermal Fillers",
    date: "2025-12-19",
    provider: "Dr. Johnson",
    status: "pending",
    beforeCount: 2,
    afterCount: 2,
    consentStatus: "signed"
  },
  {
    id: "PHOTO-003",
    clientName: "Jessica Martinez",
    treatment: "Hydrafacial",
    date: "2025-12-18",
    provider: "Dr. Smith",
    status: "approved",
    beforeCount: 4,
    afterCount: 4,
    consentStatus: "signed"
  },
  {
    id: "PHOTO-004",
    clientName: "Amanda Wilson",
    treatment: "Laser Hair Removal",
    date: "2025-12-17",
    provider: "Dr. Chen",
    status: "review",
    beforeCount: 2,
    afterCount: 1,
    consentStatus: "pending"
  }
];

const statusColors = {
  approved: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  review: "bg-blue-100 text-blue-800 border-blue-200",
  rejected: "bg-red-100 text-red-800 border-red-200"
};

export function BeforeAfterPhotos({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");

  const filteredPhotos = mockPhotos.filter(photo => {
    const matchesSearch = 
      photo.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || photo.status === statusFilter;
    const matchesProvider = providerFilter === "all" || photo.provider === providerFilter;
    
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const approvedCount = mockPhotos.filter(p => p.status === "approved").length;
  const pendingCount = mockPhotos.filter(p => p.status === "pending").length;
  const reviewCount = mockPhotos.filter(p => p.status === "review").length;
  const totalPhotos = mockPhotos.reduce((sum, p) => sum + p.beforeCount + p.afterCount, 0);

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
            <h1 className="text-2xl font-bold text-foreground">Before/After Photos</h1>
            <p className="text-muted-foreground">Treatment documentation and progress tracking</p>
          </div>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Photos
            </CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {totalPhotos}
            </div>
            <p className="text-xs text-muted-foreground">All sessions</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Approved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {approvedCount}
            </div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
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
              {pendingCount}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              In Review
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {reviewCount}
            </div>
            <p className="text-xs text-muted-foreground">Being evaluated</p>
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
                placeholder="Search photos by client, treatment, or ID..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="Dr. Chen">Dr. Chen</SelectItem>
                <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
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

      {/* Photos Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Photo Sessions</CardTitle>
          <CardDescription>
            {filteredPhotos.length} photo session{filteredPhotos.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Before Photos</TableHead>
                <TableHead>After Photos</TableHead>
                <TableHead>Consent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPhotos.map((photo) => (
                <TableRow key={photo.id}>
                  <TableCell className="font-mono text-sm">
                    {photo.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {photo.clientName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                      <span>{photo.treatment}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{photo.provider}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(photo.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Image className="h-4 w-4 text-muted-foreground" />
                      <span>{photo.beforeCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Image className="h-4 w-4 text-muted-foreground" />
                      <span>{photo.afterCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        photo.consentStatus === "signed" 
                          ? "bg-green-100 text-green-800 border-green-200" 
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      } border`}
                    >
                      <div className="flex items-center space-x-1">
                        {photo.consentStatus === "signed" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        <span className="capitalize">{photo.consentStatus}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[photo.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {photo.status === "approved" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : photo.status === "pending" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        <span className="capitalize">{photo.status}</span>
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
          <CardDescription>Common photo management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export Gallery
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Camera className="h-4 w-4 mr-2" />
              Photo Templates
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <CheckCircle className="h-4 w-4 mr-2" />
              Batch Approve
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Stethoscope
} from "lucide-react";

const mockSOAPNotes = [
  {
    id: "SOAP-001",
    clientName: "Emma Johnson",
    treatment: "Botox Injections",
    date: "2025-12-20",
    provider: "Dr. Chen",
    status: "completed",
    subjective: "Client reports satisfaction with previous treatment results",
    objective: "No visible adverse reactions, treatment areas healing well",
    assessment: "Treatment successful, client ready for follow-up",
    plan: "Schedule follow-up appointment in 3 months"
  },
  {
    id: "SOAP-002",
    clientName: "Sarah Davis",
    treatment: "Dermal Fillers",
    date: "2025-12-19",
    provider: "Dr. Johnson",
    status: "draft",
    subjective: "Client concerned about asymmetry in previous treatment",
    objective: "Mild asymmetry noted in nasolabial folds",
    assessment: "Client concerns valid, correction needed",
    plan: "Schedule correction treatment in 2 weeks"
  },
  {
    id: "SOAP-003",
    clientName: "Jessica Martinez",
    treatment: "Hydrafacial",
    date: "2025-12-18",
    provider: "Dr. Smith",
    status: "completed",
    subjective: "Client reports improved skin texture and hydration",
    objective: "Skin appears more hydrated and smooth",
    assessment: "Treatment effective, skin condition improved",
    plan: "Continue monthly treatments for maintenance"
  },
  {
    id: "SOAP-004",
    clientName: "Amanda Wilson",
    treatment: "Laser Hair Removal",
    date: "2025-12-17",
    provider: "Dr. Chen",
    status: "pending",
    subjective: "Client reports significant hair reduction",
    objective: "Hair growth reduced by approximately 60%",
    assessment: "Treatment progressing as expected",
    plan: "Continue treatment series, next session in 4 weeks"
  }
];

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
  pending: "bg-blue-100 text-blue-800 border-blue-200"
};

export function SOAPNotes({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");

  const filteredNotes = mockSOAPNotes.filter(note => {
    const matchesSearch = 
      note.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || note.status === statusFilter;
    const matchesProvider = providerFilter === "all" || note.provider === providerFilter;
    
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const completedCount = mockSOAPNotes.filter(n => n.status === "completed").length;
  const draftCount = mockSOAPNotes.filter(n => n.status === "draft").length;
  const pendingCount = mockSOAPNotes.filter(n => n.status === "pending").length;

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
            <h1 className="text-2xl font-bold text-foreground">SOAP Notes</h1>
            <p className="text-muted-foreground">Treatment documentation and clinical notes</p>
          </div>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          New SOAP Note
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Notes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockSOAPNotes.length}
            </div>
            <p className="text-xs text-muted-foreground">All notes</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedCount}
            </div>
            <p className="text-xs text-muted-foreground">Finalized</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Drafts
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {draftCount}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Pending
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {pendingCount}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
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
                placeholder="Search SOAP notes by client, treatment, or ID..."
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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

      {/* SOAP Notes Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>SOAP Notes</CardTitle>
          <CardDescription>
            {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Note ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Subjective</TableHead>
                <TableHead>Objective</TableHead>
                <TableHead>Assessment</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell className="font-mono text-sm">
                    {note.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {note.clientName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="h-4 w-4 text-muted-foreground" />
                      <span>{note.treatment}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{note.provider}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(note.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {note.subjective}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {note.objective}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {note.assessment}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground truncate">
                      {note.plan}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[note.status]} border`}
                    >
                      <div className="flex items-center space-x-1">
                        {note.status === "completed" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : note.status === "draft" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        <span className="capitalize">{note.status}</span>
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
          <CardDescription>Common SOAP note management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Plus className="h-4 w-4 mr-2" />
              Template Library
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export Notes
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Stethoscope className="h-4 w-4 mr-2" />
              Clinical Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

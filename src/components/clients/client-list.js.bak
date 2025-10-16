"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Search,
  Filter,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Mock client data
const clients = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.johnson@email.com",
    phone: "(555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332b82?w=150&h=150&fit=crop&crop=face",
    age: 34,
    lastVisit: "2025-12-15",
    totalSpend: 2340,
    status: "active",
    memberSince: "2024-03-15",
    upcomingAppointments: 1,
    treatmentHistory: 8,
  },
  {
    id: "2",
    name: "Sarah Davis",
    email: "sarah.davis@email.com",
    phone: "(555) 234-5678",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    age: 42,
    lastVisit: "2025-12-10",
    totalSpend: 4280,
    status: "active",
    memberSince: "2023-11-22",
    upcomingAppointments: 0,
    treatmentHistory: 15,
  },
  {
    id: "3",
    name: "Jessica Martinez",
    email: "jessica.martinez@email.com",
    phone: "(555) 345-6789",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
    age: 28,
    lastVisit: "2025-11-28",
    totalSpend: 1560,
    status: "active",
    memberSince: "2024-08-10",
    upcomingAppointments: 2,
    treatmentHistory: 6,
  },
  {
    id: "4",
    name: "Amanda Wilson",
    email: "amanda.wilson@email.com",
    phone: "(555) 456-7890",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    age: 36,
    lastVisit: "2025-10-15",
    totalSpend: 890,
    status: "inactive",
    memberSince: "2024-01-20",
    upcomingAppointments: 0,
    treatmentHistory: 3,
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "(555) 567-8901",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    age: 31,
    lastVisit: "2025-12-18",
    totalSpend: 3200,
    status: "active",
    memberSince: "2023-06-12",
    upcomingAppointments: 1,
    treatmentHistory: 12,
  },
  {
    id: "6",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "(555) 678-9012",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    age: 39,
    lastVisit: "2025-12-12",
    totalSpend: 1890,
    status: "active",
    memberSince: "2024-02-28",
    upcomingAppointments: 0,
    treatmentHistory: 7,
  },
];

export function ClientList({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Client Management
          </h1>
          <p className="text-muted-foreground">
            Manage your client database and relationships
          </p>
        </div>
        <Button
          onClick={() => onPageChange("clients/add")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Clients
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {clients.length}
            </div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Active Clients
            </CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {clients.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg. Spend
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(
                clients.reduce((sum, c) => sum + c.totalSpend, 0) /
                  clients.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">Per client</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {clients.reduce((sum, c) => sum + c.upcomingAppointments, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <Button
              variant="outline"
              className="border-border hover:bg-primary/5 hover:border-primary/30"
            >
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Treatments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  {/* Client Info */}
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {client.age} years old
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Member since {formatDate(client.memberSince)}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Last Visit */}
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(client.lastVisit)}
                    </div>
                  </TableCell>

                  {/* Spend */}
                  <TableCell>
                    <div className="font-medium">
                      {formatCurrency(client.totalSpend)}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={client.status === "active" ? "default" : "secondary"}
                    >
                      {client.status}
                    </Badge>
                  </TableCell>

                  {/* Treatments */}
                  <TableCell>
                    <div className="text-sm">
                      <div>{client.treatmentHistory} completed</div>
                      {client.upcomingAppointments > 0 && (
                        <div className="text-muted-foreground">
                          {client.upcomingAppointments} upcoming
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" /> Call Client
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" /> Send Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

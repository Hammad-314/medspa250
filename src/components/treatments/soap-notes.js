"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
  Stethoscope,
  Loader2,
  Save,
  X,
  Trash2
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../utils/api";
import { useAuth } from "../auth-context";

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
  pending: "bg-blue-100 text-blue-800 border-blue-200"
};

export function SOAPNotes({ onPageChange }) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const [soapNotes, setSoapNotes] = useState([]);
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    client_id: '',
    appointment_id: '',
    provider_id: user?.id || '',
    note_date: new Date().toISOString().split('T')[0],
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  // Fetch SOAP notes from API
  useEffect(() => {
    fetchSoapNotes();
    fetchClients();
    fetchAppointments();
  }, []);

  const fetchSoapNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/soap-notes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        setSoapNotes(response.data.data);
      } else {
        setSoapNotes(response.data || []);
      }
    } catch (err) {
      console.error('SOAP notes fetch error:', err.response?.data || err.message);
      setError('Failed to load SOAP notes');
      toast.error('Failed to load SOAP notes');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/clients`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        setClients(response.data.data);
      } else {
        setClients(response.data || []);
      }
    } catch (err) {
      console.error('Clients fetch error:', err.response?.data || err.message);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        setAppointments(response.data.data);
      } else {
        setAppointments(response.data || []);
      }
    } catch (err) {
      console.error('Appointments fetch error:', err.response?.data || err.message);
    }
  };

  // CRUD Functions
  const handleCreate = async () => {
    try {
      setIsSaving(true);
      
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_URL}/soap-notes`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      toast.success('SOAP note created successfully!');
      setIsCreateModalOpen(false);
      resetForm();
      fetchSoapNotes();
    } catch (err) {
      console.error('SOAP note creation error:', err.response?.data || err.message);
      toast.error('Failed to create SOAP note');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setFormData({
      client_id: note.client_id || '',
      appointment_id: note.appointment_id || '',
      provider_id: note.provider_id || '',
      note_date: note.note_date || '',
      subjective: note.subjective || '',
      objective: note.objective || '',
      assessment: note.assessment || '',
      plan: note.plan || ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      
      const token = localStorage.getItem('access_token');
      const response = await axios.put(`${API_URL}/soap-notes/${selectedNote.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      toast.success('SOAP note updated successfully!');
      setIsEditModalOpen(false);
      setSelectedNote(null);
      resetForm();
      fetchSoapNotes();
    } catch (err) {
      console.error('SOAP note update error:', err.response?.data || err.message);
      toast.error('Failed to update SOAP note');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      setIsDeleting(true);
      
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_URL}/soap-notes/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      toast.success('SOAP note deleted successfully!');
      fetchSoapNotes();
    } catch (err) {
      console.error('SOAP note deletion error:', err.response?.data || err.message);
      toast.error('Failed to delete SOAP note');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleView = (note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      client_id: '',
      appointment_id: '',
      provider_id: user?.id || '',
      note_date: new Date().toISOString().split('T')[0],
      subjective: '',
      objective: '',
      assessment: '',
      plan: ''
    });
  };

  const filteredNotes = soapNotes.filter(note => {
    const clientName = note.client?.name || note.client?.clientUser?.name || 'Unknown Client';
    const providerName = note.provider?.name || 'Unknown Provider';
    
    const matchesSearch = 
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.id.toString().includes(searchTerm.toLowerCase());
    
    const matchesProvider = providerFilter === "all" || providerName === providerFilter;
    
    return matchesSearch && matchesProvider;
  });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const completedCount = soapNotes.length; // All notes are considered completed
  const draftCount = 0; // We can implement draft status later
  const pendingCount = 0; // We can implement pending status later

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading SOAP notes...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading SOAP Notes</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchSoapNotes}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
          onClick={() => setIsCreateModalOpen(true)}
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
              {soapNotes.length}
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
              {filteredNotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No SOAP notes found</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsCreateModalOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Note
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredNotes.map((note) => {
                  const clientName = note.client?.name || note.client?.clientUser?.name || 'Unknown Client';
                  const providerName = note.provider?.name || 'Unknown Provider';
                  const appointmentInfo = note.appointment ? `${note.appointment.service?.name || 'Treatment'}` : 'No appointment';
                  
                  return (
                    <TableRow key={note.id}>
                      <TableCell className="font-mono text-sm">
                        #{note.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {clientName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="h-4 w-4 text-muted-foreground" />
                          <span>{appointmentInfo}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{providerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(note.note_date)}</span>
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
                          className="bg-green-100 text-green-800 border-green-200 border"
                        >
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3" />
                            <span className="capitalize">completed</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleView(note)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(note)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                disabled={isDeleting}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                {isDeleting ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete SOAP Note</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this SOAP note? This action cannot be undone.
                                  <br />
                                  <br />
                                  <strong>Note ID:</strong> #{note.id}
                                  <br />
                                  <strong>Client:</strong> {clientName}
                                  <br />
                                  <strong>Date:</strong> {formatDate(note.note_date)}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(note.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Delete Note
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
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

      {/* Create SOAP Note Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create New SOAP Note</span>
            </DialogTitle>
            <DialogDescription>
              Document clinical observations and treatment plans
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Client</Label>
                    <Select value={formData.client_id} onValueChange={(value) => setFormData({...formData, client_id: value})}>
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name || client.clientUser?.name || 'Unknown Client'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Appointment</Label>
                    <Select value={formData.appointment_id} onValueChange={(value) => setFormData({...formData, appointment_id: value})}>
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue placeholder="Select appointment (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No appointment</SelectItem>
                        {appointments.map((appointment) => (
                          <SelectItem key={appointment.id} value={appointment.id.toString()}>
                            {appointment.service?.name || 'Treatment'} - {formatDate(appointment.appointment_date)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                    <Input
                      type="date"
                      value={formData.note_date}
                      onChange={(e) => setFormData({...formData, note_date: e.target.value})}
                      className="bg-input-background border-border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SOAP Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SOAP Documentation</CardTitle>
                <CardDescription>Complete all sections for comprehensive documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Subjective</Label>
                  <Textarea
                    value={formData.subjective}
                    onChange={(e) => setFormData({...formData, subjective: e.target.value})}
                    placeholder="Patient's complaints, symptoms, and concerns..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Objective</Label>
                  <Textarea
                    value={formData.objective}
                    onChange={(e) => setFormData({...formData, objective: e.target.value})}
                    placeholder="Observable findings, measurements, and clinical observations..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Assessment</Label>
                  <Textarea
                    value={formData.assessment}
                    onChange={(e) => setFormData({...formData, assessment: e.target.value})}
                    placeholder="Clinical diagnosis, analysis, and interpretation..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Plan</Label>
                  <Textarea
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    placeholder="Treatment plan, follow-up instructions, and recommendations..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetForm();
                }}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={isSaving || !formData.client_id || !formData.subjective || !formData.objective || !formData.assessment || !formData.plan}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Note
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View SOAP Note Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>SOAP Note Details</span>
            </DialogTitle>
            <DialogDescription>
              Clinical documentation and treatment notes
            </DialogDescription>
          </DialogHeader>
          
          {selectedNote && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Client</Label>
                      <p className="text-sm font-medium">
                        {selectedNote.client?.name || selectedNote.client?.clientUser?.name || 'Unknown Client'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Provider</Label>
                      <p className="text-sm font-medium">
                        {selectedNote.provider?.name || 'Unknown Provider'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                      <p className="text-sm font-medium">
                        {formatDate(selectedNote.note_date)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SOAP Sections */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SOAP Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Subjective</Label>
                    <div className="mt-2 p-3 bg-muted/50 rounded-md">
                      <p className="text-sm whitespace-pre-wrap">{selectedNote.subjective}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Objective</Label>
                    <div className="mt-2 p-3 bg-muted/50 rounded-md">
                      <p className="text-sm whitespace-pre-wrap">{selectedNote.objective}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Assessment</Label>
                    <div className="mt-2 p-3 bg-muted/50 rounded-md">
                      <p className="text-sm whitespace-pre-wrap">{selectedNote.assessment}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Plan</Label>
                    <div className="mt-2 p-3 bg-muted/50 rounded-md">
                      <p className="text-sm whitespace-pre-wrap">{selectedNote.plan}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEdit(selectedNote);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Note
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit SOAP Note Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit SOAP Note</span>
            </DialogTitle>
            <DialogDescription>
              Update clinical documentation and treatment notes
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Client</Label>
                    <Select value={formData.client_id} onValueChange={(value) => setFormData({...formData, client_id: value})}>
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name || client.clientUser?.name || 'Unknown Client'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Appointment</Label>
                    <Select value={formData.appointment_id} onValueChange={(value) => setFormData({...formData, appointment_id: value})}>
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue placeholder="Select appointment (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No appointment</SelectItem>
                        {appointments.map((appointment) => (
                          <SelectItem key={appointment.id} value={appointment.id.toString()}>
                            {appointment.service?.name || 'Treatment'} - {formatDate(appointment.appointment_date)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                    <Input
                      type="date"
                      value={formData.note_date}
                      onChange={(e) => setFormData({...formData, note_date: e.target.value})}
                      className="bg-input-background border-border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SOAP Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SOAP Documentation</CardTitle>
                <CardDescription>Update all sections for comprehensive documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Subjective</Label>
                  <Textarea
                    value={formData.subjective}
                    onChange={(e) => setFormData({...formData, subjective: e.target.value})}
                    placeholder="Patient's complaints, symptoms, and concerns..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Objective</Label>
                  <Textarea
                    value={formData.objective}
                    onChange={(e) => setFormData({...formData, objective: e.target.value})}
                    placeholder="Observable findings, measurements, and clinical observations..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Assessment</Label>
                  <Textarea
                    value={formData.assessment}
                    onChange={(e) => setFormData({...formData, assessment: e.target.value})}
                    placeholder="Clinical diagnosis, analysis, and interpretation..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Plan</Label>
                  <Textarea
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    placeholder="Treatment plan, follow-up instructions, and recommendations..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedNote(null);
                  resetForm();
                }}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isSaving || !formData.client_id || !formData.subjective || !formData.objective || !formData.assessment || !formData.plan}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Note
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

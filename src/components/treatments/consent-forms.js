"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ConsentFormUpload } from "./ConsentFormUpload";
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
  Loader2,
  Trash2,
  Save,
  X
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../utils/api";

const statusColors = {
  signed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  expired: "bg-red-100 text-red-800 border-red-200"
};

export function ConsentForms({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [consents, setConsents] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedConsent, setSelectedConsent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Edit form data
  const [editFormData, setEditFormData] = useState({
    client_id: '',
    service_id: '',
    form_type: '',
    digital_signature: '',
    file: null
  });

  // Fetch consent forms from API
  useEffect(() => {
    fetchConsents();
    fetchClients();
    fetchServices();
  }, []);

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

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/services`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        setServices(response.data.data);
      } else {
        setServices(response.data || []);
      }
    } catch (err) {
      console.error('Services fetch error:', err.response?.data || err.message);
    }
  };

  const fetchConsents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/consents`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        setConsents(response.data.data);
      } else {
        setConsents(response.data || []);
      }
    } catch (err) {
      console.error('Consent fetch error:', err.response?.data || err.message);
      setError('Failed to load consent forms');
      toast.error('Failed to load consent forms');
    } finally {
      setLoading(false);
    }
  };

  // CRUD Functions
  const handleEdit = (consent) => {
    setSelectedConsent(consent);
    setEditFormData({
      client_id: consent.client_id || '',
      service_id: consent.service_id || '',
      form_type: consent.form_type || '',
      digital_signature: consent.digital_signature || '',
      file: null
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      
      formData.append('client_id', editFormData.client_id);
      formData.append('service_id', editFormData.service_id);
      formData.append('form_type', editFormData.form_type);
      formData.append('digital_signature', editFormData.digital_signature);
      
      if (editFormData.file) {
        formData.append('file', editFormData.file);
      }

      const response = await axios.post(`${API_URL}/consents/${selectedConsent.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Consent form updated successfully!');
      setIsEditModalOpen(false);
      setSelectedConsent(null);
      resetEditForm();
      fetchConsents();
    } catch (err) {
      console.error('Consent form update error:', err.response?.data || err.message);
      toast.error('Failed to update consent form');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (consentId) => {
    try {
      setIsDeleting(true);
      
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_URL}/consents/${consentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      toast.success('Consent form deleted successfully!');
      fetchConsents();
    } catch (err) {
      console.error('Consent form deletion error:', err.response?.data || err.message);
      toast.error('Failed to delete consent form');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleView = (consent) => {
    setSelectedConsent(consent);
    setIsViewModalOpen(true);
  };

  const resetEditForm = () => {
    setEditFormData({
      client_id: '',
      service_id: '',
      form_type: '',
      digital_signature: '',
      file: null
    });
  };

  const filteredConsents = consents.filter(consent => {
    const clientName = consent.client?.name || consent.client?.clientUser?.name || 'Unknown Client';
    const serviceName = consent.service?.name || 'Unknown Service';
    const formType = consent.form_type || 'Unknown Type';
    
    const matchesSearch = 
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consent.id.toString().includes(searchTerm.toLowerCase());
    
    // Determine status based on date_signed
    const status = consent.date_signed ? 'signed' : 'pending';
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    const matchesType = typeFilter === "all" || formType.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) : "Not signed";

  const signedCount = consents.filter(c => c.date_signed).length;
  const pendingCount = consents.filter(c => !c.date_signed).length;
  const expiredCount = 0; // We can implement expiry logic later

  // Show upload form if requested
  if (showUploadForm) {
    return (
      <ConsentFormUpload 
        onBack={() => setShowUploadForm(false)}
        onSuccess={() => {
          setShowUploadForm(false);
          fetchConsents(); // Refresh the list
        }}
      />
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading consent forms...</span>
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
          <h3 className="text-lg font-semibold mb-2">Error Loading Consent Forms</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchConsents}>
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
            <h1 className="text-2xl font-bold text-foreground">Digital Consent Forms</h1>
            <p className="text-muted-foreground">Manage client consent forms and treatment agreements</p>
          </div>
        </div>
        <Button
          onClick={() => setShowUploadForm(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Consent Form
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Consents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {consents.length}
            </div>
            <p className="text-xs text-muted-foreground">All forms</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Signed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {signedCount}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingCount}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting signature</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Expired
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {expiredCount}
            </div>
            <p className="text-xs text-muted-foreground">Need renewal</p>
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
                placeholder="Search consents by client, treatment, or ID..."
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
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] bg-input-background border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Treatment Consent">Treatment Consent</SelectItem>
                <SelectItem value="Photo Consent">Photo Consent</SelectItem>
                <SelectItem value="Privacy Consent">Privacy Consent</SelectItem>
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

      {/* Consents Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Consent Forms</CardTitle>
          <CardDescription>
            {filteredConsents.length} consent form{filteredConsents.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Consent ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Signed Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No consent forms found</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowUploadForm(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Upload First Form
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredConsents.map((consent) => {
                  const clientName = consent.client?.name || consent.client?.clientUser?.name || 'Unknown Client';
                  const serviceName = consent.service?.name || 'Unknown Service';
                  const formType = consent.form_type || 'Unknown Type';
                  const status = consent.date_signed ? 'signed' : 'pending';
                  
                  return (
                    <TableRow key={consent.id}>
                      <TableCell className="font-mono text-sm">
                        #{consent.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {clientName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{serviceName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formType}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">System</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(consent.date_signed)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>N/A</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${statusColors[status]} border`}
                        >
                          <div className="flex items-center space-x-1">
                            {status === "signed" ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            <span className="capitalize">{status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleView(consent)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(consent)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              if (consent.file_url) {
                                const link = document.createElement('a');
                                link.href = `${API_URL.replace('/api', '')}/storage/${consent.file_url}`;
                                link.download = `consent-${consent.id}.pdf`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              } else {
                                toast.error('No file available for download');
                              }
                            }}
                          >
                            <Download className="h-4 w-4" />
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
                                <AlertDialogTitle>Delete Consent Form</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this consent form? This action cannot be undone.
                                  <br />
                                  <br />
                                  <strong>Form ID:</strong> #{consent.id}
                                  <br />
                                  <strong>Client:</strong> {clientName}
                                  <br />
                                  <strong>Type:</strong> {formType}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(consent.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Delete Form
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
          <CardDescription>Common consent management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Plus className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <Download className="h-4 w-4 mr-2" />
              Export Consents
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="border-border hover:bg-primary/5">
              <AlertCircle className="h-4 w-4 mr-2" />
              Send Reminders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* View Consent Form Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Consent Form Details</span>
            </DialogTitle>
            <DialogDescription>
              View consent form information and file
            </DialogDescription>
          </DialogHeader>
          
          {selectedConsent && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Form Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Form ID</Label>
                      <p className="text-sm font-medium">#{selectedConsent.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Form Type</Label>
                      <p className="text-sm font-medium">{selectedConsent.form_type}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Client</Label>
                      <p className="text-sm font-medium">
                        {selectedConsent.client?.name || selectedConsent.client?.clientUser?.name || 'Unknown Client'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Service</Label>
                      <p className="text-sm font-medium">
                        {selectedConsent.service?.name || 'No service specified'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Date Signed</Label>
                      <p className="text-sm font-medium">
                        {selectedConsent.date_signed ? formatDate(selectedConsent.date_signed) : 'Not signed'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                      <Badge
                        variant="outline"
                        className={`${statusColors[selectedConsent.date_signed ? 'signed' : 'pending']} border`}
                      >
                        {selectedConsent.date_signed ? 'Signed' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Digital Signature */}
              {selectedConsent.digital_signature && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Digital Signature</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-mono">{selectedConsent.digital_signature}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* File Information */}
              {selectedConsent.file_url && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Attached File</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">File: {selectedConsent.file_url}</p>
                        <p className="text-xs text-muted-foreground">Uploaded file</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            window.open(`${API_URL.replace('/api', '')}/storage/${selectedConsent.file_url}`, '_blank');
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = `${API_URL.replace('/api', '')}/storage/${selectedConsent.file_url}`;
                            link.download = `consent-${selectedConsent.id}.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                    handleEdit(selectedConsent);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Form
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Consent Form Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Consent Form</span>
            </DialogTitle>
            <DialogDescription>
              Update consent form information and file
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Form Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Form Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Client</Label>
                    <Select value={editFormData.client_id} onValueChange={(value) => setEditFormData({...editFormData, client_id: value})}>
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
                    <Label className="text-sm font-medium text-muted-foreground">Service</Label>
                    <Select value={editFormData.service_id} onValueChange={(value) => setEditFormData({...editFormData, service_id: value})}>
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue placeholder="Select service (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No service</SelectItem>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Form Type</Label>
                  <Select value={editFormData.form_type} onValueChange={(value) => setEditFormData({...editFormData, form_type: value})}>
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue placeholder="Select form type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consent">Treatment Consent</SelectItem>
                      <SelectItem value="gfe">Good Faith Estimate (GFE)</SelectItem>
                      <SelectItem value="intake">Intake Form</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Digital Signature</Label>
                  <Textarea
                    value={editFormData.digital_signature}
                    onChange={(e) => setEditFormData({...editFormData, digital_signature: e.target.value})}
                    placeholder="Digital signature or initials..."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Replace File (Optional)</Label>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setEditFormData({...editFormData, file: e.target.files[0]})}
                    className="bg-input-background border-border"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF or image files only. Max size: 5MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedConsent(null);
                  resetEditForm();
                }}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isSaving || !editFormData.client_id || !editFormData.form_type}
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
                    Update Form
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

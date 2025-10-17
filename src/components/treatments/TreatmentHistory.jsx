"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { toast } from "sonner";
import { useAuth } from "../auth-context";
import { API_URL } from "../../utils/api";
import axios from "axios";
import { 
  ArrowLeft,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Stethoscope,
  Camera,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  FileText,
  Image as ImageIcon,
  Save,
  X
} from "lucide-react";

export function TreatmentHistory({ clientId, clientName, onBack }) {
  const { user } = useAuth();
  const [treatments, setTreatments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    notes: "",
    before_photo: null,
    after_photo: null,
    treatment_type: "",
    cost: "",
    description: "",
    status: "completed"
  });

  // Load treatments for the specific client
  useEffect(() => {
    if (clientId) {
      loadTreatments();
    }
  }, [clientId]);

  const loadTreatments = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/treatments?client_id=${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setTreatments(response.data.data || response.data);
    } catch (error) {
      console.error('Error loading treatments:', error);
      // Fallback to mock data for demo
      setTreatments([
        {
          id: 1,
          appointment_id: 1,
          provider_id: user?.id || 1,
          notes: "Patient responded well to treatment. No adverse reactions observed. Skin appears smoother and more youthful. Follow-up recommended in 3 months.",
          treatment_type: "Botox Injections",
          cost: 350,
          status: "completed",
          description: "Forehead and crow's feet treatment",
          before_photo: "treatments/before_1.jpg",
          after_photo: "treatments/after_1.jpg",
          treatment_date: "2025-01-15T10:30:00Z",
          appointment: {
            client: { name: clientName || "Emma Johnson" },
            service: { name: "Botox Injections" }
          },
          provider: { name: user?.name || "Dr. Smith" }
        },
        {
          id: 2,
          appointment_id: 2,
          provider_id: user?.id || 1,
          notes: "Initial consultation and treatment planning. Patient has sensitive skin, recommended gentle approach. Treatment area prepared and marked.",
          treatment_type: "Dermal Fillers",
          cost: 650,
          status: "completed",
          description: "Lip enhancement and cheek contouring",
          before_photo: "treatments/before_2.jpg",
          after_photo: null,
          treatment_date: "2025-01-10T14:00:00Z",
          appointment: {
            client: { name: clientName || "Emma Johnson" },
            service: { name: "Dermal Fillers" }
          },
          provider: { name: user?.name || "Dr. Smith" }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (treatment) => {
    setSelectedTreatment(treatment);
    setIsModalOpen(true);
  };

  const handleEdit = (treatment) => {
    setSelectedTreatment(treatment);
    setEditFormData({
      notes: treatment.notes || "",
      before_photo: null,
      after_photo: null,
      treatment_type: treatment.treatment_type || "",
      cost: treatment.cost?.toString() || "",
      description: treatment.description || "",
      status: treatment.status || "completed"
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload an image file (JPG, PNG)');
        return;
      }
      
      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setEditFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedTreatment) return;

    // Validate required fields
    if (!editFormData.notes.trim()) {
      toast.error('Please enter treatment notes');
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem('access_token');
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('notes', editFormData.notes);
      submitData.append('treatment_type', editFormData.treatment_type);
      submitData.append('cost', editFormData.cost);
      submitData.append('description', editFormData.description);
      submitData.append('status', editFormData.status);
      
      if (editFormData.before_photo) {
        submitData.append('before_photo', editFormData.before_photo);
      }
      if (editFormData.after_photo) {
        submitData.append('after_photo', editFormData.after_photo);
      }

      await axios.put(`${API_URL}/treatments/${selectedTreatment.id}`, submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Treatment updated successfully!');
      setIsEditModalOpen(false);
      loadTreatments(); // Reload the list

    } catch (error) {
      console.error('Error updating treatment:', error);
      
      let errorMessage = 'Failed to update treatment';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditFormData({
      notes: "",
      before_photo: null,
      after_photo: null,
      treatment_type: "",
      cost: "",
      description: "",
      status: "completed"
    });
    
    // Clear file inputs
    const beforeInput = document.getElementById('edit-before-photo');
    const afterInput = document.getElementById('edit-after-photo');
    if (beforeInput) beforeInput.value = '';
    if (afterInput) afterInput.value = '';
  };

  const handleDelete = async (treatmentId) => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_URL}/treatments/${treatmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      toast.success('Treatment record deleted successfully!');
      loadTreatments(); // Reload the list
    } catch (error) {
      console.error('Error deleting treatment:', error);
      toast.error('Failed to delete treatment record');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return "bg-green-100 text-green-800 border-green-200";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'canceled':
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'canceled':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getPhotoThumbnail = (photoPath) => {
    if (!photoPath) return null;
    
    // Generate thumbnail URL from storage path
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}/storage/${photoPath}`;
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading treatment history...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Treatment History</h1>
          <p className="text-muted-foreground">
            Treatment records for {clientName || 'Client'}
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="h-5 w-5" />
            <span>Treatment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{treatments.length}</div>
              <div className="text-sm text-muted-foreground">Total Treatments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {treatments.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {treatments.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${treatments.reduce((sum, t) => sum + (parseFloat(t.cost) || 0), 0).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatments Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Treatment Records</span>
          </CardTitle>
          <CardDescription>
            {treatments.length} treatment record{treatments.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {treatments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No treatment records found</p>
              <p className="text-sm">This client hasn't had any treatments yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Notes Preview</TableHead>
                  <TableHead>Photos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {formatDate(treatment.treatment_date)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{treatment.provider?.name || 'Unknown Provider'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{treatment.treatment_type}</div>
                        {treatment.description && (
                          <div className="text-xs text-muted-foreground">
                            {treatment.description}
                          </div>
                        )}
                        {treatment.cost && (
                          <div className="text-xs text-green-600 font-medium">
                            ${parseFloat(treatment.cost).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-muted-foreground">
                          {truncateText(treatment.notes, 60)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {treatment.before_photo && (
                          <div className="relative group">
                            <div className="w-8 h-8 bg-gray-100 rounded border flex items-center justify-center">
                              <ImageIcon className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="absolute -top-8 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Before Photo
                            </div>
                          </div>
                        )}
                        {treatment.after_photo && (
                          <div className="relative group">
                            <div className="w-8 h-8 bg-gray-100 rounded border flex items-center justify-center">
                              <ImageIcon className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="absolute -top-8 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              After Photo
                            </div>
                          </div>
                        )}
                        {!treatment.before_photo && !treatment.after_photo && (
                          <span className="text-xs text-muted-foreground">No photos</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(treatment.status)} border`}
                      >
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(treatment.status)}
                          <span className="capitalize">{treatment.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleView(treatment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(treatment)}
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
                              <AlertDialogTitle>Delete Treatment Record</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this treatment record? This action cannot be undone.
                                <br />
                                <br />
                                <strong>Treatment:</strong> {treatment.treatment_type}
                                <br />
                                <strong>Date:</strong> {formatDate(treatment.treatment_date)}
                                <br />
                                <strong>Provider:</strong> {treatment.provider?.name}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(treatment.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete Treatment
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Treatment Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5" />
              <span>Treatment Details</span>
            </DialogTitle>
            <DialogDescription>
              Complete treatment record information
            </DialogDescription>
          </DialogHeader>
          
          {selectedTreatment && (
            <div className="space-y-6">
              {/* Treatment Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Treatment Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Treatment Type</Label>
                      <p className="text-lg font-medium">{selectedTreatment.treatment_type}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Provider</Label>
                      <p className="text-lg font-medium">{selectedTreatment.provider?.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                      <p className="text-lg font-medium">{formatDate(selectedTreatment.treatment_date)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(selectedTreatment.status)} border`}
                      >
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(selectedTreatment.status)}
                          <span className="capitalize">{selectedTreatment.status}</span>
                        </div>
                      </Badge>
                    </div>
                    {selectedTreatment.cost && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Cost</Label>
                        <p className="text-lg font-medium text-green-600">
                          ${parseFloat(selectedTreatment.cost).toFixed(2)}
                        </p>
                      </div>
                    )}
                    {selectedTreatment.description && (
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                        <p className="text-lg font-medium">{selectedTreatment.description}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Treatment Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{selectedTreatment.notes}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Photos */}
              {(selectedTreatment.before_photo || selectedTreatment.after_photo) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Treatment Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTreatment.before_photo && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Before Photo</Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                            <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Before photo available</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Path: {selectedTreatment.before_photo}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedTreatment.after_photo && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">After Photo</Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                            <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">After photo available</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Path: {selectedTreatment.after_photo}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    handleEdit(selectedTreatment);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Treatment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Treatment Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Treatment Record</span>
            </DialogTitle>
            <DialogDescription>
              Update treatment details and photos
            </DialogDescription>
          </DialogHeader>
          
          {selectedTreatment && (
            <div className="space-y-6">
              {/* Treatment Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Treatment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Treatment Type</Label>
                      <Input
                        value={editFormData.treatment_type}
                        onChange={(e) => handleEditInputChange('treatment_type', e.target.value)}
                        placeholder="e.g., Botox Injections, Dermal Fillers"
                        className="bg-input-background border-border"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Cost ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editFormData.cost}
                        onChange={(e) => handleEditInputChange('cost', e.target.value)}
                        placeholder="0.00"
                        className="bg-input-background border-border"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                      <Input
                        value={editFormData.description}
                        onChange={(e) => handleEditInputChange('description', e.target.value)}
                        placeholder="Brief description of the treatment"
                        className="bg-input-background border-border"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Treatment Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={editFormData.notes}
                    onChange={(e) => handleEditInputChange('notes', e.target.value)}
                    placeholder="Detailed notes about the treatment, patient response, side effects, etc."
                    className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={6}
                  />
                </CardContent>
              </Card>

              {/* Photo Uploads */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Update Photos</CardTitle>
                  <CardDescription>
                    Upload new photos to replace existing ones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Before Photo */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Before Photo</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        <input
                          id="edit-before-photo"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={(e) => handleEditFileChange('before_photo', e)}
                          className="hidden"
                        />
                        <label htmlFor="edit-before-photo" className="cursor-pointer">
                          <Camera className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">
                            {editFormData.before_photo ? editFormData.before_photo.name : 'Click to upload before photo'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG, PNG up to 5MB
                          </p>
                        </label>
                      </div>
                      {editFormData.before_photo && (
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>New before photo: {editFormData.before_photo.name}</span>
                        </div>
                      )}
                      {selectedTreatment.before_photo && !editFormData.before_photo && (
                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                          <ImageIcon className="h-4 w-4" />
                          <span>Current: {selectedTreatment.before_photo}</span>
                        </div>
                      )}
                    </div>

                    {/* After Photo */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">After Photo</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        <input
                          id="edit-after-photo"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={(e) => handleEditFileChange('after_photo', e)}
                          className="hidden"
                        />
                        <label htmlFor="edit-after-photo" className="cursor-pointer">
                          <Camera className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">
                            {editFormData.after_photo ? editFormData.after_photo.name : 'Click to upload after photo'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG, PNG up to 5MB
                          </p>
                        </label>
                      </div>
                      {editFormData.after_photo && (
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>New after photo: {editFormData.after_photo.name}</span>
                        </div>
                      )}
                      {selectedTreatment.after_photo && !editFormData.after_photo && (
                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                          <ImageIcon className="h-4 w-4" />
                          <span>Current: {selectedTreatment.after_photo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  disabled={isSaving || !editFormData.notes.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

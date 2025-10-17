"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useAuth } from "../auth-context";
import { API_URL } from "../../utils/api";
import axios from "axios";
import { 
  Upload, 
  FileText, 
  User, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Loader2,
  Edit,
  Trash2,
  Eye,
  Camera,
  Stethoscope,
  Clock
} from "lucide-react";

export function TreatmentNotes({ onBack }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [formData, setFormData] = useState({
    appointment_id: "",
    provider_id: user?.id || "",
    notes: "",
    before_photo: null,
    after_photo: null,
    treatment_type: "",
    cost: "",
    status: "completed",
    description: ""
  });

  // Load appointments and treatments on component mount
  useEffect(() => {
    loadAppointments();
    loadTreatments();
  }, []);

  const loadAppointments = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setAppointments(response.data.data || response.data);
    } catch (error) {
      console.error('Error loading appointments:', error);
      // Fallback to mock data for demo
      setAppointments([
        { 
          id: 1, 
          client_id: 1,
          appointment_time: "2025-01-15T10:00:00Z",
          start_time: "2025-01-15T10:00:00Z",
          end_time: "2025-01-15T11:00:00Z",
          status: "completed",
          client: { name: "Emma Johnson", email: "emma@example.com" },
          service: { name: "Botox Injections", price: 350 }
        },
        { 
          id: 2, 
          client_id: 2,
          appointment_time: "2025-01-16T14:00:00Z",
          start_time: "2025-01-16T14:00:00Z",
          end_time: "2025-01-16T15:00:00Z",
          status: "completed",
          client: { name: "Sarah Davis", email: "sarah@example.com" },
          service: { name: "Dermal Fillers", price: 650 }
        }
      ]);
    }
  };

  const loadTreatments = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/treatments`, {
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
          notes: "Patient responded well to treatment. No adverse reactions observed.",
          treatment_type: "Botox Injections",
          cost: 350,
          status: "completed",
          description: "Forehead and crow's feet treatment",
          before_photo: null,
          after_photo: null,
          treatment_date: "2025-01-15T10:30:00Z",
          appointment: {
            client: { name: "Emma Johnson" },
            service: { name: "Botox Injections" }
          },
          provider: { name: user?.name || "Dr. Smith" }
        }
      ]);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field, event) => {
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
      
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formData.appointment_id || !formData.notes) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('appointment_id', formData.appointment_id);
      submitData.append('provider_id', formData.provider_id);
      submitData.append('notes', formData.notes);
      
      if (formData.treatment_type) {
        submitData.append('treatment_type', formData.treatment_type);
      }
      if (formData.cost) {
        submitData.append('cost', formData.cost);
      }
      if (formData.status) {
        submitData.append('status', formData.status);
      }
      if (formData.description) {
        submitData.append('description', formData.description);
      }
      
      if (formData.before_photo) {
        submitData.append('before_photo', formData.before_photo);
      }
      if (formData.after_photo) {
        submitData.append('after_photo', formData.after_photo);
      }

      const url = editingTreatment 
        ? `${API_URL}/treatments/${editingTreatment.id}`
        : `${API_URL}/treatments`;
      
      const method = editingTreatment ? 'put' : 'post';

      const response = await axios[method](url, submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success(editingTreatment ? 'Treatment updated successfully!' : 'Treatment record created successfully!');

      // Reset form
      resetForm();
      
      // Reload treatments
      loadTreatments();

    } catch (error) {
      console.error('Error saving treatment:', error);
      
      let errorMessage = editingTreatment ? 'Failed to update treatment' : 'Failed to create treatment';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (treatment) => {
    setEditingTreatment(treatment);
    setFormData({
      appointment_id: treatment.appointment_id.toString(),
      provider_id: treatment.provider_id.toString(),
      notes: treatment.notes || "",
      before_photo: null,
      after_photo: null,
      treatment_type: treatment.treatment_type || "",
      cost: treatment.cost?.toString() || "",
      status: treatment.status || "completed",
      description: treatment.description || ""
    });
    
    // Scroll to form
    document.getElementById('treatment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (treatmentId) => {
    if (!confirm('Are you sure you want to delete this treatment record?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_URL}/treatments/${treatmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      toast.success('Treatment record deleted successfully!');
      loadTreatments();
    } catch (error) {
      console.error('Error deleting treatment:', error);
      toast.error('Failed to delete treatment record');
    }
  };

  const resetForm = () => {
    setFormData({
      appointment_id: "",
      provider_id: user?.id || "",
      notes: "",
      before_photo: null,
      after_photo: null,
      treatment_type: "",
      cost: "",
      status: "completed",
      description: ""
    });
    setEditingTreatment(null);
    
    // Clear file inputs
    const beforeInput = document.getElementById('before-photo');
    const afterInput = document.getElementById('after-photo');
    if (beforeInput) beforeInput.value = '';
    if (afterInput) afterInput.value = '';
  };

  const selectedAppointment = appointments.find(a => a.id == formData.appointment_id);
  const statusColors = {
    completed: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    canceled: "bg-red-100 text-red-800 border-red-200"
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
          <h1 className="text-2xl font-bold text-foreground">Treatment Notes</h1>
          <p className="text-muted-foreground">Record treatment details and upload photos</p>
        </div>
      </div>

      {/* Treatment Form */}
      <Card id="treatment-form" className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="h-5 w-5" />
            <span>{editingTreatment ? 'Edit Treatment Record' : 'Add Treatment Record'}</span>
          </CardTitle>
          <CardDescription>
            {editingTreatment ? 'Update the treatment details below' : 'Fill in the treatment details and upload photos'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appointment Selection */}
              <div className="space-y-2">
                <Label htmlFor="appointment_id" className="text-sm font-medium">
                  Select Appointment <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.appointment_id} 
                  onValueChange={(value) => handleInputChange('appointment_id', value)}
                >
                  <SelectTrigger className="bg-input-background border-border">
                    <SelectValue placeholder="Choose an appointment..." />
                  </SelectTrigger>
                  <SelectContent>
                    {appointments.map((appointment) => (
                      <SelectItem key={appointment.id} value={appointment.id.toString()}>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.client?.name || 'Unknown Client'}</span>
                          <span className="text-muted-foreground text-sm">
                            ({formatDate(appointment.appointment_time)})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedAppointment && (
                  <p className="text-sm text-muted-foreground">
                    Client: {selectedAppointment.client?.name} | Service: {selectedAppointment.service?.name}
                  </p>
                )}
              </div>

              {/* Provider (Auto-filled) */}
              <div className="space-y-2">
                <Label htmlFor="provider_id" className="text-sm font-medium">
                  Provider
                </Label>
                <Input
                  value={user?.name || 'Current User'}
                  disabled
                  className="bg-muted text-muted-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  Auto-filled from logged-in user
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Treatment Type */}
              <div className="space-y-2">
                <Label htmlFor="treatment_type" className="text-sm font-medium">
                  Treatment Type
                </Label>
                <Input
                  id="treatment_type"
                  placeholder="e.g., Botox Injections, Dermal Fillers"
                  value={formData.treatment_type}
                  onChange={(e) => handleInputChange('treatment_type', e.target.value)}
                  className="bg-input-background border-border"
                />
              </div>

              {/* Cost */}
              <div className="space-y-2">
                <Label htmlFor="cost" className="text-sm font-medium">
                  Cost ($)
                </Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  className="bg-input-background border-border"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Brief description of the treatment"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-input-background border-border"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Treatment Notes <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="notes"
                placeholder="Detailed notes about the treatment, patient response, side effects, etc."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                rows={4}
              />
            </div>

            {/* Photo Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Photo */}
              <div className="space-y-2">
                <Label htmlFor="before-photo" className="text-sm font-medium">
                  Before Photo
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                  <input
                    id="before-photo"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={(e) => handleFileChange('before_photo', e)}
                    className="hidden"
                  />
                  <label htmlFor="before-photo" className="cursor-pointer">
                    <Camera className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {formData.before_photo ? formData.before_photo.name : 'Click to upload before photo'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG up to 5MB
                    </p>
                  </label>
                </div>
                {formData.before_photo && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Before photo: {formData.before_photo.name}</span>
                  </div>
                )}
              </div>

              {/* After Photo */}
              <div className="space-y-2">
                <Label htmlFor="after-photo" className="text-sm font-medium">
                  After Photo
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                  <input
                    id="after-photo"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={(e) => handleFileChange('after_photo', e)}
                    className="hidden"
                  />
                  <label htmlFor="after-photo" className="cursor-pointer">
                    <Camera className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {formData.after_photo ? formData.after_photo.name : 'Click to upload after photo'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG up to 5MB
                    </p>
                  </label>
                </div>
                {formData.after_photo && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>After photo: {formData.after_photo.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              {editingTreatment && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="border-border hover:bg-primary/5"
                >
                  Cancel Edit
                </Button>
              )}
              <Button
                type="submit"
                disabled={isLoading || !formData.appointment_id || !formData.notes}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingTreatment ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {editingTreatment ? 'Update Treatment' : 'Save Treatment'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Treatments Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Previous Treatments</span>
          </CardTitle>
          <CardDescription>
            {treatments.length} treatment record{treatments.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {treatments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No treatment records found</p>
              <p className="text-sm">Create your first treatment record above</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Photos</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell className="font-medium">
                      {treatment.appointment?.client?.name || 'Unknown Client'}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{treatment.treatment_type}</div>
                        {treatment.description && (
                          <div className="text-sm text-muted-foreground">
                            {treatment.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{treatment.provider?.name || 'Unknown Provider'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(treatment.treatment_date)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${statusColors[treatment.status]} border`}
                      >
                        <div className="flex items-center space-x-1">
                          {treatment.status === "completed" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : treatment.status === "pending" ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          <span className="capitalize">{treatment.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {treatment.before_photo && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            <span className="text-xs">Before</span>
                          </div>
                        )}
                        {treatment.after_photo && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            <span className="text-xs">After</span>
                          </div>
                        )}
                        {!treatment.before_photo && !treatment.after_photo && (
                          <span className="text-xs text-muted-foreground">No photos</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(treatment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(treatment.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

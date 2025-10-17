"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
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
  Loader2
} from "lucide-react";

const formTypes = [
  { value: "consent", label: "Treatment Consent" },
  { value: "gfe", label: "Good Faith Estimate (GFE)" },
  { value: "intake", label: "Intake Form" }
];

export function ConsentFormUpload({ onBack, onSuccess }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    client_id: "",
    service_id: "",
    form_type: "",
    digital_signature: "",
    file: null
  });

  // Load clients and services on component mount
  useEffect(() => {
    loadClients();
    loadServices();
  }, []);

  const loadClients = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/clients`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setClients(response.data.data || response.data);
    } catch (error) {
      console.error('Error loading clients:', error);
      // Fallback to mock data for demo
      setClients([
        { id: 1, name: "Emma Johnson", email: "emma@example.com" },
        { id: 2, name: "Sarah Davis", email: "sarah@example.com" },
        { id: 3, name: "Jessica Martinez", email: "jessica@example.com" },
        { id: 4, name: "Amanda Wilson", email: "amanda@example.com" }
      ]);
    }
  };

  const loadServices = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/services`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setServices(response.data.data || response.data);
    } catch (error) {
      console.error('Error loading services:', error);
      // Fallback to mock data for demo
      setServices([
        { id: 1, name: "Botox Injections", price: 350 },
        { id: 2, name: "Dermal Fillers", price: 650 },
        { id: 3, name: "Hydrafacial", price: 150 },
        { id: 4, name: "Laser Hair Removal", price: 200 }
      ]);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or image file (JPG, PNG)');
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
        file: file
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formData.client_id || !formData.service_id || !formData.form_type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('client_id', formData.client_id);
      submitData.append('service_id', formData.service_id);
      submitData.append('form_type', formData.form_type);
      
      if (formData.digital_signature) {
        submitData.append('digital_signature', formData.digital_signature);
      }
      
      if (formData.file) {
        submitData.append('file', formData.file);
      }

      const response = await axios.post(`${API_URL}/consents`, submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Consent form uploaded successfully!', {
        description: `Form ID: ${response.data.data?.id || 'N/A'}`
      });

      // Reset form
      setFormData({
        client_id: "",
        service_id: "",
        form_type: "",
        digital_signature: "",
        file: null
      });

      // Clear file input
      const fileInput = document.getElementById('file-upload');
      if (fileInput) fileInput.value = '';

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error('Error uploading consent form:', error);
      
      let errorMessage = 'Failed to upload consent form';
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

  const selectedClient = clients.find(c => c.id == formData.client_id);
  const selectedService = services.find(s => s.id == formData.service_id);
  const selectedFormType = formTypes.find(f => f.value === formData.form_type);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
          <h1 className="text-2xl font-bold text-foreground">Upload Consent Form</h1>
          <p className="text-muted-foreground">Create a new digital consent form for a client</p>
        </div>
      </div>

      {/* Upload Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Consent Form Details</span>
          </CardTitle>
          <CardDescription>
            Fill in the required information and upload the consent form document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Selection */}
            <div className="space-y-2">
              <Label htmlFor="client_id" className="text-sm font-medium">
                Select Client <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.client_id} 
                onValueChange={(value) => handleInputChange('client_id', value)}
              >
                <SelectTrigger className="bg-input-background border-border">
                  <SelectValue placeholder="Choose a client..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{client.name}</span>
                        <span className="text-muted-foreground text-sm">({client.email})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedClient && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedClient.name} - {selectedClient.email}
                </p>
              )}
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <Label htmlFor="service_id" className="text-sm font-medium">
                Select Service <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.service_id} 
                onValueChange={(value) => handleInputChange('service_id', value)}
              >
                <SelectTrigger className="bg-input-background border-border">
                  <SelectValue placeholder="Choose a service..." />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      <div className="flex items-center justify-between w-full">
                        <span>{service.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          ${service.price || 'N/A'}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedService && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedService.name} - ${selectedService.price}
                </p>
              )}
            </div>

            {/* Form Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="form_type" className="text-sm font-medium">
                Form Type <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.form_type} 
                onValueChange={(value) => handleInputChange('form_type', value)}
              >
                <SelectTrigger className="bg-input-background border-border">
                  <SelectValue placeholder="Select form type..." />
                </SelectTrigger>
                <SelectContent>
                  {formTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedFormType && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFormType.label}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="text-sm font-medium">
                Upload File (PDF or Image)
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG up to 5MB
                  </p>
                </label>
              </div>
              {formData.file && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>File selected: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>

            {/* Digital Signature */}
            <div className="space-y-2">
              <Label htmlFor="digital_signature" className="text-sm font-medium">
                Digital Signature (Optional)
              </Label>
              <Textarea
                id="digital_signature"
                placeholder="Enter digital signature or notes..."
                value={formData.digital_signature}
                onChange={(e) => handleInputChange('digital_signature', e.target.value)}
                className="bg-input-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Optional: Add any digital signature or additional notes
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-border hover:bg-primary/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.client_id || !formData.service_id || !formData.form_type}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Consent Form
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Form Summary */}
      {(selectedClient || selectedService || selectedFormType) && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Form Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedClient && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Client:</strong> {selectedClient.name}</span>
                </div>
              )}
              {selectedService && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Service:</strong> {selectedService.name}</span>
                </div>
              )}
              {selectedFormType && (
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Type:</strong> {selectedFormType.label}</span>
                </div>
              )}
              {formData.file && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm"><strong>File:</strong> {formData.file.name}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  BookOpen,
  Search,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Download,
  Star,
  Eye
} from "lucide-react";

const supportCategories = [
  {
    id: "general",
    name: "General Support",
    description: "General questions and assistance",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    id: "technical",
    name: "Technical Issues",
    description: "Software bugs and technical problems",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    id: "billing",
    name: "Billing & Payments",
    description: "Payment questions and billing issues",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    id: "features",
    name: "Feature Requests",
    description: "Suggestions for new features",
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    id: "training",
    name: "Training & Onboarding",
    description: "Help with learning the system",
    icon: BookOpen,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const mockTickets = [
  {
    id: "TICKET-001",
    subject: "Unable to access appointment calendar",
    category: "technical",
    priority: "high",
    status: "open",
    createdAt: "2025-12-20T10:30:00Z",
    lastUpdated: "2025-12-20T14:20:00Z",
    description: "I'm getting an error when trying to view the appointment calendar. The page loads but shows a blank screen."
  },
  {
    id: "TICKET-002",
    subject: "Payment processing issue",
    category: "billing",
    priority: "medium",
    status: "in_progress",
    createdAt: "2025-12-19T15:45:00Z",
    lastUpdated: "2025-12-20T09:15:00Z",
    description: "Credit card payments are failing for some clients. Error message shows 'Payment declined' even for valid cards."
  },
  {
    id: "TICKET-003",
    subject: "Request for bulk appointment import",
    category: "features",
    priority: "low",
    status: "closed",
    createdAt: "2025-12-18T11:20:00Z",
    lastUpdated: "2025-12-19T16:30:00Z",
    description: "It would be helpful to have a feature to import multiple appointments from a CSV file."
  },
  {
    id: "TICKET-004",
    subject: "How to set up automated reminders",
    category: "training",
    priority: "medium",
    status: "open",
    createdAt: "2025-12-17T13:10:00Z",
    lastUpdated: "2025-12-17T13:10:00Z",
    description: "I need help configuring automated appointment reminders for clients."
  }
];

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-gray-100 text-gray-800 border-gray-200"
};

const statusColors = {
  open: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-yellow-100 text-yellow-800 border-yellow-200",
  closed: "bg-green-100 text-green-800 border-green-200"
};

const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email address."
  },
  {
    question: "Can I customize the appointment reminder messages?",
    answer: "Yes, you can customize reminder messages in Settings > Notifications > Appointment Reminders."
  },
  {
    question: "How do I export client data?",
    answer: "Go to Clients > Client List and click the 'Export' button to download client data in CSV format."
  },
  {
    question: "What payment methods are supported?",
    answer: "We support credit cards, debit cards, cash, and bank transfers. Configure your preferred methods in Settings > Business > Payment Settings."
  },
  {
    question: "How do I add a new staff member?",
    answer: "Go to Settings > Staff Management and click 'Add Staff Member' to create a new team member account."
  },
  {
    question: "Can I schedule recurring appointments?",
    answer: "Yes, when booking an appointment, select 'Recurring' and choose the frequency (weekly, monthly, etc.)."
  }
];

export function Support({ onPageChange }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const handleSubmitTicket = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setTicketForm({
      subject: "",
      category: "",
      priority: "medium",
      description: ""
    });
    setActiveTab("tickets");
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
            <h1 className="text-2xl font-bold text-foreground">Support Center</h1>
            <p className="text-muted-foreground">Get help and support for your MediSpa platform</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Open Tickets
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockTickets.filter(t => t.status === "open").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              In Progress
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockTickets.filter(t => t.status === "in_progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Resolved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockTickets.filter(t => t.status === "closed").length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              2.5h
            </div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Categories */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                How can we help you?
              </CardTitle>
              <CardDescription>Choose a category to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/30"
                      onClick={() => setActiveTab("ticket")}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full ${category.bgColor}`}>
                            <IconComponent className={`h-6 w-6 ${category.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-card border-border mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input-background border-border"
                  />
                </div>
                <div className="space-y-3">
                  {filteredFaq.map((item, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Support
              </CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-sm text-muted-foreground">(555) 123-SUPPORT</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-sm text-muted-foreground">support@medispa.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Business Hours</div>
                    <div className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM PST</div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Live Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Resources
              </CardTitle>
              <CardDescription>Helpful documentation and guides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5">
                <BookOpen className="h-4 w-4 mr-2" />
                User Manual
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5">
                <Video className="h-4 w-4 mr-2" />
                Video Tutorials
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5">
                <Download className="h-4 w-4 mr-2" />
                Quick Start Guide
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Ticket Form */}
      {activeTab === "ticket" && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Submit Support Ticket
            </CardTitle>
            <CardDescription>Describe your issue and we'll get back to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-input-background border-border"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={ticketForm.category} 
                  onValueChange={(value) => setTicketForm(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-input-background border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={ticketForm.priority} 
                onValueChange={(value) => setTicketForm(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="bg-input-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={ticketForm.description}
                onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                className="bg-input-background border-border"
                placeholder="Please provide detailed information about your issue..."
                rows={5}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setActiveTab("overview")}
                className="border-border hover:bg-primary/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitTicket}
                disabled={!ticketForm.subject || !ticketForm.category || !ticketForm.description || isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Tickets */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Recent Support Tickets
          </CardTitle>
          <CardDescription>Your recent support requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTickets.map((ticket) => {
              const category = supportCategories.find(c => c.id === ticket.category);
              return (
                <div key={ticket.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                        <Badge
                          variant="outline"
                          className={`${priorityColors[ticket.priority]} border text-xs`}
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${statusColors[ticket.status]} border text-xs`}
                        >
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Created: {formatDate(ticket.createdAt)}</span>
                        <span>Updated: {formatDate(ticket.lastUpdated)}</span>
                        {category && (
                          <span>Category: {category.name}</span>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

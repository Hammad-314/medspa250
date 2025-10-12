"use client";

import { useState } from "react";
import { AuthProvider, useAuth } from '../components/auth-context';
import { Login } from "../components/auth/login";
import { Sidebar } from "../components/layout/sidebar";
import { AdminDashboard } from "../components/dashboards/admin-dashboard";
import { ProviderDashboard } from "../components/dashboards/provider-dashboard";
import  ReceptionDashboard  from "../components/dashboards/reception-dashboard";
import  ClientDashboard  from "../components/dashboards/client-dashboard";
import { AppointmentCalendar } from "../components/appointments/appointment-calendar";
import { BookAppointment } from "../components/appointments/book-appointment";
import { AppointmentList } from "../components/appointments/appointment-list";
import { ClientList } from "../components/clients/client-list";
import { AddClient } from "../components/clients/add-client";
import { PaymentPOS } from "../components/payments/payment-pos";
import { PaymentHistory } from "../components/payments/payment-history";
import { ProfileSettings } from "../components/settings/profile-settings";
import { BusinessSettings } from "../components/settings/business-settings";
import { StaffManagement } from "../components/settings/staff-management";
import { Notifications } from "../components/notifications/notifications";
import { History } from "../components/history/history";
import { Support } from "../components/support/support";
import { Toaster } from "../components/ui/sonner";
import { ConsentForms } from "../components/treatments/consent-forms";
import { SOAPNotes } from "../components/treatments/soap-notes";
import { BeforeAfterPhotos } from "../components/treatments/before-after-photos";
import { Packages } from "../components/payments/packages";
import { InventoryProducts } from "../components/inventory/inventory-products";
import { StockAlerts } from "../components/inventory/stock-alerts";
import { Revenue } from "../components/analytics/revenue";
import { ClientAnalytics } from "../components/analytics/client-analytics";
import { StaffPerformance } from "../components/analytics/staff-performance";
import { AuditLog } from "../components/admin/audit-log";
import { Compliance } from "../components/admin/compliance";
import '../globals.css';
import styles from './page.module.css';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (!isAuthenticated) {
    return <Login />;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (currentPage === "dashboard") {
      switch (user?.role) {
        case "admin":
          return <AdminDashboard onPageChange={handlePageChange} />;
        case "provider":
          return <ProviderDashboard onPageChange={handlePageChange} />;
        case "reception":
          return <ReceptionDashboard onPageChange={handlePageChange} />;
        case "client":
          return <ClientDashboard onPageChange={handlePageChange} />;
        default:
          return <AdminDashboard onPageChange={handlePageChange} />;
      }
    }

    switch (currentPage) {
      case "appointments/calendar":
        return <AppointmentCalendar onPageChange={handlePageChange} />;
      case "appointments/book":
        return <BookAppointment onPageChange={handlePageChange} />;
      case "appointments/list":
        return <AppointmentList onPageChange={handlePageChange} />;
      case "clients/list":
        return <ClientList onPageChange={handlePageChange} />;
      case "clients/add":
        return <AddClient onPageChange={handlePageChange} />;
      case "treatments/consents":
        return <ConsentForms onPageChange={handlePageChange} />;
      case "treatments/notes":
        return <SOAPNotes onPageChange={handlePageChange} />;
      case "treatments/photos":
        return <BeforeAfterPhotos onPageChange={handlePageChange} />;
      case "payments/pos":
        return <PaymentPOS onPageChange={handlePageChange} />;
      case "payments/history":
        return <PaymentHistory onPageChange={handlePageChange} />;
      case "payments/packages":
        return <Packages onPageChange={handlePageChange} />;
      case "inventory/products":
        return <InventoryProducts onPageChange={handlePageChange} />;
      case "inventory/alerts":
        return <StockAlerts onPageChange={handlePageChange} />;
      case "reports/revenue":
        return <Revenue onPageChange={handlePageChange} />;
      case "reports/clients":
        return <ClientAnalytics onPageChange={handlePageChange} />;
      case "reports/staff":
        return <StaffPerformance onPageChange={handlePageChange} />;
      case "compliance/audit":
        return <AuditLog onPageChange={handlePageChange} />;
      case "compliance/alerts":
        return <Compliance onPageChange={handlePageChange} />;
      case "settings/profile":
        return <ProfileSettings onPageChange={handlePageChange} />;
      case "settings/business":
        return <BusinessSettings onPageChange={handlePageChange} />;
      case "settings/staff":
        return <StaffManagement onPageChange={handlePageChange} />;
      case "notifications":
        return <Notifications onPageChange={handlePageChange} />;
      case "history":
        return <History onPageChange={handlePageChange} />;
      case "support":
        return <Support onPageChange={handlePageChange} />;
      default:
        return <AdminDashboard onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <main className={styles.mainArea}>
        <div className={styles.contentPadding}>{renderPage()}</div>
      </main>
      <Toaster />
    </div>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
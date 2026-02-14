import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Search,
  LogOut,
  Users,
  Home,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  Filter,
  Loader2,
  IndianRupee,
  UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PdfViewer from "@/components/PdfViewer";

const serviceLabels: Record<string, string> = {
  new: "New PAN",
  correction: "Correction",
  duplicate: "Duplicate",
  lost: "Lost/Damaged",
  "minor-to-major": "Minor to Major",
  marriage: "Marriage",
  pan2: "PAN 2.0",
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "bg-saffron/10 text-saffron border border-saffron/20", icon: Clock },
  paid: { label: "Paid", color: "bg-secondary/10 text-secondary border border-secondary/20", icon: FileText },
  processing: { label: "Processing", color: "bg-secondary/10 text-secondary border border-secondary/20", icon: Clock },
  approved: { label: "Approved", color: "bg-accent/10 text-accent border border-accent/20", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border border-destructive/20", icon: XCircle },
};

interface Application {
  id: string;
  application_no: string;
  full_name: string;
  service_type: string;
  status: string;
  mobile: string;
  email: string;
  created_at: string;
  father_name: string;
  dob: string;
  gender: string;
  aadhaar_number: string;
  pan_number: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  selected_changes: string[];
  pdf_url: string | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [pdfViewUrl, setPdfViewUrl] = useState<string | null>(null);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch applications");
      console.error(error);
    } else {
      setApplications(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.application_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paidCount = applications.filter((a) => a.status !== "pending").length;
  const estimatedRevenue = paidCount * 126;

  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      icon: FileText,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Revenue (Est.)",
      value: `₹${estimatedRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-accent/10 text-accent",
    },
    {
      label: "Pending",
      value: applications.filter((a) => a.status === "pending").length,
      icon: Clock,
      color: "bg-warning/10 text-warning",
    },
    {
      label: "Paid",
      value: applications.filter((a) => a.status === "paid").length,
      icon: Users,
      color: "bg-info/10 text-info",
    },
    {
      label: "Processing",
      value: applications.filter((a) => a.status === "processing").length,
      icon: Clock,
      color: "bg-secondary/10 text-secondary",
    },
    {
      label: "Approved",
      value: applications.filter((a) => a.status === "approved").length,
      icon: CheckCircle,
      color: "bg-success/10 text-success",
    },
  ];

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const handleStatusChange = async (appId: string, newStatus: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus as any })
      .eq("id", appId);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
      fetchApplications();
    }
  };

  const [isGeneratingPdf, setIsGeneratingPdf] = useState<string | null>(null);

  const handleViewApp = async (app: Application) => {
    setIsGeneratingPdf(app.id);
    try {
      const { data, error } = await supabase.functions.invoke("generate-pdf", {
        body: { application_id: app.id },
      });
      if (error) throw error;
      if (data?.url) {
        setPdfViewUrl(data.url);
        fetchApplications();
      } else {
        throw new Error("No PDF URL returned");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to generate PDF");
    } finally {
      setIsGeneratingPdf(null);
    }
  };

  const handleGeneratePdf = async (appId: string) => {
    toast.info("Generating summary...");
    try {
      const { data, error } = await supabase.functions.invoke("generate-pdf", {
        body: { application_id: appId },
      });
      if (error) throw error;
      toast.success("Summary generated!");
      if (data?.url) {
        setPdfViewUrl(data.url);
      }
      fetchApplications();
    } catch (err: any) {
      toast.error(err.message || "Failed to generate summary");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 gradient-navy border-b border-primary-foreground/10">
        <div className="container flex items-center justify-between py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-display font-bold text-primary-foreground">Admin Dashboard</h1>
              <p className="text-[10px] text-primary-foreground/40">PAN Card Services</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-5 border border-border shadow-card"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} mb-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Application No. or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 h-11">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications Table */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Application No.</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applicant</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredApplications.map((app) => {
                  const status = statusConfig[app.status] || statusConfig.pending;
                  return (
                    <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <span className="font-mono text-sm font-semibold text-foreground">{app.application_no}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{app.full_name}</p>
                          <p className="text-xs text-muted-foreground">{app.mobile}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-foreground">{serviceLabels[app.service_type] || app.service_type}</td>
                      <td className="p-4 text-sm text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <Select
                          value={app.status}
                          onValueChange={(val) => handleStatusChange(app.id, val)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${status.color.split(" ").filter(c => c.startsWith("text-")).join(" ")}`}>
                              <status.icon className="h-3 w-3" />
                              {status.label}
                            </span>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewApp(app)} disabled={isGeneratingPdf === app.id}>
                          {isGeneratingPdf === app.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleGeneratePdf(app.id)} title="Generate Summary">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border">
            {filteredApplications.map((app) => {
              const status = statusConfig[app.status] || statusConfig.pending;
              return (
                <div key={app.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-sm font-semibold text-foreground">{app.application_no}</p>
                      <p className="text-sm text-foreground mt-1">{app.full_name}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                      <status.icon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{serviceLabels[app.service_type] || app.service_type}</span>
                    <span>{new Date(app.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewApp(app)} disabled={isGeneratingPdf === app.id}>
                      {isGeneratingPdf === app.id ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Eye className="h-4 w-4 mr-1" />} View
                    </Button>
                    <Select value={app.status} onValueChange={(val) => handleStatusChange(app.id, val)}>
                      <SelectTrigger className="flex-1 h-9">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredApplications.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No applications found</p>
            </div>
          )}
        </div>
      </div>

      {/* Application Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              Application: {selectedApp?.application_no}
            </DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <DetailField label="Full Name" value={selectedApp.full_name} />
                <DetailField label="Father's Name" value={selectedApp.father_name} />
                <DetailField label="DOB" value={selectedApp.dob} />
                <DetailField label="Gender" value={selectedApp.gender} />
                <DetailField label="Aadhaar" value={selectedApp.aadhaar_number} />
                <DetailField label="PAN" value={selectedApp.pan_number || "N/A"} />
                <DetailField label="Mobile" value={selectedApp.mobile} />
                <DetailField label="Email" value={selectedApp.email} />
                <DetailField label="Service" value={serviceLabels[selectedApp.service_type] || selectedApp.service_type} />
                <DetailField label="Status" value={selectedApp.status} />
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Address</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedApp.address_line1}
                  {selectedApp.address_line2 && `, ${selectedApp.address_line2}`}
                  <br />
                  {selectedApp.city}, {selectedApp.state} - {selectedApp.pincode}
                </p>
              </div>

              {selectedApp.selected_changes?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Selected Changes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.selected_changes.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium capitalize">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {documents.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Documents</h4>
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                          <p className="text-sm font-medium text-foreground capitalize">
                            {doc.document_type.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="text-xs text-muted-foreground">{doc.file_name}</p>
                        </div>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" /> View
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <PdfViewer url={pdfViewUrl} open={!!pdfViewUrl} onOpenChange={(open) => !open && setPdfViewUrl(null)} />
    </div>
  );
};

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground capitalize">{value || "—"}</p>
  </div>
);

export default AdminDashboard;

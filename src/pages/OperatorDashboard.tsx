import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Search,
  LogOut,
  Home,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Upload,
  Filter,
  Loader2,
  Send,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  pending: { label: "Pending", color: "text-saffron", icon: Clock },
  paid: { label: "Paid", color: "text-secondary", icon: FileText },
  processing: { label: "Processing", color: "text-secondary", icon: RefreshCw },
  approved: { label: "Approved", color: "text-accent", icon: CheckCircle },
  rejected: { label: "Rejected", color: "text-destructive", icon: XCircle },
};

const OperatorDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [statusNote, setStatusNote] = useState("");
  const [pdfViewUrl, setPdfViewUrl] = useState<string | null>(null);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch applications");
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

  const stats = [
    { label: "Assigned", value: applications.length, icon: FileText, color: "bg-primary/10 text-primary" },
    { label: "Processing", value: applications.filter((a) => a.status === "processing").length, icon: RefreshCw, color: "bg-info/10 text-info" },
    { label: "Completed", value: applications.filter((a) => a.status === "approved").length, icon: CheckCircle, color: "bg-success/10 text-success" },
    { label: "Pending", value: applications.filter((a) => a.status === "pending" || a.status === "paid").length, icon: Clock, color: "bg-warning/10 text-warning" },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  const handleStatusChange = async (appId: string, newStatus: string) => {
    const app = applications.find((a) => a.id === appId);
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus as any })
      .eq("id", appId);

    if (error) {
      toast.error("Failed to update status");
    } else {
      // Log status change
      await supabase.from("status_logs").insert({
        application_id: appId,
        old_status: app?.status || null,
        new_status: newStatus,
        notes: statusNote || undefined,
      });
      toast.success(`Status updated to ${newStatus}`);
      setStatusNote("");
      fetchApplications();
    }
  };

  const handleViewApp = async (app: any) => {
    if (app.pdf_url) {
      setPdfViewUrl(app.pdf_url);
    } else {
      setSelectedApp(app);
      const { data } = await supabase
        .from("application_documents")
        .select("*")
        .eq("application_id", app.id);
      setDocuments(data || []);
    }
  };

  const handleEpanUpload = async (appId: string, file: File) => {
    const filePath = `epan/${appId}/${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Upload failed");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("applications")
      .update({ epan_url: urlData.publicUrl, status: "approved" as any })
      .eq("id", appId);

    if (updateError) {
      toast.error("Failed to save ePAN URL");
    } else {
      toast.success("ePAN uploaded and application marked as approved!");
      fetchApplications();
      setSelectedApp(null);
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
      <header className="sticky top-0 z-50 gradient-navy border-b border-primary-foreground/10">
        <div className="container flex items-center justify-between py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20">
              <LayoutDashboard className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="text-base font-display font-bold text-primary-foreground">Operator Panel</h1>
              <p className="text-[10px] text-primary-foreground/40">PAN Card Services</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <Home className="h-4 w-4 mr-1" /> Home
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
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
            <Input placeholder="Search by Application No. or Name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-11" />
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

        {/* Application Cards */}
        <div className="space-y-3">
          {filteredApplications.map((app) => {
            const status = statusConfig[app.status] || statusConfig.pending;
            return (
              <motion.div key={app.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm font-semibold text-foreground">{app.application_no}</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${status.color}`}>
                        <status.icon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-foreground font-medium">{app.full_name}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{serviceLabels[app.service_type] || app.service_type}</span>
                      <span>•</span>
                      <span>{app.mobile}</span>
                      <span>•</span>
                      <span>{new Date(app.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewApp(app)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Select value={app.status} onValueChange={(val) => handleStatusChange(app.id, val)}>
                      <SelectTrigger className="w-36 h-9">
                        <SelectValue placeholder="Update Status" />
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
              </motion.div>
            );
          })}
          {filteredApplications.length === 0 && (
            <div className="p-12 text-center bg-card rounded-xl border border-border">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No applications found</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Application: {selectedApp?.application_no}</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { l: "Full Name", v: selectedApp.full_name },
                  { l: "Father's Name", v: selectedApp.father_name },
                  { l: "DOB", v: selectedApp.dob },
                  { l: "Gender", v: selectedApp.gender },
                  { l: "Aadhaar", v: selectedApp.aadhaar_number },
                  { l: "PAN", v: selectedApp.pan_number || "N/A" },
                  { l: "Mobile", v: selectedApp.mobile },
                  { l: "Email", v: selectedApp.email },
                  { l: "Service", v: serviceLabels[selectedApp.service_type] || selectedApp.service_type },
                  { l: "Status", v: selectedApp.status },
                ].map((f) => (
                  <div key={f.l}>
                    <p className="text-xs text-muted-foreground mb-0.5">{f.l}</p>
                    <p className="text-sm font-medium text-foreground">{f.v}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Address</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedApp.address_line1}{selectedApp.address_line2 && `, ${selectedApp.address_line2}`}<br />
                  {selectedApp.city}, {selectedApp.state} - {selectedApp.pincode}
                </p>
              </div>

              {documents.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Documents</h4>
                  <div className="space-y-2">
                    {documents.map((doc: any) => (
                      <a key={doc.id} href={doc.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-secondary hover:underline">
                        <FileText className="h-4 w-4" />
                        {doc.file_name} ({doc.document_type})
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ePAN Upload */}
              <div className="border-t border-border pt-5">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-secondary" />
                  Upload ePAN PDF
                </h4>
                {selectedApp.epan_url ? (
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <CheckCircle className="h-4 w-4" />
                    <a href={selectedApp.epan_url} target="_blank" rel="noopener noreferrer" className="hover:underline">ePAN already uploaded — View</a>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleEpanUpload(selectedApp.id, file);
                    }}
                    className="h-11"
                  />
                )}
              </div>

              {/* Status note */}
              <div className="border-t border-border pt-5">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Send className="h-4 w-4 text-secondary" />
                  Add Status Note
                </h4>
                <Textarea
                  placeholder="Add a note for this status update..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <PdfViewer url={pdfViewUrl} open={!!pdfViewUrl} onOpenChange={(open) => !open && setPdfViewUrl(null)} />
    </div>
  );
};

export default OperatorDashboard;

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const serviceLabels: Record<string, string> = {
  new: "Apply New PAN Card",
  correction: "PAN Card Correction",
  duplicate: "Duplicate PAN Card",
  lost: "Lost / Damaged PAN",
  "minor-to-major": "Minor to Major PAN",
  marriage: "PAN After Marriage",
  pan2: "PAN 2.0 with QR Code",
};

interface TrackResult {
  application_no: string;
  full_name: string;
  service_type: string;
  status: string;
  created_at: string;
}

const statusSteps = (status: string) => {
  const allSteps = [
    { key: "pending", label: "Application Received" },
    { key: "paid", label: "Payment Confirmed" },
    { key: "processing", label: "Processing" },
    { key: "approved", label: "PAN Generated / Approved" },
  ];

  const statusOrder = ["pending", "paid", "processing", "approved"];
  const currentIndex = statusOrder.indexOf(status);

  return allSteps.map((step, index) => ({
    ...step,
    completed: index < currentIndex,
    active: index === currentIndex,
  }));
};

const TrackPage = () => {
  const [searchParams] = useSearchParams();
  const [applicationNo, setApplicationNo] = useState(searchParams.get("appNo") || "");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!applicationNo.trim()) return;
    setIsSearching(true);
    setSearched(true);

    const { data, error } = await supabase
      .from("applications")
      .select("application_no, full_name, service_type, status, created_at")
      .eq("application_no", applicationNo.trim())
      .maybeSingle();

    if (error) {
      toast.error("Error searching application");
      setResult(null);
    } else if (!data) {
      setResult(null);
    } else {
      setResult(data as TrackResult);
    }
    setIsSearching(false);
  };

  // Auto-search if appNo is in URL
  useState(() => {
    if (applicationNo) {
      handleSearch();
    }
  });

  const steps = result ? statusSteps(result.status) : [];

  return (
    <Layout>
      <div className="min-h-[60vh]">
        {/* Hero */}
        <section className="gradient-navy py-12">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">
              Track Your Application
            </h1>
            <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
              Enter your application number to check the current status
            </p>

            <div className="max-w-lg mx-auto flex gap-3">
              <Input
                placeholder="Enter Application Number (e.g., PAN12345678)"
                value={applicationNo}
                onChange={(e) => setApplicationNo(e.target.value)}
                className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="hero" size="lg" onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Results */}
        {searched && (
          <section className="py-10">
            <div className="container max-w-2xl">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-border gradient-navy">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-primary-foreground/70">Application Number</p>
                        <p className="text-xl font-display font-bold text-primary-foreground">
                          {result.application_no}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium capitalize">
                        <Clock className="h-4 w-4" />
                        {result.status}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <p className="text-xs text-muted-foreground">Service</p>
                        <p className="text-sm font-medium">
                          {serviceLabels[result.service_type] || result.service_type}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Applicant</p>
                        <p className="text-sm font-medium">{result.full_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Submitted On</p>
                        <p className="text-sm font-medium">
                          {new Date(result.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Current Status</p>
                        <p className="text-sm font-medium capitalize">{result.status}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <h3 className="font-display font-bold mb-4">Application Timeline</h3>
                    <div className="space-y-0">
                      {steps.map((step, index) => (
                        <div key={step.key} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                step.completed
                                  ? "bg-accent text-accent-foreground"
                                  : step.active
                                  ? "bg-secondary text-secondary-foreground animate-pulse-soft"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {step.completed ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : step.active ? (
                                <Clock className="h-4 w-4" />
                              ) : (
                                <AlertCircle className="h-4 w-4" />
                              )}
                            </div>
                            {index < steps.length - 1 && (
                              <div className={`w-0.5 h-8 ${step.completed ? "bg-accent" : "bg-border"}`} />
                            )}
                          </div>
                          <div className="pb-6">
                            <p className={`text-sm font-medium ${step.completed || step.active ? "text-foreground" : "text-muted-foreground"}`}>
                              {step.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {step.completed ? "Completed" : step.active ? "In Progress" : "Pending"}
                            </p>
                          </div>
                        </div>
                      ))}

                      {result.status === "rejected" && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                              <AlertCircle className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="pb-6">
                            <p className="text-sm font-medium text-destructive">Application Rejected</p>
                            <p className="text-xs text-muted-foreground">Please contact support</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <AlertCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-1">Application Not Found</h3>
                  <p className="text-muted-foreground text-sm">
                    No application found with number "{applicationNo}". Please check and try again.
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default TrackPage;

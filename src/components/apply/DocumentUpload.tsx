import { useState } from "react";
import { Upload, X, FileImage, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
  documents: Record<string, File | null>;
  onUpload: (field: string, file: File | null) => void;
  serviceType: string;
  proofData: {
    proofOfIdentity: string;
    proofOfAddress: string;
    proofOfDob: string;
  };
  onProofChange: (field: string, value: string) => void;
}

interface UploadFieldProps {
  id: string;
  label: string;
  description: string;
  required: boolean;
  file: File | null;
  onUpload: (file: File | null) => void;
  accept: string;
}

const UploadField = ({ id, label, description, required, file, onUpload, accept }: UploadFieldProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) onUpload(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onUpload(e.target.files[0]);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {file ? (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-accent/30 bg-accent/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            {file.type.startsWith("image/") ? <FileImage className="h-5 w-5 text-accent" /> : <FileText className="h-5 w-5 text-accent" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <button onClick={() => onUpload(null)} className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={cn("relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all", dragActive ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/30 bg-muted/30")}
        >
          <input id={id} type="file" accept={accept} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-muted-foreground">Drop file here or click to upload</p>
          <p className="text-xs text-muted-foreground/60 mt-1">{description}</p>
        </div>
      )}
    </div>
  );
};

const poiOptions = ["Aadhaar Card", "Passport", "Voter ID Card", "Driving License", "Ration Card with Photo", "Arm's License", "Photo Identity issued by Central/State Govt.", "Pensioner Card with Photo"];
const poaOptions = ["Aadhaar Card", "Passport", "Voter ID Card", "Driving License", "Post Office Passbook", "Bank Account Statement", "Electricity Bill", "Water Bill", "Telephone Bill", "Property Tax Assessment Order", "Credit Card Statement"];
const pobOptions = ["Aadhaar Card", "Passport", "Driving License", "Matriculation Certificate", "Birth Certificate", "Domicile Certificate"];

const DocumentUpload = ({ documents, onUpload, serviceType, proofData, onProofChange }: DocumentUploadProps) => {
  const fields = [
    { id: "aadhaarCard", label: "Aadhaar Card", description: "Front & back in JPG, PNG or PDF (max 2MB)", required: true, accept: "image/*,.pdf" },
    ...(serviceType !== "new" ? [{ id: "panCopy", label: "Existing PAN Card / ePAN", description: "Copy of your current PAN card (max 2MB)", required: true, accept: "image/*,.pdf" }] : []),
    { id: "photo", label: "Passport Size Photo", description: "Recent color photo in JPG or PNG (max 1MB)", required: true, accept: "image/*" },
    { id: "signature", label: "Signature", description: "Clear signature on white paper (max 1MB)", required: true, accept: "image/*" },
  ];

  return (
    <div>
      <h2 className="text-xl font-display font-bold mb-2">Upload Documents</h2>
      <p className="text-muted-foreground text-sm mb-6">As per Form 49A — Document proof selections & file uploads</p>

      {/* Proof Type Selectors */}
      <div className="space-y-4 mb-6 p-4 rounded-lg border border-border bg-muted/20">
        <h3 className="text-sm font-bold text-foreground">Document Proof Types (Section 15)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Proof of Identity</Label>
            <Select value={proofData.proofOfIdentity} onValueChange={(v) => onProofChange("proofOfIdentity", v)}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Select POI" /></SelectTrigger>
              <SelectContent>{poiOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Proof of Address</Label>
            <Select value={proofData.proofOfAddress} onValueChange={(v) => onProofChange("proofOfAddress", v)}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Select POA" /></SelectTrigger>
              <SelectContent>{poaOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Proof of Date of Birth</Label>
            <Select value={proofData.proofOfDob} onValueChange={(v) => onProofChange("proofOfDob", v)}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Select POB" /></SelectTrigger>
              <SelectContent>{pobOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {fields.map((field) => (
          <UploadField key={field.id} {...field} file={documents[field.id] || null} onUpload={(file) => onUpload(field.id, file)} />
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
        <p className="text-sm text-secondary font-medium">📋 Document Guidelines</p>
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          <li>• All documents should be clear and legible</li>
          <li>• Maximum file size: 2MB per document</li>
          <li>• Accepted formats: JPG, PNG, PDF</li>
          <li>• Photo must be recent passport-size colored photograph</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUpload;

import { CheckCircle, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewConfirmProps {
  formData: {
    serviceType: string;
    changes: string[];
    applicant: {
      title: string;
      lastName: string;
      firstName: string;
      middleName: string;
      panPrintName: string;
      hasOtherName: boolean;
      otherNameTitle: string;
      otherLastName: string;
      otherFirstName: string;
      otherMiddleName: string;
      gender: string;
      dob: string;
      applicantStatus: string;
      panNumber: string;
    };
    parent: {
      fatherLastName: string;
      fatherFirstName: string;
      fatherMiddleName: string;
      motherLastName: string;
      motherFirstName: string;
      motherMiddleName: string;
      isSingleParent: boolean;
      parentOnCard: string;
    };
    address: {
      flatDoorBlock: string;
      premisesBuilding: string;
      roadStreetLane: string;
      areaLocality: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
      communicationAddress: string;
      aadhaarNumber: string;
      aadhaarEnrollmentId: string;
      nameAsPerAadhaar: string;
    };
    contact: {
      countryCode: string;
      stdCode: string;
      mobile: string;
      email: string;
      sourceOfIncome: string[];
    };
    proofData: {
      proofOfIdentity: string;
      proofOfAddress: string;
      proofOfDob: string;
    };
    documents: Record<string, File | null>;
  };
  onGoToStep: (step: number) => void;
}

const serviceLabels: Record<string, string> = {
  new: "Apply New PAN Card",
  correction: "PAN Card Correction",
  duplicate: "Duplicate PAN Card",
  lost: "Lost / Damaged PAN",
  "minor-to-major": "Minor to Major PAN",
  marriage: "PAN After Marriage",
  pan2: "PAN 2.0 with QR Code",
};

const ReviewConfirm = ({ formData, onGoToStep }: ReviewConfirmProps) => {
  const uploadedDocs = Object.entries(formData.documents).filter(([, f]) => f !== null);
  const { applicant: a, parent: p, address: addr, contact: c } = formData;

  const fullName = [a.title, a.firstName, a.middleName, a.lastName].filter(Boolean).join(" ");
  const fatherName = [p.fatherFirstName, p.fatherMiddleName, p.fatherLastName].filter(Boolean).join(" ");
  const motherName = [p.motherFirstName, p.motherMiddleName, p.motherLastName].filter(Boolean).join(" ");
  const fullAddress = [addr.flatDoorBlock, addr.premisesBuilding, addr.roadStreetLane, addr.areaLocality].filter(Boolean).join(", ");

  return (
    <div>
      <h2 className="text-xl font-display font-bold mb-2">Review Your Application</h2>
      <p className="text-muted-foreground text-sm mb-6">Please review all details before submitting</p>

      <div className="space-y-6">
        <ReviewSection title="Service Type" onEdit={() => onGoToStep(0)}>
          <p className="text-sm font-medium">{serviceLabels[formData.serviceType] || formData.serviceType}</p>
          {formData.changes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.changes.map((c) => <span key={c} className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium capitalize">{c}</span>)}
            </div>
          )}
        </ReviewSection>

        <ReviewSection title="Personal Details" onEdit={() => onGoToStep(2)}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <ReviewField label="Full Name" value={fullName} />
            {a.panPrintName && <ReviewField label="Name on PAN" value={a.panPrintName} />}
            <ReviewField label="Gender" value={a.gender} />
            <ReviewField label="Date of Birth" value={a.dob} />
            <ReviewField label="Applicant Status" value={a.applicantStatus} />
            {a.panNumber && <ReviewField label="Existing PAN" value={a.panNumber} />}
          </div>
          {a.hasOtherName && (
            <div className="mt-3 pt-3 border-t border-border">
              <ReviewField label="Other Name" value={[a.otherNameTitle, a.otherFirstName, a.otherMiddleName, a.otherLastName].filter(Boolean).join(" ")} />
            </div>
          )}
        </ReviewSection>

        <ReviewSection title="Parent Details" onEdit={() => onGoToStep(3)}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <ReviewField label="Father's Name" value={fatherName} />
            <ReviewField label="Mother's Name" value={motherName || "—"} />
            <ReviewField label="Name on PAN" value={p.parentOnCard === "mother" ? "Mother's Name" : "Father's Name"} />
            {p.isSingleParent && <ReviewField label="Single Parent" value="Yes" />}
          </div>
        </ReviewSection>

        <ReviewSection title="Address & Aadhaar" onEdit={() => onGoToStep(4)}>
          <p className="text-sm">{fullAddress}</p>
          <p className="text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-3 pt-3 border-t border-border">
            <ReviewField label="Aadhaar Number" value={addr.aadhaarNumber} />
            {addr.aadhaarEnrollmentId && <ReviewField label="Enrolment ID" value={addr.aadhaarEnrollmentId} />}
            {addr.nameAsPerAadhaar && <ReviewField label="Name on Aadhaar" value={addr.nameAsPerAadhaar} />}
            <ReviewField label="Communication" value={addr.communicationAddress === "office" ? "Office" : "Residence"} />
          </div>
        </ReviewSection>

        <ReviewSection title="Contact & Income" onEdit={() => onGoToStep(5)}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <ReviewField label="Mobile" value={`${c.countryCode} ${c.mobile}`} />
            <ReviewField label="Email" value={c.email} />
            <ReviewField label="Source of Income" value={c.sourceOfIncome.join(", ") || "—"} />
          </div>
        </ReviewSection>

        <ReviewSection title="Documents" onEdit={() => onGoToStep(6)}>
          {formData.proofData.proofOfIdentity && <ReviewField label="Proof of Identity" value={formData.proofData.proofOfIdentity} />}
          {formData.proofData.proofOfAddress && <ReviewField label="Proof of Address" value={formData.proofData.proofOfAddress} />}
          {formData.proofData.proofOfDob && <ReviewField label="Proof of DOB" value={formData.proofData.proofOfDob} />}
          <div className="space-y-2 mt-3 pt-3 border-t border-border">
            {uploadedDocs.map(([key, file]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="text-muted-foreground">— {(file as File).name}</span>
              </div>
            ))}
          </div>
        </ReviewSection>

        <div className="rounded-xl border-2 border-secondary/20 bg-secondary/5 p-5">
          <h3 className="font-display font-bold mb-3">Fee Summary</h3>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Application Fee</span>
            <span className="font-semibold">₹107.00</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-semibold">₹19.26</span>
          </div>
          <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
            <span className="font-semibold">Total Payable</span>
            <span className="text-lg font-bold text-secondary">₹126.26</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewSection = ({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit: () => void }) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-display font-bold">{title}</h3>
      <Button variant="ghost" size="sm" onClick={onEdit} className="text-secondary"><Edit2 className="h-3.5 w-3.5 mr-1" />Edit</Button>
    </div>
    {children}
  </div>
);

const ReviewField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium capitalize">{value || "—"}</p>
  </div>
);

export default ReviewConfirm;

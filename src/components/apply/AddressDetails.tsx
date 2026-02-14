import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { validators, formatPincode, formatAadhaar } from "@/lib/validators";

interface AddressDetailsProps {
  data: {
    flatDoorBlock: string;
    premisesBuilding: string;
    roadStreetLane: string;
    areaLocality: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    officeName: string;
    officeFlat: string;
    officePremises: string;
    officeRoad: string;
    officeArea: string;
    officeCity: string;
    officeState: string;
    officePincode: string;
    officeCountry: string;
    communicationAddress: string;
    aadhaarNumber: string;
    aadhaarEnrollmentId: string;
    nameAsPerAadhaar: string;
  };
  onChange: (field: string, value: string) => void;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const AddressDetails = ({ data, onChange }: AddressDetailsProps) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [officeOpen, setOfficeOpen] = useState(false);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-foreground mb-2">
        Address & Aadhaar Details
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        As per Form 49A — Residence address, Office address & Aadhaar
      </p>

      <div className="space-y-6">
        {/* Residence Address */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">Residence Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Flat / Room / Door / Block No. <span className="text-destructive">*</span></Label>
              <Input value={data.flatDoorBlock} onChange={(e) => onChange("flatDoorBlock", e.target.value)} onBlur={() => handleBlur("flatDoorBlock")} placeholder="e.g. Flat 201, Block A" className={`h-11 ${touched.flatDoorBlock && !data.flatDoorBlock.trim() ? "border-destructive" : ""}`} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Name of Premises / Building / Village</Label>
              <Input value={data.premisesBuilding} onChange={(e) => onChange("premisesBuilding", e.target.value)} placeholder="e.g. Sunrise Apartments" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Road / Street / Lane / Post Office</Label>
              <Input value={data.roadStreetLane} onChange={(e) => onChange("roadStreetLane", e.target.value)} placeholder="e.g. MG Road" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Area / Locality / Taluka / Sub-Division</Label>
              <Input value={data.areaLocality} onChange={(e) => onChange("areaLocality", e.target.value)} placeholder="e.g. Koregaon Park" className="h-11" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Town / City / District <span className="text-destructive">*</span></Label>
              <Input value={data.city} onChange={(e) => onChange("city", e.target.value)} onBlur={() => handleBlur("city")} placeholder="City" className={`h-11 ${touched.city && !data.city.trim() ? "border-destructive" : ""}`} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">State / Union Territory <span className="text-destructive">*</span></Label>
              <Select value={data.state} onValueChange={(v) => onChange("state", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>{indianStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">PIN Code <span className="text-destructive">*</span></Label>
              <Input value={data.pincode} onChange={(e) => onChange("pincode", formatPincode(e.target.value))} onBlur={() => handleBlur("pincode")} maxLength={6} placeholder="6-digit PIN" className={`h-11 ${touched.pincode && validators.pincode(data.pincode) ? "border-destructive" : ""}`} />
              {touched.pincode && validators.pincode(data.pincode) && <p className="text-xs text-destructive">{validators.pincode(data.pincode)}</p>}
            </div>
          </div>
        </div>

        {/* Office Address (Collapsible) */}
        <Collapsible open={officeOpen} onOpenChange={setOfficeOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
            <span className="text-sm font-bold text-foreground">Office Address (Optional)</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${officeOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Office Name</Label>
                <Input value={data.officeName} onChange={(e) => onChange("officeName", e.target.value)} placeholder="Company / Office name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Flat / Room / Door / Block No.</Label>
                <Input value={data.officeFlat} onChange={(e) => onChange("officeFlat", e.target.value)} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Premises / Building</Label>
                <Input value={data.officePremises} onChange={(e) => onChange("officePremises", e.target.value)} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Road / Street / Lane</Label>
                <Input value={data.officeRoad} onChange={(e) => onChange("officeRoad", e.target.value)} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Area / Locality</Label>
                <Input value={data.officeArea} onChange={(e) => onChange("officeArea", e.target.value)} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">City</Label>
                <Input value={data.officeCity} onChange={(e) => onChange("officeCity", e.target.value)} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">State</Label>
                <Select value={data.officeState} onValueChange={(v) => onChange("officeState", v)}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>{indianStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">PIN Code</Label>
                <Input value={data.officePincode} onChange={(e) => onChange("officePincode", formatPincode(e.target.value))} maxLength={6} className="h-11" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Communication Address */}
        <div className="space-y-2 p-4 rounded-lg border border-border bg-muted/20">
          <Label className="text-sm font-semibold">Address for Communication</Label>
          <RadioGroup value={data.communicationAddress} onValueChange={(v) => onChange("communicationAddress", v)} className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="residence" id="commRes" />
              <Label htmlFor="commRes" className="text-sm cursor-pointer">Residence</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="office" id="commOff" />
              <Label htmlFor="commOff" className="text-sm cursor-pointer">Office</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Aadhaar Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">Aadhaar Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Aadhaar Number <span className="text-destructive">*</span></Label>
              <Input
                placeholder="XXXX XXXX XXXX"
                value={data.aadhaarNumber}
                onChange={(e) => onChange("aadhaarNumber", formatAadhaar(e.target.value))}
                onBlur={() => handleBlur("aadhaar")}
                maxLength={14}
                className={`h-11 ${touched.aadhaar && validators.aadhaar(data.aadhaarNumber) ? "border-destructive" : ""}`}
              />
              {touched.aadhaar && validators.aadhaar(data.aadhaarNumber) && <p className="text-xs text-destructive">{validators.aadhaar(data.aadhaarNumber)}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Aadhaar Enrolment ID (if not allotted)</Label>
              <Input value={data.aadhaarEnrollmentId} onChange={(e) => onChange("aadhaarEnrollmentId", e.target.value)} placeholder="28-digit Enrolment No." className="h-11" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Name as per Aadhaar</Label>
            <Input value={data.nameAsPerAadhaar} onChange={(e) => onChange("nameAsPerAadhaar", e.target.value.toUpperCase())} placeholder="Full name as printed on Aadhaar card" className="h-11" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;

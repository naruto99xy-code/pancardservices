import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { validators, formatPan } from "@/lib/validators";

interface ApplicantDetailsProps {
  data: {
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
  onChange: (field: string, value: string | boolean) => void;
  serviceType: string;
}

const ApplicantDetails = ({ data, onChange, serviceType }: ApplicantDetailsProps) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getError = (field: string, value: string): string | null => {
    if (!touched[field]) return null;
    const validator = validators[field as keyof typeof validators];
    return validator ? validator(value) : null;
  };

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-foreground mb-2">
        Personal Details
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        As per Form 49A — Section 1 to 6
      </p>

      <div className="space-y-5">
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            Title <span className="text-destructive">*</span>
          </Label>
          <Select value={data.title} onValueChange={(v) => onChange("title", v)}>
            <SelectTrigger className="h-11 w-full md:w-48">
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Shri">Shri</SelectItem>
              <SelectItem value="Smt">Smt</SelectItem>
              <SelectItem value="Kumari">Kumari</SelectItem>
              <SelectItem value="M/s">M/s</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-semibold">
              Last Name / Surname <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Surname"
              value={data.lastName}
              onChange={(e) => onChange("lastName", e.target.value.toUpperCase())}
              onBlur={() => handleBlur("lastName")}
              className={`h-11 ${touched.lastName && !data.lastName.trim() ? "border-destructive" : ""}`}
            />
            {touched.lastName && !data.lastName.trim() && (
              <p className="text-xs text-destructive">Last name is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-semibold">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="First name"
              value={data.firstName}
              onChange={(e) => onChange("firstName", e.target.value.toUpperCase())}
              onBlur={() => handleBlur("firstName")}
              className={`h-11 ${touched.firstName && !data.firstName.trim() ? "border-destructive" : ""}`}
            />
            {touched.firstName && !data.firstName.trim() && (
              <p className="text-xs text-destructive">First name is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName" className="text-sm font-semibold">
              Middle Name
            </Label>
            <Input
              id="middleName"
              placeholder="Middle name"
              value={data.middleName}
              onChange={(e) => onChange("middleName", e.target.value.toUpperCase())}
              className="h-11"
            />
          </div>
        </div>

        {/* PAN Print Name */}
        <div className="space-y-2">
          <Label htmlFor="panPrintName" className="text-sm font-semibold">
            Name to be printed on PAN Card
          </Label>
          <Input
            id="panPrintName"
            placeholder="Leave blank to use full name"
            value={data.panPrintName}
            onChange={(e) => onChange("panPrintName", e.target.value.toUpperCase())}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">If blank, full name will be used</p>
        </div>

        {/* Other Name */}
        <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <Checkbox
              id="hasOtherName"
              checked={data.hasOtherName}
              onCheckedChange={(v) => onChange("hasOtherName", !!v)}
            />
            <Label htmlFor="hasOtherName" className="text-sm font-semibold cursor-pointer">
              Are you known by any other name? (Alias)
            </Label>
          </div>
          {data.hasOtherName && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
              <Select value={data.otherNameTitle} onValueChange={(v) => onChange("otherNameTitle", v)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shri">Shri</SelectItem>
                  <SelectItem value="Smt">Smt</SelectItem>
                  <SelectItem value="Kumari">Kumari</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Last Name" value={data.otherLastName} onChange={(e) => onChange("otherLastName", e.target.value.toUpperCase())} className="h-11" />
              <Input placeholder="First Name" value={data.otherFirstName} onChange={(e) => onChange("otherFirstName", e.target.value.toUpperCase())} className="h-11" />
              <Input placeholder="Middle Name" value={data.otherMiddleName} onChange={(e) => onChange("otherMiddleName", e.target.value.toUpperCase())} className="h-11" />
            </div>
          )}
        </div>

        {/* Gender & DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Gender <span className="text-destructive">*</span>
            </Label>
            <Select value={data.gender} onValueChange={(v) => onChange("gender", v)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="transgender">Transgender</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-semibold">
              Date of Birth <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dob"
              type="date"
              value={data.dob}
              onChange={(e) => onChange("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              className={`h-11 ${getError("dob", data.dob) ? "border-destructive" : ""}`}
            />
            {getError("dob", data.dob) && (
              <p className="text-xs text-destructive">{getError("dob", data.dob)}</p>
            )}
          </div>
        </div>

        {/* Applicant Status */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            Status of Applicant <span className="text-destructive">*</span>
          </Label>
          <Select value={data.applicantStatus} onValueChange={(v) => onChange("applicantStatus", v)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="huf">Hindu Undivided Family</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="partnership">Partnership Firm</SelectItem>
              <SelectItem value="trust">Trust</SelectItem>
              <SelectItem value="association">Association of Persons</SelectItem>
              <SelectItem value="body">Body of Individuals</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="artificial">Artificial Juridical Person</SelectItem>
              <SelectItem value="llp">Limited Liability Partnership</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Existing PAN (for non-new services) */}
        {serviceType !== "new" && (
          <div className="space-y-2">
            <Label htmlFor="panNumber" className="text-sm font-semibold">
              Existing PAN Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="panNumber"
              placeholder="ABCDE1234F"
              value={data.panNumber}
              onChange={(e) => onChange("panNumber", formatPan(e.target.value))}
              onBlur={() => handleBlur("pan")}
              maxLength={10}
              className={`h-11 ${getError("pan", data.panNumber) ? "border-destructive" : ""}`}
            />
            {getError("pan", data.panNumber) && (
              <p className="text-xs text-destructive">{getError("pan", data.panNumber)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantDetails;

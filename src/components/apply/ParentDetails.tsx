import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ParentDetailsProps {
  data: {
    fatherLastName: string;
    fatherFirstName: string;
    fatherMiddleName: string;
    motherLastName: string;
    motherFirstName: string;
    motherMiddleName: string;
    isSingleParent: boolean;
    parentOnCard: string;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const ParentDetails = ({ data, onChange }: ParentDetailsProps) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-foreground mb-2">
        Parent Details
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        As per Form 49A — Father's and Mother's name
      </p>

      <div className="space-y-6">
        {/* Father's Name */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground">Father's Name <span className="text-destructive">*</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fatherLastName" className="text-sm font-semibold">Last Name</Label>
              <Input
                id="fatherLastName"
                placeholder="Surname"
                value={data.fatherLastName}
                onChange={(e) => onChange("fatherLastName", e.target.value.toUpperCase())}
                onBlur={() => handleBlur("fatherLastName")}
                className={`h-11 ${touched.fatherLastName && !data.fatherLastName.trim() ? "border-destructive" : ""}`}
              />
              {touched.fatherLastName && !data.fatherLastName.trim() && (
                <p className="text-xs text-destructive">Required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fatherFirstName" className="text-sm font-semibold">First Name</Label>
              <Input
                id="fatherFirstName"
                placeholder="First name"
                value={data.fatherFirstName}
                onChange={(e) => onChange("fatherFirstName", e.target.value.toUpperCase())}
                onBlur={() => handleBlur("fatherFirstName")}
                className={`h-11 ${touched.fatherFirstName && !data.fatherFirstName.trim() ? "border-destructive" : ""}`}
              />
              {touched.fatherFirstName && !data.fatherFirstName.trim() && (
                <p className="text-xs text-destructive">Required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fatherMiddleName" className="text-sm font-semibold">Middle Name</Label>
              <Input
                id="fatherMiddleName"
                placeholder="Middle name"
                value={data.fatherMiddleName}
                onChange={(e) => onChange("fatherMiddleName", e.target.value.toUpperCase())}
                className="h-11"
              />
            </div>
          </div>
        </div>

        {/* Mother's Name */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground">Mother's Name</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="motherLastName" className="text-sm font-semibold">Last Name</Label>
              <Input
                id="motherLastName"
                placeholder="Surname"
                value={data.motherLastName}
                onChange={(e) => onChange("motherLastName", e.target.value.toUpperCase())}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherFirstName" className="text-sm font-semibold">First Name</Label>
              <Input
                id="motherFirstName"
                placeholder="First name"
                value={data.motherFirstName}
                onChange={(e) => onChange("motherFirstName", e.target.value.toUpperCase())}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherMiddleName" className="text-sm font-semibold">Middle Name</Label>
              <Input
                id="motherMiddleName"
                placeholder="Middle name"
                value={data.motherMiddleName}
                onChange={(e) => onChange("motherMiddleName", e.target.value.toUpperCase())}
                className="h-11"
              />
            </div>
          </div>
        </div>

        {/* Single Parent */}
        <div className="p-4 rounded-lg border border-border bg-muted/20 space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="isSingleParent"
              checked={data.isSingleParent}
              onCheckedChange={(v) => onChange("isSingleParent", !!v)}
            />
            <Label htmlFor="isSingleParent" className="text-sm font-semibold cursor-pointer">
              Single parent — mother's name only to be printed on PAN
            </Label>
          </div>

          {/* Parent on card preference */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Name to be printed on PAN card
            </Label>
            <RadioGroup value={data.parentOnCard} onValueChange={(v) => onChange("parentOnCard", v)} className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="father" id="parentFather" />
                <Label htmlFor="parentFather" className="text-sm cursor-pointer">Father's Name</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="mother" id="parentMother" />
                <Label htmlFor="parentMother" className="text-sm cursor-pointer">Mother's Name</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDetails;

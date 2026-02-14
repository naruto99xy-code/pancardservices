import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { validators, formatMobile } from "@/lib/validators";

interface ContactIncomeProps {
  data: {
    countryCode: string;
    stdCode: string;
    mobile: string;
    email: string;
    sourceOfIncome: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

const incomeSources = [
  { id: "salary", label: "Salary" },
  { id: "business", label: "Business / Profession" },
  { id: "house_property", label: "Income from House Property" },
  { id: "capital_gains", label: "Capital Gains" },
  { id: "other_sources", label: "Income from Other Sources" },
  { id: "no_income", label: "No Income" },
];

const ContactIncome = ({ data, onChange }: ContactIncomeProps) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const toggleIncome = (id: string) => {
    const current = data.sourceOfIncome;
    if (id === "no_income") {
      onChange("sourceOfIncome", current.includes("no_income") ? [] : ["no_income"]);
    } else {
      const without = current.filter((s) => s !== "no_income");
      onChange("sourceOfIncome", without.includes(id) ? without.filter((s) => s !== id) : [...without, id]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-foreground mb-2">
        Contact & Income Details
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        As per Form 49A — Telephone, Email & Source of Income
      </p>

      <div className="space-y-6">
        {/* Phone */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Country Code</Label>
            <Input value={data.countryCode} onChange={(e) => onChange("countryCode", e.target.value)} className="h-11" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">STD / ISD Code</Label>
            <Input value={data.stdCode} onChange={(e) => onChange("stdCode", e.target.value)} placeholder="e.g. 020" className="h-11" />
          </div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Mobile Number <span className="text-destructive">*</span></Label>
            <Input
              value={data.mobile}
              onChange={(e) => onChange("mobile", formatMobile(e.target.value))}
              onBlur={() => handleBlur("mobile")}
              maxLength={10}
              placeholder="10-digit mobile"
              className={`h-11 ${touched.mobile && validators.mobile(data.mobile) ? "border-destructive" : ""}`}
            />
            {touched.mobile && validators.mobile(data.mobile) && <p className="text-xs text-destructive">{validators.mobile(data.mobile)}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Email Address <span className="text-destructive">*</span></Label>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="your@email.com"
            className={`h-11 ${touched.email && validators.email(data.email) ? "border-destructive" : ""}`}
          />
          {touched.email && validators.email(data.email) && <p className="text-xs text-destructive">{validators.email(data.email)}</p>}
        </div>

        {/* Source of Income */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Source of Income <span className="text-destructive">*</span></Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {incomeSources.map((source) => (
              <div key={source.id} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                <Checkbox
                  id={`income-${source.id}`}
                  checked={data.sourceOfIncome.includes(source.id)}
                  onCheckedChange={() => toggleIncome(source.id)}
                />
                <Label htmlFor={`income-${source.id}`} className="text-sm cursor-pointer flex-1">{source.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactIncome;

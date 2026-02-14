import { FileText, PenLine, Copy, AlertTriangle, Users, Heart, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceSelectProps {
  selectedService: string;
  onSelect: (service: string) => void;
}

const services = [
  { id: "new", title: "Apply New PAN Card", icon: FileText, description: "First-time application" },
  { id: "correction", title: "PAN Card Correction", icon: PenLine, description: "Update existing details" },
  { id: "duplicate", title: "Duplicate PAN Card", icon: Copy, description: "Reprint existing PAN" },
  { id: "lost", title: "Lost / Damaged PAN", icon: AlertTriangle, description: "Replace lost card" },
  { id: "minor-to-major", title: "Minor to Major PAN", icon: Users, description: "Update on turning 18" },
  { id: "marriage", title: "PAN After Marriage", icon: Heart, description: "Update after marriage" },
  { id: "pan2", title: "PAN 2.0 with QR Code", icon: QrCode, description: "Upgrade to PAN 2.0" },
];

const ServiceSelect = ({ selectedService, onSelect }: ServiceSelectProps) => {
  return (
    <div>
      <h2 className="text-xl font-display font-bold mb-2">
        Select Service Type
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Choose the PAN card service you need
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
              selectedService === service.id
                ? "border-secondary bg-secondary/5 shadow-card-hover"
                : "border-border bg-card hover:border-secondary/30 hover:shadow-card"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 transition-all",
                selectedService === service.id
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <service.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{service.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelect;

import { cn } from "@/lib/utils";

interface ChangesSelectProps {
  selectedChanges: string[];
  onToggle: (change: string) => void;
}

const changeOptions = [
  { id: "name", label: "Name", description: "Correct or update your name" },
  { id: "dob", label: "Date of Birth", description: "Correct your date of birth" },
  { id: "father-name", label: "Father's Name", description: "Update father's name" },
  { id: "address", label: "Address", description: "Update your correspondence address" },
  { id: "photo", label: "Photo", description: "Update your photograph" },
  { id: "signature", label: "Signature", description: "Update your signature" },
  { id: "gender", label: "Gender", description: "Correct gender details" },
  { id: "contact", label: "Contact Details", description: "Update phone or email" },
];

const ChangesSelect = ({ selectedChanges, onToggle }: ChangesSelectProps) => {
  return (
    <div>
      <h2 className="text-xl font-display font-bold mb-2">
        Select Changes Required
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Select all the corrections you want to make
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {changeOptions.map((option) => {
          const isSelected = selectedChanges.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => onToggle(option.id)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200",
                isSelected
                  ? "border-secondary bg-secondary/5"
                  : "border-border bg-card hover:border-secondary/30"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-md border-2 flex-shrink-0 transition-all",
                  isSelected
                    ? "bg-secondary border-secondary text-secondary-foreground"
                    : "border-border bg-card"
                )}
              >
                {isSelected && (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{option.label}</h3>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChangesSelect;

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: index === currentStep ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                  index < currentStep
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground border-primary shadow-card-hover"
                    : "bg-muted text-muted-foreground border-border"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4.5 w-4.5" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center max-w-[100px]",
                  index < currentStep
                    ? "text-secondary font-semibold"
                    : index === currentStep
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-3 mb-6">
                <div className="relative h-[2px] bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ width: index < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 bg-secondary rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-semibold text-secondary">
            {steps[currentStep]}
          </span>
        </div>
        <div className="flex gap-1.5">
          {steps.map((_, index) => (
            <div
              key={index}
              className="relative h-2 flex-1 rounded-full bg-border overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{
                  width: index < currentStep ? "100%" : index === currentStep ? "50%" : "0%",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 bg-secondary rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;

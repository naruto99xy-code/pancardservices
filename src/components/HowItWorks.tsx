import { ClipboardList, Upload, CreditCard, CheckCircle, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: ClipboardList,
    title: "Choose Your Service",
    description: "Select the PAN card service you need — new application, correction, reprint, or upgrade",
    step: "01",
  },
  {
    icon: ClipboardList,
    title: "Fill Application Details",
    description: "Enter your personal information, address, and other required details in the online form",
    step: "02",
  },
  {
    icon: Upload,
    title: "Upload Documents",
    description: "Upload Aadhaar, photograph, signature, and supporting documents as specified",
    step: "03",
  },
  {
    icon: CreditCard,
    title: "Make Secure Payment",
    description: "Pay securely via UPI, debit/credit card, net banking, or wallets through Razorpay",
    step: "04",
  },
  {
    icon: Truck,
    title: "PAN Card Delivered",
    description: "Your PAN card is processed and delivered to your doorstep. Track status in real-time",
    step: "05",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50 border-y border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-4 border border-primary/10">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            How It Works — 5 Easy Steps
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Get your PAN card processed quickly with our streamlined online process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border">
                  <div className="absolute right-0 top-[-3px] w-2 h-2 rounded-full bg-secondary" />
                </div>
              )}

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border shadow-card">
                    <step.icon className="h-8 w-8 text-secondary" strokeWidth={1.6} />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold shadow-sm">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[15px] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

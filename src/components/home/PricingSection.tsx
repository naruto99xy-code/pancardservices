import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "New PAN Card",
    price: "₹126",
    gst: "Inclusive of GST",
    description: "First-time PAN card application for individuals, minors, and entities.",
    features: [
      "Online application processing",
      "Document verification support",
      "Application tracking",
      "PAN card delivered to doorstep",
      "Email & SMS notifications",
    ],
    href: "/apply?service=new",
    popular: false,
  },
  {
    name: "PAN Correction",
    price: "₹126",
    gst: "Inclusive of GST",
    description: "Update name, DOB, address, photo, or signature on your existing PAN card.",
    features: [
      "All fields correction support",
      "Document verification",
      "Updated PAN card delivery",
      "Real-time status tracking",
      "Priority processing available",
      "Expert guidance included",
    ],
    href: "/apply?service=correction",
    popular: true,
  },
  {
    name: "Reprint / Duplicate",
    price: "₹126",
    gst: "Inclusive of GST",
    description: "Get a reprint of your lost, damaged, or undelivered PAN card.",
    features: [
      "Same PAN number retained",
      "Fresh card printing",
      "Doorstep delivery",
      "Application tracking",
      "Quick turnaround time",
    ],
    href: "/apply?service=duplicate",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/8 text-secondary text-sm font-semibold mb-4 border border-secondary/15">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Simple & Affordable Pricing
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            No hidden charges. Pay once and get your PAN card processed with full support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-card rounded-xl border shadow-card overflow-hidden ${
                plan.popular
                  ? "border-secondary shadow-md ring-1 ring-secondary/20"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="bg-secondary text-secondary-foreground text-xs font-bold text-center py-1.5 tracking-wide uppercase">
                  Most Popular
                </div>
              )}
              <div className="p-7">
                <h3 className="font-display font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-display font-extrabold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-2">{plan.gst}</span>
                </div>

                <ul className="space-y-3 mb-7">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.href}>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full gap-2"
                    size="lg"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security & payment note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 bg-card rounded-xl p-5 border border-border shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/8 text-accent shrink-0">
              <Shield className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm mb-1">Secure Payment Gateway</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All payments are processed through Razorpay's PCI-DSS compliant payment gateway. We accept UPI, debit/credit cards, net banking, and wallets. Your financial data is never stored on our servers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-4 px-1">
            <Info className="h-4 w-4 text-saffron mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Government fees, if any, are charged separately as applicable. Prices shown above are service charges for facilitation and processing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

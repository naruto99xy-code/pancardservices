import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { RefreshCw, CheckCircle2, XCircle, Clock, CreditCard, HelpCircle } from "lucide-react";

const sections = [
  {
    icon: RefreshCw,
    title: "Refund Eligibility",
    content: [
      "You are eligible for a full refund if your application could not be processed due to a technical error on our platform.",
      "If we are unable to submit your application to the government portal (NSDL/UTIITSL) due to a system failure on our end, a full refund will be issued.",
      "Duplicate payments made due to payment gateway errors will be refunded in full after verification.",
      "If you accidentally paid twice for the same application, the duplicate amount will be refunded within 7 working days.",
    ],
  },
  {
    icon: XCircle,
    title: "Non-Refundable Scenarios",
    content: [
      "Applications rejected by the government authority (NSDL/UTIITSL) due to incorrect or fraudulent information provided by the user.",
      "Applications where documents uploaded by the user are incomplete, unclear, or do not meet government specifications.",
      "Service fees are non-refundable once the application has been successfully submitted to the government processing portal.",
      "Change of mind after successful submission of the application is not grounds for a refund.",
      "Delays in PAN card delivery by the postal service or government authority do not qualify for a refund.",
      "Government processing fees (if separately charged) are non-refundable under any circumstances.",
    ],
  },
  {
    icon: Clock,
    title: "Refund Processing Timeline",
    content: [
      "Approved refunds are processed within 7–10 working days from the date of approval.",
      "Refunds are credited back to the original payment method used during the transaction.",
      "Bank processing times may add an additional 3–5 working days for the amount to reflect in your account.",
      "UPI refunds are typically faster and may reflect within 2–3 working days.",
      "Credit/debit card refunds may take up to 2 billing cycles depending on your card issuer.",
    ],
  },
  {
    icon: CreditCard,
    title: "Partial Refunds",
    content: [
      "If your application was partially processed before encountering an issue, a partial refund may be issued after deducting the cost of work completed.",
      "The partial refund amount will be determined based on the stage at which processing was halted.",
      "Partial refunds for correction applications that were partially processed will be evaluated on a case-by-case basis.",
    ],
  },
  {
    icon: CheckCircle2,
    title: "How to Request a Refund",
    content: [
      "Send a refund request to info@instantepan.com with your Application Number, payment transaction ID, and reason for the refund request.",
      "You may also contact our helpline at 7400408812 (Mon–Sat, 9 AM – 7 PM IST) to initiate a refund request.",
      "Use the Contact Us page to submit a formal refund request through our support form.",
      "Our team will review your request and respond within 48 business hours with the decision.",
      "Refund requests must be raised within 15 days of the payment date.",
    ],
  },
  {
    icon: HelpCircle,
    title: "Cancellation Policy",
    content: [
      "Applications can be cancelled before submission to the government portal. A full refund will be issued for cancelled applications.",
      "Once an application has been submitted to NSDL/UTIITSL, it cannot be cancelled, and no refund will be provided.",
      "To cancel a pending application, contact support immediately with your application number.",
      "This refund policy was last updated in February 2026 and is subject to change with prior notice.",
    ],
  },
];

const RefundPolicy = () => (
  <Layout>
    <section className="gradient-navy py-16 md:py-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Refund Policy</h1>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto">
            We believe in transparent pricing and fair refund practices. Read below for details.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-12 md:py-20">
      <div className="container max-w-4xl space-y-8">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/8 text-accent">
                <section.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h2 className="font-display font-bold text-lg">{section.title}</h2>
            </div>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/40 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default RefundPolicy;

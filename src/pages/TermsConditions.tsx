import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { FileText, AlertTriangle, CreditCard, Scale, Ban, HelpCircle } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the PAN Card Services platform, you agree to be bound by these Terms and Conditions.",
      "These terms constitute a legally binding agreement between you ('User') and PAN Card Services Pvt. Ltd. ('Company').",
      "If you do not agree with any part of these terms, you must not use our services.",
      "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the revised terms.",
      "Users must be at least 18 years of age to use this platform independently. Minors must have a parent or guardian submit applications on their behalf.",
    ],
  },
  {
    icon: Scale,
    title: "2. Nature of Services",
    content: [
      "PAN Card Services is a private facilitation platform that assists users in applying for PAN cards through authorized government channels (NSDL/UTIITSL).",
      "We are NOT a government agency and are not affiliated with, endorsed by, or connected to the Income Tax Department of India, NSDL, or UTIITSL.",
      "Our services include assistance with form filling, document verification, application submission, and status tracking.",
      "Government processing fees are separate from our service charges and are subject to change as per government notifications.",
      "We do not guarantee approval of any PAN card application. Approval is at the sole discretion of the respective government authority.",
      "Processing timelines are estimates and may vary based on government processing speeds and document verification requirements.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "3. User Responsibilities",
    content: [
      "You are responsible for providing accurate, complete, and truthful information in your application.",
      "Submitting false, misleading, or fraudulent information is a punishable offense under the Income Tax Act, 1961.",
      "You must ensure all uploaded documents are genuine, self-attested, and clearly legible.",
      "You are responsible for maintaining the confidentiality of your application credentials and tracking information.",
      "You agree not to use our platform for any illegal or unauthorized purpose.",
      "Multiple PAN cards for the same individual are illegal. If you already have a PAN, apply for correction or reprint — not a new PAN.",
    ],
  },
  {
    icon: CreditCard,
    title: "4. Payment Terms",
    content: [
      "Service fees are clearly displayed before payment and include applicable GST.",
      "All payments are processed securely through Razorpay's PCI-DSS compliant payment gateway.",
      "Payment confirmation is sent via email and SMS to the registered contact details.",
      "Fees once paid are subject to our Refund Policy. Please review the Refund Policy page for detailed information.",
      "We reserve the right to modify our service charges with prior notice displayed on the platform.",
      "Failed or abandoned payments must be retried. Partial payments are not accepted.",
    ],
  },
  {
    icon: Ban,
    title: "5. Limitation of Liability",
    content: [
      "We shall not be liable for any delays, rejections, or errors caused by government agencies in processing your PAN application.",
      "Our liability is limited to the service fee paid by the user. We are not liable for any consequential, incidental, or indirect damages.",
      "We are not responsible for any loss arising from incorrect information provided by the user.",
      "Service interruptions due to maintenance, technical issues, or force majeure events are beyond our control.",
      "We do not guarantee uninterrupted access to the platform and shall not be liable for any downtime.",
    ],
  },
  {
    icon: HelpCircle,
    title: "6. Governing Law & Dispute Resolution",
    content: [
      "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi.",
      "We encourage users to first contact our support team to resolve any issues before pursuing legal remedies.",
      "Any claim or dispute must be raised within 30 days of the event giving rise to the claim.",
      "These terms were last updated in February 2026. Previous versions are available upon request.",
    ],
  },
];

const TermsConditions = () => (
  <Layout>
    <section className="gradient-navy py-16 md:py-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Terms & Conditions</h1>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto">
            Please read these terms carefully before using our PAN card facilitation services.
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <section.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h2 className="font-display font-bold text-lg">{section.title}</h2>
            </div>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
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

export default TermsConditions;

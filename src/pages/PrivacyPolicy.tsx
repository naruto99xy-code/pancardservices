import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal identification details: Full name, date of birth, gender, and father's/mother's name as required for PAN card applications.",
      "Contact information: Email address, mobile number, and residential/office address.",
      "Identity documents: Aadhaar number, existing PAN number (if applicable), passport details for NRIs.",
      "Uploaded documents: Scanned copies of identity proof, address proof, date of birth proof, photograph, and signature.",
      "Payment information: Transaction IDs, payment method details (processed securely via Razorpay — we do not store card numbers).",
      "Device and usage data: IP address, browser type, pages visited, and session duration for analytics and security purposes.",
    ],
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: [
      "Processing your PAN card application through authorized government channels (NSDL/UTIITSL).",
      "Communicating application status updates, payment confirmations, and delivery notifications via email and SMS.",
      "Verifying your identity and preventing fraudulent or duplicate applications.",
      "Improving our platform's user experience, performance, and service quality.",
      "Complying with legal obligations under the Income Tax Act, 1961, and other applicable Indian laws.",
      "Generating application summary PDFs for your records and for processing by authorized operators.",
    ],
  },
  {
    icon: Shield,
    title: "Data Security Measures",
    content: [
      "All data transmissions are encrypted using 256-bit SSL/TLS encryption (HTTPS).",
      "Stored data is protected with AES-256 encryption at rest in our secure cloud infrastructure.",
      "Access to personal data is restricted to authorized personnel only, with role-based access controls.",
      "Regular security audits and vulnerability assessments are conducted to maintain data integrity.",
      "Uploaded documents are stored in isolated, encrypted storage buckets with strict access policies.",
      "We maintain comprehensive audit logs for all data access and modifications.",
    ],
  },
  {
    icon: UserCheck,
    title: "Data Sharing & Third Parties",
    content: [
      "We share your application data with NSDL e-Governance Infrastructure Limited or UTIITSL solely for PAN card processing.",
      "Payment processing is handled by Razorpay, which operates under its own PCI-DSS compliant privacy policy.",
      "We do not sell, rent, or trade your personal information to any third party for marketing purposes.",
      "We may disclose information if required by law, court order, or government authority under applicable Indian legislation.",
      "Our authorized operators access application data only for processing purposes under strict confidentiality agreements.",
    ],
  },
  {
    icon: Eye,
    title: "Your Rights",
    content: [
      "You may request access to your personal data by contacting our support team.",
      "You can request correction of inaccurate personal information in your application records.",
      "You may request deletion of your data after your application has been fully processed (subject to legal retention requirements).",
      "You can opt out of promotional communications at any time by clicking 'Unsubscribe' in our emails.",
      "You have the right to withdraw consent for data processing, though this may affect our ability to process your application.",
    ],
  },
  {
    icon: Mail,
    title: "Contact & Grievance",
    content: [
      "For privacy-related queries, contact our Data Protection Officer at privacy@panservices.in.",
      "You may also write to us at: Grievance Officer, PAN Card Services Pvt. Ltd., Connaught Place, New Delhi – 110001.",
      "We aim to respond to all privacy-related inquiries within 48 business hours.",
      "This privacy policy is subject to change. Updates will be posted on this page with the revised effective date.",
      "Last updated: February 2026.",
    ],
  },
];

const PrivacyPolicy = () => (
  <Layout>
    <section className="gradient-navy py-16 md:py-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Privacy Policy</h1>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/8 text-secondary">
                <section.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h2 className="font-display font-bold text-lg">{section.title}</h2>
            </div>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary/40 shrink-0" />
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

export default PrivacyPolicy;

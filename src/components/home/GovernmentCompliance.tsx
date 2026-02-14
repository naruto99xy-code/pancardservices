import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, Eye, Server, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Government Compliant Process",
    description:
      "Our application process follows all guidelines set by the Income Tax Department of India and NSDL/UTIITSL for PAN card issuance.",
  },
  {
    icon: Lock,
    title: "AES-256 Data Encryption",
    description:
      "All personal data and documents are encrypted using military-grade AES-256 encryption both at rest and during transmission.",
  },
  {
    icon: FileCheck,
    title: "Verified Document Handling",
    description:
      "Your documents are securely processed and verified by trained professionals. We never share your data with unauthorized third parties.",
  },
  {
    icon: Eye,
    title: "Transparent Operations",
    description:
      "Track your application status in real-time. Every step of the process is visible to you through our tracking dashboard.",
  },
  {
    icon: Server,
    title: "Secure Cloud Infrastructure",
    description:
      "Our platform runs on enterprise-grade cloud infrastructure with 99.9% uptime, automated backups, and disaster recovery systems.",
  },
  {
    icon: BadgeCheck,
    title: "Privacy Policy Compliant",
    description:
      "We adhere to strict privacy guidelines. Your personal information is collected only for PAN card processing and is never sold or misused.",
  },
];

const GovernmentCompliance = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/8 text-accent text-sm font-semibold mb-4 border border-accent/15">
            Security & Trust
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Government-Grade Security & Compliance
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            We take the security of your personal data seriously. Our platform is built with enterprise-level security protocols to protect your information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-card rounded-xl p-6 border border-border shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary mb-4">
                <feature.icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-bold text-[15px] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Government disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-primary/3 rounded-xl p-6 border border-primary/10 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="font-display font-bold text-sm mb-1">Important Notice</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PAN Card Services is an authorized facilitation platform. We assist applicants in the PAN card application process through NSDL/UTIITSL channels. We are not directly affiliated with the Income Tax Department of India. All government processing fees are collected and remitted separately.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GovernmentCompliance;

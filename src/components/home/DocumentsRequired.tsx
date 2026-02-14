import { motion } from "framer-motion";
import { FileText, CreditCard, Home, Camera, PenLine, CheckCircle2 } from "lucide-react";

const documents = [
  {
    category: "Identity Proof",
    icon: CreditCard,
    items: [
      "Aadhaar Card (mandatory for Indian citizens)",
      "Voter ID Card",
      "Passport (for NRIs / foreign nationals)",
      "Driving Licence",
      "Ration Card with photograph",
    ],
  },
  {
    category: "Address Proof",
    icon: Home,
    items: [
      "Aadhaar Card with current address",
      "Electricity / Water / Gas bill (recent)",
      "Bank account statement (last 3 months)",
      "Post office passbook with address",
      "Registered rent agreement",
    ],
  },
  {
    category: "Date of Birth Proof",
    icon: FileText,
    items: [
      "Birth Certificate issued by municipal authority",
      "Aadhaar Card showing date of birth",
      "Matriculation / 10th class certificate",
      "Passport",
      "Driving Licence",
    ],
  },
  {
    category: "Photo & Signature",
    icon: Camera,
    items: [
      "Recent passport-size colour photograph",
      "JPEG format, max 200 KB",
      "Signature on white paper scanned",
      "JPEG format, max 100 KB",
      "Clear and legible without background noise",
    ],
  },
];

const correctionDocs = [
  { label: "Marriage certificate (for name change after marriage)", icon: PenLine },
  { label: "Gazette notification (for legal name change)", icon: FileText },
  { label: "Court order (if applicable for corrections)", icon: FileText },
  { label: "Updated Aadhaar card reflecting new details", icon: CreditCard },
];

const DocumentsRequired = () => {
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
            Documentation Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Documents Required for PAN Card
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Keep these documents ready before starting your PAN card application. All documents must be clear, valid, and self-attested.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-card rounded-xl p-6 border border-border shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/8 text-secondary">
                  <doc.icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-lg">{doc.category}</h3>
              </div>
              <ul className="space-y-2.5">
                {doc.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional documents for corrections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card"
        >
          <h3 className="font-display font-bold text-lg mb-5">
            Additional Documents for Corrections & Updates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {correctionDocs.map((doc, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                <span className="leading-relaxed">{doc.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentsRequired;

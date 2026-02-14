import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { AlertTriangle, Info, ExternalLink } from "lucide-react";

const Disclaimer = () => (
  <Layout>
    <section className="gradient-navy py-16 md:py-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Disclaimer</h1>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto">
            Important legal information regarding the use of our platform and services.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-12 md:py-20">
      <div className="container max-w-4xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-saffron/5 rounded-xl p-6 md:p-8 border border-saffron/15">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron/10 text-saffron shrink-0">
              <AlertTriangle className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg mb-3">Not a Government Website</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PAN Card Services (<strong>panservices.in</strong>) is a <strong>private facilitation platform</strong> and is <strong>NOT</strong> affiliated with, endorsed by, or connected to the Income Tax Department of India, NSDL e-Governance Infrastructure Limited, UTI Infrastructure Technology and Services Limited (UTIITSL), or any other government body. We provide facilitation and assistance services for PAN card applications through authorized channels.
              </p>
            </div>
          </div>
        </motion.div>

        {[
          {
            title: "Service Charges",
            text: "Our platform charges a service fee for facilitating PAN card applications. This fee is separate from any government fees that may be applicable. The service fee covers application assistance, document verification, form filling support, status tracking, and customer support. Government fees, if any, are charged as per the prevailing rates set by NSDL/UTIITSL.",
          },
          {
            title: "No Guarantee of Approval",
            text: "We do not guarantee the approval of any PAN card application. The decision to issue, correct, reprint, or update a PAN card rests solely with the respective government authority (NSDL/UTIITSL/Income Tax Department). We are only a facilitation service and have no influence over government processing decisions.",
          },
          {
            title: "Processing Timelines",
            text: "All processing timelines mentioned on our platform are estimates based on historical data and government benchmarks. Actual processing times may vary due to government workload, document verification requirements, postal delivery timelines, or other factors beyond our control. We shall not be held liable for delays in PAN card issuance or delivery.",
          },
          {
            title: "Accuracy of Information",
            text: "While we strive to keep information on our platform accurate and up-to-date, we make no warranties or representations about the completeness, accuracy, or reliability of any content on this website. Users are advised to verify critical information directly with the official NSDL or UTIITSL portals.",
          },
          {
            title: "Intellectual Property",
            text: "All content on this website — including text, graphics, logos, icons, images, and software — is the property of PAN Card Services Pvt. Ltd. or its content suppliers and is protected by Indian and international copyright laws. The use of any government agency names, logos, or branding elements is for informational reference purposes only and does not imply endorsement or affiliation.",
          },
          {
            title: "External Links",
            text: "Our website may contain links to external websites including official government portals. We are not responsible for the content, privacy practices, or availability of these external sites. Links are provided for informational convenience and do not constitute an endorsement.",
          },
          {
            title: "Limitation of Liability",
            text: "To the fullest extent permitted by law, PAN Card Services Pvt. Ltd. shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our services, including but not limited to loss of data, revenue, profits, or business interruption.",
          },
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-5 w-5 text-secondary" />
              <h2 className="font-display font-bold text-lg">{item.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card">
          <h2 className="font-display font-bold text-lg mb-4">Official Government Resources</h2>
          <p className="text-sm text-muted-foreground mb-4">For official PAN card services and information, please visit:</p>
          <div className="space-y-2">
            {[
              { label: "Income Tax Department of India", url: "https://www.incometax.gov.in" },
              { label: "NSDL PAN Portal", url: "https://www.onlineservices.nsdl.com" },
              { label: "UTIITSL PAN Services", url: "https://www.pan.utiitsl.com" },
            ].map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-secondary hover:underline">
                <ExternalLink className="h-3.5 w-3.5" />
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center">
          This disclaimer was last updated in February 2026 and is subject to change without prior notice.
        </p>
      </div>
    </section>
  </Layout>
);

export default Disclaimer;

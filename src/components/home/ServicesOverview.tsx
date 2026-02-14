import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  PenLine,
  Download,
  Search,
  Copy,
  Users,
  Heart,
  QrCode,
  ArrowRight,
} from "lucide-react";

const services: { title: string; description: string; icon: any; href: string; external?: boolean }[] = [
  {
    title: "New PAN Card Application",
    description:
      "Apply for a fresh PAN card for individuals, minors, NRIs, or business entities. Complete online process with doorstep delivery.",
    icon: FileText,
    href: "/apply?service=new",
  },
  {
    title: "PAN Card Correction",
    description:
      "Correct errors in your PAN card — update name, date of birth, address, photograph, or signature as per official records.",
    icon: PenLine,
    href: "/apply?service=correction",
  },
  {
    title: "Reprint / Duplicate PAN",
    description:
      "Lost or damaged your PAN card? Get a reprint or duplicate with the same PAN number delivered to your registered address.",
    icon: Copy,
    href: "/apply?service=duplicate",
  },
  {
    title: "PAN Status Check",
    description:
      "Track your PAN card application in real-time. Enter your application number to get instant status updates at every stage.",
    icon: Search,
    href: "/track",
  },
  {
    title: "PAN 2.0 Upgrade",
    description:
      "Upgrade to the new PAN 2.0 card with an embedded QR code for enhanced security and instant digital verification.",
    icon: QrCode,
    href: "/apply?service=pan2",
  },
  {
    title: "Minor to Major PAN Update",
    description:
      "Turned 18? Update your minor PAN card with your photograph, signature, and updated personal details.",
    icon: Users,
    href: "/apply?service=minor-to-major",
  },
  {
    title: "PAN After Marriage",
    description:
      "Update your PAN card details after marriage — change surname, father's name to husband's name, and more.",
    icon: Heart,
    href: "/apply?service=marriage",
  },
  {
    title: "ePAN Download",
    description:
      "Download your electronic PAN (ePAN) instantly. Digitally signed PDF with the same legal validity as a physical PAN card.",
    icon: Download,
    href: "https://onlineservices.proteantech.in/paam/requestAndDownloadEPAN.html",
    external: true,
  },
];

const ServicesOverview = () => {
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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Complete PAN Card Services
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            From new applications to corrections and upgrades — we provide end-to-end PAN card services with expert guidance and government-compliant processing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              {service.external ? (
                <a href={service.href} target="_blank" rel="noopener noreferrer">
                  <div className="group bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-lift hover:border-secondary/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/8 text-secondary mb-4 group-hover:bg-secondary/15 transition-colors duration-300">
                      <service.icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display font-bold text-[15px] mb-2 group-hover:text-secondary transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Download ePAN
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              ) : (
                <Link to={service.href}>
                  <div className="group bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-lift hover:border-secondary/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/8 text-secondary mb-4 group-hover:bg-secondary/15 transition-colors duration-300">
                      <service.icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display font-bold text-[15px] mb-2 group-hover:text-secondary transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Get Started
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;

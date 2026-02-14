import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const links = [
  { label: "Apply New PAN", path: "/apply?service=new" },
  { label: "PAN Correction", path: "/apply?service=correction" },
  { label: "Reprint PAN", path: "/apply?service=duplicate" },
  { label: "Minor to Major PAN", path: "/apply?service=minor-to-major" },
  { label: "PAN After Marriage", path: "/apply?service=marriage" },
  { label: "Track PAN Status", path: "/track" },
  { label: "Contact Us", path: "/contact" },
];

const QuickLinks = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/50 border-y border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-lg mb-6 text-center">
            Quick Links
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-card border border-border text-sm font-medium hover:border-secondary/30 hover:text-secondary transition-all duration-200 shadow-card hover:shadow-card-hover"
              >
                {link.label}
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickLinks;

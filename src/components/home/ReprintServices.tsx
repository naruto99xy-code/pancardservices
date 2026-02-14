import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy, RefreshCw, AlertTriangle, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Duplicate PAN Card",
    description: "Get a reprint of your existing PAN card with the same details and number.",
    icon: Copy,
    href: "/apply?service=duplicate",
  },
  {
    title: "Reissue PAN Card",
    description: "Reissue your PAN card if it was never delivered or has printing errors.",
    icon: RefreshCw,
    href: "/apply?service=duplicate",
  },
  {
    title: "Lost / Damaged PAN",
    description: "Replace your lost, stolen, or physically damaged PAN card easily.",
    icon: AlertTriangle,
    href: "/apply?service=lost",
  },
];

const ReprintServices = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/8 text-secondary text-sm font-semibold mb-4 border border-secondary/15">
            Reprint & Reissue
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Apply for Reprint / Reissue / Duplicate PAN
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Lost your PAN card or need a fresh copy? We make it simple to get a replacement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link to={service.href}>
                <div className="group bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-lift hover:border-secondary/20 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/8 text-secondary mb-4 group-hover:bg-secondary/15 transition-colors duration-300">
                    <service.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-bold text-[15px] mb-1.5 group-hover:text-secondary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Apply Now
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReprintServices;

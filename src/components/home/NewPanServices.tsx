import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, UserRound, Building2, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Individual PAN Card",
    description: "First-time PAN card application for salaried, self-employed, or freelance individuals.",
    icon: UserRound,
    href: "/apply?service=new",
  },
  {
    title: "Minor PAN Card",
    description: "Apply for a PAN card for children below 18 years of age with guardian details.",
    icon: FileText,
    href: "/apply?service=new",
  },
  {
    title: "Trust / Firm / Company",
    description: "PAN card for businesses, partnerships, trusts, HUFs, and other non-individual entities.",
    icon: Building2,
    href: "/apply?service=new",
  },
];

const NewPanServices = () => {
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
            New Applications
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Apply for New PAN Card
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Don't have a PAN card yet? Apply online in minutes with our guided process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link to={item.href}>
                <div className="group bg-card rounded-xl p-7 border border-border shadow-card hover:shadow-lift hover:border-secondary/20 transition-all duration-300 hover:-translate-y-1 h-full text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary mb-5 mx-auto group-hover:bg-secondary/10 group-hover:text-secondary transition-colors duration-300">
                    <item.icon className="h-8 w-8" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-secondary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
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

export default NewPanServices;

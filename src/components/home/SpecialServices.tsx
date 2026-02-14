import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Heart, QrCode, CreditCard, ArrowRight } from "lucide-react";

const specials = [
  {
    title: "Minor to Major PAN",
    description: "Update your PAN card details when turning 18 — add photo, signature, and updated information.",
    icon: Users,
    href: "/apply?service=minor-to-major",
  },
  {
    title: "PAN After Marriage",
    description: "Update your PAN card with your new name, surname, or other details after marriage.",
    icon: Heart,
    href: "/apply?service=marriage",
  },
  {
    title: "PAN 2.0 with QR Code",
    description: "Upgrade to the new PAN 2.0 card featuring an embedded QR code for easy verification.",
    icon: QrCode,
    href: "/apply?service=pan2",
  },
  {
    title: "ePAN to Physical PAN",
    description: "Convert your electronic ePAN into a physical laminated PAN card delivered to your door.",
    icon: CreditCard,
    href: "/apply?service=duplicate",
  },
];

const SpecialServices = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50 border-y border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-4 border border-primary/10">
            Specialized Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Special PAN Card Services
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Life changes? We've got your PAN card needs covered for every situation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {specials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link to={item.href}>
                <div className="group bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-lift hover:border-secondary/20 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/8 text-secondary mb-4 group-hover:bg-secondary/15 transition-colors duration-300">
                    <item.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-bold text-[15px] mb-1.5 group-hover:text-secondary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Learn More
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

export default SpecialServices;

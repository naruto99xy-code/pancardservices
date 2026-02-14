import { motion } from "framer-motion";
import { Shield, Clock, HeadphonesIcon, Award, UserCheck, Lock } from "lucide-react";

const reasons = [
  {
    icon: UserCheck,
    title: "Expert Assisted Process",
    description: "Our PAN card specialists review every application to ensure accuracy before submission.",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Most applications are processed within 24–48 hours. No unnecessary delays.",
  },
  {
    icon: Lock,
    title: "Secure Data Handling",
    description: "Your documents and personal data are encrypted end-to-end with government-grade security.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Get help via phone, email, or chat throughout the entire application process.",
  },
  {
    icon: Shield,
    title: "100% Compliance",
    description: "We follow NSDL/UTIITSL guidelines ensuring your application meets all requirements.",
  },
  {
    icon: Award,
    title: "Satisfaction Guaranteed",
    description: "Join 15,000+ satisfied customers who trusted us with their PAN card services.",
  },
];

const WhyApplyThroughUs = () => {
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
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Why Apply Through Us?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            We simplify the PAN card process so you can focus on what matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-card rounded-xl p-7 border border-border shadow-card text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/8 text-secondary mx-auto mb-5">
                <item.icon className="h-7 w-7" strokeWidth={1.6} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyApplyThroughUs;

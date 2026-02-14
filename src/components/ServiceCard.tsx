import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  index: number;
}

const ServiceCard = ({ title, description, icon: Icon, href, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link to={href}>
        <div className="group relative bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lift hover:border-secondary/20 transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/8 text-secondary mb-4 group-hover:bg-secondary/15 transition-colors duration-300">
            <Icon className="h-6 w-6" strokeWidth={1.8} />
          </div>

          <h3 className="font-display font-bold text-[15px] mb-1.5 group-hover:text-secondary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300">
            Apply Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;

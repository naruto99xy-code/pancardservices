import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, Star, CheckCircle2, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "15,000+", label: "Applications Processed", icon: TrendingUp },
  { value: "24hrs", label: "Avg. Processing Time", icon: Clock },
  { value: "4.8/5", label: "Customer Satisfaction", icon: Star },
  { value: "99.9%", label: "Success Rate", icon: CheckCircle2 },
];

const badges = [
  { icon: Shield, text: "Government Compliant" },
  { icon: FileText, text: "NSDL / UTIITSL Channel" },
];

const HeroSection = () => {
  return (
    <section className="relative gradient-navy overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-foreground/3 blur-[80px]" />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground/70 text-sm font-medium mb-8">
              <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
              Trusted by 15,000+ users across India
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-display font-extrabold text-primary-foreground leading-[1.1] mb-6 tracking-tight">
              Your PAN Card,{" "}
              <span className="text-saffron">Made Simple</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/60 leading-relaxed mb-8 max-w-2xl">
              Apply for a new PAN card, correct details, get reprints, or check your application status — all online with government-compliant processing and expert support.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              {badges.map((badge) => (
                <div
                  key={badge.text}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/8 text-primary-foreground/60 text-xs font-medium"
                >
                  <badge.icon className="h-3.5 w-3.5 text-accent" />
                  {badge.text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/apply">
                <Button variant="hero" size="xl" className="gap-2">
                  Apply for PAN Card
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/track">
                <Button variant="hero-outline" size="xl">
                  Check Application Status
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-8 border-t border-primary-foreground/8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/5">
                <stat.icon className="h-5 w-5 text-saffron" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-display font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-primary-foreground/40">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

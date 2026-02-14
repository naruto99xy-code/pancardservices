import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, CheckCircle2, Users, Shield } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const useCountUp = (end: number, duration = 2000, startCounting: boolean) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!startCounting || started.current || end === 0) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, startCounting]);

  return count;
};

const AnimatedStat = ({ end, suffix = "", inView }: { end: number; suffix?: string; inView: boolean }) => {
  const count = useCountUp(end, 2000, inView);
  return <>{count.toLocaleString("en-IN")}{suffix}</>;
};

const TrustStats = () => {
  const [appCount, setAppCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const { count, error } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });
      if (!error && count !== null) setAppCount(count);
    };
    fetchCount();
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: <AnimatedStat end={appCount} suffix="+" inView={inView} />, label: "Applications Processed", icon: TrendingUp },
    { value: "24 hrs", label: "Avg. Processing Time", icon: Clock },
    { value: "4.8/5", label: "Customer Rating", icon: Star },
    { value: "99.9%", label: "Success Rate", icon: CheckCircle2 },
    { value: <AnimatedStat end={appCount > 0 ? Math.max(appCount - 50, appCount) : 0} suffix="+" inView={inView} />, label: "Happy Customers", icon: Users },
    { value: "100%", label: "Data Security", icon: Shield },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 gradient-navy">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            Trusted by Thousands Across India
          </h2>
          <p className="text-primary-foreground/55 mt-3 max-w-xl mx-auto">
            Our numbers speak for our commitment to quality and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/5 mx-auto mb-3">
                <stat.icon className="h-6 w-6 text-saffron" strokeWidth={1.8} />
              </div>
              <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-primary-foreground/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;

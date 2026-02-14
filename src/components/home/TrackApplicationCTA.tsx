import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TrackApplicationCTA = () => {
  const [applicationNo, setApplicationNo] = useState("");
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (applicationNo.trim()) {
      navigate(`/track?app=${applicationNo.trim()}`);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-muted/50 border-y border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/8 text-secondary mx-auto mb-5">
            <Search className="h-7 w-7" strokeWidth={1.6} />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Track Your Application
          </h2>
          <p className="text-muted-foreground mb-8">
            Enter your application number below to check real-time status of your PAN card application.
          </p>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              placeholder="Enter Application Number (e.g., PAN-XXXXXX)"
              value={applicationNo}
              onChange={(e) => setApplicationNo(e.target.value)}
              className="h-12 text-base"
            />
            <Button type="submit" size="lg" className="gap-2 shrink-0">
              Track Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default TrackApplicationCTA;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const CancelPanSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border shadow-card p-8 md:p-12 flex flex-col md:flex-row items-start gap-8"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/8 text-destructive shrink-0">
            <XCircle className="h-8 w-8" strokeWidth={1.6} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Cancel or Surrender PAN Card
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
              If you hold multiple PAN cards, you are required by law to surrender the additional ones. 
              Having more than one PAN is illegal under the Income Tax Act and can attract a penalty of ₹10,000. 
              We help you surrender the extra PAN cards smoothly.
            </p>
            <div className="flex items-start gap-2 bg-saffron/5 border border-saffron/15 rounded-lg p-3 mb-6 max-w-xl">
              <Info className="h-4 w-4 text-saffron mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                As per Section 272B of the Income Tax Act, possessing more than one PAN is punishable. 
                Surrender unnecessary PAN cards to avoid legal consequences.
              </p>
            </div>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="gap-2">
                Contact Us to Surrender PAN
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CancelPanSection;

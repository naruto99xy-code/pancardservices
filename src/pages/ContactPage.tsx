import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <Layout>
      <section className="gradient-navy py-12">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">
            Contact Us
          </h1>
          <p className="text-primary-foreground/70 max-w-md mx-auto">
            Have questions? Our support team is here to help
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              {[
                { icon: Phone, title: "Phone", value: "7400408812", sub: "Mon-Sat, 9 AM – 7 PM IST" },
                { icon: Mail, title: "Email", value: "info@instantepan.com", sub: "Response within 24hrs" },
                { icon: MapPin, title: "Office", value: "Shop No 143, Opp Shibbu Bar, Kherwadi Road, Bandra East, Mumbai", sub: "Near Kherwadi Road" },
                { icon: Clock, title: "Hours", value: "Mon - Sat: 9AM - 7PM", sub: "Closed on Sundays" },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary flex-shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border shadow-card space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Full Name</Label>
                    <Input placeholder="Your name" className="h-11" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Email</Label>
                    <Input type="email" placeholder="your@email.com" className="h-11" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Subject</Label>
                  <Input placeholder="How can we help?" className="h-11" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Message</Label>
                  <Textarea placeholder="Tell us more..." rows={4} required />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contacts = [
  {
    icon: Phone,
    title: "Phone Support",
    detail: "7400408812",
    sub: "Mon–Sat, 9 AM – 7 PM IST",
  },
  {
    icon: Mail,
    title: "Email Support",
    detail: "info@instantepan.com",
    sub: "Response within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    detail: "Chat with our team",
    sub: "Available during business hours",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon – Sat: 9 AM – 7 PM",
    sub: "Sunday & Holidays: Closed",
  },
];

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been submitted. We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

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
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Contact & Support
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Have questions or need help? Our support team is ready to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contacts.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-card rounded-xl p-5 border border-border shadow-card text-center"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/8 text-secondary mx-auto mb-3">
                    <item.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-bold text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium mb-0.5">{item.detail}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Office address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 bg-card rounded-xl p-5 border border-border shadow-card"
            >
              <h3 className="font-display font-bold text-sm mb-2">Registered Office</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PAN Card Services Pvt. Ltd.<br />
                Connaught Place, New Delhi – 110001<br />
                India
              </p>
            </motion.div>
          </div>

          {/* Support form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-card space-y-5"
            >
              <h3 className="font-display font-bold text-lg mb-1">Send Us a Message</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Fill out the form below and we'll respond within 24 hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Address</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input
                    id="contact-phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    placeholder="e.g., Application Query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Describe your query in detail..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                Submit Message
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;

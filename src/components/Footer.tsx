import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Clock, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary shadow-sm">
                <span className="text-lg font-extrabold text-secondary-foreground">P</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">PAN Card Services</h3>
                <p className="text-[10px] text-primary-foreground/50 tracking-widest uppercase">
                  Quick • Secure • Reliable
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-sm mb-5">
              India's trusted platform for PAN card services. Apply for a new PAN card, make
              corrections, request reprints, and track your application — all online with
              government-compliant processing.
            </p>
            <div className="space-y-2 text-xs text-primary-foreground/40">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5" />
                SSL Secured & AES-256 Data Encrypted
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                Mon – Sat: 9 AM – 7 PM IST
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-5 text-xs uppercase tracking-[0.2em] text-primary-foreground/40">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "New PAN Card", path: "/apply?service=new" },
                { label: "PAN Correction", path: "/apply?service=correction" },
                { label: "Duplicate PAN", path: "/apply?service=duplicate" },
                { label: "Minor to Major", path: "/apply?service=minor-to-major" },
                { label: "PAN After Marriage", path: "/apply?service=marriage" },
                { label: "PAN 2.0 Upgrade", path: "/apply?service=pan2" },
                { label: "ePAN Download", path: "/apply?service=duplicate" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/60 hover:text-saffron transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-5 text-xs uppercase tracking-[0.2em] text-primary-foreground/40">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Track Application", path: "/track" },
                { label: "Contact Us", path: "/contact" },
                { label: "About Us", path: "/about" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms & Conditions", path: "/terms" },
                { label: "Refund Policy", path: "/refund" },
                { label: "FAQ", path: "/#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/60 hover:text-saffron transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-display font-bold mt-8 mb-4 text-xs uppercase tracking-[0.2em] text-primary-foreground/40">
              Government Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Income Tax Dept.", url: "https://www.incometax.gov.in" },
                { label: "NSDL PAN Portal", url: "https://www.onlineservices.nsdl.com" },
                { label: "UTIITSL PAN", url: "https://www.pan.utiitsl.com" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary-foreground/60 hover:text-saffron transition-colors duration-200"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-5 text-xs uppercase tracking-[0.2em] text-primary-foreground/40">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-3 text-primary-foreground/60">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-foreground/5">
                  <Phone className="h-3.5 w-3.5 text-saffron" />
                </div>
                7400408812
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/60">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-foreground/5">
                  <Mail className="h-3.5 w-3.5 text-saffron" />
                </div>
                info@instantepan.com
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-foreground/5 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-saffron" />
                </div>
                <div>
                   <p>ROYAL Mobile Gallery</p>
                   <p className="text-xs text-primary-foreground/40">
                     Shop No 143, Opp Shibbu Bar, Kherwadi Road, Bandra East, Mumbai
                   </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/8">
          <p className="text-[11px] text-primary-foreground/30 leading-relaxed max-w-5xl">
            <strong>Disclaimer:</strong> PAN Card Services is a private facilitation platform and is not affiliated with, endorsed by, or connected to NSDL e-Governance Infrastructure Limited, UTIITSL, or the Income Tax Department of India. We provide assistance and facilitation services for PAN card applications through authorized channels. Government fees are charged separately as applicable. The use of any government agency names or logos is for informational purposes only.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-primary-foreground/8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/35">
          <p>© {new Date().getFullYear()} PAN Card Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="hover:text-primary-foreground/60 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground/60 transition-colors">
              Terms of Service
            </Link>
            <Link to="/refund" className="hover:text-primary-foreground/60 transition-colors">
              Refund Policy
            </Link>
            <Link to="/disclaimer" className="hover:text-primary-foreground/60 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

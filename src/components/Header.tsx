import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Apply Now", path: "/apply" },
    { label: "Track Application", path: "/track" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="gradient-navy">
        <div className="container flex items-center justify-between py-1.5 text-xs text-primary-foreground/70">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3" />
            Helpline: 7400408812
          </span>
          <div className="flex items-center gap-4">
            <Link
              to="/operator"
              className="hover:text-primary-foreground transition-colors text-primary-foreground/50"
            >
              Operator Portal
            </Link>
            <Link
              to="/admin"
              className="hover:text-primary-foreground transition-colors text-primary-foreground/50"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-card/98 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Mojssam Logo" className="h-10 w-10 rounded-lg object-contain" />
            <div>
              <h1 className="text-base font-display font-bold leading-tight">
                PAN Card Services
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase font-medium">
                Quick • Secure • Reliable
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={
                    isActive(item.path)
                      ? ""
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link to="/apply" className="ml-3">
              <Button variant="default" size="sm" className="gap-1">
                Get Started
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card animate-fade-in">
            <nav className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Link to="/apply" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
                <Button variant="default" className="w-full">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

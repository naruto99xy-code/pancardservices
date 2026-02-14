import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, ArrowLeft, UserPlus, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (isRegister && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (isRegister && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    if (isRegister) {
      const { error } = await signUp(email, password);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Account created! Please check your email to verify your account.");
        setIsRegister(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Login successful!");
        navigate("/");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen gradient-navy flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="bg-card rounded-2xl shadow-elevated p-8 md:p-10 border border-border">
          <div className="text-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary mx-auto mb-5">
              {isRegister ? <UserPlus className="h-7 w-7 text-primary-foreground" /> : <Shield className="h-7 w-7 text-primary-foreground" />}
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              {isRegister ? "Sign up for PAN Card Services" : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11"
                />
              </div>
            )}

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "Please wait..." : (
                <>
                  {isRegister ? <UserPlus className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
                  {isRegister ? "Create Account" : "Sign In"}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsRegister(!isRegister); setConfirmPassword(""); }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isRegister ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

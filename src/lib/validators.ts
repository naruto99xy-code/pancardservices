// Form validation utilities for PAN card application

export const validators = {
  aadhaar: (value: string): string | null => {
    const cleaned = value.replace(/\s/g, "");
    if (!cleaned) return "Aadhaar number is required";
    if (!/^\d{12}$/.test(cleaned)) return "Aadhaar must be exactly 12 digits";
    return null;
  },

  pan: (value: string): string | null => {
    if (!value) return "PAN number is required";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value))
      return "PAN format: ABCDE1234F (5 letters, 4 digits, 1 letter)";
    return null;
  },

  mobile: (value: string): string | null => {
    if (!value) return "Mobile number is required";
    if (!/^[6-9]\d{9}$/.test(value))
      return "Enter valid 10-digit Indian mobile number";
    return null;
  },

  email: (value: string): string | null => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a valid email address";
    return null;
  },

  pincode: (value: string): string | null => {
    if (!value) return "PIN code is required";
    if (!/^\d{6}$/.test(value)) return "PIN code must be exactly 6 digits";
    return null;
  },

  fullName: (value: string): string | null => {
    if (!value.trim()) return "Full name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return null;
  },

  fatherName: (value: string): string | null => {
    if (!value.trim()) return "Father's name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return null;
  },

  dob: (value: string): string | null => {
    if (!value) return "Date of birth is required";
    const d = new Date(value);
    const now = new Date();
    if (d >= now) return "Date of birth must be in the past";
    return null;
  },

  gender: (value: string): string | null => {
    if (!value) return "Gender is required";
    return null;
  },

  addressLine1: (value: string): string | null => {
    if (!value.trim()) return "Address line 1 is required";
    return null;
  },

  city: (value: string): string | null => {
    if (!value.trim()) return "City is required";
    return null;
  },

  state: (value: string): string | null => {
    if (!value) return "State is required";
    return null;
  },
};

export const formatAadhaar = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const formatPan = (value: string): string => {
  return value.toUpperCase().slice(0, 10);
};

export const formatMobile = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 10);
};

export const formatPincode = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 6);
};

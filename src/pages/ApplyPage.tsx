import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import StepIndicator from "@/components/StepIndicator";
import ServiceSelect from "@/components/apply/ServiceSelect";
import ChangesSelect from "@/components/apply/ChangesSelect";
import ApplicantDetails from "@/components/apply/ApplicantDetails";
import ParentDetails from "@/components/apply/ParentDetails";
import AddressDetails from "@/components/apply/AddressDetails";
import ContactIncome from "@/components/apply/ContactIncome";
import DocumentUpload from "@/components/apply/DocumentUpload";
import ReviewConfirm from "@/components/apply/ReviewConfirm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useApplicationSubmit } from "@/hooks/useApplicationSubmit";
import { validators } from "@/lib/validators";

const correctionServices = ["correction", "marriage", "minor-to-major"];

const ApplyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialService = searchParams.get("service") || "";
  const { submitApplication, isSubmitting } = useApplicationSubmit();

  const [currentStep, setCurrentStep] = useState(initialService ? (correctionServices.includes(initialService) ? 1 : 2) : 0);
  const [serviceType, setServiceType] = useState(initialService);
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);

  const [applicant, setApplicant] = useState({
    title: "",
    lastName: "",
    firstName: "",
    middleName: "",
    panPrintName: "",
    hasOtherName: false,
    otherNameTitle: "",
    otherLastName: "",
    otherFirstName: "",
    otherMiddleName: "",
    gender: "",
    dob: "",
    applicantStatus: "individual",
    panNumber: "",
  });

  const [parent, setParent] = useState({
    fatherLastName: "",
    fatherFirstName: "",
    fatherMiddleName: "",
    motherLastName: "",
    motherFirstName: "",
    motherMiddleName: "",
    isSingleParent: false,
    parentOnCard: "father",
  });

  const [address, setAddress] = useState({
    flatDoorBlock: "",
    premisesBuilding: "",
    roadStreetLane: "",
    areaLocality: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    officeName: "",
    officeFlat: "",
    officePremises: "",
    officeRoad: "",
    officeArea: "",
    officeCity: "",
    officeState: "",
    officePincode: "",
    officeCountry: "India",
    communicationAddress: "residence",
    aadhaarNumber: "",
    aadhaarEnrollmentId: "",
    nameAsPerAadhaar: "",
  });

  const [contact, setContact] = useState({
    countryCode: "+91",
    stdCode: "",
    mobile: "",
    email: "",
    sourceOfIncome: [] as string[],
  });

  const [proofData, setProofData] = useState({
    proofOfIdentity: "",
    proofOfAddress: "",
    proofOfDob: "",
  });

  const [documents, setDocuments] = useState<Record<string, File | null>>({});

  const needsChangesStep = correctionServices.includes(serviceType);

  const getSteps = () => {
    return ["Service", ...(needsChangesStep ? ["Changes"] : []), "Personal", "Parents", "Address", "Contact", "Documents", "Review"];
  };

  const steps = getSteps();

  const getActualStep = () => {
    if (!needsChangesStep && currentStep >= 1) return currentStep + 1;
    return currentStep;
  };

  const actualStep = getActualStep();

  const handleServiceSelect = (service: string) => {
    setServiceType(service);
    if (correctionServices.includes(service)) setSelectedChanges([]);
    // Auto-advance after brief delay so user sees selection
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const toggleChange = (change: string) => {
    setSelectedChanges((prev) => prev.includes(change) ? prev.filter((c) => c !== change) : [...prev, change]);
  };

  const handleApplicantChange = (field: string, value: string | boolean) => {
    setApplicant((prev) => ({ ...prev, [field]: value }));
  };

  const handleParentChange = (field: string, value: string | boolean) => {
    setParent((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: string | string[]) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleProofChange = (field: string, value: string) => {
    setProofData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (field: string, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [field]: file }));
  };

  const validateCurrentStep = () => {
    switch (actualStep) {
      case 0:
        if (!serviceType) { toast.error("Please select a service type"); return false; }
        return true;
      case 1:
        if (needsChangesStep && selectedChanges.length === 0) { toast.error("Please select at least one change"); return false; }
        return true;
      case 2: {
        if (!applicant.title) { toast.error("Please select a title"); return false; }
        if (!applicant.lastName.trim()) { toast.error("Last name is required"); return false; }
        if (!applicant.firstName.trim()) { toast.error("First name is required"); return false; }
        if (!applicant.gender) { toast.error("Please select gender"); return false; }
        if (validators.dob(applicant.dob)) { toast.error(validators.dob(applicant.dob)!); return false; }
        if (serviceType !== "new" && validators.pan(applicant.panNumber)) { toast.error(validators.pan(applicant.panNumber)!); return false; }
        return true;
      }
      case 3: {
        if (!parent.fatherLastName.trim() || !parent.fatherFirstName.trim()) { toast.error("Father's name is required"); return false; }
        return true;
      }
      case 4: {
        if (!address.flatDoorBlock.trim()) { toast.error("Flat/Door/Block is required"); return false; }
        if (!address.city.trim()) { toast.error("City is required"); return false; }
        if (!address.state) { toast.error("State is required"); return false; }
        if (validators.pincode(address.pincode)) { toast.error(validators.pincode(address.pincode)!); return false; }
        if (validators.aadhaar(address.aadhaarNumber)) { toast.error(validators.aadhaar(address.aadhaarNumber)!); return false; }
        return true;
      }
      case 5: {
        if (validators.mobile(contact.mobile)) { toast.error(validators.mobile(contact.mobile)!); return false; }
        if (validators.email(contact.email)) { toast.error(validators.email(contact.email)!); return false; }
        if (contact.sourceOfIncome.length === 0) { toast.error("Please select at least one source of income"); return false; }
        return true;
      }
      case 6:
        if (!documents.aadhaarCard || !documents.photo || !documents.signature) { toast.error("Please upload all required documents"); return false; }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    const fullName = [applicant.title, applicant.firstName, applicant.middleName, applicant.lastName].filter(Boolean).join(" ");
    const fatherName = [parent.fatherFirstName, parent.fatherMiddleName, parent.fatherLastName].filter(Boolean).join(" ");

    const applicationNo = await submitApplication({
      serviceType,
      selectedChanges,
      applicant: {
        fullName,
        fatherName,
        dob: applicant.dob,
        gender: applicant.gender,
        aadhaarNumber: address.aadhaarNumber,
        mobile: contact.mobile,
        email: contact.email,
        panNumber: applicant.panNumber,
      },
      address: {
        addressLine1: [address.flatDoorBlock, address.premisesBuilding].filter(Boolean).join(", "),
        addressLine2: [address.roadStreetLane, address.areaLocality].filter(Boolean).join(", "),
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      },
      documents,
      // Extended Form 49A fields
      extended: {
        title: applicant.title,
        firstName: applicant.firstName,
        middleName: applicant.middleName,
        lastName: applicant.lastName,
        panPrintName: applicant.panPrintName,
        hasOtherName: applicant.hasOtherName,
        otherNameTitle: applicant.otherNameTitle,
        otherLastName: applicant.otherLastName,
        otherFirstName: applicant.otherFirstName,
        otherMiddleName: applicant.otherMiddleName,
        motherLastName: parent.motherLastName,
        motherFirstName: parent.motherFirstName,
        motherMiddleName: parent.motherMiddleName,
        isSingleParent: parent.isSingleParent,
        parentOnCard: parent.parentOnCard,
        flatDoorBlock: address.flatDoorBlock,
        premisesBuilding: address.premisesBuilding,
        roadStreetLane: address.roadStreetLane,
        areaLocality: address.areaLocality,
        officeName: address.officeName,
        officeFlat: address.officeFlat,
        officePremises: address.officePremises,
        officeRoad: address.officeRoad,
        officeArea: address.officeArea,
        officeCity: address.officeCity,
        officeState: address.officeState,
        officePincode: address.officePincode,
        officeCountry: address.officeCountry,
        communicationAddress: address.communicationAddress,
        countryCode: contact.countryCode,
        stdCode: contact.stdCode,
        applicantStatus: applicant.applicantStatus,
        aadhaarEnrollmentId: address.aadhaarEnrollmentId,
        nameAsPerAadhaar: address.nameAsPerAadhaar,
        sourceOfIncome: contact.sourceOfIncome,
        proofOfIdentity: proofData.proofOfIdentity,
        proofOfAddress: proofData.proofOfAddress,
        proofOfDob: proofData.proofOfDob,
      },
    });
    if (applicationNo) {
      navigate(`/track?appNo=${applicationNo}`);
    }
  };

  const renderStep = () => {
    switch (actualStep) {
      case 0: return <ServiceSelect selectedService={serviceType} onSelect={handleServiceSelect} />;
      case 1: return <ChangesSelect selectedChanges={selectedChanges} onToggle={toggleChange} />;
      case 2: return <ApplicantDetails data={applicant} onChange={handleApplicantChange} serviceType={serviceType} />;
      case 3: return <ParentDetails data={parent} onChange={handleParentChange} />;
      case 4: return <AddressDetails data={address} onChange={handleAddressChange} />;
      case 5: return <ContactIncome data={contact} onChange={handleContactChange} />;
      case 6: return <DocumentUpload documents={documents} onUpload={handleDocumentUpload} serviceType={serviceType} proofData={proofData} onProofChange={handleProofChange} />;
      case 7: return <ReviewConfirm formData={{ serviceType, changes: selectedChanges, applicant, parent, address, contact, proofData, documents }} onGoToStep={(step) => setCurrentStep(step)} />;
      default: return null;
    }
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-120px)] bg-background">
        <div className="container py-6 md:py-10">
          <div className="mb-8">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" size="lg" onClick={handlePrev} disabled={currentStep === 0 || isSubmitting}>
                <ArrowLeft className="h-4 w-4 mr-2" />Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button variant="default" size="lg" onClick={handleNext}>
                  Next Step<ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button variant="hero" size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting...</>) : (<><Send className="h-4 w-4 mr-2" />Submit & Pay ₹126.26</>)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyPage;

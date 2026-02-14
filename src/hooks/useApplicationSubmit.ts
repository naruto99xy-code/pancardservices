import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ExtendedFields {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  panPrintName: string;
  hasOtherName: boolean;
  otherNameTitle: string;
  otherLastName: string;
  otherFirstName: string;
  otherMiddleName: string;
  motherLastName: string;
  motherFirstName: string;
  motherMiddleName: string;
  isSingleParent: boolean;
  parentOnCard: string;
  flatDoorBlock: string;
  premisesBuilding: string;
  roadStreetLane: string;
  areaLocality: string;
  officeName: string;
  officeFlat: string;
  officePremises: string;
  officeRoad: string;
  officeArea: string;
  officeCity: string;
  officeState: string;
  officePincode: string;
  officeCountry: string;
  communicationAddress: string;
  countryCode: string;
  stdCode: string;
  applicantStatus: string;
  aadhaarEnrollmentId: string;
  nameAsPerAadhaar: string;
  sourceOfIncome: string[];
  proofOfIdentity: string;
  proofOfAddress: string;
  proofOfDob: string;
}

interface ApplicationData {
  serviceType: string;
  selectedChanges: string[];
  applicant: {
    fullName: string;
    fatherName: string;
    dob: string;
    gender: string;
    aadhaarNumber: string;
    mobile: string;
    email: string;
    panNumber: string;
  };
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  documents: Record<string, File | null>;
  extended?: ExtendedFields;
}

export const useApplicationSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateAppNo = () => "PAN" + Date.now().toString().slice(-8);

  const uploadDocument = async (applicationNo: string, docType: string, file: File) => {
    const ext = file.name.split(".").pop();
    const path = `${applicationNo}/${docType}.${ext}`;
    const { data, error } = await supabase.storage.from("documents").upload(path, file, { upsert: true });
    if (error) throw new Error(`Failed to upload ${docType}: ${error.message}`);
    const { data: urlData } = supabase.storage.from("documents").getPublicUrl(path);
    return { path: data.path, url: urlData.publicUrl, fileName: file.name, fileSize: file.size };
  };

  const submitApplication = async (formData: ApplicationData): Promise<string | null> => {
    setIsSubmitting(true);
    try {
      const applicationNo = generateAppNo();
      const { data: { user } } = await supabase.auth.getUser();

      const insertData: Record<string, any> = {
        application_no: applicationNo,
        user_id: user?.id || null,
        service_type: formData.serviceType as any,
        selected_changes: formData.selectedChanges,
        full_name: formData.applicant.fullName,
        father_name: formData.applicant.fatherName,
        dob: formData.applicant.dob,
        gender: formData.applicant.gender,
        aadhaar_number: formData.applicant.aadhaarNumber,
        mobile: formData.applicant.mobile,
        email: formData.applicant.email,
        pan_number: formData.applicant.panNumber || null,
        address_line1: formData.address.addressLine1,
        address_line2: formData.address.addressLine2 || null,
        city: formData.address.city,
        state: formData.address.state,
        pincode: formData.address.pincode,
        country: formData.address.country,
      };

      // Add extended Form 49A fields if present
      if (formData.extended) {
        const e = formData.extended;
        Object.assign(insertData, {
          title: e.title || null,
          first_name: e.firstName || null,
          middle_name: e.middleName || null,
          last_name: e.lastName || null,
          pan_print_name: e.panPrintName || null,
          has_other_name: e.hasOtherName,
          other_name_title: e.otherNameTitle || null,
          other_last_name: e.otherLastName || null,
          other_first_name: e.otherFirstName || null,
          other_middle_name: e.otherMiddleName || null,
          mother_last_name: e.motherLastName || null,
          mother_first_name: e.motherFirstName || null,
          mother_middle_name: e.motherMiddleName || null,
          is_single_parent: e.isSingleParent,
          parent_on_card: e.parentOnCard,
          flat_door_block: e.flatDoorBlock || null,
          premises_building: e.premisesBuilding || null,
          road_street_lane: e.roadStreetLane || null,
          area_locality: e.areaLocality || null,
          office_name: e.officeName || null,
          office_flat: e.officeFlat || null,
          office_premises: e.officePremises || null,
          office_road: e.officeRoad || null,
          office_area: e.officeArea || null,
          office_city: e.officeCity || null,
          office_state: e.officeState || null,
          office_pincode: e.officePincode || null,
          office_country: e.officeCountry || null,
          communication_address: e.communicationAddress,
          country_code: e.countryCode,
          std_code: e.stdCode || null,
          applicant_status: e.applicantStatus,
          aadhaar_enrollment_id: e.aadhaarEnrollmentId || null,
          name_as_per_aadhaar: e.nameAsPerAadhaar || null,
          source_of_income: e.sourceOfIncome,
          proof_of_identity: e.proofOfIdentity || null,
          proof_of_address: e.proofOfAddress || null,
          proof_of_dob: e.proofOfDob || null,
        });
      }

      const { data: appData, error: appError } = await supabase
        .from("applications")
        .insert(insertData as any)
        .select("id")
        .single();

      if (appError) throw appError;

      const docEntries = Object.entries(formData.documents).filter(([, file]) => file !== null) as [string, File][];
      for (const [docType, file] of docEntries) {
        const uploaded = await uploadDocument(applicationNo, docType, file);
        const { error: docError } = await supabase.from("application_documents").insert({
          application_id: appData.id,
          document_type: docType,
          file_url: uploaded.url,
          file_name: uploaded.fileName,
          file_size: uploaded.fileSize,
        });
        if (docError) console.error("Error saving document reference:", docError);
      }

      toast.success(`Application submitted! Your Application No: ${applicationNo}`);
      return applicationNo;
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to submit application. Please try again.");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitApplication, isSubmitting };
};

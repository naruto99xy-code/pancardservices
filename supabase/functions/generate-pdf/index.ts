import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// A4 dimensions in points
const A4W = 595.28;
const A4H = 841.89;

// Character box sizing (estimated from template)
const CHAR_W = 12.8;
const CHAR_H = 14;

const BLACK = rgb(0, 0, 0);

const serviceLabels: Record<string, string> = {
  new: "New PAN Card", correction: "PAN Correction", duplicate: "Duplicate PAN",
  lost: "Lost/Damaged PAN", "minor-to-major": "Minor to Major", marriage: "After Marriage", pan2: "PAN 2.0 QR",
};

// =====================================================
// Coordinate map for Form 49A fields (x, y from bottom-left)
// These are calibrated against the Digital India Portal template.
// Y coordinates are measured from the BOTTOM of the page.
// =====================================================

// Page 1 coordinates
const P1 = {
  // Section 1: Full Name
  title_shri: { x: 270, y: 671 },       // checkbox center
  title_smt: { x: 352, y: 671 },
  title_kumari: { x: 432, y: 671 },

  last_name:  { x: 132, y: 649 },  // row of char boxes
  first_name: { x: 132, y: 633 },
  middle_name: { x: 132, y: 617 },

  // Section 2: PAN print name
  pan_print_name: { x: 55, y: 585 },

  // Section 3: Other name
  other_name_yes: { x: 374, y: 560 },
  other_name_no: { x: 436, y: 560 },
  other_title_shri: { x: 270, y: 541 },
  other_title_smt: { x: 352, y: 541 },
  other_title_kumari: { x: 432, y: 541 },
  other_last_name: { x: 132, y: 524 },
  other_first_name: { x: 132, y: 508 },
  other_middle_name: { x: 132, y: 492 },

  // Section 4: Gender
  gender_male: { x: 340, y: 473 },
  gender_female: { x: 418, y: 473 },
  gender_transgender: { x: 500, y: 473 },

  // Section 5: DOB
  dob_day: { x: 68, y: 441 },
  dob_month: { x: 112, y: 441 },
  dob_year: { x: 162, y: 441 },

  // Section 6: Parents
  single_parent_yes: { x: 56, y: 398 },
  single_parent_no: { x: 97, y: 398 },

  father_last:  { x: 132, y: 367 },
  father_first: { x: 132, y: 351 },
  father_middle: { x: 132, y: 335 },

  mother_last:  { x: 132, y: 303 },
  mother_first: { x: 132, y: 287 },
  mother_middle: { x: 132, y: 271 },

  parent_father: { x: 68, y: 248 },
  parent_mother: { x: 160, y: 248 },

  // Section 7: Address
  addr_flat:      { x: 132, y: 202 },
  addr_premises:  { x: 132, y: 186 },
  addr_road:      { x: 132, y: 170 },
  addr_area:      { x: 132, y: 154 },
  addr_city:      { x: 132, y: 138 },
  addr_state:     { x: 55, y: 118 },
  addr_pincode:   { x: 340, y: 118 },
  addr_country:   { x: 470, y: 118 },
};

// Page 2 coordinates
const P2 = {
  // Office address
  office_name:    { x: 132, y: 790 },
  office_flat:    { x: 132, y: 774 },
  office_premises: { x: 132, y: 758 },
  office_road:    { x: 132, y: 742 },
  office_area:    { x: 132, y: 726 },
  office_city:    { x: 132, y: 710 },
  office_state:   { x: 55, y: 690 },
  office_pincode: { x: 340, y: 690 },
  office_country: { x: 470, y: 690 },

  // Section 8: Communication address
  comm_residence: { x: 353, y: 660 },
  comm_office:    { x: 455, y: 660 },

  // Section 9: Telephone
  country_code:  { x: 100, y: 633 },
  std_code:      { x: 195, y: 633 },
  mobile:        { x: 340, y: 633 },
  email:         { x: 100, y: 610 },

  // Section 10: Status
  status_individual: { x: 56, y: 565 },
  status_huf:        { x: 175, y: 565 },
  status_company:    { x: 312, y: 565 },
  status_partnership: { x: 420, y: 565 },
  status_govt:       { x: 540, y: 580 },

  // Section 12: Aadhaar
  aadhaar: { x: 280, y: 490 },
  aadhaar_enrollment: { x: 280, y: 470 },
  aadhaar_name: { x: 55, y: 445 },

  // Section 13: Source of Income
  income_salary:        { x: 56, y: 370 },
  income_capital_gains: { x: 540, y: 380 },
  income_business:      { x: 56, y: 355 },
  income_other:         { x: 540, y: 365 },
  income_house:         { x: 56, y: 340 },
  income_no_income:     { x: 540, y: 350 },

  // Section 15: Document proofs
  proof_identity: { x: 200, y: 200 },
  proof_address:  { x: 200, y: 185 },
  proof_dob:      { x: 460, y: 200 },

  // Section 16: Declaration
  declaration_name: { x: 65, y: 155 },
  declaration_place: { x: 100, y: 125 },
  declaration_date:  { x: 65, y: 105 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { application_id } = await req.json();
    if (!application_id) {
      return new Response(JSON.stringify({ error: "application_id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch application data
    const { data: app, error: appError } = await supabase
      .from("applications").select("*").eq("id", application_id).single();
    if (appError || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch template PDF from storage
    const templateUrl = `${supabaseUrl}/storage/v1/object/public/documents/templates/form49a-template.pdf`;
    console.log("Fetching template from:", templateUrl);
    const templateResp = await fetch(templateUrl);
    if (!templateResp.ok) throw new Error(`Failed to fetch Form 49A template PDF: ${templateResp.status} ${templateResp.statusText}`);
    const templateBytes = new Uint8Array(await templateResp.arrayBuffer());
    console.log("Template PDF size:", templateBytes.length, "bytes");

    // Load template with pdf-lib - ignoreEncryption to handle any protection
    const doc = await PDFDocument.load(templateBytes, { ignoreEncryption: true });
    console.log("Template loaded, pages:", doc.getPageCount());
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const mono = await doc.embedFont(StandardFonts.CourierBold);

    const pages = doc.getPages();
    const page1 = pages[0];
    const page2 = pages.length > 1 ? pages[1] : doc.addPage([A4W, A4H]);

    // ============================================================
    // HELPER FUNCTIONS
    // ============================================================

    // Draw text into character boxes (one letter per box)
    const fillCharBoxes = (page: any, x: number, y: number, text: string, maxChars: number) => {
      const chars = (text || "").toUpperCase().slice(0, maxChars);
      for (let i = 0; i < chars.length; i++) {
        if (chars[i] && chars[i] !== " ") {
          const charW = mono.widthOfTextAtSize(chars[i], 9);
          page.drawText(chars[i], {
            x: x + i * CHAR_W + (CHAR_W - charW) / 2,
            y: y,
            size: 9,
            font: mono,
            color: BLACK,
          });
        }
      }
    };

    // Draw a checkmark (✓) at position
    const fillCheck = (page: any, x: number, y: number) => {
      page.drawText("X", { x: x + 2, y: y, size: 9, font: bold, color: BLACK });
    };

    // Draw free-form text at position
    const fillText = (page: any, x: number, y: number, text: string, size = 8) => {
      if (!text) return;
      page.drawText(text.substring(0, 60), { x, y, size, font, color: BLACK });
    };

    // ============================================================
    // PAGE 1: Fill data
    // ============================================================

    // Section 1: Title
    const title = (app.title || "").toLowerCase();
    if (title === "shri") fillCheck(page1, P1.title_shri.x, P1.title_shri.y);
    if (title === "smt") fillCheck(page1, P1.title_smt.x, P1.title_smt.y);
    if (title === "kumari") fillCheck(page1, P1.title_kumari.x, P1.title_kumari.y);

    // Section 1: Name character boxes
    const lastName = app.last_name || app.full_name?.split(" ").pop() || "";
    const firstName = app.first_name || app.full_name?.split(" ")[0] || "";
    const middleName = app.middle_name || "";

    fillCharBoxes(page1, P1.last_name.x, P1.last_name.y, lastName, 25);
    fillCharBoxes(page1, P1.first_name.x, P1.first_name.y, firstName, 25);
    fillCharBoxes(page1, P1.middle_name.x, P1.middle_name.y, middleName, 25);

    // Section 2: PAN print name
    fillCharBoxes(page1, P1.pan_print_name.x, P1.pan_print_name.y, app.pan_print_name || app.full_name || "", 35);

    // Section 3: Other name
    if (app.has_other_name) {
      fillCheck(page1, P1.other_name_yes.x, P1.other_name_yes.y);
      if (app.other_last_name) fillCharBoxes(page1, P1.other_last_name.x, P1.other_last_name.y, app.other_last_name, 25);
      if (app.other_first_name) fillCharBoxes(page1, P1.other_first_name.x, P1.other_first_name.y, app.other_first_name, 25);
      if (app.other_middle_name) fillCharBoxes(page1, P1.other_middle_name.x, P1.other_middle_name.y, app.other_middle_name, 25);
    } else {
      fillCheck(page1, P1.other_name_no.x, P1.other_name_no.y);
    }

    // Section 4: Gender
    const gender = (app.gender || "").toLowerCase();
    if (gender === "male") fillCheck(page1, P1.gender_male.x, P1.gender_male.y);
    if (gender === "female") fillCheck(page1, P1.gender_female.x, P1.gender_female.y);
    if (gender === "transgender") fillCheck(page1, P1.gender_transgender.x, P1.gender_transgender.y);

    // Section 5: Date of Birth
    const dob = app.dob || "";
    const dobParts = dob.split("-"); // YYYY-MM-DD
    if (dobParts.length === 3) {
      fillCharBoxes(page1, P1.dob_day.x, P1.dob_day.y, dobParts[2], 2);
      fillCharBoxes(page1, P1.dob_month.x, P1.dob_month.y, dobParts[1], 2);
      fillCharBoxes(page1, P1.dob_year.x, P1.dob_year.y, dobParts[0], 4);
    }

    // Section 6: Parents
    if (app.is_single_parent) {
      fillCheck(page1, P1.single_parent_yes.x, P1.single_parent_yes.y);
    } else {
      fillCheck(page1, P1.single_parent_no.x, P1.single_parent_no.y);
    }

    // Father's name
    const fatherParts = (app.father_name || "").split(" ");
    fillCharBoxes(page1, P1.father_last.x, P1.father_last.y, fatherParts.slice(-1)[0] || "", 25);
    fillCharBoxes(page1, P1.father_first.x, P1.father_first.y, fatherParts[0] || "", 25);
    if (fatherParts.length > 2) {
      fillCharBoxes(page1, P1.father_middle.x, P1.father_middle.y, fatherParts.slice(1, -1).join(" "), 25);
    }

    // Mother's name
    fillCharBoxes(page1, P1.mother_last.x, P1.mother_last.y, app.mother_last_name || "", 25);
    fillCharBoxes(page1, P1.mother_first.x, P1.mother_first.y, app.mother_first_name || "", 25);
    fillCharBoxes(page1, P1.mother_middle.x, P1.mother_middle.y, app.mother_middle_name || "", 25);

    // Parent on card
    if (app.parent_on_card === "father") fillCheck(page1, P1.parent_father.x, P1.parent_father.y);
    if (app.parent_on_card === "mother") fillCheck(page1, P1.parent_mother.x, P1.parent_mother.y);

    // Section 7: Residence Address
    fillCharBoxes(page1, P1.addr_flat.x, P1.addr_flat.y, app.flat_door_block || app.address_line1 || "", 25);
    fillCharBoxes(page1, P1.addr_premises.x, P1.addr_premises.y, app.premises_building || "", 25);
    fillCharBoxes(page1, P1.addr_road.x, P1.addr_road.y, app.road_street_lane || "", 25);
    fillCharBoxes(page1, P1.addr_area.x, P1.addr_area.y, app.area_locality || "", 25);
    fillCharBoxes(page1, P1.addr_city.x, P1.addr_city.y, app.city || "", 25);
    fillText(page1, P1.addr_state.x, P1.addr_state.y, app.state || "");
    fillCharBoxes(page1, P1.addr_pincode.x, P1.addr_pincode.y, app.pincode || "", 6);
    fillText(page1, P1.addr_country.x, P1.addr_country.y, app.country || "India");

    // ============================================================
    // PAGE 2: Fill data
    // ============================================================

    // Office Address
    if (app.office_name || app.office_flat) {
      fillCharBoxes(page2, P2.office_name.x, P2.office_name.y, app.office_name || "", 25);
      fillCharBoxes(page2, P2.office_flat.x, P2.office_flat.y, app.office_flat || "", 25);
      fillCharBoxes(page2, P2.office_premises.x, P2.office_premises.y, app.office_premises || "", 25);
      fillCharBoxes(page2, P2.office_road.x, P2.office_road.y, app.office_road || "", 25);
      fillCharBoxes(page2, P2.office_area.x, P2.office_area.y, app.office_area || "", 25);
      fillCharBoxes(page2, P2.office_city.x, P2.office_city.y, app.office_city || "", 25);
      fillText(page2, P2.office_state.x, P2.office_state.y, app.office_state || "");
      fillCharBoxes(page2, P2.office_pincode.x, P2.office_pincode.y, app.office_pincode || "", 6);
      fillText(page2, P2.office_country.x, P2.office_country.y, app.office_country || "");
    }

    // Section 8: Communication Address
    if (app.communication_address === "residence") fillCheck(page2, P2.comm_residence.x, P2.comm_residence.y);
    if (app.communication_address === "office") fillCheck(page2, P2.comm_office.x, P2.comm_office.y);

    // Section 9: Contact
    fillCharBoxes(page2, P2.country_code.x, P2.country_code.y, (app.country_code || "+91").replace("+", ""), 4);
    if (app.std_code) fillCharBoxes(page2, P2.std_code.x, P2.std_code.y, app.std_code, 5);
    fillCharBoxes(page2, P2.mobile.x, P2.mobile.y, app.mobile || "", 10);
    fillText(page2, P2.email.x, P2.email.y, app.email || "", 7);

    // Section 10: Status
    const status = (app.applicant_status || "individual").toLowerCase();
    if (status === "individual") fillCheck(page2, P2.status_individual.x, P2.status_individual.y);

    // Section 12: Aadhaar
    const aadhaar = (app.aadhaar_number || "").replace(/\s/g, "");
    fillCharBoxes(page2, P2.aadhaar.x, P2.aadhaar.y, aadhaar, 12);
    if (app.aadhaar_enrollment_id) {
      fillCharBoxes(page2, P2.aadhaar_enrollment.x, P2.aadhaar_enrollment.y, app.aadhaar_enrollment_id, 28);
    }
    if (app.name_as_per_aadhaar) {
      fillText(page2, P2.aadhaar_name.x, P2.aadhaar_name.y, app.name_as_per_aadhaar);
    }

    // Section 13: Source of Income
    const income = app.source_of_income || [];
    if (income.includes("salary")) fillCheck(page2, P2.income_salary.x, P2.income_salary.y);
    if (income.includes("capital_gains")) fillCheck(page2, P2.income_capital_gains.x, P2.income_capital_gains.y);
    if (income.includes("business")) fillCheck(page2, P2.income_business.x, P2.income_business.y);
    if (income.includes("other_sources")) fillCheck(page2, P2.income_other.x, P2.income_other.y);
    if (income.includes("house_property")) fillCheck(page2, P2.income_house.x, P2.income_house.y);
    if (income.includes("no_income")) fillCheck(page2, P2.income_no_income.x, P2.income_no_income.y);

    // Section 15: Document proofs
    fillText(page2, P2.proof_identity.x, P2.proof_identity.y, app.proof_of_identity || "Aadhaar Card", 7);
    fillText(page2, P2.proof_address.x, P2.proof_address.y, app.proof_of_address || "Aadhaar Card", 7);
    fillText(page2, P2.proof_dob.x, P2.proof_dob.y, app.proof_of_dob || "Aadhaar Card", 7);

    // Section 16: Declaration
    fillText(page2, P2.declaration_name.x, P2.declaration_name.y, app.full_name || "");
    fillText(page2, P2.declaration_place.x, P2.declaration_place.y, app.declaration_place || app.city || "");
    const appDate = new Date(app.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
    fillText(page2, P2.declaration_date.x, P2.declaration_date.y, app.declaration_date || appDate);

    // Embed photo if available
    const { data: docs } = await supabase
      .from("application_documents").select("*").eq("application_id", application_id);
    
    if (docs) {
      const photoDoc = docs.find((d: any) => d.document_type.toLowerCase().includes("photo"));
      if (photoDoc) {
        try {
          const photoResp = await fetch(photoDoc.file_url);
          if (photoResp.ok) {
            const photoBytes = new Uint8Array(await photoResp.arrayBuffer());
            const contentType = photoResp.headers.get("content-type") || "";
            let image;
            if (contentType.includes("png")) {
              image = await doc.embedPng(photoBytes);
            } else {
              image = await doc.embedJpg(photoBytes);
            }
            // Photo box on page 1 - top left (approximately 3.5cm x 2.5cm = ~99 x 71 pts)
            page1.drawImage(image, { x: 28, y: A4H - 105, width: 71, height: 99 });
            // Photo box on page 1 - top right
            page1.drawImage(image, { x: A4W - 100, y: A4H - 105, width: 71, height: 99 });
          }
        } catch (e) {
          console.error("Failed to embed photo:", e);
        }
      }

      // Signature
      const sigDoc = docs.find((d: any) => d.document_type.toLowerCase().includes("signature"));
      if (sigDoc) {
        try {
          const sigResp = await fetch(sigDoc.file_url);
          if (sigResp.ok) {
            const sigBytes = new Uint8Array(await sigResp.arrayBuffer());
            const ct = sigResp.headers.get("content-type") || "";
            let sigImage;
            if (ct.includes("png")) {
              sigImage = await doc.embedPng(sigBytes);
            } else {
              sigImage = await doc.embedJpg(sigBytes);
            }
            // Signature box on page 2 (bottom right)
            page2.drawImage(sigImage, { x: 430, y: 80, width: 120, height: 40 });
          }
        } catch (e) {
          console.error("Failed to embed signature:", e);
        }
      }
    }

    // Save final PDF
    const pdfBytes = await doc.save();
    const fileName = `${app.application_no}_form49a.pdf`;
    const filePath = `summaries/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, pdfBytes, { contentType: "application/pdf", upsert: true });

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    const { data: urlData } = supabase.storage.from("documents").getPublicUrl(filePath);

    await supabase.from("applications").update({ pdf_url: urlData.publicUrl }).eq("id", application_id);

    return new Response(
      JSON.stringify({ url: urlData.publicUrl, fileName }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

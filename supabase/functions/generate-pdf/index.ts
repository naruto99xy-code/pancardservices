import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

// ============================================================
// CORS
// ============================================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================
// CONSTANTS
// ============================================================
const A4W = 595.28;
const A4H = 841.89;
const CHAR_W = 12.8;
const BLACK = rgb(0, 0, 0);

// ============================================================
// FORM 49A COORDINATES — Centralized coordinate map
// All x,y measured from bottom-left of page in PDF points.
// ============================================================
const COORDS = {
  page1: {
    // Section 1: Title checkboxes
    title_shri:   { x: 270, y: 671 },
    title_smt:    { x: 352, y: 671 },
    title_kumari: { x: 432, y: 671 },

    // Section 1: Name character boxes (25 chars each)
    last_name:   { x: 132, y: 649, maxChars: 25 },
    first_name:  { x: 132, y: 633, maxChars: 25 },
    middle_name: { x: 132, y: 617, maxChars: 25 },

    // Section 2: PAN print name
    pan_print_name: { x: 55, y: 585, maxChars: 35 },

    // Section 3: Other name
    other_name_yes: { x: 374, y: 560 },
    other_name_no:  { x: 436, y: 560 },
    other_title_shri:   { x: 270, y: 541 },
    other_title_smt:    { x: 352, y: 541 },
    other_title_kumari: { x: 432, y: 541 },
    other_last_name:   { x: 132, y: 524, maxChars: 25 },
    other_first_name:  { x: 132, y: 508, maxChars: 25 },
    other_middle_name: { x: 132, y: 492, maxChars: 25 },

    // Section 4: Gender
    gender_male:        { x: 340, y: 473 },
    gender_female:      { x: 418, y: 473 },
    gender_transgender: { x: 500, y: 473 },

    // Section 5: DOB
    dob_day:   { x: 68,  y: 441, maxChars: 2 },
    dob_month: { x: 112, y: 441, maxChars: 2 },
    dob_year:  { x: 162, y: 441, maxChars: 4 },

    // Section 6: Parents
    single_parent_yes: { x: 56, y: 398 },
    single_parent_no:  { x: 97, y: 398 },
    father_last:   { x: 132, y: 367, maxChars: 25 },
    father_first:  { x: 132, y: 351, maxChars: 25 },
    father_middle: { x: 132, y: 335, maxChars: 25 },
    mother_last:   { x: 132, y: 303, maxChars: 25 },
    mother_first:  { x: 132, y: 287, maxChars: 25 },
    mother_middle: { x: 132, y: 271, maxChars: 25 },
    parent_father: { x: 68,  y: 248 },
    parent_mother: { x: 160, y: 248 },

    // Section 7: Residence Address
    addr_flat:     { x: 132, y: 202, maxChars: 25 },
    addr_premises: { x: 132, y: 186, maxChars: 25 },
    addr_road:     { x: 132, y: 170, maxChars: 25 },
    addr_area:     { x: 132, y: 154, maxChars: 25 },
    addr_city:     { x: 132, y: 138, maxChars: 25 },
    addr_state:    { x: 55,  y: 118 },
    addr_pincode:  { x: 340, y: 118, maxChars: 6 },
    addr_country:  { x: 470, y: 118 },

    // Photo & Signature positions
    photo_left:  { x: 28, y: A4H - 105, width: 71, height: 99 },
    photo_right: { x: A4W - 100, y: A4H - 105, width: 71, height: 99 },
  },

  page2: {
    // Office address
    office_name:     { x: 132, y: 790, maxChars: 25 },
    office_flat:     { x: 132, y: 774, maxChars: 25 },
    office_premises: { x: 132, y: 758, maxChars: 25 },
    office_road:     { x: 132, y: 742, maxChars: 25 },
    office_area:     { x: 132, y: 726, maxChars: 25 },
    office_city:     { x: 132, y: 710, maxChars: 25 },
    office_state:    { x: 55,  y: 690 },
    office_pincode:  { x: 340, y: 690, maxChars: 6 },
    office_country:  { x: 470, y: 690 },

    // Section 8: Communication address
    comm_residence: { x: 353, y: 660 },
    comm_office:    { x: 455, y: 660 },

    // Section 9: Contact
    country_code: { x: 100, y: 633, maxChars: 4 },
    std_code:     { x: 195, y: 633, maxChars: 5 },
    mobile:       { x: 340, y: 633, maxChars: 10 },
    email:        { x: 100, y: 610 },

    // Section 10: Status
    status_individual: { x: 56, y: 565 },

    // Section 12: Aadhaar
    aadhaar:            { x: 280, y: 490, maxChars: 12 },
    aadhaar_enrollment: { x: 280, y: 470, maxChars: 28 },
    aadhaar_name:       { x: 55,  y: 445 },

    // Section 13: Source of Income
    income_salary:        { x: 56,  y: 370 },
    income_capital_gains: { x: 540, y: 380 },
    income_business:      { x: 56,  y: 355 },
    income_other:         { x: 540, y: 365 },
    income_house:         { x: 56,  y: 340 },
    income_no_income:     { x: 540, y: 350 },

    // Section 15: Document proofs
    proof_identity: { x: 200, y: 200 },
    proof_address:  { x: 200, y: 185 },
    proof_dob:      { x: 460, y: 200 },

    // Section 16: Declaration
    declaration_name:  { x: 65,  y: 155 },
    declaration_place: { x: 100, y: 125 },
    declaration_date:  { x: 65,  y: 105 },

    // Signature position
    signature: { x: 430, y: 80, width: 120, height: 40 },
  },
};

// ============================================================
// HELPER: Draw one character per box (monospace)
// ============================================================
function fillCharBoxes(
  page: any, font: any, x: number, y: number, text: string, maxChars: number
) {
  const chars = (text || "").toUpperCase().slice(0, maxChars);
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] && chars[i] !== " ") {
      const charW = font.widthOfTextAtSize(chars[i], 9);
      page.drawText(chars[i], {
        x: x + i * CHAR_W + (CHAR_W - charW) / 2,
        y,
        size: 9,
        font,
        color: BLACK,
      });
    }
  }
}

// ============================================================
// HELPER: Draw checkmark
// ============================================================
function fillCheck(page: any, font: any, x: number, y: number) {
  page.drawText("X", { x: x + 2, y, size: 9, font, color: BLACK });
}

// ============================================================
// HELPER: Draw free-form text
// ============================================================
function fillText(
  page: any, font: any, x: number, y: number, text: string, size = 8
) {
  if (!text) return;
  page.drawText(text.substring(0, 60), { x, y, size, font, color: BLACK });
}

// ============================================================
// HELPER: Embed image (PNG or JPG)
// ============================================================
async function embedImage(doc: any, url: string) {
  const resp = await fetch(url);
  if (!resp.ok) return null;
  const bytes = new Uint8Array(await resp.arrayBuffer());
  const ct = resp.headers.get("content-type") || "";
  return ct.includes("png") ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
}

// ============================================================
// PAGE 1 FILL
// ============================================================
function fillPage1(page: any, app: any, mono: any, bold: any, font: any) {
  const C = COORDS.page1;

  // Title
  const title = (app.title || "").toLowerCase();
  if (title === "shri") fillCheck(page, bold, C.title_shri.x, C.title_shri.y);
  if (title === "smt") fillCheck(page, bold, C.title_smt.x, C.title_smt.y);
  if (title === "kumari") fillCheck(page, bold, C.title_kumari.x, C.title_kumari.y);

  // Name
  const lastName = app.last_name || app.full_name?.split(" ").pop() || "";
  const firstName = app.first_name || app.full_name?.split(" ")[0] || "";
  fillCharBoxes(page, mono, C.last_name.x, C.last_name.y, lastName, C.last_name.maxChars);
  fillCharBoxes(page, mono, C.first_name.x, C.first_name.y, firstName, C.first_name.maxChars);
  fillCharBoxes(page, mono, C.middle_name.x, C.middle_name.y, app.middle_name || "", C.middle_name.maxChars);

  // PAN print name
  fillCharBoxes(page, mono, C.pan_print_name.x, C.pan_print_name.y, app.pan_print_name || app.full_name || "", C.pan_print_name.maxChars);

  // Other name
  if (app.has_other_name) {
    fillCheck(page, bold, C.other_name_yes.x, C.other_name_yes.y);
    if (app.other_last_name) fillCharBoxes(page, mono, C.other_last_name.x, C.other_last_name.y, app.other_last_name, C.other_last_name.maxChars);
    if (app.other_first_name) fillCharBoxes(page, mono, C.other_first_name.x, C.other_first_name.y, app.other_first_name, C.other_first_name.maxChars);
    if (app.other_middle_name) fillCharBoxes(page, mono, C.other_middle_name.x, C.other_middle_name.y, app.other_middle_name, C.other_middle_name.maxChars);
  } else {
    fillCheck(page, bold, C.other_name_no.x, C.other_name_no.y);
  }

  // Gender
  const gender = (app.gender || "").toLowerCase();
  if (gender === "male") fillCheck(page, bold, C.gender_male.x, C.gender_male.y);
  if (gender === "female") fillCheck(page, bold, C.gender_female.x, C.gender_female.y);
  if (gender === "transgender") fillCheck(page, bold, C.gender_transgender.x, C.gender_transgender.y);

  // DOB
  const dobParts = (app.dob || "").split("-");
  if (dobParts.length === 3) {
    fillCharBoxes(page, mono, C.dob_day.x, C.dob_day.y, dobParts[2], C.dob_day.maxChars);
    fillCharBoxes(page, mono, C.dob_month.x, C.dob_month.y, dobParts[1], C.dob_month.maxChars);
    fillCharBoxes(page, mono, C.dob_year.x, C.dob_year.y, dobParts[0], C.dob_year.maxChars);
  }

  // Parents
  if (app.is_single_parent) {
    fillCheck(page, bold, C.single_parent_yes.x, C.single_parent_yes.y);
  } else {
    fillCheck(page, bold, C.single_parent_no.x, C.single_parent_no.y);
  }

  const fatherParts = (app.father_name || "").split(" ");
  fillCharBoxes(page, mono, C.father_last.x, C.father_last.y, fatherParts.slice(-1)[0] || "", C.father_last.maxChars);
  fillCharBoxes(page, mono, C.father_first.x, C.father_first.y, fatherParts[0] || "", C.father_first.maxChars);
  if (fatherParts.length > 2) {
    fillCharBoxes(page, mono, C.father_middle.x, C.father_middle.y, fatherParts.slice(1, -1).join(" "), C.father_middle.maxChars);
  }

  fillCharBoxes(page, mono, C.mother_last.x, C.mother_last.y, app.mother_last_name || "", C.mother_last.maxChars);
  fillCharBoxes(page, mono, C.mother_first.x, C.mother_first.y, app.mother_first_name || "", C.mother_first.maxChars);
  fillCharBoxes(page, mono, C.mother_middle.x, C.mother_middle.y, app.mother_middle_name || "", C.mother_middle.maxChars);

  if (app.parent_on_card === "father") fillCheck(page, bold, C.parent_father.x, C.parent_father.y);
  if (app.parent_on_card === "mother") fillCheck(page, bold, C.parent_mother.x, C.parent_mother.y);

  // Address
  fillCharBoxes(page, mono, C.addr_flat.x, C.addr_flat.y, app.flat_door_block || app.address_line1 || "", C.addr_flat.maxChars);
  fillCharBoxes(page, mono, C.addr_premises.x, C.addr_premises.y, app.premises_building || "", C.addr_premises.maxChars);
  fillCharBoxes(page, mono, C.addr_road.x, C.addr_road.y, app.road_street_lane || "", C.addr_road.maxChars);
  fillCharBoxes(page, mono, C.addr_area.x, C.addr_area.y, app.area_locality || "", C.addr_area.maxChars);
  fillCharBoxes(page, mono, C.addr_city.x, C.addr_city.y, app.city || "", C.addr_city.maxChars);
  fillText(page, font, C.addr_state.x, C.addr_state.y, app.state || "");
  fillCharBoxes(page, mono, C.addr_pincode.x, C.addr_pincode.y, app.pincode || "", C.addr_pincode.maxChars);
  fillText(page, font, C.addr_country.x, C.addr_country.y, app.country || "India");
}

// ============================================================
// PAGE 2 FILL
// ============================================================
function fillPage2(page: any, app: any, mono: any, bold: any, font: any) {
  const C = COORDS.page2;

  // Office Address
  if (app.office_name || app.office_flat) {
    fillCharBoxes(page, mono, C.office_name.x, C.office_name.y, app.office_name || "", C.office_name.maxChars);
    fillCharBoxes(page, mono, C.office_flat.x, C.office_flat.y, app.office_flat || "", C.office_flat.maxChars);
    fillCharBoxes(page, mono, C.office_premises.x, C.office_premises.y, app.office_premises || "", C.office_premises.maxChars);
    fillCharBoxes(page, mono, C.office_road.x, C.office_road.y, app.office_road || "", C.office_road.maxChars);
    fillCharBoxes(page, mono, C.office_area.x, C.office_area.y, app.office_area || "", C.office_area.maxChars);
    fillCharBoxes(page, mono, C.office_city.x, C.office_city.y, app.office_city || "", C.office_city.maxChars);
    fillText(page, font, C.office_state.x, C.office_state.y, app.office_state || "");
    fillCharBoxes(page, mono, C.office_pincode.x, C.office_pincode.y, app.office_pincode || "", C.office_pincode.maxChars);
    fillText(page, font, C.office_country.x, C.office_country.y, app.office_country || "");
  }

  // Communication address
  if (app.communication_address === "residence") fillCheck(page, bold, C.comm_residence.x, C.comm_residence.y);
  if (app.communication_address === "office") fillCheck(page, bold, C.comm_office.x, C.comm_office.y);

  // Contact
  fillCharBoxes(page, mono, C.country_code.x, C.country_code.y, (app.country_code || "+91").replace("+", ""), C.country_code.maxChars);
  if (app.std_code) fillCharBoxes(page, mono, C.std_code.x, C.std_code.y, app.std_code, C.std_code.maxChars);
  fillCharBoxes(page, mono, C.mobile.x, C.mobile.y, app.mobile || "", C.mobile.maxChars);
  fillText(page, font, C.email.x, C.email.y, app.email || "", 7);

  // Status
  const status = (app.applicant_status || "individual").toLowerCase();
  if (status === "individual") fillCheck(page, bold, C.status_individual.x, C.status_individual.y);

  // Aadhaar
  const aadhaar = (app.aadhaar_number || "").replace(/\s/g, "");
  fillCharBoxes(page, mono, C.aadhaar.x, C.aadhaar.y, aadhaar, C.aadhaar.maxChars);
  if (app.aadhaar_enrollment_id) {
    fillCharBoxes(page, mono, C.aadhaar_enrollment.x, C.aadhaar_enrollment.y, app.aadhaar_enrollment_id, C.aadhaar_enrollment.maxChars);
  }
  if (app.name_as_per_aadhaar) {
    fillText(page, font, C.aadhaar_name.x, C.aadhaar_name.y, app.name_as_per_aadhaar);
  }

  // Source of Income
  const income = app.source_of_income || [];
  if (income.includes("salary")) fillCheck(page, bold, C.income_salary.x, C.income_salary.y);
  if (income.includes("capital_gains")) fillCheck(page, bold, C.income_capital_gains.x, C.income_capital_gains.y);
  if (income.includes("business")) fillCheck(page, bold, C.income_business.x, C.income_business.y);
  if (income.includes("other_sources")) fillCheck(page, bold, C.income_other.x, C.income_other.y);
  if (income.includes("house_property")) fillCheck(page, bold, C.income_house.x, C.income_house.y);
  if (income.includes("no_income")) fillCheck(page, bold, C.income_no_income.x, C.income_no_income.y);

  // Document proofs
  fillText(page, font, C.proof_identity.x, C.proof_identity.y, app.proof_of_identity || "Aadhaar Card", 7);
  fillText(page, font, C.proof_address.x, C.proof_address.y, app.proof_of_address || "Aadhaar Card", 7);
  fillText(page, font, C.proof_dob.x, C.proof_dob.y, app.proof_of_dob || "Aadhaar Card", 7);

  // Declaration
  fillText(page, font, C.declaration_name.x, C.declaration_name.y, app.full_name || "");
  fillText(page, font, C.declaration_place.x, C.declaration_place.y, app.declaration_place || app.city || "");
  const appDate = new Date(app.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
  fillText(page, font, C.declaration_date.x, C.declaration_date.y, app.declaration_date || appDate);
}

// ============================================================
// MAIN HANDLER
// ============================================================
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { application_id } = await req.json();
    if (!application_id) {
      return new Response(JSON.stringify({ error: "application_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch application
    const { data: app, error: appError } = await supabase
      .from("applications").select("*").eq("id", application_id).single();
    if (appError || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Load template PDF
    const templateUrl = `${supabaseUrl}/storage/v1/object/public/documents/templates/form49a-template.pdf`;
    const templateResp = await fetch(templateUrl);
    if (!templateResp.ok) throw new Error(`Template fetch failed: ${templateResp.status}`);
    const templateBytes = new Uint8Array(await templateResp.arrayBuffer());

    const doc = await PDFDocument.load(templateBytes, { ignoreEncryption: true });
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const mono = await doc.embedFont(StandardFonts.CourierBold);

    const pages = doc.getPages();
    const page1 = pages[0];
    const page2 = pages.length > 1 ? pages[1] : doc.addPage([A4W, A4H]);

    // Fill pages
    fillPage1(page1, app, mono, bold, font);
    fillPage2(page2, app, mono, bold, font);

    // Embed photo & signature
    const { data: docs } = await supabase
      .from("application_documents").select("*").eq("application_id", application_id);

    if (docs) {
      const photoDoc = docs.find((d: any) => d.document_type.toLowerCase().includes("photo"));
      if (photoDoc) {
        try {
          const image = await embedImage(doc, photoDoc.file_url);
          if (image) {
            const C = COORDS.page1;
            page1.drawImage(image, { x: C.photo_left.x, y: C.photo_left.y, width: C.photo_left.width, height: C.photo_left.height });
            page1.drawImage(image, { x: C.photo_right.x, y: C.photo_right.y, width: C.photo_right.width, height: C.photo_right.height });
          }
        } catch (e) { console.error("Photo embed error:", e); }
      }

      const sigDoc = docs.find((d: any) => d.document_type.toLowerCase().includes("signature"));
      if (sigDoc) {
        try {
          const sigImage = await embedImage(doc, sigDoc.file_url);
          if (sigImage) {
            const S = COORDS.page2.signature;
            page2.drawImage(sigImage, { x: S.x, y: S.y, width: S.width, height: S.height });
          }
        } catch (e) { console.error("Signature embed error:", e); }
      }
    }

    // Generate and return binary PDF directly
    const pdfBytes = await doc.save();

    return new Response(pdfBytes, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${app.application_no}_form49a.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

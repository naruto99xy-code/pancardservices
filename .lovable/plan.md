

# Redesign PDF Generation System

## Overview
Complete overhaul of the PDF generation edge function and the admin panel's PDF viewing experience. The new system will produce a professional, A4-sized HTML document with a clean structured layout inspired by the official Form 49A, and the admin panel will get an embedded full-width PDF viewer with zoom support.

## What Changes

### 1. Edge Function: `supabase/functions/generate-pdf/index.ts` (Full Rewrite)

The entire HTML template will be rebuilt with:

- **Fixed A4 dimensions**: `width: 210mm` with proper `@page` rules and print margins
- **Professional font**: Google Fonts `Inter` loaded via `@import`, with Helvetica/Arial fallback
- **Logo header**: Company logo at the top with "PAN Card Services" branding and application number
- **Structured sections** with clear numbered headings and bordered tables:
  1. **Application Details** -- Application No, Service Type, Date, Status (in a top info bar)
  2. **Applicant Information** -- Photo placeholder on the right, Title, Full Name (character boxes), Gender, DOB, Aadhaar, PAN Number
  3. **Father's / Mother's Name** -- Split name fields with character boxes, single parent checkbox, parent on card selection
  4. **Address Details** -- Residence address in a bordered grid (Flat, Premises, Road, Area, City, State, PIN, Country), Office address if present, Communication preference
  5. **Contact Details** -- Mobile (character boxes), Email, Country/STD code
  6. **Correction Details** -- Selected changes displayed as a list (only if service type is correction)
  7. **Document Details** -- Proof of Identity/Address/DOB, uploaded documents list
  8. **Payment Details** -- Status badge, service type with implied fee
  9. **Operator Notes** -- Reserved section with lines for operator to write notes
  10. **Declaration & Signature** -- Declaration text, Place/Date fields, Signature box

- **Design details**:
  - Section headings: dark navy background (#1a237e) with white text
  - Field labels: light blue-gray background cells
  - Character boxes: monospace bordered grid cells for PAN-form-style fields
  - Proper spacing between sections with consistent padding
  - Multi-page support via CSS `page-break-inside: avoid` on sections
  - No content overflow -- text wraps properly, long values truncated gracefully
  - Footer on every page: "System Generated | Application No | Page"

- Storage: continues to upload to `documents` bucket as HTML, stored at `summaries/{app_no}_form49a.html`

### 2. Admin Dashboard: PDF Viewer (Eye Icon Behavior)

**File: `src/pages/AdminDashboard.tsx`**

- Add a new state `pdfViewUrl` and a full-screen Dialog component
- When clicking the Eye icon on an application that has a `pdf_url`:
  - Open a full-width modal/dialog with the HTML loaded in an `<iframe>`
  - Include toolbar with: Zoom In, Zoom Out, Print, Open in New Tab, Close buttons
  - The iframe will scale using CSS `transform: scale()` for zoom functionality
- When clicking the Eye icon on an application without `pdf_url`:
  - Continue showing the existing application detail dialog
- Add the `pdf_url` field to the `Application` interface

- The Download icon button continues to generate/regenerate the PDF

**File: `src/pages/OperatorDashboard.tsx`**

- Same PDF viewer integration as admin dashboard
- Add a "View Summary" button that opens the generated PDF in the same full-width viewer

### 3. No Database Changes Required

The existing `pdf_url` column on the `applications` table already stores the generated document URL. No schema changes needed.

## Technical Details

### Edge Function HTML Template Structure
```text
+--------------------------------------------------+
|  [Logo]  PAN CARD SERVICES        App No: PAN... |
|  Application for PAN    Date: DD/MM/YYYY         |
+--------------------------------------------------+
|  1. APPLICATION DETAILS                          |
|  +----------+----------+----------+----------+   |
|  | App No   | Service  | Status   | Date     |   |
|  +----------+----------+----------+----------+   |
+--------------------------------------------------+
|  2. APPLICANT INFORMATION          +----------+  |
|  Title: [x] Shri [ ] Smt ...      |  PHOTO   |  |
|  Last Name:  [A][B][C]...          |  BOX     |  |
|  First Name: [A][B][C]...          +----------+  |
|  Gender: [x] Male [ ] Female                     |
|  DOB: [D][D]/[M][M]/[Y][Y][Y][Y]                |
+--------------------------------------------------+
|  3. FATHER'S NAME / MOTHER'S NAME                |
|  ...bordered grid fields...                      |
+--------------------------------------------------+
|  4. ADDRESS DETAILS                              |
|  Flat/Block | ........................           |
|  Premises   | ........................           |
|  City/State | ............  PIN: [X][X][X]...    |
+--------------------------------------------------+
|  5. CONTACT DETAILS                              |
|  6. CORRECTION DETAILS (if applicable)           |
|  7. DOCUMENT DETAILS                             |
|  8. PAYMENT DETAILS                              |
|  9. OPERATOR NOTES (blank lines)                 |
| 10. DECLARATION + SIGNATURE BOX                  |
+--------------------------------------------------+
|  Footer: System Generated | App No | Status     |
+--------------------------------------------------+
```

### PDF Viewer Component Flow
- Eye icon click checks if `pdf_url` exists on the application
- If yes: opens full-screen dialog with iframe + zoom controls
- If no: opens existing detail dialog (current behavior preserved)
- Zoom implemented via CSS transform on the iframe container
- Print button triggers `iframe.contentWindow.print()`

### Files to Create/Modify
1. **Rewrite**: `supabase/functions/generate-pdf/index.ts`
2. **Modify**: `src/pages/AdminDashboard.tsx` (add PDF viewer dialog, update eye icon logic)
3. **Modify**: `src/pages/OperatorDashboard.tsx` (add PDF viewer dialog)


import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is a PAN Card and why do I need one?",
    a: "A PAN (Permanent Account Number) card is a 10-digit alphanumeric identity issued by the Income Tax Department of India. It is mandatory for filing income tax returns, opening bank accounts, purchasing property, and conducting financial transactions above specified limits.",
  },
  {
    q: "How long does it take to get a new PAN card?",
    a: "A new PAN card is typically issued within 15–20 working days after successful submission and verification of your application. You can track the status online in real-time using your application number.",
  },
  {
    q: "What is a Duplicate PAN Card?",
    a: "A Duplicate PAN card is a reprint of your existing PAN card with the same PAN number. It's useful when your original PAN card is lost, damaged, or has become unreadable. The PAN number remains unchanged.",
  },
  {
    q: "How long does PAN correction take?",
    a: "PAN correction typically takes 15–20 working days after successful submission of your application along with the required supporting documents. You can track the status online in real-time.",
  },
  {
    q: "Is Aadhaar mandatory for PAN application?",
    a: "Yes, Aadhaar is mandatory for Indian citizens applying for a new PAN card or making corrections. It is used for identity verification through e-KYC. NRIs and foreign nationals may use passport instead.",
  },
  {
    q: "How can I track my PAN application?",
    a: "You can track your PAN application using the application number provided during submission. Simply visit our Track Application page and enter your application number to get real-time status updates.",
  },
  {
    q: "Is my personal data safe with you?",
    a: "Absolutely. We use industry-standard encryption (AES-256) for all data at rest and in transit. Your documents are processed securely and are never shared with any third party without your consent.",
  },
  {
    q: "What documents are required for a new PAN card?",
    a: "For individuals, you need: (1) Aadhaar Card, (2) Recent passport-size photograph, (3) Signature specimen. For corrections, additional supporting documents like birth certificate, marriage certificate, or gazette notification may be required.",
  },
  {
    q: "Can I apply for PAN card online?",
    a: "Yes! Our entire process is 100% online. You can fill the application form, upload documents, make payment, and receive your PAN card — all without visiting any office.",
  },
  {
    q: "What is PAN 2.0 with QR Code?",
    a: "PAN 2.0 is the new version of the PAN card issued by the Income Tax Department. It features an embedded QR code that contains your PAN details, making verification faster and more secure.",
  },
  {
    q: "How much does a PAN card application cost?",
    a: "The standard fee for PAN card services through our platform starts at ₹126 (including GST). This covers application processing, document verification, and doorstep delivery of your PAN card.",
  },
  {
    q: "What is the difference between ePAN and physical PAN?",
    a: "An ePAN is a digitally signed PDF version of your PAN card that you receive via email. A physical PAN is a laminated card delivered to your address. Both carry the same legal validity.",
  },
  {
    q: "Can a minor apply for PAN card?",
    a: "Yes, a minor (below 18 years) can apply for a PAN card. The application must be submitted by a parent or guardian. Once the child turns 18, the PAN details can be updated with photo and signature.",
  },
  {
    q: "What should I do if I have two PAN cards?",
    a: "Having multiple PAN cards is illegal under the Income Tax Act and attracts a penalty of ₹10,000. You must surrender the additional PAN cards. Contact us for assistance with the surrender process.",
  },
  {
    q: "How do I update my PAN after marriage?",
    a: "After marriage, you can apply for a PAN correction to update your surname, father's name to husband's name, or other details. You'll need to provide a marriage certificate as supporting documentation.",
  },
  {
    q: "What if my PAN card application is rejected?",
    a: "If your application is rejected, we will notify you with the reason. Common reasons include incorrect information, unclear documents, or mismatched Aadhaar details. You can resubmit with corrected information.",
  },
  {
    q: "Can NRIs apply for a PAN card through your platform?",
    a: "Yes, NRIs and foreign nationals can apply for a PAN card. You'll need a valid passport and may require additional documentation. The processing time may be slightly longer for overseas applications.",
  },
  {
    q: "How do I download my ePAN card?",
    a: "Once your PAN card is processed and approved, the ePAN PDF is sent to your registered email address. You can also download it from the NSDL or UTIITSL portal using your acknowledgement number.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, debit cards, credit cards, net banking, and popular wallets through our secure Razorpay payment gateway. All transactions are encrypted and PCI-DSS compliant.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes, we offer a refund if your application could not be processed due to reasons attributable to us. Refund requests are processed within 7–10 working days. Please refer to our Refund Policy page for full details.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-4 border border-primary/10">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Got questions? Find answers to the most common queries about PAN card services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card rounded-xl border border-border px-6 shadow-card data-[state=open]:shadow-card-hover transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-[15px] hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

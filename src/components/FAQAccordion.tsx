"use client";
import { FAQ } from "@/src/data/faqsData";

interface FAQAccordionProps {
  groupId: string;
  faqs: FAQ[];
}

export default function FAQAccordion({ groupId, faqs }: FAQAccordionProps) {
  return (
    <div className="accordion accordions-items-seperate faq-accordion m-0" id={groupId}>
      {faqs.map((faq, idx) => (
        <div className="accordion-item aos" data-aos="fade-down" data-aos-duration="1000" key={faq.id}>
          <div className="accordion-header">
            <button
              className={`accordion-button ${idx === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${faq.id}`}
              aria-expanded={idx === 0 ? "true" : "false"}
            >
              {faq.question}
            </button>
          </div>
          <div
            id={faq.id}
            className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
            data-bs-parent={`#${groupId}`}
          >
            <div className="accordion-body">
              <p className="mb-0">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQGroup {
  items: FAQ[];
}

export const faqGroups: FAQGroup[] = [
  {
    items: [{
      id: "accordion-1",
      question: "How can I contact you to schedule a property visit?",
      answer: "You can call, WhatsApp, or fill out the inquiry form on each property page. Once we receive your request, our team will schedule a visit at your preferred time.",
    }, {
      id: "accordion-2",
      question: "Do you charge any brokerage or service fees?",
      answer:
        "Yes, a standard brokerage/service fee is applicable on successful property finalization. The amount may vary depending on property type and deal value.",
    }, {
      id: "accordion-3",
      question: "Are the property details and pricing accurate?",
      answer:
        "All listings are verified before publishing. However, prices may change based on owner decisions or market updates - we recommend confirming with our team.",
    }, {
      id: "accordion-4",
      question: "Can you help with rental agreements and documentation?",
      answer:
        "Yes. We assist with all paperwork including rental agreement, police verification, stamping, and registration if required.",
    }, {
      id: "accordion-5",
      question: "Is there any advance deposit for rental properties?",
      answer:
        "Most rental properties require a security deposit. The amount depends on the landlord and location. Exact details are available for every listing.",
    }, {
      id: "accordion-6",
      question: "Do you help with home loans for property purchases?",
      answer:
        "Yes. We can connect you with trusted financial partners/banks for home loans and documentation assistance.",
    }, {
      id: "accordion-7",
      question: "How do I list my property for sale or rent on your website?",
      answer:
        "You can contact us directly, or fill out the List Your Property form. Our team will verify the details and upload it with professional photos and description.",
    }, {
      id: "accordion-8",
      question: "Can I negotiate the price?",
      answer:
        "In most cases, yes. We will help you with negotiation between buyer/tenant and property owner to get the best deal.",
    }, {
      id: "accordion-9",
      question: "Are the photos and videos of properties real?",
      answer:
        "Yes. All media uploaded for properties are real and taken during site visits. No stock or misleading visuals are used.",
    }, {
      id: "accordion-10",
      question: "Do you offer property management services?",
      answer:
        "Yes. For owners who stay out of town or want hassle-free renting, we provide tenant search, rent collection, and maintenance coordination.",
    }]
  }
];
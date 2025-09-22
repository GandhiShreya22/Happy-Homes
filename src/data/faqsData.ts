export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export interface FAQGroup {
    title: string;
    items: FAQ[];
}

export const faqGroups: FAQGroup[] = [
    {
        title: "General FAQ’s",
        items: [
            {
                id: "accordion-1",
                question: "What is real estate?",
                answer:
                    "Real estate refers to land and any permanent structures on it, such as homes or buildings.",
            },
            {
                id: "accordion-2",
                question: "What types of properties are included in real estate?",
                answer:
                    "Real estate includes residential, commercial, industrial, land, and special-purpose properties.",
            },
            {
                id: "accordion-3",
                question: "What is the role of a real estate agent?",
                answer:
                    "A real estate agent assists clients in buying, selling, or renting properties by guiding them through the process.",
            },
        ],
    },
    {
        title: "Buying FAQ’s",
        items: [
            {
                id: "accordion-4",
                question: "How do I start the home-buying process?",
                answer:
                    "Start the home-buying process by checking your budget, getting pre approved for a mortgage, and consulting a real estate agent.",
            },
            {
                id: "accordion-5",
                question: "How much down payment do I need?",
                answer:
                    "The down payment typically ranges from 3% to 20% of the home's price, depending on the loan type and lender requirements.",
            },
            {
                id: "accordion-6",
                question: "What is a home inspection?",
                answer:
                    "A home inspection is a professional evaluation of a property's condition to identify any issues before finalizing the purchase.",
            },
        ],
    },
];

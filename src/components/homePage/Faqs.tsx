import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I submit feedback anonymously?",
    answer:
      "Simply log in, select the purpose of your feedback (e.g., feedback, suggestion, appreciation), and submit your message. We ensure your identity is not revealed.",
  },
  {
    question: "Can I see AI-generated suggestions for my feedback?",
    answer:
      "Yes! Once your feedback is submitted, our system generates actionable suggestions using AI to help improve outcomes.",
  },
  {
    question: "Is my feedback really anonymous?",
    answer:
      "Absolutely. We use state-of-the-art encryption and privacy practices to ensure your identity remains hidden.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-black/90 sm:py-16 lg:py-24 w-full ">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight  sm:text-4xl lg:text-5xl bg-btn-gradient text-transparent bg-clip-text">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-400">
            Find answers to the most common questions about our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 shadow-lg cursor-pointer rounded-lg"
            >
              <button
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                onClick={() => toggleFAQ(index)}
              >
                <span className="flex text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-base mt-9">
          Didn’t find the answer you are looking for?{" "}
          <a
            href="#"
            title=""
            className="font-medium text-blue-500 transition-all duration-200 hover:text-blue-400 hover:underline"
          >
            Contact our support
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQSection;

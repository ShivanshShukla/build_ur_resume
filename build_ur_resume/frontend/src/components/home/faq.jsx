import React, { useState } from "react";

const faqs = [
  { q: "Is this resume builder free?", a: "We offer a free tier that allows you to build and download a standard text resume. Premium templates require a subscription." },
  { q: "Are the templates ATS friendly?", a: "Yes, all our templates are tested against popular Applicant Tracking Systems (ATS) to ensure readability." },
  { q: "Can I import my LinkedIn profile?", a: "Yes! You can export your LinkedIn profile to PDF and import it here to auto-fill your details." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg">
              <button 
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-gray-900 focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className={`transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-600 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
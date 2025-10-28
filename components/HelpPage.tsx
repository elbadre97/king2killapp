import React, { useState } from 'react';
import { Page } from '../types';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-600 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-right p-4 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-600"
      >
        <h4 className="font-bold text-gray-800 dark:text-gray-200">{question}</h4>
        <span className={`transform transition-transform duration-300 text-purple-500 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

interface HelpPageProps {
    t: any;
}

const HelpPage: React.FC<HelpPageProps> = ({ t }) => {
    return (
        <div className="p-4">
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden">
               {t.faqs.map((faq: { q: string; a: string }, index: number) => (
                 <FAQItem key={index} question={faq.q} answer={faq.a} />
               ))}
            </div>
        </div>
    );
};

export default HelpPage;
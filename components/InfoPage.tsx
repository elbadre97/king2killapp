import React from 'react';

interface InfoPageProps {
  title: string;
  sections: { subtitle?: string; content: string[] }[];
}

const InfoPage: React.FC<InfoPageProps> = ({ title, sections }) => {
  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg">
        <article className="prose dark:prose-invert max-w-none prose-h1:text-center prose-h1:mb-6 prose-headings:text-gray-800 dark:prose-headings:text-gray-200 prose-p:text-gray-600 dark:prose-p:text-gray-300">
          <h1>{title}</h1>
          {sections.map((section, index) => (
            <div key={index}>
              {section.subtitle && <h3>{section.subtitle}</h3>}
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          ))}
        </article>
      </div>
    </div>
  );
};

export default InfoPage;

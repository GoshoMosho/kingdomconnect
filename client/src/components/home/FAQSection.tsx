import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What's an MVP?",
      answer: "MVP (Most Valuable Player) in Rise of Kingdoms refers to high-performance players with strong stats, equipment, and contribution to kingdom activities, especially during KVK events. These players typically have high power levels, significant kill points, and are sought after by competitive kingdoms."
    },
    {
      question: "How do I get matched with a kingdom?",
      answer: "After creating your profile and uploading your stats, our matching algorithm will suggest kingdoms that align with your power level, play style, and preferences. You can browse these matches, filter by specific criteria (like KVK season, language, or time zone), and directly apply to kingdoms you're interested in joining."
    },
    {
      question: "Is there a contribution requirement?",
      answer: "Contribution requirements vary by kingdom. Each kingdom listing displays their minimum requirements for power, kill points, and activity level. Some kingdoms focus on KVK participation, while others prioritize resource contribution or alliance support. You can see these requirements on each kingdom's profile page before applying."
    },
    {
      question: "How do I verify my in-game stats?",
      answer: "When creating your profile, you'll be asked to upload screenshots of your governor profile, equipment, and statistics page. Our verification system will check these screenshots to confirm your stats. For additional verification, some kingdoms may request a video call or in-game meeting before finalizing migration."
    },
    {
      question: "Is BannerMatch free to use?",
      answer: "BannerMatch offers both free and premium options. Basic player profiles and kingdom listings are free. Premium features include enhanced visibility, advanced filtering options, verified status badges, and priority matching. Premium subscription details can be found on our pricing page."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about BannerMatch.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 font-heading font-bold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

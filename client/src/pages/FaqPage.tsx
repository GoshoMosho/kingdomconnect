import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqPage = () => {
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
    },
    {
      question: "How do I contact a kingdom I'm interested in?",
      answer: "Once you've found a kingdom you're interested in, you can submit an application directly through BannerMatch. Kingdom administrators will receive your application with all your stats and information, and can then contact you through our secure messaging system or via your preferred contact method."
    },
    {
      question: "What information should I include in my player profile?",
      answer: "For the best results, your player profile should include accurate information about your power level, kill points (both T4 and T5), dead troops, VIP level, commander pairings, equipment sets, and preferred play style (rally leader, field fighter, support, etc.). You should also mention your activity level and what you're looking for in a kingdom."
    },
    {
      question: "Can I register my kingdom on BannerMatch?",
      answer: "Absolutely! Kingdom leaders can register their kingdom by creating an account, clicking on 'Register Your Kingdom', and filling out the kingdom profile form. You'll need to provide information about your kingdom number, average power, KVK history, language, time zone, and requirements for new members."
    },
    {
      question: "What happens after I apply to a kingdom?",
      answer: "After submitting your application, the kingdom administrators will review your profile. If they're interested, they'll typically contact you within 1-3 days. You may be asked for additional information or verification of your stats. If both parties agree to proceed, you'll receive guidance on the migration process."
    },
    {
      question: "How can I improve my chances of being accepted by a top kingdom?",
      answer: "To improve your chances, make sure your profile is complete with verified stats, include detailed information about your play style and contribution history, highlight any leadership roles you've had, and be clear about your expectations. Having strong stats (especially kill points and dead troops) and a history of KVK participation will make you more attractive to competitive kingdoms."
    }
  ];
  
  const categories = [
    {
      title: "Getting Started",
      faqs: [0, 4, 6, 7]
    },
    {
      title: "Matching Process",
      faqs: [1, 2, 5, 8, 9]
    },
    {
      title: "Verification",
      faqs: [3]
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ | BannerMatch</title>
        <meta name="description" content="Frequently asked questions about BannerMatch, the premier matchmaking platform for Rise of Kingdoms players and kingdoms." />
      </Helmet>
      
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-center max-w-2xl mx-auto">
            Everything you need to know about BannerMatch and the kingdom matching process.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-10">
                <h2 className="font-heading text-2xl font-bold mb-6">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`faq-${faqIndex}`}
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                    >
                      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 font-heading font-bold">
                        {faqs[faqIndex].question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 text-gray-700">
                        {faqs[faqIndex].answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
            
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h3 className="font-heading text-lg font-bold mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">
                If you couldn't find the answer to your question, please feel free to contact our support team.
              </p>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>Email:</span>
                <a href="mailto:support@bannermatch.com" className="text-primary hover:underline">
                  support@bannermatch.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;

import { UserPlus, Search, MessageSquare } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      number: 1,
      icon: <UserPlus className="h-12 w-12" />,
      title: "Create Your Profile",
      description: "Upload your stats, specify your play style and expectations, and showcase your achievements."
    },
    {
      number: 2,
      icon: <Search className="h-12 w-12" />,
      title: "Browse Matches",
      description: "Discover kingdoms or players that match your requirements, filters, and preferences."
    },
    {
      number: 3,
      icon: <MessageSquare className="h-12 w-12" />,
      title: "Connect & Migrate",
      description: "Communicate directly with kingdom leadership and arrange your migration with ease."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            How <span className="text-primary">BannerMatch</span> Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple steps to find your perfect kingdom or recruit top MVPs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="bg-white p-8 rounded-lg shadow-md text-center relative"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <div className="mb-4 text-secondary mx-auto">
                {step.icon}
              </div>
              <h3 className="font-heading text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

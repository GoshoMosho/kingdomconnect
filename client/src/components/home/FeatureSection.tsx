import { Crown, Shield, Handshake } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Crown className="text-primary text-2xl" />,
      title: "Perfect Matches",
      description: "Find kingdoms that match your play style, power level, and KVK contribution goals."
    },
    {
      icon: <Shield className="text-primary text-2xl" />,
      title: "Verified Stats",
      description: "Upload your profile with verified kill points, power, and equipment to stand out."
    },
    {
      icon: <Handshake className="text-primary text-2xl" />,
      title: "Easy Migration",
      description: "Connect directly with kingdom leadership for smooth and hassle-free migration."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Why <span className="text-primary">BannerMatch</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The perfect matchmaking platform for Rise of Kingdoms players and kingdoms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-light p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

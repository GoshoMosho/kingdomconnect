import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="gradient-bg text-white py-16 md:py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find your next <span className="text-primary">MVP</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            BannerMatch connects top-tier players with active kingdoms ready to win KVK.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/kingdoms">
              <Button className="bg-primary hover:bg-red-700 text-white px-8 py-3 h-auto text-base">
                Browse Kingdoms
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-secondary px-8 py-3 h-auto text-base">
                Apply as a Player
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

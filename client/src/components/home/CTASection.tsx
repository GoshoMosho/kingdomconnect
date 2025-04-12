import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Join thousands of players who have found their ideal kingdom through BannerMatch.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup">
              <Button className="bg-primary hover:bg-red-700 text-white px-8 py-3 h-auto text-base">
                Apply as a Player
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-secondary px-8 py-3 h-auto text-base">
                Register Your Kingdom
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

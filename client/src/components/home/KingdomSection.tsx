import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import KingdomCard from "@/components/kingdom/KingdomCard";
import { Kingdom } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const KingdomSection = () => {
  const { data: kingdoms, isLoading, error } = useQuery<Kingdom[]>({
    queryKey: ['/api/kingdoms'],
  });

  // Create skeleton array for loading state
  const skeletonKingdoms = Array(3).fill(0);

  return (
    <section id="kingdoms" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Featured <span className="text-primary">Kingdoms</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore active kingdoms looking for their next MVP.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && 
            skeletonKingdoms.map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="bg-gray-50 p-2 rounded">
                        <Skeleton className="h-3 w-16 mb-1" />
                        <Skeleton className="h-5 w-12" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))
          }
          
          {error && (
            <div className="col-span-3 text-center p-8">
              <p className="text-red-500">Failed to load kingdoms. Please try again later.</p>
            </div>
          )}
          
          {kingdoms?.slice(0, 3).map((kingdom) => (
            <KingdomCard key={kingdom.id} kingdom={kingdom} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/kingdoms">
            <Button className="bg-primary hover:bg-red-700 text-white px-8 py-3 h-auto text-base">
              Browse All Kingdoms
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KingdomSection;

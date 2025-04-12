import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PlayerCard from "@/components/player/PlayerCard";
import { Player } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const PlayerSection = () => {
  const { data: players, isLoading, error } = useQuery<Player[]>({
    queryKey: ['/api/players'],
  });

  // Create skeleton array for loading state
  const skeletonPlayers = Array(3).fill(0);

  return (
    <section id="players" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Featured <span className="text-primary">Players</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-tier MVPs looking for their next kingdom.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && 
            skeletonPlayers.map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 p-6">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-1" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-3 w-16 mb-1" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))
          }

          {error && (
            <div className="col-span-3 text-center p-8">
              <p className="text-red-500">Failed to load players. Please try again later.</p>
            </div>
          )}

          {players?.slice(0, 3).map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/players">
            <Button className="bg-primary hover:bg-red-700 text-white px-8 py-3 h-auto text-base">
              Find More MVPs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlayerSection;

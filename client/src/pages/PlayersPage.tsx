import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Player } from "@shared/schema";
import PlayerCard from "@/components/player/PlayerCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PlayersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTroopType, setFilterTroopType] = useState<string>("");
  const [filterPlayStyle, setFilterPlayStyle] = useState<string>("");
  
  const { data: players, isLoading, error } = useQuery<Player[]>({
    queryKey: ['/api/players'],
  });
  
  // Filter players based on search query and filters
  const filteredPlayers = players?.filter(player => {
    const matchesSearch = 
      player.inGameName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.gameId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTroopType = filterTroopType ? player.mainTroopType === filterTroopType : true;
    const matchesPlayStyle = filterPlayStyle ? player.playStyle === filterPlayStyle : true;
    
    return matchesSearch && matchesTroopType && matchesPlayStyle;
  });
  
  // Create unique options from players data
  const troopTypeOptions = players 
    ? [...new Set(players.map(player => player.mainTroopType))]
    : [];
    
  const playStyleOptions = players 
    ? [...new Set(players.map(player => player.playStyle))]
    : [];
  
  return (
    <>
      <Helmet>
        <title>Find MVPs | BannerMatch</title>
        <meta name="description" content="Discover top-tier MVPs looking for their next kingdom. Filter by troop type, play style, and power level." />
      </Helmet>
      
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
            Find <span className="text-primary">MVPs</span>
          </h1>
          <p className="text-center max-w-2xl mx-auto">
            Discover top-tier players looking for their next kingdom. Filter by troop type, play style, and more.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter Controls */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search player name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={filterTroopType} onValueChange={setFilterTroopType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Troop Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Troop</SelectItem>
                    {troopTypeOptions.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filterPlayStyle} onValueChange={setFilterPlayStyle}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Play Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Style</SelectItem>
                    {playStyleOptions.map(style => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterTroopType("");
                    setFilterPlayStyle("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          {/* Player Listings */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
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
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-12 bg-white rounded-lg shadow-md">
              <p className="text-red-500 mb-4">Failed to load players. Please try again later.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : filteredPlayers?.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-lg shadow-md">
              <h3 className="font-heading text-2xl font-bold mb-2">No Players Found</h3>
              <p className="text-gray-600 mb-4">No players match your current filters.</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setFilterTroopType("");
                  setFilterPlayStyle("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers?.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Are you a top player looking for a kingdom?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Create your player profile to showcase your stats and get matched with kingdoms looking for players like you.
          </p>
          <Button className="bg-primary hover:bg-red-700 text-white px-8 py-3 h-auto text-base">
            Create Your Profile
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlayersPage;

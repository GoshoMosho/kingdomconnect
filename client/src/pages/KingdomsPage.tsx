import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Kingdom } from "@shared/schema";
import KingdomCard from "@/components/kingdom/KingdomCard";
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

const KingdomsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSeed, setFilterSeed] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  
  const { data: kingdoms, isLoading, error } = useQuery<Kingdom[]>({
    queryKey: ['/api/kingdoms'],
  });
  
  // Filter kingdoms based on search query and filters
  const filteredKingdoms = kingdoms?.filter(kingdom => {
    const matchesSearch = 
      kingdom.kingdomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kingdom.kingdomNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeed = filterSeed ? kingdom.seed === filterSeed : true;
    const matchesStatus = filterStatus ? kingdom.status === filterStatus : true;
    
    return matchesSearch && matchesSeed && matchesStatus;
  });
  
  // Create unique status options from kingdoms data
  const statusOptions = kingdoms 
    ? [...new Set(kingdoms.map(kingdom => kingdom.status))]
    : [];
  
  return (
    <>
      <Helmet>
        <title>Browse Kingdoms | BannerMatch</title>
        <meta name="description" content="Browse and find active Rise of Kingdoms kingdoms looking for their next MVP. Filter by seed, status, and power requirements." />
      </Helmet>
      
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
            Browse <span className="text-primary">Kingdoms</span>
          </h1>
          <p className="text-center max-w-2xl mx-auto">
            Find your next kingdom for migration. Filter by seed, power requirements, and more.
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
                  placeholder="Search kingdom name or number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={filterSeed} onValueChange={setFilterSeed}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Seed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Seed</SelectItem>
                    <SelectItem value="A">Seed A</SelectItem>
                    <SelectItem value="B">Seed B</SelectItem>
                    <SelectItem value="C">Seed C</SelectItem>
                    <SelectItem value="D">Seed D</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Status</SelectItem>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterSeed("");
                    setFilterStatus("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          {/* Kingdom Listings */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
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
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-12 bg-white rounded-lg shadow-md">
              <p className="text-red-500 mb-4">Failed to load kingdoms. Please try again later.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : filteredKingdoms?.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-lg shadow-md">
              <h3 className="font-heading text-2xl font-bold mb-2">No Kingdoms Found</h3>
              <p className="text-gray-600 mb-4">No kingdoms match your current filters.</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setFilterSeed("");
                  setFilterStatus("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKingdoms?.map((kingdom) => (
                <KingdomCard key={kingdom.id} kingdom={kingdom} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Don't see the right kingdom?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you're looking for specific requirements or can't find your ideal match, consider registering your own kingdom or joining our matching program.
          </p>
          <Button className="bg-primary hover:bg-red-700 text-white px-8 py-3 h-auto text-base">
            Register Your Kingdom
          </Button>
        </div>
      </div>
    </>
  );
};

export default KingdomsPage;

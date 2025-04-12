import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kingdom } from "@shared/schema";

interface KingdomCardProps {
  kingdom: Kingdom;
}

const KingdomCard = ({ kingdom }: KingdomCardProps) => {
  const statusColors = {
    "Active": "green",
    "Recruiting": "green",
    "Competitive": "green",
    "KVK Winners": "blue",
    "Growing": "yellow",
    "High Activity": "red"
  } as const;

  const renderStatus = (status: string) => {
    const color = (statusColors as Record<string, string>)[status] || "gray";
    return (
      <Badge
        key={status}
        className={`bg-${color}-100 text-${color}-800 hover:bg-${color}-100 text-xs px-2 py-1`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="kingdom-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
      <div className="h-48 bg-secondary relative">
        <img 
          src={kingdom.bannerImageUrl} 
          alt={`Kingdom ${kingdom.kingdomNumber}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 font-medium">
          Kingdom #{kingdom.kingdomNumber}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold mb-2">{kingdom.kingdomName}</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {renderStatus(kingdom.status)}
          {renderStatus(kingdom.kingdomType)}
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 text-xs px-2 py-1">
            {kingdom.languages}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Seed</div>
            <div className="font-medium">{kingdom.seed}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Avg. Power</div>
            <div className="font-medium">{(kingdom.averagePower / 1000000).toFixed(0)}M+</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">KVK</div>
            <div className="font-medium">{kingdom.kvkSeason}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Min. Power</div>
            <div className="font-medium">{(kingdom.minimumPower / 1000000).toFixed(0)}M</div>
          </div>
        </div>
        
        <Link href={`/kingdoms/${kingdom.id}`}>
          <Button 
            variant="secondary" 
            className="w-full bg-secondary hover:bg-secondary/90 text-white"
          >
            View Kingdom
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default KingdomCard;

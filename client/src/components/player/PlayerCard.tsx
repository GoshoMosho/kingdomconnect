import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Player } from "@shared/schema";
import { Zap } from "lucide-react";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const troopTypeColors = {
    "Infantry": "blue",
    "Cavalry": "yellow",
    "Archer": "green"
  } as const;

  const playStyleColors = {
    "Rally Leader": "green",
    "Field Fighter": "red",
    "Support": "blue"
  } as const;

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="player-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
      <div className="bg-gray-50 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary flex-shrink-0">
            <img 
              src={player.profileImageUrl} 
              alt={player.inGameName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold">{player.inGameName}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>ID: {player.gameId}</span>
              <span>•</span>
              <span className="flex items-center">
                <Zap className="h-3 w-3 text-yellow-500 mr-1" />
                {player.hasTier5 ? "T5 Player" : "T4 Player"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Power</div>
            <div className="font-medium text-lg">{formatNumber(player.power)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Kill Points</div>
            <div className="font-medium text-lg">{formatNumber(player.killPoints)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Dead Troops</div>
            <div className="font-medium text-lg">{formatNumber(player.deadTroops)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">VIP Level</div>
            <div className="font-medium text-lg">{player.vipLevel}</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            className={`bg-${troopTypeColors[player.mainTroopType as keyof typeof troopTypeColors] || "gray"}-100 
                       text-${troopTypeColors[player.mainTroopType as keyof typeof troopTypeColors] || "gray"}-800 
                       hover:bg-${troopTypeColors[player.mainTroopType as keyof typeof troopTypeColors] || "gray"}-100 
                       text-xs px-2 py-1`}
          >
            {player.mainTroopType} Main
          </Badge>
          
          <Badge 
            className={`bg-${playStyleColors[player.playStyle as keyof typeof playStyleColors] || "gray"}-100 
                       text-${playStyleColors[player.playStyle as keyof typeof playStyleColors] || "gray"}-800 
                       hover:bg-${playStyleColors[player.playStyle as keyof typeof playStyleColors] || "gray"}-100 
                       text-xs px-2 py-1`}
          >
            {player.playStyle}
          </Badge>
          
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 text-xs px-2 py-1">
            {player.languages}
          </Badge>
        </div>
        
        <Link href={`/players/${player.id}`}>
          <Button 
            variant="secondary" 
            className="w-full bg-secondary hover:bg-secondary/90 text-white"
          >
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlayerCard;

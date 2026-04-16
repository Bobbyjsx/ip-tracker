import React from "react";
import { Copy, Clock, Globe, Shield, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface CardProps {
  ipData: {
    ip: string;
    location: {
      city: string;
      region: string;
      timezone: string;
      lat: number;
      lng: number;
    };
    isp: string;
  } | null;
}

const Card = ({ ipData }: CardProps) => {
  if (!ipData) return null;

  const { ip, location, isp } = ipData;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-[2000] w-full max-w-6xl mx-auto px-4 -mb-16 md:-mb-12"
    >
      <div className="glass-hud grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-1 rounded-xl terminal-border overflow-hidden">
        {/* IP Address */}
        <motion.div variants={item} className="p-4 md:p-6 border-b sm:border-b-0 sm:border-r border-terminal-secondary/20 relative group">
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <h2 className="text-[9px] md:text-[10px] uppercase tracking-widest text-terminal-accent font-mono flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">
              <Shield size={10} className="text-terminal-accent animate-pulse" />
              Target IP
            </h2>
            <button 
              onClick={() => copyToClipboard(ip)}
              className="text-terminal-accent/80 hover:text-terminal-accent transition-colors drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]"
              title="Copy IP"
            >
              <Copy size={12} />
            </button>
          </div>
          <p className="font-mono text-lg md:text-xl font-bold text-terminal-accent glow-accent break-all">
            {ip}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-terminal-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </motion.div>

        {/* Location */}
        <motion.div variants={item} className="p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-terminal-secondary/20 relative group">
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <h2 className="text-[9px] md:text-[10px] uppercase tracking-widest text-terminal-accent font-mono flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">
              <MapPin size={10} className="text-terminal-accent" />
              Geolocation
            </h2>
          </div>
          <p className="font-mono text-lg md:text-xl font-bold text-terminal-text uppercase">
            {location?.city}, {location?.region}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-terminal-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </motion.div>

        {/* Timezone */}
        <motion.div variants={item} className="p-4 md:p-6 border-b sm:border-b-0 sm:border-r border-terminal-secondary/20 relative group">
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <h2 className="text-[9px] md:text-[10px] uppercase tracking-widest text-terminal-accent font-mono flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">
              <Clock size={10} className="text-terminal-accent" />
              Node Time
            </h2>
          </div>
          <p className="font-mono text-lg md:text-xl font-bold text-terminal-text">
            UTC {location?.timezone}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-terminal-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </motion.div>

        {/* ISP */}
        <motion.div variants={item} className="p-4 md:p-6 relative group">
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <h2 className="text-[9px] md:text-[10px] uppercase tracking-widest text-terminal-accent font-mono flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">
              <Globe size={10} className="text-terminal-accent" />
              Carrier
            </h2>
          </div>
          <p className="font-mono text-lg md:text-xl font-bold text-terminal-text line-clamp-1">
            {isp}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-terminal-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;

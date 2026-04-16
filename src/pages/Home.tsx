import React, { useState, useEffect } from "react";
import Map from "../components/Maps";
import "leaflet/dist/leaflet.css";
import "../App.css";
import Modal, { ModalProps } from "../components/Modal";
import SearchInput from "../components/SearchInput";
import { fetchIp, fetchUserIp } from "../APi";
import Card from "../components/Card";
import { History, Activity, Terminal as TerminalIcon, User, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse {
  ip: string;
  city?: string;
  region?: string;
  utc_offset?: string;
  latitude?: number;
  longitude?: number;
  org?: string;
  error?: boolean;
  reason?: string;
}

function Home() {
  const [address, setAddress] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalProps["modal"]>({
    modalOpen: false,
    errorMsg: "",
  });

  const normalizeData = (data: ApiResponse | undefined) => {
    if (!data || data.error) return null;
    
    let timezone = data.utc_offset || "N/A";
    if (timezone.length === 5) {
        timezone = `${timezone.substring(0, 3)}:${timezone.substring(3)}`;
    }

    return {
      ip: data.ip,
      location: {
        city: data.city || "Unknown",
        region: data.region || "Unknown",
        timezone: timezone,
        lat: data.latitude || 0,
        lng: data.longitude || 0,
      },
      isp: data.org || "Unknown ISP",
    };
  };

  // Fetch user's own IP on mount
  const userIpQuery = useQuery<ApiResponse>({
    queryKey: ["userIp"],
    queryFn: fetchUserIp,
  });

  // Handle userIp success logic in useEffect
  useEffect(() => {
    if (userIpQuery.data && !userIpQuery.data.error && !address) {
      setAddress(userIpQuery.data.ip);
    }
  }, [userIpQuery.data, address]);

  // Fetch IP data for the current address
  const ipDataQuery = useQuery<ApiResponse>({
    queryKey: ["ipData", address],
    queryFn: () => fetchIp(address),
    enabled: !!address,
  });

  // Handle ipData success/error logic in useEffect
  useEffect(() => {
    if (ipDataQuery.data) {
      if (ipDataQuery.data.error) {
        setModal({
          modalOpen: true,
          errorMsg: `IDENTIFICATION FAILED: ${ipDataQuery.data.reason || "INVALID TARGET"}`,
        });
      } else if (address) {
        setSearchHistory(prev => {
          const newHistory = [address, ...prev.filter(h => h !== address)].slice(0, 5);
          localStorage.setItem("searchHistory", JSON.stringify(newHistory));
          return newHistory;
        });
      }
    }
  }, [ipDataQuery.data, address]);

  // Handle global error state (connection refused etc.)
  useEffect(() => {
    if (ipDataQuery.isError) {
      setModal({
        modalOpen: true,
        errorMsg: "UPLINK ERROR: CONNECTION REFUSED",
      });
    }
  }, [ipDataQuery.isError]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(storedHistory);
  }, []);

  const ipData = normalizeData(ipDataQuery.data);
  const loading = ipDataQuery.isLoading || userIpQuery.isLoading;

  return (
    <div className="min-h-screen bg-terminal-bg font-mono selection:bg-terminal-accent selection:text-terminal-bg overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1f2833_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-terminal-accent/5 blur-[120px] rounded-full"></div>
      </div>

      <header className="relative z-50 pt-8 md:pt-12 pb-16 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3 md:gap-4 text-center mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 md:gap-3 text-terminal-accent mb-1 md:mb-2">
            <TerminalIcon size={24} className="md:w-8 md:h-8" />
            <h1 className="text-2xl md:text-5xl font-bold tracking-tighter uppercase glow-accent">
              IP-Tracker <span className="text-terminal-accent">Terminal</span>
            </h1>
          </div>
          <div className="h-[1px] md:h-[2px] w-16 md:w-24 bg-terminal-accent/30"></div>
          
          {/* User's Current IP HUD */}
          <div className="flex items-center gap-3 md:gap-4 bg-terminal-card/40 border border-terminal-accent/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full mt-2 md:mt-4 group hover:border-terminal-accent/50 transition-all cursor-pointer"
               onClick={() => userIpQuery.data?.ip && setAddress(userIpQuery.data.ip)}>
            <User size={12} className="text-terminal-accent animate-pulse md:w-3.5 md:h-3.5" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-terminal-accent/60">Local Node:</span>
            <span className="text-xs font-bold text-terminal-accent">
              {userIpQuery.isLoading ? "Detecting..." : userIpQuery.data?.ip || "Unknown"}
            </span>
            <RefreshCw 
              size={10} 
              className={`text-terminal-accent/40 group-hover:text-terminal-accent transition-all md:w-3 md:h-3 ${userIpQuery.isFetching ? 'animate-spin' : ''}`} 
              onClick={(e) => {
                e.stopPropagation();
                userIpQuery.refetch();
              }}
            />
          </div>
        </motion.div>

        <SearchInput
          address={address}
          setAddress={setAddress}
          setModal={setModal}
          loading={loading}
        />

        <div className="mt-6 md:mt-8 flex justify-start md:justify-center items-center gap-3 md:gap-6 overflow-x-auto no-scrollbar pb-2">
          <AnimatePresence>
            {searchHistory.map((ip, index) => (
              <motion.button
                key={ip}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setAddress(ip)}
                className="flex items-center gap-2 text-[10px] text-terminal-accent hover:text-white transition-all uppercase tracking-widest border border-terminal-accent/40 px-3 py-1.5 rounded bg-terminal-card/50 shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:border-terminal-accent"
              >
                {ip}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-40">
        <Card ipData={ipData} />
        
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-terminal-bg to-transparent z-10"></div>
            {ipData ? (
                <Map location={ipData} />
            ) : (
                <div className="w-full h-[60vh] bg-terminal-card/5 flex items-center justify-center border-t border-terminal-accent/20">
                    <div className="text-terminal-accent/50 flex flex-col items-center gap-4">
                        <Activity size={64} className="animate-pulse shadow-[0_0_20px_rgba(0,243,255,0.2)]" />
                        <span className="text-xs uppercase tracking-[0.4em] glow-accent">
                          {loading ? "Decrypting Stream..." : "Awaiting Data Stream"}
                        </span>
                    </div>
                </div>
            )}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-terminal-bg to-transparent z-10"></div>
        </div>
      </main>

      {modal.modalOpen && (
        <Modal
          modal={modal}
          setModalOpen={setModal}
        />
      )}

      <footer className="relative z-50 p-8 border-t border-terminal-secondary/5 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-terminal-accent/40 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-4">
                <span>Core: Linux 5.15.0</span>
                <span>Node: US-EAST-1</span>
                {ipDataQuery.isFetching && <span className="text-terminal-accent animate-pulse">Syncing...</span>}
            </div>
            <div className="animate-pulse flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-terminal-accent"></div>
                <span>Uplink Active</span>
            </div>
            <div className="flex items-center gap-4">
                <span>© 2026 Net-Ops Intelligence</span>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

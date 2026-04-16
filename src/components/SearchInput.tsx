import React, { ChangeEvent, useState } from "react";
import { Search, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SearchInputProps {
  address: string;
  setAddress: (value: string) => void;
  loading: boolean;
  setModal: (value: any) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  address,
  setAddress,
  loading,
  setModal,
}) => {
  const [search, setSearch] = useState("");

  const handleIpInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) {
      setModal({
        modalOpen: true,
        errorMsg: "TARGET SYSTEM UNDEFINED: INPUT REQUIRED",
      });
      return;
    }
    setAddress(search);
    setSearch("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-50 w-full max-w-xl mx-auto px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="glass-hud p-1 flex items-center rounded-lg terminal-border group transition-all duration-300 hover:border-terminal-accent"
      >
        <div className="pl-4 text-terminal-secondary group-hover:text-terminal-accent transition-colors">
          <Search size={20} />
        </div>
        <input
          name="IP"
          type="text"
          value={search}
          placeholder={loading ? "INITIALIZING SCAN..." : "ENTER IP OR DOMAIN..."}
          onChange={handleIpInput}
          autoComplete="off"
          className="flex-1 bg-transparent h-12 md:h-14 font-mono text-base md:text-lg px-3 md:px-4 outline-none text-terminal-accent placeholder:text-terminal-accent/30 min-w-0"
        />

        <button
          type="submit"
          disabled={loading}
          className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-terminal-secondary/20 rounded-md hover:bg-terminal-accent hover:text-terminal-bg transition-all duration-300 disabled:opacity-50 group-hover:bg-terminal-secondary/30 shrink-0"
        >

          {loading ? (
            <Loader2 className="animate-spin text-terminal-accent" size={24} />
          ) : (
            <ArrowRight size={24} className="text-terminal-accent group-hover:text-terminal-bg" />
          )}
        </button>
      </form>
      
      <div className="mt-2 flex justify-between px-2">
        <span className="text-[10px] uppercase tracking-widest text-terminal-accent/50 font-mono">
          System: Net-Ops v2.0.4
        </span>
        <span className="text-[10px] uppercase tracking-widest text-terminal-accent/50 font-mono">
          Status: {loading ? "Scanning..." : "Ready"}
        </span>
      </div>
    </motion.div>
  );
};

export default SearchInput;

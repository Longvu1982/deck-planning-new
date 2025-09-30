"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlanningCardProps {
  value: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function PlanningCard({
  value,
  selected,
  onClick,
  disabled = false,
}: PlanningCardProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -5 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        `aspect-[2/3] rounded-xl cursor-pointer flex items-center 
        justify-center font-bold text-lg sm:text-2xl 
        transition-none hover:border-[2px] 
        hover:border-purple-500 shadow-md`,
        selected
          ? "bg-gradient-to-br from-purple-600 to-cyan-600 text-white border border-white/50 shadow-lg shadow-purple-500/20"
          : "backdrop-blur-md bg-white/40 text-slate-700 border border-white/50 shadow-md hover:bg-white/60",
        disabled && !selected && "opacity-50 cursor-not-allowed"
      )}
      onClick={disabled ? undefined : onClick}
    >
      {value}
    </motion.div>
  );
}

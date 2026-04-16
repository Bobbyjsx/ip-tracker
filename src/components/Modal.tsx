import React, { Dispatch, SetStateAction } from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
	modal: {
		modalOpen: boolean;
		errorMsg: string;
	};
	setModalOpen: Dispatch<
		SetStateAction<{ modalOpen: boolean; errorMsg: string }>
	>;
}

const Modal = ({
	modal: { modalOpen, errorMsg },
	setModalOpen,
}: ModalProps) => {
	return (
		<AnimatePresence>
			{modalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-terminal-bg/80 backdrop-blur-sm"
						onClick={() => setModalOpen({ modalOpen: false, errorMsg: "" })}
					/>
					<motion.div 
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						className="glass-hud w-full max-w-sm p-6 rounded-lg border-red-500/50 relative overflow-hidden"
					>
						<div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
						
						<div className="flex items-center gap-3 text-red-400 mb-4">
							<AlertTriangle size={24} />
							<h3 className="font-bold tracking-widest uppercase text-sm">System Breach/Error</h3>
						</div>
						
						<p className="text-terminal-text font-mono text-sm mb-6 leading-relaxed">
							{errorMsg}
						</p>
						
						<button
							className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
							onClick={() =>
								setModalOpen({
									modalOpen: false,
									errorMsg: "",
								})
							}>
							<X size={14} />
							Acknowledge & Clear
						</button>
						
						<div className="mt-4 flex justify-center">
							<div className="flex gap-1">
								{[...Array(3)].map((_, i) => (
									<div key={i} className="w-1 h-1 bg-red-500/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
export type { ModalProps };

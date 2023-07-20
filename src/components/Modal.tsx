import React, { Dispatch, SetStateAction } from "react";

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
	if (!modalOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-white/90 px-5 py-3 text-md w-60 mx-auto mt-3 shadow-lg font-semibold rounded-md border border-red-400">
				<div className="text-red-600 mb-2">Error!</div>
				<p>{errorMsg}</p>
				<button
					className="mt-4 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
					onClick={() =>
						setModalOpen({
							modalOpen: false,
							errorMsg: "closed",
						})
					}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
export type { ModalProps };

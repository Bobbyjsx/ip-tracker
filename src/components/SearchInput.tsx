import React, { ChangeEvent, useState } from "react";
import Loader from "./loader/Loader";
import { ModalProps } from "./Modal";

interface SearchInputProps {
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	modal: ModalProps["modal"];
	setModal: React.Dispatch<
		React.SetStateAction<ModalProps["modal"]>
	>;
	loading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
	address,
	setAddress,
	modal,
	setModal,
	loading,
}) => {
	const [search, setSearch] = useState(address);

	const handleIpInput = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) {
			setModal({
				modalOpen: true,
				errorMsg: "Input cannot be empty...",
			});

			setTimeout(() => {
				setModal({
					modalOpen: false,
					errorMsg: "Input cannot be empty...",
				});
			}, 5000);
		} else {
			setAddress(search);
			setSearch("");
		}
	};

	return (
		<form
			className="flex flex-row justify-center align-middle"
			onSubmit={handleSubmit}>
			<input
				name="IP"
				type="text"
				value={search}
				placeholder={
					loading ? "Loading..." : "Input IP Address..."
				}
				onChange={handleIpInput}
				className={`bg-gray-300 w-96 h-12 ${
					loading ? "cursor-not-allowed" : "cursor-text"
				} rounded-l-lg font-semibold text-lg px-4 outline-none`}
			/>

			{loading ? (
				<div className="h-12 w-12 rounded-r-lg bg-indigo-700 cursor-not-allowed">
					<Loader />
				</div>
			) : (
				<button
					type="submit"
					className="h-12 w-12 bg-slate-900 rounded-r-lg hover:pl-3 hover:bg-indigo-700 transition-all delay-75 duration-300 ease-linear">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						fill="white"
						className="bi bi-arrow-right"
						viewBox="0 0 16 16">
						<path
							fillRule="evenodd"
							d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
						/>
					</svg>
				</button>
			)}
		</form>
	);
};

export default SearchInput;

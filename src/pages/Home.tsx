import React, { useState, useEffect } from "react";
import Map from "../components/Maps";
import "leaflet/dist/leaflet.css";
import "../App.css";
import Modal, { ModalProps } from "../components/Modal";
import SearchInput from "../components/SearchInput";
import { fetchIp, fetchUserIp } from "../APi";
import Card from "../components/Card";

function Home() {
	const [ipData, setIpData] = useState<any | null>(null);
	const [address, setAddress] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState<ModalProps["modal"]>({
		modalOpen: false,
		errorMsg: "Input cannot be empty...",
	});

	const addressSetter = (value: React.SetStateAction<string>) => {
		setAddress(value);
	};

	const modalSetter = (
		value: React.SetStateAction<ModalProps["modal"]>
	) => {
		setModal(value);
	};

	const setClientIpAddr = async () => {
		try {
			setLoading(true);
			const data = await fetchUserIp();
			// setAddress(data.ip);
			localStorage.setItem("userIp", data.ip);
		} catch (error) {
			console.log("Error fetching user IP:", error);
		} finally {
			setLoading(false);
		}
	};

	const storedIp = localStorage.getItem("userIp");

	useEffect(() => {
		// Retrieve the IP address from Local Storage

		if (storedIp) {
			setAddress(storedIp);
		} else {
			// If no IP address is stored, fetch the client's IP address
			setClientIpAddr();
		}
	}, []);

	const fetchIpData = async (ip: string) => {
		try {
			setLoading(true);
			const data = await fetchIp(ip);

			if (data.code === 422) {
				setModal({
					modalOpen: true,
					errorMsg: "Input a valid IP address",
				});
				setIpData(null);
			} else {
				setIpData(data);
			}
		} catch (error) {
			console.log("Error fetching IP data:", error);
			setModal({
				modalOpen: true,
				errorMsg: "An error occurred while fetching IP data.",
			});
			setIpData(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setClientIpAddr();
	}, []);

	useEffect(() => {
		if (address) {
			fetchIpData(address);
		}
	}, [address]);

	return (
		<div className="App bg-hero-pattern w-full h-screen flex flex-col justify-center align-middle">
			<div
				className="flex flex-col shadow-none border-none b-transparent h-64 mx-0 px-0 "
				id="head">
				<h1 className="font-semibold flex justify-center text-4xl text-white py-11">
					IP Address Tracker
				</h1>
				<SearchInput
					address={address}
					setAddress={addressSetter}
					modal={modal}
					setModal={modalSetter}
					loading={loading}
				/>
				{storedIp && (
					<p className="font-semibold flex justify-center text-xl text-white py-11">
						Your IP Address is : {storedIp}
					</p>
				)}
				{modal.modalOpen && (
					<Modal
						modal={modal}
						setModalOpen={modalSetter}
					/>
				)}
			</div>
			{loading ? (
				<div className="flex items-center justify-center h-full">
					<p className="text-white font-medium text-xl">
						Loading
					</p>
				</div>
			) : (
				<>
					{ipData && <Card ipData={ipData} />}
					{ipData && <Map location={ipData} />}
				</>
			)}
		</div>
	);
}

export default Home;

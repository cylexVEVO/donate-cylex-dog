import * as React from "react";
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";

axios.defaults.validateStatus = (status) => status < 500;

const Index = () => {
	const [firstLoad, setFirstLoad] = useState(true);
	const [globalDonationAmount, setGlobalDonationAmount] = useState(0);
	const [personalDonationAmount, setPersonalDonationAmount] = useState(0);
	const [clicks, setClicks] = useState(0);

	const getGlobalDonationAmount = () => {
		return axios.get("/api/donationStats").then((res) => {
			setGlobalDonationAmount(res.data);
		});
	};

	const getPersonalDonationAmount = () => {
		return axios.get("/api/donate").then((res) => {
			setPersonalDonationAmount(res.data);
		});
	};

	const handleClick = () => {
		if (clicks + 1 === 10) {
			setClicks(0);

			if (personalDonationAmount + 1 > 1000) return;
			if (globalDonationAmount + 1 > 25000) return;

			axios.post("/api/donate").then(() => {
				setPersonalDonationAmount(personalDonationAmount + 1);
				setGlobalDonationAmount(globalDonationAmount + 1);
			});
			return;
		}

		setClicks(clicks + 1);
	};

	useEffect(() => {
		getGlobalDonationAmount().then(() => {
			getPersonalDonationAmount().then(() => {
				setFirstLoad(false);
			});
		});
	}, []);

	const getDollarAmount = (input: number | string) => {
		const paddedDonation = input.toString().padStart(3, "0");
		const dollars = paddedDonation.slice(0, paddedDonation.length - 2);
		const cents = paddedDonation.slice(paddedDonation.length - 2);
		return `$${dollars}.${cents}`;
	};

	if (firstLoad) {
		return (
			<div className={"text-white/90 flex flex-col items-center pt-24 relative"}>
				<div
					className={"fixed left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-[#141b38] to-[#0e0a16] z-0"}/>
				<div className={"z-10 max-w-4xl"}>
					<div className={"text-white text-5xl font-extrabold mb-4"}>
						Loading 🌈
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={"text-white/90 flex flex-col items-center pt-24 relative pb-4"}>
			<div className={"fixed left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-[#141b38] to-[#0e0a16] z-0"}/>
			<div className={"z-10 max-w-4xl"}>
				<div className={"border-white border py-4 px-6 rounded-xl mb-8 text-2xl"}>
					<div className={"text-white font-medium"}>
						Total donation amount
					</div>
					<div className={"flex justify-between"}>
						{getDollarAmount(globalDonationAmount)} /
						$250.00 {globalDonationAmount === 25000 ? "🎉🥳🎉" : ""}
						<button
							className={"transition ease-in-out duration-200 text-lg font-medium text-white/50 hover:text-white"}
							onClick={getGlobalDonationAmount}>
							Refresh
						</button>
					</div>
					<div className={"bg-white rounded-full w-full h-2 my-2 relative"}>
						<div
							className={"transition-all ease-in-out duration-500 bg-orange-600 rounded-full h-2 absolute left-0 top-0 bottom-0"}
							style={{right: `${100 - ((globalDonationAmount / 25000) * 100)}%`}}/>
					</div>
				</div>
				<div className={"text-white text-5xl font-extrabold mb-4"}>
					Happy pride month! 🌈
				</div>
				<div className={"text-2xl font-medium"}>
					<div className={"mb-4"}>
						This pride month, I've decided to do something different (and cool).<br/>
						I've made the choice to crowd-source donations to The Trevor Project, but in an unusual way.
					</div>
					<div className={"mb-2"}>
						Every 10 times you click the button below, I will donate $0.01 to The Trevor Project. There is a
						$10 maximum per person, and a $250 total donation maximum.
					</div>
					<div className={"text-white font-black"}>
						Essentially, click this button a FUCK ton and you will make my pockets hurt.
					</div>
				</div>

				<div className={"my-8"}>
					<div className={"text-2xl"}>
						<div className={"flex justify-between"}>
							You've donated {getDollarAmount(personalDonationAmount)} / $10.00 {personalDonationAmount === 1000 ? "🎉🥳🎉" : ""}
							<button
								className={"transition ease-in-out duration-200 text-lg font-medium text-white/50 hover:text-white"}
								onClick={getPersonalDonationAmount}>
								Refresh
							</button>
						</div>
						<div className={"bg-white rounded-full w-full h-2 my-2 relative"}>
							<div
								className={"transition-all ease-in-out duration-200 bg-orange-600 rounded-full h-2 absolute left-0 top-0 bottom-0"} style={{right: `${100 - ((personalDonationAmount / 1000) * 100)}%`}}/>
						</div>
					</div>
					<button
						className={"disabled:opacity-50 disabled:pointer-events-none relative transition ease-in-out duration-100 px-8 py-4 my-4 rounded transform bg-orange-600 hover:bg-orange-700 active:translate-y-1"}
						onClick={() => handleClick()}
						disabled={(personalDonationAmount >= 1000) || (globalDonationAmount >= 25000)}>
						<div
							className={"transition-all ease-in-out duration-100 absolute left-0 bottom-0 h-2 bg-orange-800 rounded"}
							style={{right: `${100 - ((clicks / 10) * 100)}%`}}/>
						Donate $0.01
					</button>
				</div>

				<div className={"text-2xl font-medium mb-4"}>
					Wanna contribute some more?<br/>
					<a href={"https://give.thetrevorproject.org/give/407873/#!/donation/checkout"} className={"flex items-center transition ease-in-out duration-200 text-lg font-medium text-white/50 hover:text-white"}>
						Donate to The Trevor Project
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				</div>

				<div className={"text-lg font-medium text-white/50 mb-4"}>
					I will donate the funds to The Trevor Project in full (including processing fees) at the end of
					pride month (July 1st). Although there are measures to stop a single person botting the whole
					amount, I kindly ask that you try not to circumvent them and make this an actual community effort :)
					Have a happy pride month and be yourselves! 🏳️‍🌈
				</div>
				<Link href={"/privacy"}>
					<a className={"transition ease-in-out duration-200 text-lg font-medium text-white/50 hover:text-white"}>
						Privacy
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Index;
import * as React from "react";
import Link from "next/link";

const Index = () => {
	return (
		<div className={"text-white/90 flex flex-col items-center pt-24 relative pb-4"}>
			<div className={"fixed left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-[#141b38] to-[#0e0a16] z-0"}/>
			<div className={"z-10 max-w-4xl"}>
				<div className={"text-white text-5xl font-extrabold mb-4"}>
					Happy pride month! 🌈
				</div>
				<div className={"text-2xl font-medium"}>
					<div className={"mb-4"}>
						Thank you all for participating! We only got $91.05 out of the $250, which is honestly less than I expected but I'm still super happy about how this turned out.
					</div>
					<div className={"mb-4"}>
						As promised, all user data has been wiped, and the money will be donated very shortly (I'll put a receipt up here for proof). Thanks for being a part of this stupid ass thing I made!
					</div>
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
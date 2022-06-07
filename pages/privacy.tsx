import * as React from "react";
import Link from "next/link";

const Privacy = () => {
	return (
		<div className={"text-white/90 flex flex-col items-center pt-24 relative pb-4"}>
			<div className={"fixed left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-[#141b38] to-[#0e0a16] z-0"}/>
			<div className={"z-10 max-w-4xl"}>
				<div className={"text-white text-5xl font-extrabold mb-4"}>
					Privacy
				</div>
				<div className={"text-2xl font-medium mb-4"}>
					Hi! Thanks for checking out the privacy policy :) The only information I store about you is a random
					UUID that is generated when you first visit this site, which is used to keep track of how much you
					have donated. I also keep track of IPs in case I need to block somebody who's trying to abuse the
					site. Once this site goes down (July 1st) I will delete all stored user data. If you want me to
					delete your data before that, please contact me on Discord (cylex#2831). Thanks for reading ily {"<3"}
				</div>
				<Link href={"/"}>
					<a className={"transition ease-in-out duration-200 text-lg font-medium text-white/50 hover:text-white"}>
						Home
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Privacy;
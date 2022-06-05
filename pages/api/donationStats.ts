import type {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			const allDonators = await prisma.donator.findMany();
			let totalDonationAmount = 0;
			allDonators.forEach((donator) => {
				totalDonationAmount += donator.donationAmount;
			});
			res.send(totalDonationAmount);
			break;
		default:
			res.status(405).send("Method not allowed");
			break;
	}
};
import type {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../prisma";
import * as requestIp from "request-ip";

const getDonator = async (req: NextApiRequest, res: NextApiResponse) => {
	// check if user is already registered with a cookie
	const cookie = req.cookies.donatorId;
	if (cookie) {
		// get user
		const donator = await prisma.donator.findUnique({
			where: {
				id: cookie
			}
		});
		if (donator) return donator;
	}

	// check if user is already registered by ip
	const ip = requestIp.getClientIp(req);
	let donator = await prisma.donator.findFirst({
		where: {
			ipAddr: ip
		}
	});
	if (donator) return donator;

	// else create profile
	donator = await prisma.donator.create({
		data: {
			ipAddr: ip
		}
	});

	res.setHeader("Set-Cookie", `donatorId=${donator.id}`);
	return donator;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const donator = await getDonator(req, res);

	switch (req.method) {
		case "POST":
			if (donator.donationAmount + 1 > 1000) return res.status(409).send("Hey! You can't do that >:( Stop poking around!!!!!!");
			const allDonators = await prisma.donator.findMany();
			let totalDonationAmount = 0;
			allDonators.forEach((donator) => {
				totalDonationAmount += donator.donationAmount;
			});
			if (totalDonationAmount + 1 > 25000) return res.status(409).send("Donation goal reached!!!! Thanks so much for draining my wallet :D");
			await prisma.donator.update({
				where: {
					id: donator.id
				},
				data: {
					donationAmount: donator.donationAmount + 1
				}
			})
			res.send("Ok");
			break;
		case "GET":
			res.send(donator.donationAmount);
			break;
		default:
			res.status(405).send("Method not allowed");
			break;
	}
};
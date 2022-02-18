const axios = require("axios");
const FB_ENDPOINT = "https://graph.facebook.com/v13.0/search";

exports.getInterests = async (req, res) => {
	try {
		let interestResponse = await axios.get(FB_ENDPOINT, {
			params: {
				access_token: process.env.AUTH_TOKEN,
				class: "interests",
				type: "adTargetingCategory"
			}
		});
		let interestData = interestResponse.data.data;

		let interestStatusResponse = await axios.get(FB_ENDPOINT, {
			params: {
				access_token: process.env.AUTH_TOKEN,
				targeting_option_list: interestData.map((i) => i.id),
				type: "targetingoptionstatus"
			}
		});

		let normalInterestIds = interestStatusResponse.data.data.filter((i) => i.current_status === "NORMAL").map((i) => i.id);
		let normalInterests = interestData
			.filter((i) => normalInterestIds.includes(i.id))
			.map((i) => {
				return { id: i.id, name: i.name, path: i.path };
			});

		res.json({ status: 1, interests: normalInterests });
	} catch (err) {
		console.error(err.response.data);
		res.json({ status: -1, message: "Error fetching data" });
	}
};

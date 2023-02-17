const fs = require("fs");
const dataPath = "./controllers/clickAmount.json";

exports.getClickAmount = async () => {
	const clickAmount = await fs.readFileSync(dataPath, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		const dataInFile = JSON.parse(data);
		return dataInFile;
	});

	return clickAmount;
};

exports.addClickAmount = async (increaseValue = 1) => {
	console.log("addClickAmount invoked");
	// Read the contents of the JSON file
	const fileData = await fs.readFileSync(dataPath, "utf8");
	const jsonData = JSON.parse(fileData);
	jsonData["CLICK_AMOUNT"] = 20;
	// const updatedJsonData = (jsonData["CLICK_AMOUNT"] += increaseValue);
	// console.log({ updatedJsonData });
	fs.writeFile(dataPath, JSON.stringify(jsonData));

	// const updatedFile = await fs.readFileSync(dataPath, "utf8");
	// console.log({ updatedFile });

	// const data = await fs.readFileSync(dataPath, (err, data) => {
	// 	if (err) {
	// 		console.log({ err });
	// 		throw err;
	// 	}

	// 	// Parse the JSON data into a JavaScript object
	// 	const jsonData = JSON.parse(data);

	// 	// Update the value of the specific key
	// 	jsonData["CLICK_AMOUNT"] += increaseValue;

	// 	// Stringify the JavaScript object into JSON format
	// 	const updatedData = JSON.stringify(jsonData, null, 2);

	// 	// Write the updated JSON data to the file
	// 	fs.writeFile(dataPath, updatedData, (err) => {
	// 		if (err) throw err;
	// 		console.log("Data updated successfully!");
	// 		return jsonData["CLICK_AMOUNT"];
	// 	});
	// });
	// return data;
};

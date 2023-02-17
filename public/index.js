const visitedText = document.querySelector("#visit-occurrence");
const clickedText = document.querySelector("#clicked-text");
const addButton = document.querySelector("#add-button");
const resetButton = document.querySelector("#reset-button");

fetch("/get-click")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		const clickAmount = data.clickAmount;
		clickedText.textContent =
			"you clicked add button " + JSON.stringify(clickAmount) + " times";
	});

addButton.addEventListener("click", () => {
	fetch("/update-click", { method: "PUT" })
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const clickAmount = data.clickAmount;
			clickedText.textContent =
				"you clicked add button " + JSON.stringify(clickAmount) + " times";
		});
});

resetButton.addEventListener("click", () => {
	fetch("/reset-click", { method: "DELETE" })
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const clickAmount = data.clickAmount;
			clickedText.textContent =
				"you clicked add button " + JSON.stringify(clickAmount) + " times";
		});
});

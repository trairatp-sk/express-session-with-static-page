const express = require("express");
const app = express();
var parseurl = require("parseurl");
const session = require("express-session");

const port = 4000;

app.use(express.static("public"));

app.use(
	session({
		secret: "mySecret",
		resave: false,
		saveUninitialized: true,
	})
);

app.use(function (req, res, next) {
	if (!req.session.clickAmount) {
		req.session.clickAmount = 0;
	}
	console.log("app's middleware invoked");
	// get the url pathname
	const pathname = parseurl(req).pathname;
	console.log({ pathname });

	if (pathname === "/get-click") {
		req.session.clickAmount;
	}
	if (pathname === "/update-click") {
		req.session.clickAmount += 1;
	}
	if (pathname === "/reset-click") {
		req.session.clickAmount = 0;
	}
	if (pathname === "/") {
		req.session.visit += 1;
	}

	next();
});

app.get("/", (req, res) => {
	const visitedOccurrence = req.session.visit;
	console.log({ clickAmount });
	res.sendFile("/public/index.html");
	res.send(JSON.stringify({ visitedOccurrence: visitedOccurrence }));
});

app.get("/get-click", function (req, res) {
	const clickAmount = req.session.clickAmount;
	console.log({ clickAmount });
	res.send(JSON.stringify({ clickAmount: clickAmount }));
});

app.put("/update-click", function (req, res) {
	const clickAmount = req.session.clickAmount;
	console.log({ clickAmount });
	res.send(JSON.stringify({ clickAmount: clickAmount }));
});

app.delete("/reset-click", function (req, res) {
	const clickAmount = req.session.clickAmount;
	console.log({ clickAmount });
	res.send(JSON.stringify({ clickAmount: clickAmount }));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

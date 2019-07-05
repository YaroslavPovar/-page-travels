const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const url = "https://index.minfin.com.ua/markets/fuel/tm/";

const app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function (req, res) {
	request(url, function (error, response, body) {

		const $ = cheerio.load(body);

		let result = {
			"data": [],
		};

		let header = {
			"gasStation": "",
			"a96": "",
			"a95": "",
			"a92": "",
			"dt": "",
			"lpg": "",
		};

		$("#tm-table table tbody tr").each(function () {
			let tmp = Object.assign({}, header);

			$(this).find("td a").each(function () {
				tmp["gasStation"] = $(this).text();
			});

			$(this).find("td[align='right']").each(function (index) {

				let price = parseFloat($(this).text().replace(",", "."));

				if (!price) {
					price = null;
				}

				switch (index) {
					case 0:
						tmp["a96"] = price;
						break;
					case 1:
						tmp["a95"] = price;
						break;
					case 2:
						tmp["a92"] = price;
						break;
					case 3:
						tmp["dt"] = price;
						break;
					case 4:
						tmp["lpg"] = price;
						break;
					default:
						break;
				}
			});

			result["data"].push(tmp);
		});

		result["data"] = result["data"].splice(1, result["data"].length);

		res.send(result);
	});
});

app.listen(3000, function () {
	console.log("Listen http://localhost:3000/")
});
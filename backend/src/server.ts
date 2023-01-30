import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors());
app.use(
	cors({
		origin: "*",
	})
);

app.get("/parse-logs", (req, res) => {
	fs.readFile("logs.txt", "utf-8", (err, data) => {
		if (err) {
			res.status(500).send({ error: err });
			return;
		}
		const logs = data.split("\n");
		const filteredLogs = logs
			.filter((log) => log.includes("error") || log.includes("warn"))
			.map((log) => {
				const [date, level, message] = log.split(" - ");
				return {
					date,
					level,
					message: JSON.parse(message),
				};
			});
		res.send({ logs: filteredLogs });
	});
});

app.listen(port, () => {
	console.log(`API server listening at http://localhost:${port}`);
});

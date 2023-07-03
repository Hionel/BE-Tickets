import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import ticketsRouter from "./router/tickets-router.js";

dotenv.config();

export const sqlConfig = {
	database: process.env.SQL_DATABASE,
	server: process.env.SQL_SERVER,
	driver: "msnodesqlv8",
	user: process.env.SQL_USER,
	password: process.env.SQL_PASSWORD,
	options: {
		trustedConnection: false,
	},
};
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", ticketsRouter);

app.listen(port, () => {
	console.log(`Server is up and running on http://localhost:${port}`);
});

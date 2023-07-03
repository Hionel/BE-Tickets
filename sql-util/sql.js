import sql from "mssql/msnodesqlv8.js";
import { sqlConfig } from "../server.js";

const sqlConnect = async (queryParameter) => {
	return await sql
		.connect(sqlConfig)
		.then(async (response) => {
			return await response
				.request()
				.query(queryParameter)
				.then((result) => {
					return result;
				});
		})
		.catch((error) => {
			return error;
		});
};

export default sqlConnect;

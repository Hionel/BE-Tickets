import executeSqlQuery from "../sql-util/sql.js";

export const createTicket = async (req, res) => {
	try {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth();
		const yearTrimmed = date.getFullYear().toString().slice(-2);
		const barcode = `${day}${month}${yearTrimmed}0000`;
		const query = `Insert into Tickets (creation_date,validity,barcode) values(getdate(),1,${barcode})`;
		await executeSqlQuery(query);
		return res.status(200).json({
			status: "Success",
			msg: "Ticket created",
		});
	} catch (error) {
		return res.status(400).json({
			status: "Bad request",
			error: error,
		});
	}
};

export const validateTicket = async (req, res) => {
	const ticketID = req.params.id;
	try {
		const query = `Update Tickets set validity = 0, start_time = getdate() where ticket_id = ${ticketID}`;
		await executeSqlQuery(query);
		return res.status(200).json({
			status: "Success",
			msg: "Ticket validated",
		});
	} catch (error) {
		return res.status(400).json({
			status: "Ticket validation encountered an error",
			error: error,
		});
	}
};
export const payTicket = async (req, res) => {
	const ticketID = req.params.id;
	try {
		const pricePerHour = 5;
		const query = ` UPDATE Tickets
    SET
      validity = 1,
      end_time = GETDATE(),
      total = CONVERT(DECIMAL(10, 2), (DATEDIFF(second, start_time, GETDATE())) / 3600.0 * ${pricePerHour})
    WHERE ticket_id = ${ticketID};
  `;

		await executeSqlQuery(query);
		return res.status(200).json({
			status: "Success",
			msg: "Ticket paid",
		});
	} catch (error) {
		return res.status(400).json({
			status: "Ticket validation encountered",
			error: error,
		});
	}
};

export const scanBarcode = async (req, res) => {
	const barcode = req.params.barcode;
	try {
		const query = `Select * from Tickets where barcode = ${barcode}`;
		await executeSqlQuery(query);
		return res.status(200).json({
			status: "Success",
			msg: "Ticket scanned",
		});
	} catch (error) {
		return res.status(400).json({
			status: "Ticket scanning error",
			error: error,
		});
	}
};

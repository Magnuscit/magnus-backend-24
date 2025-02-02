import { Request, Response } from "express";
import { db } from "../../config";
import { Event } from "../queries";

const fetchEvents = async (_req: Request, res: Response): Promise<Response> => {
  const client = await db.connect();
  try {
    const eventsData = await client.query(Event.fetchEvents, []);
    console.log(eventsData);
    return res.status(200).json({
      status: "👍",
      data: eventsData.rows,
      message: "events fetched",
    });
  } catch (e) {
    console.error("Error at fetching events", e);
    return res.status(500).json({
      status: "👎",
      data: null,
      message: "Error at fetching events",
    });
  } finally {
    client.release();
  }
};

const EventControllers = {
  fetchEvents,
};

export default EventControllers;

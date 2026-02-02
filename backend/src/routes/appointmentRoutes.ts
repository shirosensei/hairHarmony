import { Router, Request, Response } from "express";
import Appointment, { IAppointment } from "../models/Appointment";

const router = Router();

// Book an Appointment
router.post("/book", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, date, time, stylist } = req.body;

    const newAppointment: IAppointment = new Appointment({
      name,
      email,
      phone,
      date,
      time,
      stylist,
    });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});


export default router;
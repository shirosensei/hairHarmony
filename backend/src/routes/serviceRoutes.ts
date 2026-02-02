import { Router, Request, Response } from "express";
import Service from "../models/Service";

const router = Router();

// const services = [
//   {
//     id: 1,
//     name: "Haircut",
//     duration: "30 minutes",
//     price: "$50",
//   },
//   { id: 2, name: "Coloring", duration: "1 hour", price: "$60" },
//   { id: 3, name: "Styling", duration: "45 mins", price: "$40" },
//     { id: 4, name: "Extensions", duration: "2 hours", price: "$200" },
//     { id: 5, name: "Keratin Treatment", duration: "1 hour", price: "$150" },
//     { id: 6, name: "Updo", duration: "1 hour", price: "$70" },
//     { id: 7, name: "Balayage", duration: "2 hours", price: "$120" },
//     { id: 8, name: "Highlights", duration: "1 hour", price: "$80" },
//     { id: 9, name: "Perm", duration: "2 hours", price: "$100" },
//     { id: 10, name: "Relaxer", duration: "1 hour", price: "$90" },
//     { id: 11, name: "Waxing", duration: "30 minutes", price: "$30" },
//     { id: 12, name: "Facial", duration: "45 minutes", price: "$50" },
//     { id: 13, name: "Manicure", duration: "1 hour", price: "$40" },
//     { id: 14, name: "Pedicure", duration: "1 hour", price: "$50" },

// ];

// Fetch all services

router.get("/", async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

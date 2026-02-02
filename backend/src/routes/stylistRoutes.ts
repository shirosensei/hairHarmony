import { Router, Request, Response } from "express";
import Stylist from "../models/Stylist";

const router = Router();

//* Fetch all stylists
router.get("/", async (req: Request, res: Response) => {
  const stylists = await Stylist.find();

  res.json(stylists);
});

// Fetch a single stylist
router.get("/:id", (req: Request, res: Response) => {
  const stylist = Stylist.find(
    (s: { id: number }) => s.id === parseInt(req.params.id)
  );
  if (stylist) {
    res.json(stylist);
  } else {
    res.status(404).json({ message: "Stylist not found" });
  }
});

export default router;

import express from "express";
import { getChunkSegment, stream } from "../controllers/streamController.js";

const router = express.Router();
router
  .get("/video/:judul/:type", stream)
  .get("/video/:judul/:quality/:segment", getChunkSegment);

export { router };

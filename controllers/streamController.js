import { readFile } from "node:fs";
import { promises as fsPromises } from "node:fs";
import path from "node:path";

const stream = async (req, res) => {
  const { type, judul } = req.params;
  const pathname = `./stream/${judul}/${type}`; //
  const dash = readFile(pathname, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.writeHead(200, {
      "Content-Type": "application/dash+xml",
      Connection: "keep-alive",
    });
    res.write(data);
    res.end();
  });
};
const getChunkSegment = async (req, res) => {
  const { quality, segment, judul } = req.params;
  const dashPath = `./stream/${judul}/${quality}/${segment}`;
  try {
    const data = await fsPromises.readFile(dashPath);
    const contentType =
      path.extname(segment) === ".mpd" ? "application/dash+xml" : "video/webm";

    res.writeHead(200, {
      "Content-Type": contentType,
      Connection: "keep-alive",
    });

    res.write(data);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
export { stream, getChunkSegment };

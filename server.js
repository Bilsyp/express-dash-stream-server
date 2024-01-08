import express from "express";
import cors from "cors";
import { readFile } from "node:fs";
import { promises as fsPromises } from "node:fs";
import path from "node:path";
import http from "node:http";

const app = express();
const server = http.createServer(app);
app.use(cors());

//  todo playlist.mpd sebagai inisiasi awal pada player

app.get("/stream/playlist.mpd", (req, res) => {
  const pathname = req.url;
  const filetype = pathname.substr(1).split(".")[1];

  const dash = readFile(pathname.substr(1), (err, data) => {
    if (filetype == "mpd") {
      res.writeHead(200, {
        "Content-Type": "application/dash+xml",
        Connection: "keep-alive",
      });
      res.write(data);
    }
    res.end();
  });
});

// todo handle stream request dari berbagai quality dan audio

app.get("/stream/:quality/:segment", async (req, res) => {
  const { quality, segment } = req.params;
  const dashPath = `./stream/${quality}/${segment}`;

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
});
app.get("/stream/ping", (req, res) => {
  res.status(200).json({
   status: 200,
   headers: {
     "Cache-Control": "no-store",
   },
 });
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});

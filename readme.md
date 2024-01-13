# MPEG-DASH Streaming Server

This repository contains a simple Node.js server using Express to handle MPEG-DASH streaming requests. It serves DASH manifest (playlist.mpd) and video segments of different qualities.

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
```

#### 2. Install dependencies

```bash
npm install
```

#### Usage

```bash
npm run dev
```

### Endpoints

### 1. DASH Manifest

- **Endpoint** : /stream/playlist.mpd
- **Description** : Serves the DASH manifest for initializing the player.
- **Content-Type** : application/dash+xml

### 2. Video Segments

- **Endpoint** : /stream/:quality/:segment
- **Description** : Serves video segments based on quality and segment information.
- **Parameters** :

  - quality - Video quality (e.g., 720p, 1080p).
  - segment - Segment file name.

- **Content-Type**: video/webm

### Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.

- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing).
- **Node.js built-in modules**: fs, http, path.

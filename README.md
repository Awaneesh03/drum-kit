<div align="center">

# 🥁 Neon Drum Kit

**Play a full drum kit in your browser with your keyboard or mouse — wrapped in a neon cyberpunk theme.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## ✨ Features

- 🎹 **Keyboard & mouse / touch** — hit a key or click a drum to play it
- ⚡ **Instant re-trigger** — sounds are preloaded and can overlap, so fast rolls work
- 💥 **Visual feedback** — ripple animation and glow flash on every hit
- 🌌 **Neon cyberpunk UI** — glowing buttons, pulsing animations and an animated particle background on `<canvas>`
- 📱 **Responsive** — works on desktop and mobile

## ⌨️ Controls

| Key | Sound |
|:---:|---|
| `W` | Tom 1 |
| `A` | Tom 2 |
| `S` | Tom 3 |
| `D` | Tom 4 |
| `J` | Snare |
| `K` | Crash |
| `L` | Kick bass |

## 🚀 Run Locally

No build step needed.

```bash
git clone https://github.com/Awaneesh03/drum-kit.git
cd drum-kit
python3 -m http.server 8000   # → http://localhost:8000
```

> Tip: use a local server rather than opening the file directly — some browsers block audio on `file://` pages.

## 📁 Project Structure

```text
drum-kit/
├── index.html     # Drum layout + background canvas
├── style.css      # Neon theme & animations
├── index.js       # Audio playback, key/pointer handling, ripple + particle effects
├── images/        # Drum artwork
└── sounds/        # Drum samples (.mp3)
```

## 🧠 What I Learned

- Handling `keydown` and pointer events and mapping them to the same action
- Preloading and cloning `Audio` objects for low-latency, overlapping playback
- Building a lightweight particle animation with the Canvas API

---

## License

Released under the [MIT License](LICENSE).

## 👤 Author

**Awaneesh Gupta** — B.Tech CSE (AI) @ Vedam School of Technology

[![GitHub](https://img.shields.io/badge/GitHub-Awaneesh03-181717?style=flat-square&logo=github)](https://github.com/Awaneesh03)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-awaneesh--gupta-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/awaneesh-gupta)

<p align="center"><sub>If you found this project useful, consider giving it a ⭐</sub></p>

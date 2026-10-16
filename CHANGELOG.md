# Changelog

All notable changes to the J.A.R.V.I.S. AI OS project are documented in this file.

## [v3.2.5] - 2026-10-16
### Added & Enhanced
- **Tactical Hologram Communications Link (`#call-overlay`)**: Built an encrypted direct satellite video and audio communication module modeled after the Stark Industries Mark XLVII comms interface. Supports direct routing via `/api/calls/call`.
- **Widescreen Crystal Clear Video Stage**: Expanded `.call-card` width to `540px` and `.video-call-feeds` height to `310px` (`border-radius: 14px`), removing dark vignetting, scanline filters, and intrusive corner target brackets across the face area for a pristine, cinematic camera view.
- **Top-Right HUD Timer Overlay**: Embedded the live duration timer (`🕒 00:00`) directly inside the top-right corner of the video container (`position: absolute; top: 12px; right: 14px; z-index: 10`), eliminating awkward dead space above the feed and preserving real-time ticking clock synchronization.
- **Stark Tactical HUD Identity Banner**: Redesigned `.participant-name` with dual vertical cyan pillars (`border-left: 2px solid #00f0ff; border-right: 2px solid #00f0ff;`), glowing diamond reticles (`◈ TONY STARK (DIRECT SATELLITE) ◈`), glassmorphic backdrop glow, and glowing Orbitron title typography.
- **Master PIN `2710` Manual Bypass Protocol**: Upgraded emergency lockscreen passcode fallback to Master PIN `2710`. Requires explicit user execution via the **BYPASS** button or `Enter` key, completely eliminating 4-digit auto-bypass latency and accidental triggers.
- **Voice Avatar Concentric Waves**: Smooth audio fallback mode displaying animated concentric ripple rings (`ring-1`, `ring-2`, `ring-3`) and live bouncing voice frequency wave bars when video link is suspended or in audio-only mode.
- **Identity Photo Optimization & Sync**: Added client-side HTML5 Canvas 256x256 avatar cropping with seamless backend database persistence via `POST /api/auth/update-avatar`.

## [v3.2.0] - 2026-09-15
### Added & Fixed
- **Holographic Fullscreen Code Modal**: Integrated a dedicated expand/zoom icon (`fa-expand`) next to code block copy buttons with full-screen holographic viewer (`#code-zoom-overlay`).
- **Return Code Compiler Validation**: Refactored `code_helper.py` to validate executions using process exit status (`returncode == 0`) eliminating false positives.
- **Brand Shortcuts & SVG Vectors**: Added Google Gemini and EdClub typing portal links with high-fidelity brand colors.
- **Jumping Hover Animations**: CSS translation support for SVG elements and images within quick launch grid.
- **Robust .NET GDI Screen Capture**: Replaced clipboard keypress fallback with native PowerShell Windows `.NET` GDI `CopyFromScreen` API.
- **Direct AI Image Generation**: Integrated Pollinations AI generator endpoint in `ai.js` with 1-click download button.
- **Explicit IPv4 Loopback Routing**: Configured frontend client to route explicitly to `http://127.0.0.1:5000`.

## [v3.0.0] - 2026-06-30
### Added
- Redesigned holographic Stark HUD web interface.
- Split Python endpoints into `api/` and `automation/` blueprints.
- Reorganized codebase tree structures.
- Multi-Model Quota Failover (`gemini-2.0-flash`, `gemini-flash-latest`).
- Alternating 3D core diagnostic rings and telemetry monitor.
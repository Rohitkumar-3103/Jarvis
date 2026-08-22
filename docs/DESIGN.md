---
name: Tactical Intelligence Interface
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ffb4a8'
  on-secondary: '#690001'
  secondary-container: '#ce0305'
  on-secondary-container: '#ffdcd7'
  tertiary: '#fdf3ff'
  on-tertiary: '#480081'
  tertiary-container: '#e9d0ff'
  on-tertiary-container: '#8523dd'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930002'
  tertiary-fixed: '#efdbff'
  tertiary-fixed-dim: '#dcb8ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#6700b5'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  protocol-gold: '#ffd700'
  secure-green: '#00ff41'
  dim-cyan: rgba(0, 240, 255, 0.15)
  glass-surface: rgba(10, 10, 10, 0.65)
typography:
  system-header:
    fontFamily: Orbitron
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 120%
    letterSpacing: 0.1em
  system-header-mobile:
    fontFamily: Orbitron
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 120%
    letterSpacing: 0.08em
  data-mono-lg:
    fontFamily: Share Tech Mono
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 100%
  data-mono-md:
    fontFamily: Share Tech Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 140%
  data-mono-sm:
    fontFamily: Share Tech Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 140%
  ui-body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 150%
  ui-label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 120%
    letterSpacing: 0.05em
  telemetry-label:
    fontFamily: Share Tech Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 100%
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-unit: 8px
  gutter: 16px
  margin-safe: 24px
  panel-padding: 12px
  dock-gap: 12px
---

## Brand & Style
The design system embodies the persona of a high-functioning tactical assistant—authoritative, predictive, and ultra-sophisticated. It is engineered for the "Power User" archetype, prioritizing real-time telemetry, biometric security visuals, and high-density data streams. 

The aesthetic is **Holographic HUD (Heads-Up Display)**, blending elements of **Glassmorphism** and **Technical Futurism**. It utilizes deep matte backgrounds to make neon light-source elements feel as if they are projected onto glass. The interface is characterized by "Light as Depth," where hierarchy is defined by glow intensity and translucency rather than traditional shadows. Every UI element should feel like a piece of military-grade hardware translated into a digital projection.

## Colors
The palette is rooted in the "Mark XLVII" signature aesthetic. **Mark XLVII Cyan** is the primary signal color, used for core interactions, active states, and primary data readouts. **Stark Armor Crimson** is reserved strictly for thermal alerts, critical system failures, and unauthorized access warnings. **Cognitive Violet** serves as the indicator for AI processing and neural-link computations. **House Protocol Gold** is used for executive-level overrides and authentication success.

The background is a deep **#0a0a0a** matte black. To maintain the HUD effect, use `dim-cyan` for grid overlays and structural guide lines. Surfaces should never be fully opaque; use `glass-surface` with a backdrop blur to simulate projection on glass panels.

## Typography
The typographic strategy uses a three-tier approach to balance atmosphere and utility. 
- **Orbitron** is the display face, used for high-level system branding and major modal headers. It should always be used with increased letter spacing for a technical, cinematic feel.
- **Share Tech Mono** is the "engine" of the UI. Use this for all variable data, telemetry, timestamps, and terminal logs. It represents the "raw data" layer of the OS.
- **Inter** provides the necessary legibility for complex settings and communication bubbles. It serves as the "human-readable" layer.

For mobile, reduce `system-header` sizes by roughly 25% and ensure all `data-mono` elements maintain a minimum size of 12px for legibility against high-contrast backgrounds.

## Layout & Spacing
This design system utilizes a **Fixed-Grid HUD** model. The layout is divided into a three-column dashboard:
- **Left (Diagnostics):** Real-time system health and application shortcuts.
- **Center (Core):** Focus area for the Arc Reactor status and primary command input.
- **Right (Telemetry):** Communication logs, environmental data, and secondary widgets.

The spacing rhythm is built on an **8px grid unit**. Layouts should prioritize high information density while maintaining "visual breathing room" through the use of hairline dividers and grid overlays. On mobile, the three-column grid collapses into a single-column scrollable stack, with the "Core" element remaining visible in a persistent top or bottom dock.

## Elevation & Depth
Depth is achieved through **Tonal Stacking** and **Holographic Glows**. There are four primary layers of depth:
1. **The Void:** The base matte black background.
2. **The Grid:** A low-opacity (#00f0ff at 10%) scanline or pixel-grid texture that sits just above the background.
3. **The Glass:** Semi-transparent containers (`glass-surface`) with a 12px backdrop-blur. These represent the physical interface panels.
4. **The Projection:** Neon text and icons that emit a 5px to 15px outer glow in their respective brand colors. 

Avoid using black shadows. Instead, use "inner glows" on panels to suggest a thickness to the glass and "outer glows" on active elements to suggest light emission.

## Shapes
The shape language is primarily **Industrial and Angular**. Most containers use a "Soft" roundedness (4px) to avoid looking dated, but they are often accented by "Scanner Corners"—bracket-like SVG borders that frame the corners of a panel without enclosing it fully. 

Action buttons and chips should utilize a **Pill-shape (rounded-xl)** for tactile comfort, while data cards and terminal windows should remain strictly rectangular or slightly softened. Use dashed stroke lines for secondary structural elements to mimic architectural blue-prints.

## Components
- **Buttons:** Use a glass-fill with a primary cyan border. On hover, the fill opacity should increase, and the outer glow should intensify.
- **Status LEDs:** Small circular elements. They should pulse slowly (2s duration) when in "Active" or "Warning" states.
- **Scanner Corners:** Hairline brackets (1px width) positioned at the four corners of high-priority panels.
- **Input Fields:** Bottom-border only, using `Share Tech Mono`. The cursor should be a solid cyan block that blinks.
- **Arc Reactor (Core Node):** A multi-ringed circular component in the center of the UI. Rings should rotate at varying speeds to indicate CPU load.
- **Progress Bars:** Segmented bars rather than solid fills. Each segment represents a data packet.
- **Telemetry Cards:** Small panels containing a `telemetry-label` at the top-left and `data-mono-lg` value in the center, framed by a subtle grid texture.

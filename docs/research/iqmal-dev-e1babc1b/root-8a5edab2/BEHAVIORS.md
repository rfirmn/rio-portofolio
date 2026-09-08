# Interaction & Behavior Bible: Homepage (/)

- **Source URL**: `https://iqmal.dev/`
- **Destination Route**: `/` (`src/app/page.tsx`)

## 1. Staggered Menu Navigation
- **Trigger**: Click on `.sm-toggle` button in fixed header.
- **Prelayer Animation**:
  - Layer 1 (Sage green `#aeb8b0`): Translates from `translateX(100%)` to `translateX(0)` with 0ms delay.
  - Layer 2 (Slate `#3d403f`): Translates to `translateX(0)` with 100ms delay.
  - Main Panel (`#1e1e1e`): Translates to `translateX(0)` with 200ms delay.
- **Toggle Button State**:
  - Text scrolls up 1em ("Menu" -> "Close")
  - Plus icon crosses over into an 'X' by rotating lines 45deg and -45deg.
- **Item Stagger**:
  - Each list item has `transitionDelay: 250ms + index * 50ms`, translating from `translateY(30px)` to `translateY(0)` with opacity fade-in.

## 2. Hero Section
- **Typewriter Effect**:
  - Types out "Full-Stack Web Developer" at 90ms per character.
  - Cursor `█` pulses with `text-type-cursor-blink` keyframe every 0.8s.
- **3D Card Perspective Tilt**:
  - Container has `perspective: 1200px`.
  - Mouse movement over card calculates delta from center: `rotateX(-8deg to 8deg)` and `rotateY(-8deg to 8deg)`.
  - Resets to `(0, 0)` smoothly on mouse leave.
- **Portrait Grayscale Hover**:
  - Default image filter is `grayscale(100%)`.
  - On card hover, transitions to full color over 700ms.
- **Availability Radar**:
  - Floating pill `@fthliqml` contains emerald green pulsing dot with an expanding `animate-ping` ripple effect.

## 3. About Section
- **Infinite Marquee**:
  - CSS keyframe `@keyframes marquee { 0% { transform: translate(0); } to { transform: translate(-50%); } }`
  - Runs continuously at 25s linear duration.
  - Pauses on mouse hover (`animation-play-state: paused`).

## 4. Experience Section
- **Carousel Controls**:
  - Displays one active experience card at a time with smooth crossfade and transition.
  - Prev/Next circular buttons cycle through 3 entries: Komatsu Remanufacturing Asia, ITK, and Binar Academy.
  - Interactive pill indicator dots reflect active index.

## 5. Projects Section
- **Image Gallery Slider**:
  - Interactive arrows switch between multi-screen mockups (e.g. Dashboard Overview -> Training Schedule -> Course Detail).
  - Caption and counter update dynamically (`01 / 03 · Dashboard Overview`).
  - Next Project button cycles to the next featured project.

## 6. Footer Real-Time Clock
- **WIB Digital Clock**:
  - Displays live Western Indonesian Time (`Asia/Jakarta`, UTC+7) formatted as `HH:mm:ss WIB`.
  - Automatically updates every 1000ms.

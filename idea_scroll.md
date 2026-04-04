# Scroll Experience Strategy — Shreshth Portfolio (3D Edition)

## Experience Vision

A **3D immersive portfolio** where the scroll drives a cinematic journey through a 3D scene. Not a flat website with 3D elements bolted on — the 3D IS the experience.

Think: flying through a dark digital space, where your projects, skills, and experience float as 3D objects you scroll past. Like a museum tour through your career, but in space.

---

## Inspiration Analysis

| Site | What to Steal |
|------|---------------|
| activetheory.net | Buttery scroll feel, cinematic pacing |
| obys.agency | Preloader as storytelling, text mask reveals |
| dogstudio.co | WebAssembly-level performance, device-aware |
| igloo.inc | 3D integrated with scroll, depth of field |
| immersive-garden.vercel.app | Three.js + scroll storytelling |

---

## 1. 3D Strategy

### Approach: **React Three Fiber + Drei + GSAP ScrollTrigger**

NOT a full 3D replacement of the site. Instead:

| Layer | Content | Tech |
|-------|---------|------|
| **Background** | 3D particle field / floating geometry that reacts to scroll | R3F + custom shaders |
| **Midground** | HTML sections overlaid on top of 3D canvas | Normal React + Tailwind |
| **Foreground** | Interactive 3D elements per section | R3F components |

This hybrid approach means:
- 3D canvas runs behind the entire page as a fixed background
- HTML content floats on top (readable, accessible, SEO-friendly)
- Scroll position drives both HTML animations AND 3D scene changes
- Best of both worlds: immersive 3D + functional portfolio

### 3D Scene Concept

**"Digital Neural Space"** — a dark void with:
- **Floating particles** that drift slowly (like stars/neurons)
- Particles connected by faint lines (neural network feel)
- **Glowing orbs** that represent each section
- Scroll moves the camera forward through this space
- Each section has its own 3D accent:
  - Hero: Large glowing sphere pulsing behind the name
  - Experience: Floating wireframe cubes rotating slowly
  - Projects: Holographic card frames in 3D space
  - Footer: Particles converge into a tight cluster

### 3D AI Robot Character (Centerpiece)

A **low-poly AI robot** floating in the particle field — the visual mascot of the portfolio. Not a generic robot, but a stylized, minimal, glowing figure that represents "automation engineer."

**Design:**
- Geometric/low-poly style (fits dark minimal aesthetic)
- Glowing edges (emissive wireframe lines)
- Floating slightly, bobbing up/down (idle animation)
- Head tracks mouse cursor (looks where you point)
- Eyes glow with accent color (indigo/purple pulse)

**Scroll Behavior:**
| Scroll Position | Robot State |
|---|---|
| Hero (0-15%) | Robot floating center-right, idle bobbing, eyes glow |
| About (15-30%) | Robot turns to face the about text, waves hand |
| Experience (30-50%) | Robot shrinks slightly, orbits to the side |
| Projects (50-75%) | Robot gestures toward project cards |
| Footer (90-100%) | Robot waves goodbye, particles converge around it |

**Implementation Options:**
1. **GLB/GLTF Model** — Use a free low-poly robot from Sketchfab/ReadyPlayerMe, loaded via `useGLTF` from Drei. Best visual quality, easiest to animate.
2. **Procedural geometry** — Build from primitives (sphere head, cylinder body, box arms). Full control, zero file download, but less polished.
3. **Mixamo animated** — If we want walk/wave/gesture animations, export from Mixamo with humanoid rig.

**Recommended: Option 1** — Free GLB model (~200-500KB) + custom shaders for the glow effect. Animated with GSAP or R3F `useFrame`.

### What Makes It "3D Portfolio" vs "Portfolio with 3D"
- The camera MOVES on scroll — you're traveling through the scene
- Particles react to mouse position (subtle drift)
- Each section has depth — elements at different Z distances
- Background isn't static — it evolves as you scroll
- Transitions between sections feel like moving through space

---

## 2. Tech Stack

| Layer | Choice | Size | Reason |
|-------|--------|------|--------|
| Framework | **Next.js 16** | existing | SSR, routing, images |
| 3D Engine | **React Three Fiber** | ~45KB | React wrapper for Three.js |
| 3D Helpers | **Drei** | ~15KB | Prebuilt R3F components |
| 3D Post-processing | **@react-three/postprocessing** | ~10KB | Bloom, noise, vignette |
| Smooth Scroll | **Lenis** | ~4KB | Buttery scroll synced to 3D |
| Animation | **GSAP + ScrollTrigger** | ~30KB | HTML animation choreography |
| Styling | **Tailwind CSS v4** | existing | Rapid UI |
| Fonts | **Instrument Serif + Inter** | existing | Typography |

### New Dependencies
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap lenis
```

---

## 3. Scroll System

### Lenis Config (synced to both GSAP and R3F)
```
smoothness: 0.07
lerp: 0.1
duration: 1.4
wheelMultiplier: 0.7
touchMultiplier: 1.5
```

### How Scroll Drives Everything
```
Scroll Position (0% → 100%)
    │
    ├── Lenis (smooth interpolation)
    │       │
    │       ├── GSAP ScrollTrigger (HTML animations)
    │       │     ├── Text reveals
    │       │     ├── Section pins
    │       │     └── Fade/slide/parallax
    │       │
    │       └── R3F useFrame (3D scene updates)
    │             ├── Camera Z position
    │             ├── Particle field drift
    │             ├── Orb scale/glow
    │             └── Post-processing intensity
    │
    └── Scroll Progress (0→1) stored in React ref
        (shared between GSAP and R3F — single source of truth)
```

---

## 4. Page Architecture

```
<LenisProvider>
  <!-- Fixed 3D Canvas (behind everything) -->
  <Canvas style="position:fixed; inset:0; z-index:0">
    <ParticleField />         <!-- Floating neural particles -->
    <ScrollCamera />          <!-- Camera moves on scroll -->
    <SectionOrbs />           <!-- Glowing orbs per section -->
    <PostProcessing />        <!-- Bloom + vignette -->
  </Canvas>

  <!-- HTML Content (on top of 3D) -->
  <main style="position:relative; z-index:1">
    <Preloader />
    <HeroSection />           <!-- 3D: large pulsing sphere -->
    <AboutSection />          <!-- 3D: particle density increases -->
    <StatsSection />          <!-- 3D: floating number geometry -->
    <ExperienceSection />     <!-- 3D: wireframe cubes -->
    <FeaturesSection />       <!-- 3D: pinned, orb zooms in -->
    <ProjectsSection />       <!-- 3D: holographic frames -->
    <IntegrationsSection />   <!-- 3D: connected nodes -->
    <Footer />                <!-- 3D: particles converge -->
  </main>

  <CommandPalette />
  <AiChatBubble />
</LenisProvider>
```

---

## 5. Section-by-Section 3D + Animation Plan

### 5.0 Preloader
- Black screen, "Shreshth." in center
- 0→100 counter (GSAP)
- 3D: particles generate and scatter outward
- On complete: screen wipes up, 3D scene revealed

### 5.1 Hero
**HTML animations:**
- Name: character stagger from bottom (GSAP)
- Subtitle: line clip reveal
- CTAs: scale up with delay
- Nav: slide down from top

**3D:**
- Large glowing sphere (radius ~3) behind hero text
- Sphere pulses slowly (scale 1↔1.05, 2s cycle)
- Particles orbit the sphere loosely
- On scroll: sphere scales down, camera pushes forward

### 5.2 About
**HTML:** Line-by-line mask reveal on heading, image scale-in
**3D:** Particle density increases around this section, warm glow

### 5.3 Stats
**HTML:** Numbers count up with GSAP, border draw animation
**3D:** Small floating number geometries (3D text or cubes)

### 5.4 Experience
**HTML:** Card stagger slide-up, tag reveals
**3D:** Wireframe cubes rotate slowly at different Z depths

### 5.5 Features (PINNED)
**HTML:** Section pins, heading reveals, description fades in
**3D:** An orb slowly zooms toward camera during pin

### 5.6 Projects
**HTML:** Card clip-path reveals, image parallax within cards
**3D:** Holographic rectangular frames float in space (project outlines)

### 5.7 Integrations (PINNED)
**HTML:** Section pins briefly, icons stagger in
**3D:** Connected node network appears (lines between particles)

### 5.8 Footer
**HTML:** "Let's Talk." character stagger
**3D:** All particles converge into a single bright point

---

## 6. 3D Components to Build

| Component | Purpose | Complexity |
|-----------|---------|------------|
| `Scene3D.tsx` | Main canvas wrapper with camera + lights | Medium |
| `ParticleField.tsx` | Floating particles (instanced mesh) | Medium |
| `ScrollCamera.tsx` | Camera Z position driven by scroll | Simple |
| `GlowOrb.tsx` | Pulsing glowing sphere for hero | Simple |
| `PostEffects.tsx` | Bloom + vignette + noise | Simple |
| `FloatingGeometry.tsx` | Rotating wireframes for sections | Simple |
| `AiRobot.tsx` | Low-poly AI robot character with idle + scroll animations | Medium-High |

### Performance-Critical Decisions
- **Instanced Mesh** for particles (1 draw call for 500+ particles)
- **No shadows** (expensive, unnecessary in dark scene)
- **Low-poly geometry** (icosahedron, not sphere with 64 segments)
- **Bloom via post-processing** (cheaper than per-object glow)
- **Particles: 300-500 max** (sweet spot for visual impact vs FPS)
- **Mobile: reduce to 150 particles**, disable post-processing
- **requestAnimationFrame** capped to 60fps

---

## 7. GSAP Animation Plan (HTML layer)

### Utilities to Build

| Utility | Method |
|---------|--------|
| Text line reveal | Custom text splitter → `clipPath: inset(100% 0 0 0)` → `inset(0)` |
| Char stagger | Split chars → `y:40, opacity:0` → `y:0, opacity:1` |
| Parallax | `ScrollTrigger scrub:true` → `yPercent` |
| Pin section | `ScrollTrigger pin:true, end: "+=100%"` |
| Scale reveal | `scale:0.85, opacity:0` → `scale:1, opacity:1` |
| Draw line | `scaleX:0` → `scaleX:1` (border animation) |

### Timing Reference

| Animation | Duration | Ease |
|-----------|----------|------|
| Preloader | 2.5s | power2.inOut |
| Char stagger | 1.5s | expo.out |
| Line reveal | 1.2s/line | power3.out |
| Card stagger | 0.8s | power2.out |
| Pin scroll | 100vh | — |
| Parallax | scrub | linear |
| 3D transitions | continuous | — |

---

## 8. Performance Plan

### FPS Targets
- Desktop: 60fps (3D + scroll + animations)
- Tablet: 60fps (reduced particles, no post-processing)
- Mobile: 60fps (minimal 3D, 150 particles, no bloom)

### Device Detection Strategy
```ts
const isMobile = window.innerWidth < 810;
const isLowPower = navigator.hardwareConcurrency <= 4;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) → disable all 3D, use simple fades
if (isMobile || isLowPower) → 150 particles, no post-processing
else → full experience (500 particles + bloom + vignette)
```

### GPU Rules
- Only animate `transform` and `opacity` in HTML
- 3D: use `BufferGeometry` + `InstancedMesh`
- No real-time shadows
- Textures: compressed, power-of-2 sizes
- Dispose geometries/materials on unmount

### Lighthouse Target: 85+ (3D sites typically score 70-85)

---

## 9. File Structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── Scene3D.tsx           # Canvas + camera + lights
│   │   ├── ParticleField.tsx     # Neural particle system
│   │   ├── GlowOrb.tsx          # Hero pulsing sphere
│   │   ├── FloatingGeometry.tsx  # Section accent meshes
│   │   ├── AiRobot.tsx          # NEW: 3D AI robot character
│   │   ├── PostEffects.tsx       # Bloom + vignette
│   │   └── ScrollCamera.tsx      # Scroll-driven camera
│   ├── animations/
│   │   ├── ScrollReveal.tsx      # Keep (fallback)
│   │   ├── TextReveal.tsx        # NEW: GSAP line reveal
│   │   ├── CharStagger.tsx       # NEW: GSAP char stagger
│   │   ├── Parallax.tsx          # NEW: Scroll parallax
│   │   └── Preloader.tsx         # NEW: Loading screen
│   ├── sections/                  # Existing (enhanced)
│   ├── layout/                    # Existing
│   └── ui/                        # Existing
├── lib/
│   ├── gsap-init.ts              # GSAP registration
│   ├── lenis-provider.tsx        # Smooth scroll context
│   ├── scroll-store.ts           # Shared scroll progress ref
│   └── text-splitter.ts          # Custom text split utility
└── app/
    ├── layout.tsx                 # Add LenisProvider + Scene3D
    └── page.tsx                   # Add Preloader
```

---

## 10. Implementation Order

1. Install deps (`three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `lenis`)
2. Lenis provider + GSAP init
3. Scene3D canvas with ParticleField (visual foundation)
4. ScrollCamera (scroll drives camera)
5. GlowOrb for hero
6. PostEffects (bloom)
7. Preloader
8. GSAP text animations (TextReveal, CharStagger)
9. Section-by-section enhancement
10. Performance tuning + mobile fallbacks

---

## Summary

This is a **hybrid 3D portfolio** — not a WebGL-only site, but a layered experience:

- **Layer 0 (back):** Three.js canvas with particles, orbs, geometry
- **Layer 1 (mid):** HTML sections with GSAP scroll animations
- **Layer 2 (front):** UI overlays (chat, command palette)

The 3D doesn't replace the content — it **elevates** it. Every particle, every orb, every camera movement is driven by scroll position. The result feels like scrolling through a living, breathing digital space.

**No static backgrounds. No flat transitions. The whole page is alive.**

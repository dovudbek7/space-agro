# Scroll-to-Top with Lenis + React Router v6 + Framer Motion - Technical Deep Dive

## The Problem Explained

When using **Lenis smooth scrolling** with **React Router v6** and **Framer Motion** page transitions, the scroll position doesn't reset because:

1. **Lenis hijacks scroll**: `window.scrollTo()` doesn't work because Lenis manages its own internal scroll state
2. **Timing conflicts**: ScrollToTop fires AFTER routes change, but animation/DOM updates are still happening
3. **Double handlers**: Having scroll logic in multiple places (Main.jsx + ScrollToTop component) creates race conditions
4. **Layout vs Routes hierarchy**: The ScrollToTop component is OUTSIDE the layout, so Lenis might not be initialized yet

## The Solution Architecture

```
AnimatedRoutes
  └── Routes
        └── Main (Layout) ← Lenis initialized HERE
              ├── Navbar
              ├── Outlet (Route content)
              │    └── PageTransition (300ms animation)
              └── Footer
```

**Key principle**: The scroll-to-top logic MUST run in the Layout (Main.jsx), not outside routes, because:

- Lenis instance is created in Main.jsx
- We have guaranteed access to `window.lenis`
- It's a single, consistent place to handle all scroll resets

## How It Works: Timing Diagram

```
User clicks link to /contact-us
│
├─ [0ms] useScrollToTop hook detects pathname change
│
├─ [0ms] Synchronous scroll happens IMMEDIATELY
│        ├─ window.scrollTo(0, 0)
│        ├─ lenis.stop() ← Stops any ongoing animation
│        └─ lenis.scrollTo(0, { immediate: true }) ← No smoothing
│
├─ [0.5ms] requestAnimationFrame executes (ensures DOM ready)
│          └─ Repeats scroll for cross-browser safety
│
├─ [0ms] setTimeout (microtask) also queues scroll
│
└─ [0-300ms] Framer Motion exit/enter animation happens
             └─ Page is already scrolled to top!
```

## Why This Works (The Bulletproof Approach)

### 1. **Multiple Scroll Methods (Fallback Strategy)**

```javascript
// Native scroll APIs (handles browser defaults)
window.scrollTo(0, 0)
document.documentElement.scrollTop = 0
document.body.scrollTop = 0

// Lenis-specific scroll (handles smooth scroll library)
window.lenis.stop() // Stop animation first
window.lenis.scrollTo(0, { immediate: true }) // Bypass smoothing
```

Why multiple methods?

- Some browsers/libraries respond to `window.scrollTo()`
- Others need `document.documentElement.scrollTop`
- Lenis requires its own API to work properly

### 2. **Multiple Execution Timings (Concurrency Strategy)**

```javascript
// Immediate (sync)
scrollToTopSync()

// requestAnimationFrame (waits for paint)
requestAnimationFrame(() => scrollToTopSync())

// setTimeout 0 (microtask queue)
setTimeout(() => scrollToTopSync(), 0)
```

Why multiple timings?

- **Sync**: Catches the immediate scroll request
- **RAF**: Waits for browser to be ready
- **setTimeout 0**: Ensures nothing else is blocking

### 3. **Single Source of Truth**

Instead of:

```javascript
// ❌ BAD: Scroll logic in Main.jsx
useEffect(() => {
  window.lenis.scrollTo(0, { immediate: true })
}, [location.pathname])

// ❌ BAD: AND scroll logic in ScrollToTop component
useEffect(() => {
  window.scrollTo(0, 0)
}, [pathname])
```

We have:

```javascript
// ✅ GOOD: One custom hook used in Main.jsx
useScrollToTop()
```

This prevents:

- Race conditions
- Double scroll calls
- Conflicting scroll animations

## File Structure

```
src/
├── hooks/
│   └── useScrollToTop.js         ← NEW: Custom hook
├── components/
│   ├── Main.jsx                  ← UPDATED: Uses hook
│   ├── ScrollToTop.jsx           ← Can be deleted or kept as backup
│   └── PageTransition.jsx        ← No changes needed
├── AnimatedRoutes.jsx            ← UPDATED: Removed ScrollToTop
└── App.jsx
```

## Testing the Fix

1. **On home page** (`/`), scroll down to any section
2. **Click link** to `/contact-us`
3. **Observe**: Page should snap to top IMMEDIATELY
4. **Then**: Framer Motion opacity animation plays (300ms)

If it doesn't work:

- Open DevTools Console
- Check: `window.lenis` exists and is initialized
- Check: `useScrollToTop()` hook is running (add `console.log` inside)
- Check: No JavaScript errors in console

## Advanced: Optional Enhancements

### A) Disable Lenis during animation (prevents scroll conflicts)

```javascript
useEffect(() => {
  if (window.lenis) {
    window.lenis.stop() // Stop during animation
    const timer = setTimeout(() => {
      window.lenis.start() // Resume after animation
    }, 300) // Match animation duration
    return () => clearTimeout(timer)
  }
}, [pathname])
```

### B) Add page-specific scroll positions (remember scroll)

```javascript
const scrollPositions = useRef({})

useEffect(() => {
  scrollPositions.current[prevPath] = window.scrollY
}, [])

useEffect(() => {
  if (scrollPositions.current[pathname]) {
    window.lenis.scrollTo(scrollPositions.current[pathname])
  } else {
    window.lenis.scrollTo(0)
  }
}, [pathname])
```

### C) Coordinate with animation events

```javascript
// In PageTransition.jsx
onAnimationComplete={() => {
  // Only enable scrolling after animation ends
  if (window.lenis) window.lenis.start()
}}
```

## Why Not Other Solutions?

| Approach                              | Problem                                |
| ------------------------------------- | -------------------------------------- |
| `window.scrollTo(0, 0)` alone         | Lenis overrides it                     |
| `lenis.scrollTo(0, { smooth: true })` | Animation conflicts with Framer Motion |
| ScrollToTop outside layout            | Lenis might not exist yet              |
| setTimeout 100ms+                     | Too slow, user sees scroll jump        |
| No `stop()` call                      | Lenis smoothing interferes             |

## Summary

✅ **Single responsibility**: One hook, one place
✅ **Lenis-aware**: Uses `lenis.stop()` and `immediate: true`
✅ **Timing-safe**: Multiple execution methods ensure reliability
✅ **Animation-compatible**: Runs before Framer Motion animation
✅ **Cross-browser**: Multiple fallback scroll methods
✅ **Clean**: No race conditions or double handlers

Your scroll will now **always** reset to top on route change! 🎯

# Transition Between Pages

Smooth page transition system built with **Framer Motion** + **React Router v6**.

---

## What it looks like

- Old page **fades out**, slides up slightly, and scales down a hair
- Page **scrolls to top** while invisible (user never sees it)
- New page **fades in** from slightly below, scales up to full size
- Easing: expo-out — starts fast, decelerates smoothly into place

---

## Files involved

| File | Role |
|------|------|
| `src/App.tsx` | `AnimatePresence` + `motion.div` wrapping all routes |
| `src/components/ScrollToTop.tsx` | Scrolls to top mid-transition |

---

## The code

### `src/App.tsx`

```tsx
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 18, scale: 0.99 },
  animate: { opacity: 1, y: 0,  scale: 1    },
  exit:    { opacity: 0, y: -10, scale: 0.99 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          {/* ...other routes */}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
```

> `mode="wait"` is the key — it makes the exiting page fully finish before the entering page starts. Without it both play at the same time and it looks messy.

> `key={location.pathname}` — every route change gives the `motion.div` a new key, which tells Framer Motion to treat it as a new element and trigger exit + enter.

---

### `src/components/ScrollToTop.tsx`

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 220); // fires mid-transition while page is faded out
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
```

The 220ms delay matches the exit animation duration so the scroll happens while the screen is already faded to black — the user never sees the page jump to the top.

---

## Easing explained

```
[0.22, 1, 0.36, 1]
```

This is a **expo-out** cubic bezier curve:

```
ease: [x1, y1, x2, y2]
        ↑              ↑
   fast start     smooth stop
```

- Starts with a lot of energy
- Decelerates naturally toward the end
- Feels like something snapping into place, not floating in

---

## Tuning guide

| Feel | `duration` | `ease` | `y` values |
|------|-----------|--------|------------|
| Current (snappy) | `0.45` | `[0.22, 1, 0.36, 1]` | `18 / -10` |
| Faster | `0.3` | `[0.22, 1, 0.36, 1]` | `12 / -6` |
| Cinematic / slow | `0.65` | `[0.16, 1, 0.3, 1]` | `24 / -12` |
| Pure fade only | `0.4` | `easeInOut` | remove `y` and `scale` |
| Slide from right | — | — | use `x` instead of `y` |

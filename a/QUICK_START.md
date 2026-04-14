# Quick Start Guide: Test Your Scroll-to-Top Fix

## 🚀 Get Started in 30 Seconds

### Step 1: Verify Installation

```bash
# Check if the hook file exists
ls -la src/hooks/useScrollToTop.js
```

Expected output: `useScrollToTop.js` should exist ✅

### Step 2: Start Dev Server

```bash
npm run dev
# or
yarn dev
```

### Step 3: Test in Browser

1. Open http://localhost:5173
2. **Scroll down** the page (at least 500px)
3. **Click a link** (e.g., "Contact Us")
4. **Observe**:
   - ✅ Page should snap to top immediately
   - ✅ Then fade-in animation plays
5. **Repeat** on different pages

### Expected Behavior

```
BEFORE              DURING              AFTER
────────────────────────────────────────────────
User at Y: 450     Click link          User at Y: 0
                   ↓
                   Scroll resets       Fade-in
                   instantly           animation
                   (0ms)               (300ms)

              ✨ SMOOTH TRANSITION ✨
```

---

## ✅ Verification Checklist

### Code Changes

- [ ] `src/hooks/useScrollToTop.js` exists
- [ ] `src/components/Main.jsx` has `import useScrollToTop`
- [ ] `src/components/Main.jsx` has `useScrollToTop()` call
- [ ] `src/AnimatedRoutes.jsx` removed `<ScrollToTop />`
- [ ] `src/AnimatedRoutes.jsx` removed `import ScrollToTop`

### Runtime

- [ ] Dev server runs without errors
- [ ] Console shows no errors
- [ ] `window.lenis` is defined in DevTools
- [ ] Scroll resets on navigation

### Visual

- [ ] Page scrolls to top before animation
- [ ] Animation plays smoothly (no jitter)
- [ ] No scroll jumping or flickering
- [ ] Works on all routes

---

## 🐛 Quick Troubleshooting

### Scroll doesn't work?

```javascript
// Type in DevTools console
window.lenis // Should NOT be undefined
console.log("Lenis status:", window.lenis ? "✅ OK" : "❌ Missing")
```

### Scroll works but too slow?

In `Main.jsx`, reduce Lenis duration:

```javascript
const lenis = new Lenis({
  duration: 0.5, // ← Changed from 1.8
  // ... rest of config
})
```

### Scroll jumps around?

```javascript
// Check for other scroll handlers
grep -r "scrollTo" src/
grep -r "scroll" src/components/PageTransition.jsx
```

Remove any other scroll logic besides `useScrollToTop`.

### Animation is janky?

Add to `Main.jsx` after Lenis init:

```javascript
useEffect(() => {
  if (window.lenis) {
    window.lenis.stop()
    const timer = setTimeout(() => {
      window.lenis.start()
    }, 300)
    return () => clearTimeout(timer)
  }
}, [])
```

---

## 📊 Performance Check

### Bundle Size

```bash
npm run build
# Look for: "src/hooks/useScrollToTop.js"
# Size: ~250 bytes (negligible)
```

### Runtime Performance

Open DevTools → Performance tab:

1. Record a navigation
2. Look for `useScrollToTop` in the timeline
3. Should complete in <5ms

---

## 🎯 Common Scenarios

### Scenario 1: Home Page → Contact Page

```
1. On home page
2. Scroll down (450px)
3. Click "Contact Us"
4. ✅ Page snaps to top
5. ✅ Content fades in
```

### Scenario 2: Fast Navigation

```
1. Click link 1
2. Immediately click link 2
3. Immediately click link 3
4. ✅ Each navigation scrolls to top
5. ✅ No scroll conflicts
```

### Scenario 3: Browser Navigation

```
1. On home page, scroll down
2. Go to contact page
3. Click browser back button
4. ✅ Returns to home, scroll resets to top
   (Note: Browser may remember scroll,
    but useScrollToTop overrides it)
```

### Scenario 4: Mobile Touch

```
1. On mobile, scroll down
2. Tap a link
3. ✅ Page scrolls to top on mobile too
4. ✅ Works with touch gestures
```

---

## 🔍 Debug Logging

### Add Temporary Logs

Edit `src/hooks/useScrollToTop.js`:

```javascript
const useScrollToTop = () => {
  const { pathname } = useLocation()
  console.log("📍 Current route:", pathname)

  useEffect(() => {
    console.group(`Navigation to: ${pathname}`)
    console.log("Scroll before:", window.scrollY)

    const scrollToTopSync = () => {
      window.scrollTo(0, 0)
      // ... rest of scroll code
      console.log("Scroll after:", window.scrollY)
    }

    scrollToTopSync()
    console.groupEnd()
  }, [pathname])
}
```

### Expected Console Output

```
📍 Current route: /
Navigation to: /
Scroll before: 0
Scroll after: 0
(navigation happens)
📍 Current route: /contact-us
Navigation to: /contact-us
Scroll before: 450
Scroll after: 0
```

---

## 📚 Documentation Files

If you need more details, read these in order:

1. **Start here**: `IMPLEMENTATION_SUMMARY.md` (overview)
2. **Understanding**: `SCROLL_TO_TOP_SOLUTION.md` (technical details)
3. **Comparison**: `BEFORE_AFTER_COMPARISON.md` (what changed)
4. **Visuals**: `VISUAL_DIAGRAMS.md` (diagrams)
5. **Troubleshooting**: `DEBUGGING_GUIDE.md` (if something breaks)

---

## ✨ Success Criteria

After implementing this fix, you should see:

✅ **Immediate Scroll Reset**

- Page goes to top instantly on navigation
- No delay or gradual scrolling up

✅ **Smooth Animation**

- Fade-in animation plays after scroll
- No jitter or jumps during animation

✅ **Reliable**

- Works on every route change
- Works with browser back/forward
- Works on mobile and desktop

✅ **Clean Code**

- Single scroll handler
- No race conditions
- No console errors

✅ **Performance**

- No noticeable performance impact
- Bundle size increased by ~250 bytes
- Animation frame rate stays smooth

---

## 🎉 You're Done!

If scroll-to-top is working as expected, no further action needed!

Your Lenis smooth scroll + React Router v6 + Framer Motion stack is now bulletproof! 🚀

---

## Need Help?

### Check This First

1. Console for errors: `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (Mac)
2. `window.lenis` exists: Type in console
3. `pathname` changing: Add `console.log(pathname)`
4. CSS not blocking scroll: Check `overflow` and `height` properties

### Still Stuck?

1. Read `DEBUGGING_GUIDE.md` (7 levels of debugging)
2. Check `BEFORE_AFTER_COMPARISON.md` (verify you did all changes)
3. Search for "scroll" in codebase: Make sure no other handlers exist

### Last Resort

Roll back changes:

```bash
git checkout src/components/Main.jsx
git checkout src/AnimatedRoutes.jsx
rm src/hooks/useScrollToTop.js
```

Then re-read this guide and implement step-by-step.

---

**Updated**: 2026-04-14
**Status**: ✅ Ready for Testing

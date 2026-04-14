# Debugging Guide: Scroll-to-Top Issues

## Quick Test

1. **Scroll down** on your home page
2. **Click a link** to navigate
3. **Observe**: Page should snap to top **immediately**
4. **Then**: See Framer Motion fade animation (300ms)

If this doesn't happen, use this guide.

---

## Debug Level 1: Console Logging

Add this temporary code to `useScrollToTop.js`:

```javascript
const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    console.group(`🔄 Route Change: ${pathname}`)
    console.log('📊 Initial state:', {
      windowScrollY: window.scrollY,
      docElementScrollTop: document.documentElement.scrollTop,
      bodyScrollTop: document.body.scrollTop,
      hasLenis: !!window.lenis,
      lenisScrollY: window.lenis?.scroll || 'N/A',
    })

    const scrollToTopSync = () => {
      console.log('📍 Executing scroll...')
      
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      if (window.lenis) {
        console.log('⏹️ Stopping Lenis...')
        window.lenis.stop()
        console.log('⬆️ Calling lenis.scrollTo(0, immediate: true)...')
        window.lenis.scrollTo(0, { immediate: true })
      }

      console.log('✅ Scroll executed')
    }

    scrollToTopSync()

    const rafId = requestAnimationFrame(() => {
      console.log('📱 RAF execution')
      scrollToTopSync()
    })

    const timerId = setTimeout(() => {
      console.log('⏱️ setTimeout execution')
      scrollToTopSync()
      
      console.log('📊 Final state:', {
        windowScrollY: window.scrollY,
        docElementScrollTop: document.documentElement.scrollTop,
        hasLenis: !!window.lenis,
      })
    }, 0)

    console.groupEnd()

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timerId)
    }
  }, [pathname])
}
```

### Expected Console Output
```
🔄 Route Change: /contact-us
📊 Initial state: {
  windowScrollY: 450,
  docElementScrollTop: 0,
  bodyScrollTop: 0,
  hasLenis: true,
  lenisScrollY: 450,
}
📍 Executing scroll...
⏹️ Stopping Lenis...
⬆️ Calling lenis.scrollTo(0, immediate: true)...
✅ Scroll executed
📱 RAF execution
📍 Executing scroll...
⏱️ setTimeout execution
📍 Executing scroll...
📊 Final state: {
  windowScrollY: 0,
  docElementScrollTop: 0,
  hasLenis: true,
}
```

---

## Debug Level 2: Check Lenis Initialization

Add to `Main.jsx`:

```javascript
useEffect(() => {
  const lenis = new Lenis({/* ... */})
  
  console.log('🎬 Lenis initialized:', {
    instance: lenis,
    scroll: lenis.scroll,
    windowLenisSet: window.lenis !== undefined,
  })

  window.lenis = lenis
  
  // ... rest of code
}, [])
```

**Check in DevTools console:**
```javascript
// Type in console
window.lenis  // Should show Lenis instance, not undefined
window.lenis.scrollTo(0, { immediate: true })  // Test manually
window.scrollY  // Should be 0 after above command
```

---

## Debug Level 3: Check Route Changes

Verify that `useLocation().pathname` is actually changing:

```javascript
const useScrollToTop = () => {
  const { pathname } = useLocation()

  console.log('Current pathname:', pathname)  // Log every render

  useEffect(() => {
    console.log('useScrollToTop dependency changed:', pathname)
    // ... scroll code
  }, [pathname])
}
```

**If pathname doesn't log**: React Router might not be set up correctly.

---

## Debug Level 4: Isolate the Problem

### Test A: Does native scroll work?
```javascript
// Type in DevTools console
window.scrollTo(0, 500)
// Then
window.scrollTo(0, 0)
```

**If it doesn't work**: CSS might have `overflow: hidden` or `height: 100vh`.

### Test B: Does Lenis scroll work?
```javascript
// In console
window.lenis.scrollTo(100)
// Then
window.lenis.scrollTo(0, { immediate: true })
```

**If it doesn't work**: Lenis might not be initialized.

### Test C: Do both work together?
```javascript
// In console
window.lenis.stop()
window.lenis.scrollTo(0, { immediate: true })
window.scrollTo(0, 0)
```

**If this doesn't work**: Lenis and native scroll are conflicting.

---

## Debug Level 5: CSS Conflicts

Check `index.css` for problematic properties:

### ❌ Bad CSS
```css
html {
  height: 100vh;  /* Locks height */
  overflow: hidden;  /* Prevents scrolling */
  scroll-behavior: smooth;  /* Conflicts with Lenis */
}

body {
  height: 100%;
  overflow: auto;
}

main {
  overflow: hidden;  /* Prevents child scroll */
  height: 100vh;  /* Locks height */
}
```

### ✅ Good CSS
```css
html {
  height: auto;
  scroll-behavior: auto;  /* Let Lenis handle smooth scroll */
}

body {
  height: auto;
}

main {
  overflow: visible;  /* Allow normal flow */
  min-height: 100vh;  /* Use min-height, not height */
}
```

Check your current `index.css`:
```bash
cat src/index.css
```

Look for:
- `height: 100vh` (should be `min-height: 100vh`)
- `overflow: hidden` (should be `overflow: visible` or `overflow: auto`)
- `scroll-behavior: smooth` (should be `scroll-behavior: auto`)

---

## Debug Level 6: Animation Timeline

Check if animation is interfering:

```javascript
// In PageTransition.jsx
const PageTransition = forwardRef(({ children }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onAnimationStart={() => {
        console.log('🎬 Animation started', {
          scrollY: window.scrollY,
          lenisScroll: window.lenis?.scroll,
        })
      }}
      onAnimationComplete={() => {
        console.log('🏁 Animation complete', {
          scrollY: window.scrollY,
          lenisScroll: window.lenis?.scroll,
        })
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  )
})
```

**Expected**:
```
🎬 Animation started: { scrollY: 0, lenisScroll: 0 }
🏁 Animation complete: { scrollY: 0, lenisScroll: 0 }
```

**If scrollY is not 0 at animation start**: Scroll-to-top isn't running before animation.

---

## Debug Level 7: Check Framer Motion Mode

In `main.jsx`:

```jsx
<AnimatePresence mode="wait">
  {/* ... */}
</AnimatePresence>
```

The `mode="wait"` is correct because it ensures:
1. Old page exit animation completes
2. New page enter animation starts
3. **Scroll can reset in between**

If you had `mode="sync"`, pages would animate simultaneously and scroll would conflict.

---

## Common Issues & Solutions

### Issue: Scroll jumps back after scrolling
**Cause**: Multiple scroll calls happening at wrong times
**Solution**: Remove any other scroll logic; keep only `useScrollToTop` hook

### Issue: Scroll works but animation jitters
**Cause**: Lenis still animating while page transitions
**Solution**: Add to `PageTransition.jsx`:
```javascript
useEffect(() => {
  if (window.lenis) {
    window.lenis.stop()
  }
  return () => {
    if (window.lenis) {
      window.lenis.start()
    }
  }
}, [])
```

### Issue: Scroll doesn't work on first load
**Cause**: Lenis might not be initialized yet
**Solution**: Add a null check:
```javascript
if (window.lenis) {
  window.lenis.scrollTo(0, { immediate: true })
}
```

### Issue: Works on desktop but not mobile
**Cause**: Touch scroll handling differs
**Solution**: Make sure Lenis is configured for mobile:
```javascript
const lenis = new Lenis({
  gestureDirection: "vertical",  // ✅ Should be set
  mouseMultiplier: 1,
  touchMultiplier: 1.5,  // ✅ Mobile multiplier
})
```

### Issue: Console says "Cannot read property 'scrollTo' of undefined"
**Cause**: `window.lenis` doesn't exist
**Solution**: Verify Main.jsx is actually rendering and initializing Lenis:
```javascript
useEffect(() => {
  console.log('Main.jsx mounted')
  const lenis = new Lenis({/* ... */})
  console.log('Lenis created:', lenis)
  window.lenis = lenis
  console.log('window.lenis set:', window.lenis)
}, [])
```

---

## Final Checklist

- [ ] Removed all other scroll-to-top logic (old ScrollToTop component calls)
- [ ] `useScrollToTop()` is called in Main.jsx
- [ ] Lenis is initialized in Main.jsx BEFORE `useScrollToTop()` is called
- [ ] `window.lenis = lenis` is set in Lenis initialization
- [ ] No CSS has `overflow: hidden` on html/body/main
- [ ] No CSS has `height: 100vh` on html/body (use `min-height` instead)
- [ ] Framer Motion animation duration matches timeout logic (300ms animation)
- [ ] Console has no JavaScript errors
- [ ] DevTools shows `window.lenis` is defined

---

## Emergency Nuclear Option

If nothing works, temporarily disable Lenis:

```javascript
// In Main.jsx
// const lenis = new Lenis({/* ... */})  // Comment out

// Then test if basic scroll-to-top works
// If it does, Lenis is the culprit
// If it doesn't, something else is wrong
```

After testing, re-enable Lenis and adjust the `useScrollToTop` hook's timing.

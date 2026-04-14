import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Multiple scroll attempts to handle different scroll libraries
    // Immediate scroll for native scroll
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // After paint to handle Lenis and other smooth scroll libraries
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    })

    // After animation completes (300ms for your transition)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      // Trigger Lenis scroll if available
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }, 350) // Slightly after animation duration

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

export default ScrollToTop

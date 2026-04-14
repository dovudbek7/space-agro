import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const scrollToTopSync = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }

    scrollToTopSync()

    const rafId = requestAnimationFrame(() => {
      scrollToTopSync()
    })

    const microtaskId = setTimeout(() => {
      scrollToTopSync()
    }, 0)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(microtaskId)
    }
  }, [pathname])
}

export default useScrollToTop

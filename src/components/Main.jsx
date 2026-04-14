import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Foooter"
import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import React, { forwardRef } from "react"
import useScrollToTop from "../hooks/useScrollToTop"

const Main = forwardRef((props, ref) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
    })

    lenisRef.current = lenis
    window.lenis = lenis

    let animationFrameId
    const raf = time => {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }
    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  useScrollToTop()

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
})

Main.displayName = "Main"

export default Main

import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Foooter"
import FAQ from "./Faq"
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import React, { forwardRef } from "react";

const Main = forwardRef((props, ref) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Skroll davomiyligi (qancha katta bo'lsa, shuncha sekin to'xtaydi)
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Mayinlik funksiyasi
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1, // Sifat (sezgirlik)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy() // Komponent o'chganda xotirani tozalash
    }
  }, [])
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

export default Main

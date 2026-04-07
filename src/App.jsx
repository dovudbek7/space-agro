import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"
import heroImg from "./assets/hero.png"
// import Navbar from "./components/Navbar"
import { button, Button } from "@material-tailwind/react"
import { NavbarForDropdownWithMultipleLanguages } from "./components/Navbar" // yo'lni tekshiring
import Hero from "./components/Hero"
import { useTranslation } from "react-i18next"
import AboutUs from "./components/AboutUs"
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import Services from "./components/Services"
import Values from "./components/Values"
import Cta from "./components/Cta"
import Footer from "./components/Foooter"

const lngs = {
  en: { nativeName: "English" },
  ru: { nativeName: "Russian" },
}
function App() {
  const { t, i18n } = useTranslation()
  // const [count, setCount] = useState(0)
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
      {/* <NavbarForDropdownWithMultipleLanguages /> */}

      <Hero />
      <AboutUs />
      <Services />
      <Cta />
      <Values />
      <Footer />
      {/* <h1>{t("hello")}</h1>
      {Object.keys(lngs).map(lng => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}
          className="p-4 bg-blue-400 m-3"
        >
          {lngs[lng].nativeName}{" "}
        </button>
      ))} */}
     
    </>
  )
}

export default App

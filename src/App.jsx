import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"
import heroImg from "./assets/hero.png"
// import Navbar from "./components/Navbar"
import { button, Button } from "@material-tailwind/react"
import Navbar from "./components/Navbar" // yo'lni tekshiring
import Hero from "./components/Hero"
import { useTranslation } from "react-i18next"
import AboutUs from "./components/AboutUs"
import { useEffect } from "react"
import Services from "./components/Services"
import Values from "./components/Values"
import Cta from "./components/Cta"
import Footer from "./components/Foooter"
import Faq from "./components/Faq"
import FAQ from "./components/Faq"
import ForWhom from "./components/ForWhom"

const lngs = {
  en: { nativeName: "English" },
  ru: { nativeName: "Russian" },
}
function App() {
  const { t, i18n } = useTranslation()
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar /> */}

      <Hero />
      <AboutUs />
      <Services />
      <ForWhom />
      <Cta />
      <Values />
      <FAQ />
      {/* <Footer /> */}
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

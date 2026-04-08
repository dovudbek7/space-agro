import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@material-tailwind/react"
import React from "react"
import { AnimatePresence } from "framer-motion"
import AnimatedRoutes from "./AnimatedRoutes" // Yangi komponentni import qilamiz
import "./index.css"
import "./i18n.js"
// import ScrollToTop from "./components/ScrollToTop.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <React.Suspense fallback="Loading...">
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <AnimatedRoutes /> {/* AnimatedRoutes ni bu yerga qo'yamiz */}
          </AnimatePresence>
        </BrowserRouter>
      </React.Suspense>
    </ThemeProvider>
  </StrictMode>,
)

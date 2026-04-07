import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { ThemeProvider } from "@material-tailwind/react"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ContactUs from "./components/ContactUs"

import "./i18n.js"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <React.Suspense fallback="Loading...">
        {/* <App /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </BrowserRouter>
      </React.Suspense>
    </ThemeProvider>
    {/* <App /> */}
  </StrictMode>,
)

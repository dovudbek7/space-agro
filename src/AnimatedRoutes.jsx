import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import App from "./App"
import ContactUs from "./components/ContactUs"
import PageTransition from "./components/PageTransition"
import Main from "./components/Main"
import NotFound from "./components/NotFound"

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Main />}>
        <Route
          path="/"
          element={
            <PageTransition>
              <App />
            </PageTransition>
          }
        />
        <Route
          path="/contact-us"
          element={
            <PageTransition>
              <ContactUs />
            </PageTransition>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AnimatedRoutes

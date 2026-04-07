import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { ThemeProvider } from "@material-tailwind/react"
import React from 'react';

import "./i18n.js"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <React.Suspense fallback="Loading...">
        <App />
      </React.Suspense>
    </ThemeProvider>
    {/* <App /> */}
  </StrictMode>,
)

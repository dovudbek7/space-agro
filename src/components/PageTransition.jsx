import React from "react"
import { motion } from "framer-motion"
import { forwardRef } from "react"

const PageTransition = forwardRef(({ children }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  )
})

PageTransition.displayName = "PageTransition"

export default PageTransition

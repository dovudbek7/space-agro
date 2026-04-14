import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@material-tailwind/react"
import { useTranslation } from "react-i18next"
import PageTransition from "./PageTransition"

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-[150px]">
        <motion.h1
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-[120px] md:text-[180px] font-bold text-gray-900 leading-none select-none"
        >
          {t("notFound.title")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-md"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            {t("notFound.subtitle")}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t("notFound.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/">
            <Button className="bg-[#E2F350] text-[#0A252A] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
              {t("notFound.backHome")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default NotFound

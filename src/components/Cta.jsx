import { Button } from "@material-tailwind/react"
import { useTranslation } from "react-i18next"
import { LuCalendarCheck2 } from "react-icons/lu"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const cards = [
  { id: 1, title: "ctaCard1", icon: LuCalendarCheck2 },
  { id: 2, title: "ctaCard2", icon: LuCalendarCheck2 },
  { id: 3, title: "ctaCard3", icon: LuCalendarCheck2 },
  { id: 4, title: "ctaCard4", icon: LuCalendarCheck2 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const Cta = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#f3f3f3] py-10 overflow-hidden px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="container mx-auto flex flex-col xl:flex-row bg-white rounded-md p-0 overflow-hidden shadow-sm"
      >
        <div className="flex flex-col gap-8 w-full xl:w-1/2 p-6 md:p-10 xl:p-16 order-2 xl:order-1">
          <motion.p variants={itemVariants} className="text-4xl lg:text-6xl text-gray-700 font-bold">Logo</motion.p>
          <motion.p variants={itemVariants} className="text-4xl lg:text-6xl font-semibold">Space Agro</motion.p>
          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed text-sm md:text-base">
            {t("ctaDesc")}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link to="/contact-us">
                  <button className="bg-[#E2F350] text-[#0A252A] w-full py-4 rounded-full font-bold mt-4 max-w-[250px]">
                    {t("contactUs")} →
                  </button>
                </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {cards.map(card => {
              const Icon = card.icon
              return (
                <motion.div key={card.id} whileHover={{ x: 5 }} className="flex items-center gap-3 p-2 rounded-xl">
                  <div className="p-2 text-blue-700 text-2xl"><Icon /></div>
                  <p className="font-medium text-gray-800 text-sm md:text-base">{t(card.title)}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="bg-[#E8E8E8] w-full xl:w-1/2 h-[350px] md:h-[500px] xl:h-auto flex order-1 xl:order-2 self-stretch overflow-hidden"
        >
          <iframe 
            className="w-full h-[full] border-none pointer-events-none"
            src="https://cdn.lottielab.com/l/54Z61DhRWZ7bSk.html"
            title="Lottie Animation"
            style={{ width: "100%", height: "100%", display: "block" }}
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Cta
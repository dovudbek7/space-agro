import { Button } from "@material-tailwind/react"
import { useTranslation } from "react-i18next"
import { LuCalendarCheck2 } from "react-icons/lu"
import { motion } from "framer-motion"

const cards = [
  { id: 1, title: "ctaCard1", icon: LuCalendarCheck2 },
  { id: 2, title: "ctaCard2", icon: LuCalendarCheck2 },
  { id: 3, title: "ctaCard3", icon: LuCalendarCheck2 },
  { id: 4, title: "ctaCard4", icon: LuCalendarCheck2 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const Cta = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#f3f3f3] py-10 flex overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="container mx-auto flex justify-between lg:flex-row flex-col bg-white rounded-md p-6 lg:p-0 overflow-hidden shadow-sm"
      >
        <div className="flex flex-col gap-8 lg:w-1/2 p-10 order-2 lg:order-1">
          <motion.p variants={itemVariants} className="text-5xl lg:text-6xl text-blue-700 font-bold">
            Logo
          </motion.p>
          
          <motion.p variants={itemVariants} className="text-5xl lg:text-6xl font-semibold">
            Space Agro
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed">
            Your farm, connected. Your decisions, simplified. aydieye unifies
            labor, inputs, and results into one clear system. Scalable from a
            single plot to thousands of hectares, it replaces scattered tools
            with visibility, control, and peace of mind.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button className="max-w-[150px] bg-blue-700 hover:shadow-lg transition-all">
              Contact Us
            </Button>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
          >
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div 
                  key={card.id} 
                  whileHover={{ y: -5 }} 
                  className="flex items-center gap-3 p-3 bg-[#f9f9f9] rounded-xl"
                >
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-lg text-2xl">
                    <Icon />
                  </div>
                  <p className="font-medium text-gray-800">
                    {t(card.title)}
                  </p>
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
          className="bg-gray-600 w-full lg:w-1/2 h-[400px] lg:h-auto rounded-md order-1 lg:order-2"
        >
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Cta
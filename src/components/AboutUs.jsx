import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

// 1. Variantlar (O'zgarishsiz qoldi)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const AboutUs = () => {
  const { t } = useTranslation()
  const sampleColor = "#04303B"

  return (
    <section className="bg-[#E3E4D4]">
      <motion.div
        className="container mx-auto py-20 px-6 text-about-txt"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="block lg:flex justify-between md:px-0">
          {/* 3. Har bir matnni motion teglariga o'raymiz */}
          <motion.p
            variants={itemVariants}
            className="text-[25px] md:text-[36px]"
            style={{ color: sampleColor }} // Dinamik rang style orqali
          >
            {t("aboutus")}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-[30px] sm:text-[40px] md:text-[55px] max-w-screen-md"
            style={{ color: sampleColor }}
          >
            {t("abouttxt")}
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-5 justify-between mt-14">
          <motion.div
            variants={itemVariants}
            className="min-w-[150px]"
            style={{ color: sampleColor }}
          >
            <h2 className="text-4xl font-bold">120+</h2>
            <p>{t("aboutYear")}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="min-w-[150px]"
            style={{ color: sampleColor }}
          >
            <h2 className="text-4xl font-bold">235K+</h2>
            <p>{t("aboutImprove")}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="min-w-[150px]"
            style={{ color: sampleColor }}
          >
            <h2 className="text-4xl font-bold">421K+</h2>
            <p>{t("aboutFarmer")}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="min-w-[150px]"
            style={{ color: sampleColor }}
          >
            <h2 className="text-4xl font-bold">120+</h2>
            <p>{t("aboutAgricultural")}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutUs

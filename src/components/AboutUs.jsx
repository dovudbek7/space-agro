import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

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

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(15px)",
  },
  visible: i => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: i * 0.1, 
      ease: [0.2, 0.65, 0.3, 0.9], 
    },
  }),
}

const AboutUs = () => {
  const { t } = useTranslation()
  const sampleColor = "#04303B"

  const descriptionText = t("abouttxt")

  return (
    <section id="about" className="bg-[#E3E4D4]">
      <motion.div
        className="container mx-auto py-20 px-6 text-about-txt"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="block lg:flex justify-between md:px-0">
          <motion.p
            variants={itemVariants}
            className="text-[25px] md:text-[36px] mb-6 lg:mb-0"
            style={{ color: sampleColor }}
          >
            {t("aboutus")}
          </motion.p>

          <motion.p
            className="text-[30px] sm:text-[40px] md:text-[55px] max-w-screen-md leading-[1.1] flex flex-wrap"
            style={{ color: sampleColor }}
          >
            {descriptionText.split(" ").map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-5 justify-between mt-20">
          {[
            { num: "120+", label: "aboutYear" },
            { num: "235K+", label: "aboutImprove" },
            { num: "421K+", label: "aboutFarmer" },
            { num: "120+", label: "aboutAgricultural" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="min-w-[150px]"
              style={{ color: sampleColor }}
            >
              <h2 className="text-4xl md:text-5xl font-bold">{stat.num}</h2>
              <p className="mt-2 opacity-80">{t(stat.label)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default AboutUs
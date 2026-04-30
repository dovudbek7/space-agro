import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import SplitText from "./common/SplitText"

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

          <SplitText
            as="p"
            text={t("abouttxt")}
            className="text-[30px] sm:text-[40px] md:text-[55px] max-w-screen-md leading-[1.1] flex flex-wrap"
            wordClassName="inline-block mr-[0.3em]"
            y={40}
            blur={15}
            duration={1}
            stagger={0.1}
          />
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

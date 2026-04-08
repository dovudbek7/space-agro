import { useTranslation } from "react-i18next"
import FAQ from "./Faq"
import Footer from "./Foooter"
import { FaPhone } from "react-icons/fa"
import { MdMail } from "react-icons/md"
import { Button, Navbar } from "@material-tailwind/react"
import { motion } from "framer-motion"

const data = ["+998998887766", "sample@gmail.com"]

const ContactUs = () => {
  const { t } = useTranslation()

  const wordAnimation = {
    hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
    visible: i => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
    }),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
        delayChildren: 0.4, 
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const SplitText = ({ text, className }) => (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={wordAnimation}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )

  return (
    <>
      <section id="contact-us" className="container mx-auto px-4 py-20 mt-16 flex flex-col lg:flex-row justify-between items-start gap-12 bg-white overflow-hidden">
        {/* CHAP TOMON */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#0B252E] font-medium text-lg"
          >
            {t("contactUs")}
          </motion.h2>

          <SplitText
            text={t("contactDesc")}
            className="text-[48px] lg:text-[60px] font-semibold text-[#0B252E] leading-[1.1] max-w-[650px] block"
          />

          <SplitText
            text={t("contactDetail")}
            className="text-gray-600 text-lg font-normal max-w-[550px] block"
          />

          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="border-gray-200 w-full origin-left my-2"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8"
          >
            <div className="flex items-center gap-3 text-[#0B252E] text-lg font-light">
              <FaPhone className="text-xl text-[#0B252E]/70" />
              <p>{data[0]}</p>
            </div>
            <div className="flex items-center gap-3 text-[#0B252E] text-lg font-light">
              <MdMail className="text-xl text-[#0B252E]/70" />
              <p>{data[1]}</p>
            </div>
          </motion.div>
        </div>

        {/* O'NG TOMON - FORMA ANIMATSIYASI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[550px] bg-white border border-gray-300 rounded-3xl p-8 lg:p-10 shadow-sm"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-normal text-[#0B252E] mb-8"
          >
            {t("formTitle")}
          </motion.h2>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Ism va Familiya */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-2"
              >
                <label className="font-normal text-[#0B252E]">
                  {t("firstName")}
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="bg-[#F6F7F9] border-none rounded-xl p-4 focus:ring-2 focus:ring-lime-400 outline-none transition-all duration-300"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-2"
              >
                <label className="font-normal text-[#0B252E]">
                  {t("lastName")}
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="bg-[#F6F7F9] border-none rounded-xl p-4 focus:ring-2 focus:ring-lime-400 outline-none transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Email */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label className="font-normal text-[#0B252E]">{t("email")}</label>
              <input
                type="email"
                placeholder="sample@gmail.com"
                className="bg-[#F6F7F9] border-none rounded-xl p-4 focus:ring-2 focus:ring-lime-400 outline-none transition-all duration-300"
              />
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label className="font-normal text-[#0B252E]">
                {t("message")}
              </label>
              <textarea
                rows="4"
                placeholder={t("message")}
                className="bg-[#F6F7F9] border-none rounded-xl p-4 focus:ring-2 focus:ring-lime-400 outline-none resize-none transition-all duration-300"
              />
            </motion.div>

            {/* Tugma */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
            >
              <Button
                type="submit"
                className="bg-[#D9F035] text-[#0B252E] w-full md:w-auto normal-case text-base px-8 py-4 rounded-full shadow-none font-bold flex items-center justify-center gap-2 transition-colors duration-500 hover:bg-[#c9e025]"
              >
                {t("sendButoon")}
                <motion.span
                  variants={{ initial: { x: 0 }, hover: { x: 8 } }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {" "}
                  &rarr;{" "}
                </motion.span>
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </section>
      <FAQ />
    </>
  )
}

export default ContactUs

import { Button } from "@material-tailwind/react"
import bgImg from "../assets/agro-tractor.jpeg"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

const Footer = () => {
  const { t } = useTranslation()
  
  const footerLinks = [
    { title: "Quick links", links: ["Home", "About", "Our solutions", "Our Services"] },
    { title: "Support", links: ["FAQs", "Privacy Policy", "Terms of Use", "Help Center"] },
    { title: "Contact", links: ["info@farmio.com", "+998 90 123 45 67", "Tashkent, UZ"] },
  ]

  const wordVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1, 
        duration: 0.5,
      },
    }),
  }

  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={wordVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ))
  }

  return (
    <div
      className="relative w-screen min-h-screen bg-cover bg-center pt-20 pb-5 px-5 overflow-x-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />


      <div className="relative z-10 text-center text-white mb-20">
        <p className="text-[25px] flex justify-center flex-wrap">
          {splitText(t("joinUs"))}
        </p>
        <div className="text-[30px] md:text-[45px] max-w-[800px] mx-auto py-4 font-bold flex justify-center flex-wrap">
          {splitText(t("footerDesc"))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }} 
          viewport={{ once: true }}
        >
          <Button className="rounded-3xl bg-[#D9E550] text-black hover:bg-[#c1cc3e] transition-colors">
            {t("getStarted")}
          </Button>
        </motion.div>
      </div>


      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 bg-white p-10 container mx-auto rounded-3xl shadow-sm my-10"
      >
        <div className="flex flex-col xl:flex-row justify-between gap-10">
          <div className="flex-1">
            <h2 className="text-[35px] text-blue-800 font-bold">Title</h2>
            <p className="text-[20px] max-w-[350px] py-4 text-gray-600">
              Transforming agriculture through smart, sustainable innovation.
            </p>
            <p className="text-[20px] font-medium text-blue-900">info@farmio.com</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20 text-[18px]">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h2 className="text-gray-400 mb-6 font-semibold uppercase text-sm tracking-wider">
                  {section.title}
                </h2>
                <ul className="text-gray-700">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-3 hover:text-blue-800 cursor-pointer">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full bg-black/40 my-8"></div>
        <div className="text-gray-800 text-sm text-center">
          <p>© 2026 Farmio. All Rights Reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}

export default Footer
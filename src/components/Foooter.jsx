import { Button } from "@material-tailwind/react"
import bgImg from "../assets/agro-tractor.jpeg"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import SplitText from "./common/SplitText"

const Footer = () => {
  const { t } = useTranslation()

  const footerLinks = [
    {
      title: "footer.quickLinks.title",
      links: [
        { name: "footer.quickLinks.home", isStatic: false },
        { name: "footer.quickLinks.about", isStatic: false },
        { name: "footer.quickLinks.solutions", isStatic: false },
        { name: "footer.quickLinks.services", isStatic: false },
      ],
    },
    {
      title: "footer.support.title",
      links: [
        { name: "footer.support.faqs", isStatic: false },
        { name: "footer.support.privacy", isStatic: false },
        { name: "footer.support.terms", isStatic: false },
        { name: "footer.support.help", isStatic: false },
      ],
    },
    {
      title: "footer.contact.title",
      links: [
        { name: "info@spaceagro.com", isStatic: true },
        { name: "+998 90 123 45 67", isStatic: true },
        { name: "footer.contact.address", isStatic: false },
      ],
    },
  ]

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center pt-20 pb-5 px-5 "
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 text-center text-white mb-20">
        <SplitText
          as="p"
          text={t("joinUs")}
          className="text-[25px] flex justify-center flex-wrap"
          wordClassName="inline-block mr-2"
          y={10}
          blur={8}
          duration={0.5}
          stagger={0.1}
        />
        <div className="text-[30px] md:text-[45px] max-w-[800px] mx-auto py-4 font-bold flex justify-center flex-wrap">
          <SplitText
            text={t("footerDesc")}
            wordClassName="inline-block mr-2"
            y={10}
            blur={8}
            duration={0.5}
            stagger={0.1}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/contact-us">
            <Button className="bg-[#E2F350] text-[#0A252A]  py-4 rounded-full font-bold mt-4">
              {t("contactUs")} →
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 bg-white p-10 container mx-auto rounded-3xl shadow-sm"
      >
        <div className="flex flex-col xl:flex-row justify-between gap-10">
          <div className="flex-1">
            <h2 className="text-[35px] text-gray-800 font-bold">Logo</h2>
            <p className="text-[20px] max-w-[350px] py-4 text-gray-600">
              {t("footer.brandSlogan")}{" "}
            </p>
            <p className="text-[20px] font-medium text-blue-900">
              info@spaceagro.com
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20 text-[18px]">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h2 className="text-gray-400 mb-6 font-semibold uppercase text-sm tracking-wider">
                  {t(section.title)}
                </h2>
                <ul className="text-gray-700">
                  {section.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className="mb-3 hover:text-blue-800 cursor-pointer"
                    >
                      {/* MANA SHU QISM XATONI TO'G'IRLAYDI */}
                      {typeof link === "object"
                        ? link.isStatic
                          ? link.name
                          : t(link.name)
                        : t(link)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full bg-black/40 my-8"></div>
        <div className="text-gray-800 text-sm text-center">
          <p>© 2026 Space Agro. {t("footer.rights")}</p>
        </div>
      </motion.footer>
    </div>
  )
}

export default Footer

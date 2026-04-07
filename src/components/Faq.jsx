import React, { useState } from "react"
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const faqImage =
  "https://framerusercontent.com/images/oQHhmcHGOAYy6mYwmkX5upOaDcI.png?scale-down-to=512&width=1296&height=1296"

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform duration-300`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  )
}

const FAQ = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(1)
  const handleOpen = value => setOpen(open === value ? 0 : value)

  const wordAnim = {
    hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
    visible: i => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  }

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const cardAnim = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6 },
    },
  }

  const data = [
    { id: 1, title: "faqTitle1", desc: "faqDesc1" },
    { id: 2, title: "faqTitle2", desc: "faqDesc2" },
    { id: 3, title: "faqTitle3", desc: "faqDesc3" },
    { id: 4, title: "faqTitle4", desc: "faqDesc4" },
    { id: 5, title: "faqTitle5", desc: "faqDesc5" },
    { id: 6, title: "faqTitle6", desc: "faqDesc6" },
  ]

  return (
    <section id="faq" className="py-10 px-6 container mx-auto overflow-hidden">
      <div className="w-full text-center pb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[25px] font-thin"
        >
          Faqs
        </motion.h2>

        <div className="text-[40px] max-w-[450px] mx-auto font-bold leading-tight">
          {"Got questions? We’ve got answers".split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:px-6 w-full lg:w-2/3"
        >
          {data.map(item => {
            const isOpen = open === item.id
            return (
              <motion.div key={item.id} variants={cardAnim}>
                <Accordion
                  open={isOpen}
                  className={`mb-4 rounded-2xl border-2 px-6 transition-all duration-300 ${
                    isOpen
                      ? "bg-[#E2E4D4] border-[#9eb602]"
                      : "bg-white border-gray-400"
                  }`}
                  icon={<Icon id={item.id} open={open} />}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(item.id)}
                    className="border-b-0 transition-colors duration-300"
                  >
                    {t(item.title)}
                  </AccordionHeader>
                  <hr />
                  <AccordionBody className="text-base font-normal pt-3 text-gray-700">
                    {t(item.desc)}
                  </AccordionBody>
                </Accordion>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full lg:w-3/6 self-stretch"
        >
          <img
            src={faqImage}
            alt="FAQ"
            className="rounded-2xl w-full h-full  object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ

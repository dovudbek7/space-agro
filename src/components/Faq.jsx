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
// Ikonka uchun alohida kichik komponent (aylanish animatsiyasi bilan)
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

  const data = [
    { id: 1, title: "faqTitle1", desc: "faqDesc1" },
    { id: 2, title: "faqTitle2", desc: "faqDesc2" },
    { id: 3, title: "faqTitle3", desc: "faqDesc3" },
    { id: 4, title: "faqTitle4", desc: "faqDesc4" },
    { id: 5, title: "faqTitle5", desc: "faqDesc5" },
    { id: 6, title: "faqTitle6", desc: "faqDesc6" },
  ]

  return (
    <section className="py-10 px-6 container mx-auto ">
      <div className="w-full text-center pb-6">
        <h2 className="text-[25px] font-thin">Faqs</h2>
        <p className="text-[40px] max-w-[350px] mx-auto">
          Got questions? We’ve got answers
        </p>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between ">
        <div className="lg:px-6">
          {data.map(item => {
            const isOpen = open === item.id

            return (
              <Accordion
                key={item.id}
                open={isOpen}
                // Detail ochiq paytda rangni o'zgartirish (masalan, bg-gray-50 yoki border rang)
                className={`mb-4 rounded-2xl border-2 px-6 transition-all duration-300 ${
                  isOpen
                    ? "bg-[#E2E4D4] border-[#9eb602]"
                    : "bg-white border-gray-400"
                }`}
                icon={<Icon id={item.id} open={open} />}
              >
                <AccordionHeader
                  onClick={() => handleOpen(item.id)}
                  className={`border-b-0 transition-colors duration-300 `}
                >
                  {t(item.id === 1 ? "faqTitle1" : item.title)}{" "}
                  {/* Map mantiqi */}
                  <span className="text-lg ml-2 font-medium italic opacity-50">
                    {/* Sarlavha yoniga qo'shimcha narsa kerak bo'lsa */}
                  </span>
                </AccordionHeader>
                <hr />
                <AccordionBody className={`text-base font-normal pt-3  `}>
                  {t(item.desc)}
                </AccordionBody>
              </Accordion>
            )
          })}
        </div>
        <img src={faqImage} alt="" className="rounded-2xl block object-cover " />
      </div>
    </section>
  )
}

export default FAQ

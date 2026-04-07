import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

const bgImage =
  "https://img.freepik.com/free-photo/tractor-working-green-field_23-2151983626.jpg?semt=ais_hybrid&w=740&q=80"
const cards = [
  {
    id: 1,
    title: "sCardTitle1",
    desc: "sCardDesc1",
    image:
      "https://img.freepik.com/free-photo/tractor-working-green-field_23-2151983626.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    title: "sCardTitle2",
    desc: "sCardDesc2",
    image:
      "https://img.freepik.com/free-photo/imageful-farm-fields-from-sunflower-wheat-rye-corn_661209-8.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 3,
    title: "sCardTitle3",
    desc: "sCardDesc3",
    image:
      "https://images.unsplash.com/photo-1632723893457-47e3abc47526?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWdyb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    title: "sCardTitle4",
    desc: "sCardDesc4",
    image:
      "https://media.istockphoto.com/id/576548706/photo/combine-harvesting-wheat.jpg?s=612x612&w=0&k=20&c=LsPnnUuOlKv7XqJ8URZ4wxVpV9sREdzNia0aJdZ4ICY=",
  },
  {
    id: 5,
    title: "sCardTitle5",
    desc: "sCardDesc5",
    image:
      "https://img.freepik.com/free-photo/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed_181624-25838.jpg?semt=ais_hybrid&w=740&q=80",
  },
]
const Services = () => {
  const containerRef = useRef(null)
  const { t } = useTranslation()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const images = cards.map(card => card.image)
  const range = cards.map((_, i) => i / cards.length)

  const currentBgImage = useTransform(scrollYProgress, range, images)
  const splitText = text => {
    return text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ))
  }
  return (
    <>
      <section ref={containerRef} className="relative h-[400vh] w-full">
        <motion.div
          className="sticky top-0 h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            // transition: "background-image 0.5s ease-in-out",
          }}
        >
          <div className="absolute inset-0 bg-black/40 -z-10" />
          <div className="container mx-auto flex flex-col items-center text-center px-6 mb-10">
            <h2 className="text-[30px] md:text-[45px] font-medium">
              {t("service")}
            </h2>
            <p className="text-[40px] md:text-[60px] max-w-[800px] leading-[1.1] font-bold">
              {t("advancedServices")}
            </p>
          </div>

          <div className="relative w-[90%] max-w-[700px] h-[500px]">
            {cards.map((card, index) => {
              const start = index / cards.length
              const end = (index + 1) / cards.length

              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.01, end - 0.01, end],
                [0, 1, 1, 0],
              )
              const scale = useTransform(
                scrollYProgress,
                [start, start + 0.1],
                [0.8, 1],
              )

              return (
                <motion.div
                  key={card.id}
                  style={{
                    opacity,
                    zIndex: cards.length - index,
                  }}
                  className="absolute inset-0 bg-white p-4 rounded-3xl shadow-2xl flex flex-col"
                >
                  <img
                    src={card.image || bgImage}
                    alt=""
                    className="rounded-2xl w-full h-[350px] object-cover"
                  />

                  <div className="text-center mt-6">
                    <h3 className="text-[#04303B] text-2xl font-bold mb-2">
                      {t(card.title)}
                    </h3>
                    <p className="text-gray-600 max-w-[300px] mx-auto text-sm md:text-base">
                      Smart sustainable farming guidance tailored to your needs
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>
      {/* <div className="sticky top-0 w-[600px] bg-white p-3  rounded-2xl mt-10">
        <img
          src={bgImage}
          alt=""
          className="rounded-2xl w-full h-[300px] object-cover"
        />
        <div className="text-center mt-4">
          <h3 className="text-about-txt text-2xl">Agriculture Consulting</h3>
          <p className="text-gray-500 max-w-[250px] mx-auto">
            Smart sustainable farming guidance tailored to your needs
          </p>
        </div>
      </div> */}
    </>
  )
}

export default Services

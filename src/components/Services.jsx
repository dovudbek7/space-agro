import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

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
      "https://images.unsplash.com/photo-1632723893457-47e3abc47526?fm=jpg&q=60&w=3000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "sCardTitle4",
    desc: "sCardDesc4",
    image:
      "https://images.unsplash.com/photo-1632723893457-47e3abc47526?fm=jpg&q=60&w=3000&auto=format&fit=crop",
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

  const activeIndex = useTransform(scrollYProgress, v =>
    Math.min(cards.length - 1, Math.floor(v * cards.length)),
  )

  const background = useTransform(activeIndex, i => `url(${cards[i].image})`)

  const filter = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"],
  )

  const opacityBg = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.7, 1, 1, 0.7],
  )

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative h-[400vh] w-full"
    >
      <motion.div
        className="sticky top-0 h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: background,
          filter: filter,
          opacity: opacityBg,
        }}
      >
        <div className="absolute inset-0 bg-black/50 -z-10" />

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
            const opacity = useTransform(activeIndex, i =>
              i === index ? 1 : 0,
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
                  src={card.image}
                  alt=""
                  className="rounded-2xl w-full h-[350px] object-cover"
                />

                <div className="text-center mt-6">
                  <h3 className="text-[#04303B] text-2xl font-bold mb-2">
                    {t(card.title)}
                  </h3>
                  <p className="text-gray-600 max-w-[400px] mx-auto text-sm md:text-base px-4">
                    {t(card.desc)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default Services

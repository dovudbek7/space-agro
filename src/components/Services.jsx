import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

const cards = [
  {
    id: 1,
    title: "sCardTitle1",
    desc: "sCardDesc1",
    image: "https://img.freepik.com/free-photo/tractor-working-green-field_23-2151983626.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    title: "sCardTitle2",
    desc: "sCardDesc2",
    image: "https://img.freepik.com/free-photo/imageful-farm-fields-from-sunflower-wheat-rye-corn_661209-8.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 3,
    title: "sCardTitle3",
    desc: "sCardDesc3",
    image: "https://images.unsplash.com/photo-1632723893457-47e3abc47526?fm=jpg&q=60&w=3000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "sCardTitle4",
    desc: "sCardDesc4",
    image: "https://images.unsplash.com/photo-1632723893457-47e3abc47526?fm=jpg&q=60&w=3000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "sCardTitle5",
    desc: "sCardDesc5",
    image: "https://img.freepik.com/free-photo/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed_181624-25838.jpg?semt=ais_hybrid&w=740&q=80",
  },
]

const Services = () => {
  const containerRef = useRef(null)
  const { t } = useTranslation()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  })

  // Text animatsiyasi uchun variantlar
  const textVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section ref={containerRef} className=" h-[500vh] w-full">
      <div className="fixed top-0 left-0 h-screen w-full -z-20 overflow-hidden bg-black">
        {cards.map((card, index) => {
          const start = index / cards.length
          const end = (index + 1) / cards.length
          
          const isLast = index === cards.length - 1
          const opacity = useTransform(
            smoothProgress,
            [start - 0.1, start, end, end + 0.1],
            [0, 1, 1, isLast ? 1 : 0] 
          )

          return (
            <motion.div
              key={`bg-${card.id}`}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${card.image})`,
                opacity: opacity,
                filter: "blur(2px)" 
              }}
            />
          )
        })}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-6">

        <div className="container mx-auto flex flex-col items-center text-center px-4 sm:px-6 mb-4 sm:mb-8 md:mb-10 text-white">
          <motion.h2
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-[20px] sm:text-[26px] md:text-[45px] font-medium"
          >
            {t("service")}
          </motion.h2>

          <motion.p
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-[26px] sm:text-[34px] md:text-[60px] max-w-[800px] leading-[1.15] font-bold"
          >
            {t("advancedServices")}
          </motion.p>
        </div>

        <div className="relative w-[92%] sm:w-[90%] max-w-[700px] h-[52vh] min-h-[380px] sm:h-[470px] md:h-[500px] max-h-[540px]">
          {cards.map((card, index) => {
            const start = index / cards.length
            const end = (index + 1) / cards.length
            const isLast = index === cards.length - 1

            const cardOpacity = useTransform(
              smoothProgress,
              [start - 0.05, start, end - 0.05, end],
              [0, 1, 1, isLast ? 1 : 0]
            )

            return (
              <motion.div
                key={card.id}
                style={{
                  opacity: cardOpacity,
                  zIndex: index,
                  pointerEvents: "none"
                }}
                className="absolute inset-0 bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col"
              >
                <img
                  src={card.image}
                  alt=""
                  className="rounded-xl sm:rounded-2xl w-full h-[65%] sm:h-[62%] md:h-[350px] object-cover flex-shrink-0"
                />
                <div className="text-center mt-2 sm:mt-3 md:mt-6 px-2">
                  <h3 className="text-[#04303B] text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
                    {t(card.title)}
                  </h3>
                  <p className="text-gray-600 max-w-[400px] mx-auto text-xs sm:text-sm md:text-base leading-snug">
                    {t(card.desc)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
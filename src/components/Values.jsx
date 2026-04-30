import { useTranslation } from "react-i18next"
import { Swiper, SwiperSlide } from "swiper/react"
import { motion } from "framer-motion"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay } from "swiper/modules"
import SplitText from "./common/SplitText"

const cards = [
  {
    id: 2,
    title: "vCard1",
    desc: "vCardDesc2",
    image:
      "https://cdn.prod.website-files.com/68b839859d22d05f493166e4/68dac36b03995367a9515dd7_icon_63_star%20in%20hand.svg",
  },
  {
    id: 1,
    title: "vCard2",
    desc: "vCardDesc1",
    image:
      "https://cdn.prod.website-files.com/68b839859d22d05f493166e4/68dac36b03995367a9515dd7_icon_63_star%20in%20hand.svg",
  },
  {
    id: 3,
    title: "vCard3",
    desc: "vCardDesc3",
    image:
      "https://cdn.prod.website-files.com/68b839859d22d05f493166e4/68dac36b03995367a9515dd7_icon_63_star%20in%20hand.svg",
  },
  {
    id: 4,
    title: "vCard4",
    desc: "vCardDesc4",
    image:
      "https://cdn.prod.website-files.com/68b839859d22d05f493166e4/68dac36b03995367a9515dd7_icon_63_star%20in%20hand.svg",
  },
  {
    id: 5,
    title: "vCard5",
    desc: "vCardDesc5",
    image:
      "https://cdn.prod.website-files.com/68b839859d22d05f493166e4/68dac36b03995367a9515dd7_icon_63_star%20in%20hand.svg",
  },
  {
    id: 6,
    title: "vCard6",
    desc: "vCardDesc6",
    image:
      "https://cdn.prod.website-files.com/68b839859d22d05f493166e4/68dac36b03995367a9515dd7_icon_63_star%20in%20hand.svg",
  },
]

const Values = () => {
  const { t } = useTranslation()

  return (
    <>
      <section className="bg-white pb-4 overflow-hidden">
        <div className="text-center pt-14 py-20 px-6">
          <h3 className="text-[35px] md:text-[65px] max-w-3xl mx-auto font-thin leading-tight overflow-hidden">
            <SplitText
              text={t("valuesTitle")}
              className="flex flex-wrap justify-center"
              wordClassName="inline-block mr-[0.3em]"
              y={20}
              blur={10}
              duration={0.5}
              stagger={0.08}
              ease="easeOut"
            />
          </h3>

          <p className="text-md md:text-2xl max-w-5xl mx-auto mt-6 text-gray-600">
            <SplitText
              text={t("valuesDes")}
              className="flex flex-wrap justify-center"
              wordClassName="inline-block mr-[0.3em]"
              y={20}
              blur={10}
              duration={0.5}
              stagger={0.08}
              ease="easeOut"
            />
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="caruesl w-full mb-10"
        >
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={7000}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            slidesPerView={4}
            freeMode={true}
            spaceBetween={20}
            allowTouchMove={false}
            className="mySwiper"
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 10 },
              640: { slidesPerView: 2.2, spaceBetween: 15 },
              1024: { slidesPerView: 3.5, spaceBetween: 20 },
              1440: { slidesPerView: 4.5, spaceBetween: 30 },
            }}
          >
            {cards.map(card => (
              <SwiperSlide key={card.id}>
                <div className="card bg-[#f3f3f3] min-h-[400px] max-w-[350px] px-7 py-10 rounded-2xl flex flex-col gap-5">
                  <h3 className="text-2xl font-semibold">{t(card.title)}</h3>
                  <div className="flex justify-center items-center py-4">
                    <img
                      src={card.image}
                      alt=""
                      className="w-[120px] h-auto object-contain"
                    />
                  </div>
                  <p className="text-gray-600 font-light">{t(card.desc)}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>
    </>
  )
}

export default Values

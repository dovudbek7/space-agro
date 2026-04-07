import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

const Hero = () => {
  const { t } = useTranslation()
  const videSource =
    "https://cdn.prod.website-files.com/68b839859d22d05f493166e4%2F68da78e2e33b462dc51fe379_856019-hd_1920_1080_25fps-transcode.mp4"

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(15px)",
    },
    visible: i => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        delay: i * 0.1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  }

  const text = t("heroText")

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <video
        src={videSource}
        autoPlay
        loop
        muted
        playsInline
        className="h-screen w-full object-cover absolute z-0"
      ></video>

      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="relative z-20 flex h-full items-end justify-start p-4 lg:p-14">
        <motion.p
          initial="hidden"
          animate="visible"
          className="text-white text-[clamp(1rem,14vw,7rem)] font-thin leading-[0.9] text-start md:max-w-[1000px] flex flex-wrap"
        >
          {text.split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              className="inline-block mr-[0.2em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  )
}

export default Hero

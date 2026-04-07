import { useTranslation } from "react-i18next"

const Hero = () => {
  const { t } = useTranslation()
  const videSource =
    "https://cdn.prod.website-files.com/68b839859d22d05f493166e4%2F68da78e2e33b462dc51fe379_856019-hd_1920_1080_25fps-transcode.mp4"
  return (
    <>
      <div className="relative h-screen w-full">
        <video
          src={videSource}
          autoPlay
          loop
          muted
          playsInline
          className="h-screen w-full object-cover absolute"
        ></video>
        <div className="relative z-20 flex h-full items-end justify-start text-center">
          <p className="text-white text-[clamp(1rem,14vw,7rem)] p-4 lg:p-10 font-thin leading-none text-start md:max-w-[800px]">
            {t("heroText")}
          </p>
        </div>
      </div>
    </>
  )
}

export default Hero

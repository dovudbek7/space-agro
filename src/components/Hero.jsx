import { useTranslation } from "react-i18next"
import SplitText from "./common/SplitText"

const Hero = () => {
  const { t } = useTranslation()
  const videSource =
    "https://cdn.prod.website-files.com/68b839859d22d05f493166e4%2F68da78e2e33b462dc51fe379_856019-hd_1920_1080_25fps-transcode.mp4"

  return (
    <div id="home" className="relative h-dvh w-full overflow-hidden">
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
        <SplitText
          as="p"
          text={t("heroText")}
          className="text-white text-[clamp(1rem,14vw,7rem)] font-thin leading-[0.9] text-start md:max-w-[1000px] flex flex-wrap"
          wordClassName="inline-block mr-[0.2em]"
          y={40}
          blur={15}
          duration={1}
          stagger={0.1}
        />
      </div>
    </div>
  )
}

export default Hero

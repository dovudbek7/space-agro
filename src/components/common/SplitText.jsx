import React from "react"
import { motion } from "framer-motion"

const SplitText = ({
  text = "",
  as: Tag = "span",
  className = "",
  wordClassName = "inline-block mr-[0.25em]",
  y = 20,
  blur = 10,
  duration = 0.6,
  stagger = 0.08,
  ease = [0.2, 0.65, 0.3, 0.9],
  once = true,
  amount = 0.2,
}) => {
  if (!text) return null

  const wordVariants = {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: i => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay: i * stagger, ease },
    }),
  }

  const MotionTag = motion[Tag] || motion.span
  const words = text.split(" ")

  return (
    <MotionTag key={text} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${i}-${word}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount }}
          className={wordClassName}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}

export default SplitText

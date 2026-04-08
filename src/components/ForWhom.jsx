import React from "react"
import { motion } from "framer-motion"

const ForWhom = () => {
  const imageLink =
    "https://img.freepik.com/free-photo/beautiful-lake-mountains_395237-44.jpg?semt=ais_hybrid&w=740&q=80"

  // Animatsiya variantlari
  const containerVars = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Har bir so'z orasidagi kechikish
      },
    },
  }

  const wordVars = {
    initial: { 
      opacity: 0, 
      y: 20, 
      filter: "blur(10px)" 
    },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } 
    },
  }

  // Matnni split qilish uchun yordamchi komponent
  const SplitText = ({ text, className }) => {
    return (
      <motion.span className={className} variants={containerVars} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
        {text.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1">
            <motion.span variants={wordVars} className="inline-block mr-[0.25em]">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    )
  }

  return (
    <section className="py-16 px-5 md:px-10 bg-[#F8F9F5]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="mb-4">
            {/* Kichik subtitle uchun */}
            <SplitText 
              text="Our solutions" 
              className="text-[#0B2C33] opacity-70 font-medium mb-4 block" 
            />
            
            {/* Asosiy sarlavha uchun */}
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0B2C33] leading-[1.1] mb-8">
              <SplitText text="One platform complete agriculture solutions" />
            </h2>

            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#E2F371] hover:bg-[#d4e65d] transition-colors px-8 py-3 rounded-full flex items-center gap-2 font-medium w-fit"
            >
              Contact us <span className="text-xl">→</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-6">
              <Card
                title="Precision farming"
                desc="Use advanced technology to monitor crops."
                tags={["Data"]}
                image={imageLink}
                height="md:h-[400px]"
              />
            </div>
            <div className="md:col-span-6">
              <Card
                title="Farm management system"
                desc="Plan, track, and manage every farming activity effortlessly."
                tags={["Efficiency", "Digital"]}
                image={imageLink}
                height="md:h-[500px]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Card
            title="Sustainable agriculture services"
            desc="Improve soil health, save resources, and grow responsibly with eco-friendly practices."
            tags={["Sustainability", "Smart Practices"]}
            image={imageLink}
            height="md:h-full md:min-h-[500px]"
          />
        </div>
      </div>
    </section>
  )
}

const Card = ({ title, desc, tags, image, height }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`relative rounded-[2.5rem] overflow-hidden group h-[300px] ${height} transform-gpu`}
  >
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500 z-10" />
    <img
      src={image}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      alt={title}
    />

    <div className="relative z-20 h-full p-8 flex flex-col justify-between text-white">
      <div>
        <h3 className="text-3xl font-semibold mb-4 leading-tight">{title}</h3>
        <p className="text-white/80 text-md">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
)

export default ForWhom
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Music, Award, Users, Calendar } from "lucide-react"
import AboutTextReveal from "./about-text-reveal"

export default function AboutSection() {
  const stats = [
    { icon: Calendar, label: "Best Days for Show?", value: "Everytime" },
    { icon: Music, label: "What it sounds like?", value: "Number One" },
    { icon: Award, label: "Who's The Coolest?", value: "Number One" },
    { icon: Users, label: "Are Coming to my Show?", value: "Number One" },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-black to-royal-blue/10 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/20 to-musgo-green/20 rounded-2xl blur-xl"></div>
              <Image
                src="/images/profile.jpg"
                alt="Rodriw Castel Portrait"
                width={500}
                height={600}
                className="relative rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-royal-blue to-musgo-green p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">🎵</div>
                  <div className="text-sm text-white/80 font-medium">A New Time Arrives</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-artist-red to-artist-purple">
                Rodriw Castel
              </span>
            </motion.h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <AboutTextReveal className="text-lg font-medium" delay={0}>
                Rodriw Castel is a South American artist born in São Paulo, Brazil, in 2002. He creates music in English, 
                drawing inspiration from artists like Beyoncé, Janet Jackson, Björk, Etta James, and Michael Jackson. 
                Through Alternative Pop, Rodriw shares his journey of self-discovery, turning doubt into expression 
                and finding his voice in a world full of noise.
              </AboutTextReveal>

              <AboutTextReveal delay={500}>
                His first single, “Melting Water,” was released on November 22, 2022. The song talks about love as a 
                powerful force that brings comfort during hard times. It marked the beginning of Rodriw’s musical path, 
                offering listeners a deep and emotional experience. 
                Later, on December 10, 2024, he released “Hey, There is Always a Kind of Day – Special Version,” inspired by
                a power outage during a storm. The track is about holding onto hope when everything around you seems to fall apart.
              </AboutTextReveal>

              <AboutTextReveal delay={1000}>
                <strong className="text-white font-semibold">Rodriw’s newest single,</strong> “Bill and Victoria,” 
                will be released on May 1, 2025. It tells the story of a magical, one-night connection at a house party with a girl 
                named Victoria—a name used to protect her real identity. The moment may have been brief, but it left a strong impact, 
                showing how one person can shine brighter than everyone else. As Rodriw sings: “All of the girls in my place, they'll
                come to the break of day, [...] they can't compare with Victoria, in one of her best days.”
              </AboutTextReveal>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700"
                >
                  <stat.icon className="w-8 h-8 text-royal-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

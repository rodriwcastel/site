"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Youtube } from "lucide-react"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzzggeln";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          alert("Message sent!");
        } else {
          alert("Failed to send message.");
        }
      })
      .catch(() => alert("Failed to send message."));
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "admin@rodriwcastel.site",
      href: "mailto:admin@rodriwcastel.site",
    },
    {
      icon: Phone,
      label: "Management",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Based in",
      value: "New York, NY",
      href: "#",
    },
  ]

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/rodriwcastel", color: "hover:text-pink-400" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/rodriwcastel", color: "hover:text-blue-400" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@rodriwcastel", color: "hover:text-red-400" },
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-musgo-green">
              Connect
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to collaborate, book a show, or just want to say hello? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all group border border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-royal-blue to-musgo-green text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon size={20} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-400">{info.label}</div>
                    <div className="text-lg font-medium text-white">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Follow the Journey</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all hover:scale-110 border border-gray-700`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-r from-royal-blue/20 to-musgo-green/20 rounded-xl border border-royal-blue/30"
            >
              <h4 className="text-lg font-semibold mb-2 text-white"> We've got Castel?</h4>
              <p className="text-gray-300">
                Looking for Rodriw Castel? Let's create SOMETHING NEW.
              </p>
            </motion.div>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors text-white placeholder-gray-400"
                  placeholder="Your full name"
                />
                </div>
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors text-white placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
                </label>
                <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors text-white placeholder-gray-400"
                placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
                </label>
                <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-colors resize-none text-white placeholder-gray-400"
                placeholder="Tell me about your project or inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-royal-blue to-musgo-green text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 group"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

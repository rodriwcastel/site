"use client"

import type React from "react"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    gsap: any
    SplitText: any
  }
}

interface TextRevealProps {
  children: React.ReactNode
  className?: string
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load GSAP and plugins
    const loadGSAP = async () => {
      if (typeof window === "undefined") return

      // Load GSAP
      if (!window.gsap) {
        const gsapScript = document.createElement("script")
        gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        document.head.appendChild(gsapScript)

        await new Promise((resolve) => {
          gsapScript.onload = resolve
        })
      }

      // Load SplitText
      if (!window.SplitText) {
        const splitTextScript = document.createElement("script")
        splitTextScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js"
        document.head.appendChild(splitTextScript)

        await new Promise((resolve) => {
          splitTextScript.onload = resolve
        })
      }

      initTextReveal()
    }

    const initTextReveal = () => {
      if (!textRef.current || !window.gsap) return

      let textRevealRadius = 100
      const textRevealPercent = 0.17

      // Simple split text implementation since we don't have the full SplitText plugin
      const textElement = textRef.current
      const text = textElement.textContent || ""
      textElement.innerHTML = ""

      // Split into characters
      const chars = text.split("").map((char, index) => {
        const span = document.createElement("span")
        span.textContent = char
        span.className = "char inline-block"
        span.setAttribute("data-orig", char)
        textElement.appendChild(span)
        return span
      })

      const upperAndLowerCase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
      const getRandomLetter = () => upperAndLowerCase[Math.floor(Math.random() * upperAndLowerCase.length)]

      let pageX = 0
      let pageY = 0
      let scrollY = window.pageYOffset
      let scrollX = window.pageXOffset

      let charData: Array<{
        el: HTMLElement
        pageY: number
        pageX: number
        isVisible: boolean
        orig: string
      }> = []

      function handleResize() {
        textRevealRadius = window.innerWidth * textRevealPercent
        updateCharData()
      }

      function updateCharData() {
        charData = chars.map((char) => {
          const bounds = char.getBoundingClientRect()
          return {
            el: char,
            pageY: bounds.top + scrollY + bounds.height / 2,
            pageX: bounds.left + scrollX + bounds.width / 2,
            isVisible: false,
            orig: char.getAttribute("data-orig") || char.textContent || "",
          }
        })
      }

      function updateText(e: any) {
        if ("pageX" in e) {
          pageX = e.pageX
          pageY = e.pageY
        } else {
          const scrollYDif = window.pageYOffset - scrollY
          const scrollXDif = window.pageXOffset - scrollX
          scrollY += scrollYDif
          scrollX += scrollXDif
          pageY += scrollYDif
          pageX += scrollXDif
        }

        charData.forEach((data) => {
          const dx = pageX - data.pageX
          const dy = pageY - data.pageY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const isVisible = dist < textRevealRadius

          if (isVisible !== data.isVisible || !isVisible) {
            data.isVisible = isVisible

            // Animate character reveal/scramble
            const targetText = isVisible ? data.orig : getRandomLetter()
            const duration = Math.max(0.1, Math.min(0.8, dist / textRevealRadius))

            window.gsap.to(data.el, {
              duration,
              ease: "power2.out",
              onUpdate: () => {
                if (!isVisible && Math.random() > 0.7) {
                  data.el.textContent = getRandomLetter()
                }
              },
              onComplete: () => {
                data.el.textContent = targetText
              },
            })
          }
        })
      }

      function init() {
        window.addEventListener("resize", handleResize)
        window.addEventListener("pointermove", updateText)
        window.addEventListener("scroll", updateText)

        handleResize()
        updateText({ pageX: 0, pageY: 0 })
      }

      init()

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("pointermove", updateText)
        window.removeEventListener("scroll", updateText)
      }
    }

    loadGSAP()
  }, [])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

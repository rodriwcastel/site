"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AboutTextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AboutTextReveal({ children, className = "", delay = 0 }: AboutTextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Load GSAP
    const loadGSAP = async () => {
      if (typeof window === "undefined") return

      if (!window.gsap) {
        const gsapScript = document.createElement("script")
        gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        document.head.appendChild(gsapScript)

        await new Promise((resolve) => {
          gsapScript.onload = resolve
        })
      }

      initIntersectionObserver()
    }

    const initIntersectionObserver = () => {
      if (!textRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              setIsVisible(true)
              setHasAnimated(true)
              setTimeout(() => {
                startTextRevealAnimation()
              }, delay)
            }
          })
        },
        {
          threshold: 0.3, // Trigger when 30% of the element is visible
          rootMargin: "0px 0px -100px 0px", // Start animation slightly before fully in view
        },
      )

      observer.observe(textRef.current)

      return () => {
        observer.disconnect()
      }
    }

    const startTextRevealAnimation = () => {
      if (!textRef.current || !window.gsap) return

      const textElement = textRef.current
      const text = textElement.textContent || ""
      textElement.innerHTML = ""

      // Split into characters
      const chars = text.split("").map((char, index) => {
        const span = document.createElement("span")
        span.textContent = char === " " ? "\u00A0" : char // Preserve spaces
        span.className = "char inline-block"
        span.setAttribute("data-orig", char)
        span.style.opacity = "0"
        textElement.appendChild(span)
        return span
      })

      const upperAndLowerCase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()".split("")
      const getRandomChar = () => upperAndLowerCase[Math.floor(Math.random() * upperAndLowerCase.length)]

      // Animation timeline
      const tl = window.gsap.timeline()

      // First, show all characters as random scrambled text
      chars.forEach((char, index) => {
        const originalChar = char.getAttribute("data-orig") || ""

        if (originalChar.trim() === "") {
          // Handle spaces - just fade them in
          tl.to(
            char,
            {
              opacity: 1,
              duration: 0.1,
            },
            index * 0.02,
          )
        } else {
          // Start with random character and fade in
          char.textContent = getRandomChar()
          tl.to(
            char,
            {
              opacity: 1,
              duration: 0.1,
            },
            index * 0.02,
          )

          // Scramble effect - change character multiple times
          for (let i = 0; i < 8; i++) {
            tl.to(
              char,
              {
                duration: 0.05,
                ease: "none",
                onStart: () => {
                  if (Math.random() > 0.3) {
                    char.textContent = getRandomChar()
                  }
                },
              },
              index * 0.02 + 0.1 + i * 0.05,
            )
          }

          // Finally reveal the original character
          tl.to(
            char,
            {
              duration: 0.2,
              ease: "power2.out",
              onStart: () => {
                char.textContent = originalChar
              },
              onComplete: () => {
                char.style.opacity = "1"
              },
            },
            index * 0.02 + 0.6,
          )
        }
      })

      // Ensure total animation duration is 1.5 seconds
      tl.duration(1.5)
    }

    loadGSAP()
  }, [delay, hasAnimated])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-black/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Rodriw Castel Logo"
              width={200}
              height={60}
              className="h-12 w-auto hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#home" className="text-gray-300 hover:text-royal-blue transition-colors font-medium">
              Home
            </Link>
            <Link href="#blog" className="text-gray-300 hover:text-royal-blue transition-colors font-medium">
              Blog
            </Link>
            <Link href="#music" className="text-gray-300 hover:text-royal-blue transition-colors font-medium">
              Music
            </Link>
            <Link href="#tour" className="text-gray-300 hover:text-royal-blue transition-colors font-medium">
              Tour
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-royal-blue transition-colors font-medium">
              About
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-royal-blue transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-md text-gray-300 hover:text-royal-blue">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#home"
                className="text-gray-300 hover:text-royal-blue transition-colors font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="#blog"
                className="text-gray-300 hover:text-royal-blue transition-colors font-medium"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                href="#music"
                className="text-gray-300 hover:text-royal-blue transition-colors font-medium"
                onClick={toggleMenu}
              >
                Music
              </Link>
              <Link
                href="#tour"
                className="text-gray-300 hover:text-royal-blue transition-colors font-medium"
                onClick={toggleMenu}
              >
                Tour
              </Link>
              <Link
                href="#about"
                className="text-gray-300 hover:text-royal-blue transition-colors font-medium"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-gray-300 hover:text-royal-blue transition-colors font-medium"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

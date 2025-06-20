"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Microscope, Sprout, Factory } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
// Correct QRCode dynamic import for react-qr-code
const QRCode = dynamic(
  () => import("react-qr-code").then(mod => mod.default),
  { ssr: false }
)

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const features = [
    {
      icon: Sprout,
      title: "Agriculture",
      description: "Learn about nuclear applications in crop improvement, pest control, and food preservation",
    },
    {
      icon: Microscope,
      title: "Medicine",
      description: "Explore nuclear medicine, radiotherapy, and diagnostic imaging technologies",
    },
    {
      icon: Factory,
      title: "Industry",
      description: "Discover industrial applications including material testing and quality control",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="INNOVATIDES" width={50} height={50} />
          <span className="text-2xl font-bold text-blue-900">INNOVATIDES</span>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="outline" className="bg-white text-blue-900 border-blue-200">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-blue-900 hover:bg-blue-800">Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
            Explore Nuclear
            <span className="block text-blue-600">Innovation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Understand the economic issues and applications of nuclear technologies in agriculture, medicine, and
            industry through interactive learning and assessments.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-lg px-8 py-4">
              Start Learning <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Animated Atom */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="relative w-64 h-64">
            <motion.div
              className="absolute inset-0 border-2 border-blue-300 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 border-2 border-blue-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-8 border-2 border-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-900 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Three Key Applications</h2>
          <p className="text-xl text-gray-600">Master the non-energy applications of nuclear technology</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-blue-100">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-blue-900" />
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Slideshow */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-8">
              {React.createElement(features[currentSlide].icon, { className: "w-12 h-12" })}
            </div>
            <h3 className="text-3xl font-bold mb-4">{features[currentSlide].title}</h3>
            <p className="text-xl max-w-2xl mx-auto">{features[currentSlide].description}</p>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-blue-700"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold text-blue-900 mb-6">Ready to Test Your Knowledge?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners exploring nuclear technology applications
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-lg px-8 py-4">
              Get Started Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>
      {/* QR Code Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Scan to Access Dashboard</h2>
        <p className="text-gray-600 mb-4">
          Scan this QR code with your mobile device to go directly to your dashboard.
        </p>
        <div className="flex justify-center">
          <Image
            src="/scan-me.jpg"
            alt="Scan this QR code to access the dashboard"
            width={180}
            height={180}
            className="rounded shadow"
          />
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/logo.png" alt="INNOVATIDES" width={40} height={40} />
            <span className="text-xl font-bold">INNOVATIDES</span>
          </div>
          <p className="text-blue-200">© 2024 INNOVATIDES. Advancing nuclear technology education.</p>
        </div>
      </footer>
    </div>
  )
}

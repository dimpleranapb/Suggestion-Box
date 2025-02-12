import React from 'react'
import Squares from '../Squares'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import Link from "next/link";
import ShinyText from "@/components/ShinyText";

export default function HeroSection() {
  return (
    <Squares
    speed={0.5}
    squareSize={40}
    direction="diagonal"
    borderColor="#fff"
    hoverFillColor="#222"
  
  >
    {/* Main Content */}
    <main className="relative flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 ">
      {/* Hero Section */}
      <section className="text-center mb-12 p-6 sm:p-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Dive into the World of Anonymous Conversations
        </h1>
        <p className="text-lg sm:text-xl md:text-xl font-bold text-white opacity-80 max-w-3xl mx-auto">
          Share your thoughts, ask questions, and receive anonymous feedback
          in a safe and engaging space. Everyone has a voice here.
        </p>
      </section>

      {/* Carousel Section */}
      <section className="w-full max-w-md mb-12 px-4">
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full rounded-xl overflow-hidden shadow-xl">
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <Card className="bg-white bg-opacity-90 shadow-lg rounded-xl">
                    <CardHeader className="text-2xl font-semibold text-blue-800">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex aspect-auto items-center justify-center p-6">
                      <span className="text-lg text-gray-700">{message.content}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-blue-800 bg-opacity-50 p-3 rounded-full shadow-md hover:bg-blue-700 transition-all" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-blue-800 bg-opacity-50 p-3 rounded-full shadow-md hover:bg-blue-700 transition-all" />
        </Carousel>
      </section>

      {/* Call to Action Section */}
      <section className="text-center mb-12">
        <p className="text-xl sm:text-2xl md:text-xl text-white mb-4">
          Ready to start your anonymous conversation?
        </p>
        <Link
          href="/sign-up"
          className="bg-gray-900 text-white p-3 rounded-lg font-bold border hover:bg-gray-800 transition-all"
        >
          <ShinyText text="SIGN UP NOW" disabled={false} speed={1} className="text-lg" />
        </Link>
      </section>
    </main>
  </Squares>
  )
}

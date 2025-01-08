"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import Link from "next/link";
import Squares from "@/components/Squares";
import ShinyText from "@/components/ShinyText";

export default function Page() {
  return (
    <>
      <div className="absolute -z-10 w-full h-full lg:h-[110%] top-0">
        {/* Squares component in the background */}
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#fff"
          hoverFillColor="#222"
        />
      </div>

      <main className="relative flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-black/75 z-9">
        {/* Hero Section */}
        <section className="text-center mb-8 p-6 sm:p-0 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Dive into the World of Anonymous Conversations
          </h1>

          <p className="text-lg sm:text-xl md:text-xl font-bold text-white opacity-80 max-w-3xl mx-auto">
            Share your thoughts, ask questions, and receive anonymous feedback
            in a safe and engaging space. Everyone has a voice here.
          </p>
        </section>

        {/* Carousel Section */}
        <section className="w-full max-w-md mb-12 px-4">
          {/* Adjusted width and added margin bottom */}
          <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-full rounded-xl overflow-hidden shadow-lg"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <Card className="bg-white bg-opacity-90 shadow-xl rounded-xl">
                      <CardHeader className="text-2xl font-semibold text-blue-800">
                        {message.title}
                      </CardHeader>
                      <CardContent className="flex aspect-auto items-center justify-center p-8">
                        <span className="text-lg text-gray-700">
                          {message.content}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-blue-800 bg-opacity-50 p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-blue-800 bg-opacity-50 p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all" />
          </Carousel>
        </section>

        {/* Call to Action Section */}
        <section className=" sm:mt-10 text-center bg-transparent">
          <p className="text-xl sm:text-2xl md:text-xl text-white mb-4">
            Ready to start your anonymous conversation?
          </p>
          <Link
            href="/sign-up"
            className="bg-gray-900 p-2  border rounded-lg  font-bold"
          >
            <ShinyText text="SIGN UP NOW" disabled={false} speed={1} className='' />
          </Link>
        </section>
      </main>
    </>
  );
}

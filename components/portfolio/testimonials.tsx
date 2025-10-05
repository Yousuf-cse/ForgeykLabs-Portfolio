"use client"

import Image from "next/image"

type Testimonial = {
  quote: string
  name: string
  role: string
  avatar?: string
  logo?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They delivered a production-ready AI workflow in weeks, not months. Our ops team saves hours every single day.",
    name: "Jordan Lee",
    role: "Head of Operations, TaskFlow",
    avatar: "/placeholder-user.jpg",
    logo: "/taskflow-logo.jpg",
  },
  {
    quote: "The automation and data visibility changed how our team works. Quality went up, time-to-ship went down.",
    name: "Maya Patel",
    role: "Product Lead, ShopConnect",
    avatar: "/placeholder-user.jpg",
    logo: "/shopconnect-logo.jpg",
  },
  {
    quote: "They align on outcomes and ship. The system has paid for itself multiple times over in efficiency gains.",
    name: "Chris Morgan",
    role: "Founder, ContentAI",
    avatar: "/placeholder-user.jpg",
    logo: "/contentai-logo.jpg",
  },
]

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="mb-12 md:mb-16">
      <div className="mb-6">
        <h2
          id="testimonials-heading"
          className="text-3xl md:text-4xl font-medium text-black dark:text-white text-balance"
        >
          Clients get results
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Real stories from teams who partnered with us to build AI-powered systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <figure key={idx} className="card p-6 flex flex-col h-full">
            <blockquote className="text-gray-900 dark:text-white text-base md:text-lg leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              {t.avatar ? (
                <Image
                  src={t.avatar || "/placeholder.svg"}
                  alt={`${t.name} avatar`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <span className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
              )}
              <div className="flex-1">
                <div className="font-medium text-black dark:text-white">{t.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.role}</div>
              </div>
              {t.logo && (
                <Image
                  src={t.logo || "/placeholder.svg"}
                  alt={`${t.name} company logo`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-md object-cover"
                />
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

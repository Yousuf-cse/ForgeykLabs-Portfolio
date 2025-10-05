"use client"

export default function ProblemWhy() {
  return (
    <section aria-labelledby="problem-why-heading" className="mb-12 md:mb-16">
      <h2 id="problem-why-heading" className="sr-only">
        The problem and why choose our solution
      </h2>

      <div className="card p-6 md:p-10">
        <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-pretty text-balance text-black dark:text-white">
          Teams are drowning in manual workflows, scattered tools, and slow delivery.{" "}
          <span className="accent-text">We design and ship AI-powered systems</span> that automate the repetitive,
          integrate what matters, and unlock faster, smarter execution across your business.
        </p>

        <div className="mt-6 md:mt-8">
          <h3 className="section-title text-lg md:text-xl">Why choose our solution</h3>
          <ul className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--ring)] mt-2 flex-shrink-0" aria-hidden="true" />
              Proven delivery with measurable outcomes on speed, quality, and cost.
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--ring)] mt-2 flex-shrink-0" aria-hidden="true" />
              Human-centered design that users actually adopt—not just another tool.
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--ring)] mt-2 flex-shrink-0" aria-hidden="true" />
              Flexible, maintainable systems that scale with your roadmap.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

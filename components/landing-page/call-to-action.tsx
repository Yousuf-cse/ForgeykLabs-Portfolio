import Image from "next/image"
import ContactFormButton from "./contact-form-button"

export default function CallToAction() {
  return (
    <section id="contact" className="my-20 flex justify-center">
      <div className="relative overflow-hidden max-w-6xl w-full">
        <div className="p-8 md:p-10 lg:p-12 flex flex-col items-center text-center">
          {/* Text content - centered */}
          <div className="z-10 max-w-2xl">
            <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              Your Next Big Idea <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">Starts</span> Here
            </h2>
            <p className="my-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
              Have an idea or a problem that needs solving?
            </p>
            <p className="mb-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
              Let's chat. We'll help you explore the best approach, map out a plan, and see if we're the right fit.
            </p>
            <div className="flex justify-center">
              <ContactFormButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { step: "1", title: "Browse Books", desc: "Find your favorite books easily." },
  { step: "2", title: "Place Order", desc: "Add to cart and pay securely." },
  { step: "3", title: "Fast Delivery", desc: "Get books delivered to your doorstep." },
];

const HowItWorks = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="my-20 px-4 md:px-12 text-center bg-gray-50 dark:bg-gray-900 py-16 rounded-lg">
      <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-gray-100">
        How BookCourier Works
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-8">
        {steps.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-black/40
                       rounded-xl p-6 flex-1 border border-gray-100 dark:border-gray-700
                       hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {item.step}
            </div>

            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
              {item.title}
            </h3>

            <p className="text-gray-500 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

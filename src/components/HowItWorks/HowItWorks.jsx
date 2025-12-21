import React from "react";
import { motion } from "framer-motion";

const steps = [
  { step: "1", title: "Browse Books", desc: "Find your favorite books easily." },
  { step: "2", title: "Place Order", desc: "Add to cart and pay securely." },
  { step: "3", title: "Fast Delivery", desc: "Get books delivered to your doorstep." },
];

const HowItWorks = () => {
  return (
    <section className="my-20 px-4 md:px-12 text-center">
      <h2 className="text-3xl font-bold mb-10">How BookCourier Works</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {steps.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white shadow-lg rounded-xl p-6 flex-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.3, duration: 0.5 }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">{item.step}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-500">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

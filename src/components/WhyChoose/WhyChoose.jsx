import React from "react";

const reasons = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description:
      "We ensure your books reach you quickly, anywhere in Bangladesh.",
  },
  {
    icon: "💳",
    title: "Secure Payment",
    description: "Safe and convenient payment options with instant confirmation.",
  },
  {
    icon: "📚",
    title: "Wide Selection",
    description:
      "Thousands of books from all genres, curated by expert librarians.",
  },
  {
    icon: "🤝",
    title: "Excellent Support",
    description:
      "Our friendly support team is ready to help with any questions.",
  },
];

const WhyChoose = () => {
  return (
   <section className="my-16 px-4 md:px-12 bg-gray-50 dark:bg-gray-900 py-16 rounded-lg">
  {/* Heading */}
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
      Why Choose <span className="text-blue-600 dark:text-blue-400">BookCourier</span>
    </h2>
    <p className="mt-4 text-gray-600 dark:text-gray-400">
      BookCourier makes buying books easier, faster, and safer than anywhere else.
    </p>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {reasons.map((reason, index) => (
      <div
        key={index}
        className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-black/40
                   border border-gray-100 dark:border-gray-700
                   rounded-xl p-6 flex flex-col items-center text-center
                   hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
      >
        <div className="text-5xl mb-4">
          {reason.icon}
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          {reason.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400">
          {reason.description}
        </p>
      </div>
    ))}
  </div>
</section>

  );
};

export default WhyChoose;

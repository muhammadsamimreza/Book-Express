const testimonials = [
  {
    name: "Md. Samim Reza",
    feedback: "Fast delivery and great customer service!",
  },
  {
    name: "Monirul Islam",
    feedback: "Huge collection of books, loved it!",
  },
  {
    name: "Ayesha Rahman",
    feedback: "Easy to browse and safe payment options.",
  },
];

const Testimonials = () => {
  return (
    <section className="my-20 px-4 md:px-12 text-center bg-gray-50 dark:bg-gray-900 py-16 rounded-lg">
  <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">
    What Our Customers Say
  </h2>

  <div className="grid gap-8 md:grid-cols-3">
    {testimonials.map((t, idx) => (
      <div key={idx} className="relative">
        {/* Card */}
        <div className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700
                        shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="text-5xl text-indigo-500/20 mb-4">“</div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t.feedback}
          </p>

          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
            {t.name}
          </h4>
        </div>
      </div>
    ))}
  </div>
</section>
  );
};

export default Testimonials;

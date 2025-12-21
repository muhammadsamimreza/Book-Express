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
    <section className="my-20 px-4 md:px-12 text-center bg-gray-50 py-16 rounded-lg">
      <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white p-6 shadow-lg rounded-xl">
            <p className="text-gray-600 mb-4">&quot;{t.feedback}&quot;</p>
            <h4 className="font-semibold">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

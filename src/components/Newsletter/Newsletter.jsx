const Newsletter = () => {
  return (
    <section className="my-20 px-4 md:px-12 bg-blue-600 text-white rounded-lg py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Updated with BookCourier</h2>
      <p className="mb-6">Subscribe to get the latest books and offers directly to your inbox.</p>
      <form className="flex flex-col sm:flex-row justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 rounded-lg text-black flex-1"
        />
        <button className="btn btn-white text-blue-600">Subscribe</button>
      </form>
    </section>
  );
};

export default Newsletter;

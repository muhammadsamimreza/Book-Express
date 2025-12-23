const Newsletter = () => {
  return (
    <section
      className="my-20 px-4 md:px-12 bg-blue-600 dark:bg-blue-700
                    text-white rounded-lg py-16 text-center"
    >
      <h2 className="text-3xl font-bold mb-4">Stay Updated with BookCourier</h2>

      <p className="mb-6 text-blue-100 dark:text-blue-200">
        Subscribe to get the latest books and offers directly to your inbox.
      </p>

      <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 rounded-lg flex-1
                 text-gray-900 dark:text-gray-100
                 bg-white dark:bg-gray-800
                 placeholder-gray-400 dark:placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button className="btn bg-white text-blue-600 dark:bg-gray-900 dark:text-blue-400">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;

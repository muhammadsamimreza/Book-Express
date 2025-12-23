import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books/latest?limit=6");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="my-16 bg-gray-50 dark:bg-gray-900 py-16 rounded-lg">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
    📚 Latest Books
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-12">
    {books.map(book => (
      <div
        key={book._id}
        className="card bg-white dark:bg-gray-800 shadow-xl dark:shadow-black/40
                   border border-gray-100 dark:border-gray-700
                   hover:-translate-y-1 transition-transform duration-300"
      >
        <figure>
          <img
            src={book.image}
            alt={book.title}
            className="h-56 w-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h3 className="card-title text-gray-900 dark:text-gray-100">
            {book.title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            By {book.author}
          </p>

          <p className="font-semibold text-gray-800 dark:text-gray-200">
            ৳ {book.price}
          </p>

          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-primary">
              View Details
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

  );
};

export default LatestBooks;

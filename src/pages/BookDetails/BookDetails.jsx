import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const {
    data: book = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id], 
    enabled: !!id, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/allbooks/${id}`);
      return res.data; 
    },
  });
  console.log(book);
  const handleOrder = (data) => {
    const orderInfo = {
      userName: user.displayName,
      userEmail: user.email,
      price: book.price,
      phone: data.phone,
      address: data.address,
      bookId: book._id,
      bookTitle: book.title,
      status: "pending",
      payment: "unpaid",
      date: new Date(),
    };
    console.log(orderInfo);

      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Order Now!"
}).then((result) => {
  if (result.isConfirmed) {
    axiosSecure.post("/orders", orderInfo)
      .then(res=>{
        console.log(res.data)
        reset()
        setIsModalOpen(false)
      })
    Swal.fire({
      title: "Order Confirm!",
      text: "Your order has been submited.",
      icon: "success"
    });
  }
});
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load</p>;
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Book Image */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <img
            src={book.photoURL}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Book Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {book.title}
          </h2>
          <p className="text-gray-600 mb-1">
            By <span className="font-medium">{book.author}</span>
          </p>
          <p className="text-primary font-semibold text-xl mb-4">
            ${book.price}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {book.description || "No description available."}
          </p>

          <button
            className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Order: {book.title}
            </h3>

            <form onSubmit={handleSubmit(handleOrder)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered w-full mt-1 bg-gray-100 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-full mt-1 bg-gray-100 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="Enter phone"
                  className="input input-bordered w-full mt-1 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Delivery Address</label>
                <textarea
                  {...register("address", { required: true })}
                  placeholder="Enter address"
                  className="textarea textarea-bordered w-full mt-1 rounded-lg"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary text-white w-full py-2 rounded-lg font-medium hover:bg-blue-600 transition"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;

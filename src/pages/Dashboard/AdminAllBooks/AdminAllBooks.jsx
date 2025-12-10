import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdminAllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load All Books (Admin Dashboard)

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["allbooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allbooks");
      return res.data;
    },
  });

  // Publish/Unpublish Mutation

  const statusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      await axiosSecure.patch(`/allbooks/${id}`, {
        status: newStatus,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allbooks"]);
    },
  });

  const handleStatusChange = (book) => {
    const newStatus = book.status === "published" ? "unpublished" : "published";
    statusMutation.mutate({ id: book._id, newStatus });
  };

  // Delete Mutation (Delete book + related orders)

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/allbooks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allbooks"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all orders of this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);

        Swal.fire(
          "Deleted!",
          "Book and its orders have been removed.",
          "success"
        );
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Manage Books</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Price</th>
            <th>Status</th>
            <th>Librarian</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => (
            <tr key={book._id}>
              <td>{index + 1}</td>

              <td className="font-semibold">{book.title}</td>

              <td>${book.price}</td>

              <td>
                <span
                  className={`badge ${
                    book.status === "published"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {book.status}
                </span>
              </td>

              <td>{book.addBy}</td>

              <td className="flex gap-2 justify-center">
                {/* Publish/Unpublish Button */}
                <button
                  onClick={() => handleStatusChange(book)}
                  className={`btn btn-sm ${
                    book.status === "published" ? "btn-warning" : "btn-success"
                  }`}
                >
                  {book.status === "published" ? "Unpublish" : "Publish"}
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllBooks;

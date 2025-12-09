import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EditBook = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Load single book data
  const { data: book, isLoading } = useQuery({
    queryKey: ["singleBook", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  // Set default values when book loaded
  React.useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  // Update API using mutation
  const mutation = useMutation({
    mutationFn: async (updated) => {
      const res = await axiosSecure.patch(`/books/${id}`, updated);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["singleBook"]);
      queryClient.invalidateQueries(["myBooks"]);
      Swal.fire("Updated!", "Book updated successfully!", "success");
      navigate("/dashboard/allBook");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading || !book) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-base-100 border rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">Edit Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="font-semibold">Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Author</label>
          <input
            {...register("author", { required: true })}
            type="text"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Image URL</label>
          <input
            {...register("photoURL", { required: true })}
            type="text"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Status</label>
          <select
            {...register("status")}
            className="select select-bordered w-full"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {data: book, isLoading,
    error,} = useQuery({
    queryKey: ["book", id],
    queryFn: async() => {
     const result = await axiosSecure.get(`/payment/${id}`)
     return result.data;
    },
  });
   if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load</p>;
  return (
    <div>
      <h1>paymet {book.price} for {book.bookTitle}</h1>
    </div>
  );
};

export default Payment;

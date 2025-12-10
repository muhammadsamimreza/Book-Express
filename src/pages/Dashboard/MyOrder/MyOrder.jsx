import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Load Orders by Email
  const {
    data: orders = [],
    isLoading,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  // Cancel Order Mutation
  const cancelOrderMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/orders/${id}`, { status: "cancelled" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user.email]); 
    },
  });

  const handleCancel = (id) => {
    cancelOrderMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Payment</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => {
            const isPending = order.status === "pending";
            const isPaid = order.payment === "paid";
            const isPayment = order.payment ==="unpaid"
           

            return (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td className="font-semibold">{order.bookTitle}</td>

                <td>{new Date(order.date).toLocaleDateString()}</td>

                <td>
                  <span
                    className={`badge ${
                      isPending
                        ? "badge-warning"
                        : isPaid
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      
                        isPayment
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="flex gap-2 justify-center">
                  {/* Cancel Button */}
                  {isPending && isPayment && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}

                  {/* Pay Now Button */}
                  {isPending && isPayment &&  (
                    <Link
                      to={`/dashboard/payment/${order._id}`}
                      className="btn btn-sm btn-success"
                    >
                      Pay Now
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;

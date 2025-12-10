import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
console.log(user)
  // Load all orders for books added by this librarian
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Cancel order
  const cancelOrderMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/orders/${id}`, { status: "cancelled" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user.email]);
    },
  });

  // Update order status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/orders/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user.email]);
    },
  });

  const handleCancel = (id) => cancelOrderMutation.mutate(id);

  const handleStatusChange = (id, newStatus) =>
    updateStatusMutation.mutate({ id, status: newStatus });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

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
            const isShipped = order.status === "shipped";
            const isDelivered = order.status === "delivered";
            const isPayment = order.payment ==="unpaid"

            // Determine badge color
            let badgeClass = "badge";
            if (isPending) badgeClass += " badge-warning";
            else if (isShipped) badgeClass += " badge-info";
            else if (isDelivered) badgeClass += " badge-success";
            else badgeClass += " badge-error";

            return (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{order.bookTitle}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>

                {/* Status */}
                <td>
                  <span className={badgeClass}>{order.status}</span>
                </td>
                {/*Payment Status */}
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

                {/* Actions */}
                <td className="flex gap-2 justify-center items-center">
                  {/* Cancel Button */}
                  {isPending && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}

                  {/* Status Dropdown */}
                  {order.status !== "cancelled" && (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="select select-sm select-bordered"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
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

export default AllOrders;

import React from "react";
import { Link } from "react-router";

const BookCard = ({book}) => {
 const { _id, title, author, price, photoURL } = book;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-4 flex flex-col">
      
      {/* Book Image */}
      <div className="w-full aspect-auto overflow-hidden rounded-lg mb-4">
        <img
          src={photoURL}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Book Info */}
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">by {author}</p>
      <p className="text-primary font-semibold mb-3">${price}</p>

      {/* Action */}
      <Link
       to={`/books/${_id}`}
        className="mt-auto bg-primary text-white text-center py-2 rounded-lg hover:bg-blue-600 transition font-medium"
      >
        View Details
      </Link>
    </div>
  );
};

export default BookCard;

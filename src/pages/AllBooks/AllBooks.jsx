import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BookCard from '../../components/bookCard/BookCard';

const AllBooks = () => {
    const axiosSecure = useAxiosSecure()
    const {data: books = []} = useQuery({
        queryKey: ['allbooks'],
        queryFn: async()=> {
                const result = await axiosSecure.get('/allbooks')
                return result.data
        }
    })
    return (
        <div>
            <h1>Books Avaiable {books.length} </h1>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center '>
                {
                    books.map(book=> <BookCard book={book} key={book._id}></BookCard>)
                }
            </div>
        </div>
    );
};

export default AllBooks;
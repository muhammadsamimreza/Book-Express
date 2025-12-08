import React from 'react';
import { Link } from 'react-router';

const paymentCancelled = () => {
    return (
        <div>
            <h1 className='text-3xl text-red-500 font-semibold'>Payment Cancelled</h1>
            <Link to="/dashboard/myorder"><button className='btn my-2'>Try Again</button></Link>
        </div>
    );
};

export default paymentCancelled;
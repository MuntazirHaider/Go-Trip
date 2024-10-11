import React, { useContext } from 'react'
import AddressInput from './AddressInput';
import Cars from './Cars';
import PaymentMethods from './PaymentMethods';
import { useRouter } from 'next/navigation';
import { RideAmountContext } from '@/app/context/RideAmountContext';

const Booking = () => {
    const router = useRouter();
    const { rideAmount } = useContext(RideAmountContext);
    return (
        <div className='p-5 h-[86vh] w-full overflow-hidden'>
            <h1 className='font-semibold text-2xl'>Booking</h1>
            <AddressInput />
            <Cars />
            <PaymentMethods />
            <button className={`w-full text-gray-700 bg-yellow-400 p-1 rounded-md mt-3 border-gray-300 border-[1px]  ${!rideAmount ? 'bg-gray-400' : 'hover:scale-105 transition-all hover:bg-white hover:text-yellow-500'}`} onClick={() => router.push('/payment')}disabled={!rideAmount}>
                Book
            </button>
        </div>
    )
}

export default Booking
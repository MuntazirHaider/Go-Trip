'use client'
import CarList from '@/public/data/CarList'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { CoordinatesContext } from '@/app/context/CoordinatesContext'
import { RideAmountContext } from '@/app/context/RideAmountContext'

const Cars = () => {
    const [selectedCar, setSelectedCar] = useState<any>()
    const { directionCoordinates } = useContext(CoordinatesContext);
    const { setRideAmount } = useContext(RideAmountContext);

    const getCost = (charges: any) => {
        return charges * Math.trunc(directionCoordinates?.routes[0].distance / 1000);
    }

    const selectCar = (charges: any, index: any) => {
        setSelectedCar(index);
        if (directionCoordinates?.routes) {
            setRideAmount(charges * Math.trunc(directionCoordinates?.routes[0].distance / 1000));
        }
    }
    return (
        <div className='mt-3'>
            <h2 className='font-semibold'>Select Ride</h2>
            <div className='grid max-[330px]:grid-cols-1 max-[520px]:grid-cols-2 max-[768px]:grid-cols-3 md:grid-cols-1 min-[1000px]:grid-cols-2 min-[1470px]:grid-cols-3'>
                {CarList.map((item, index) => (
                    <div key={index} className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-400 hover:scale-110 transition-all cursor-pointer flex justify-between flex-col ${selectedCar === index ? 'border-yellow-400 border-[2px]' : null}`} onClick={() => selectCar(item.charges, index)}>
                        <Image src={item.image} alt={item.name} width={75} height={90} className='flex justify-center items-center mx-auto' />
                        <div className='flex justify-between align-text-bottom'>
                            <h2 className='font-normal text-sm text-gray-500'>{item.name}</h2>
                            {directionCoordinates?.routes ?
                                <span className='font-normal text-sm text-gray-500'>₹{getCost(item.charges)}</span>
                                : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cars
'use client'
import CardList from '@/public/data/CardList'
import Image from 'next/image'
import React, { useState } from 'react'

const PaymentMethods = () => {
    const [selectedMethod, setSelectedMethod] = useState<any>();
    return (
        <div className='mt-3'>
            <h2 className='font-semibold'>Payment Methods</h2>
            <div className='grid grid-cols-5'>
                {CardList.map((method, index) => (
                    <div key={index} className={`m-2 p-2 flex justify-center items-center border-[1px] cursor-pointer rounded-md hover:border-yellow-400 hover:scale-110 transition-all ${index === selectedMethod ? 'border-yellow-400 border-[2px]' : null}`} onClick={() => setSelectedMethod(index)}>
                        <Image src={method.image} alt={method.name} width={method.width} height={method.height} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PaymentMethods
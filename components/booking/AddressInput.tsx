'use client'
import { CoordinatesContext } from '@/app/context/CoordinatesContext';
import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AddressInput = () => {
    const [sourceAddress, setSourceAddress] = useState<string>('');
    const [destinationAddress, setDestinationAddress] = useState<string>('');
    const [addressList, setAddressList] = useState<any>([]);
    const [isSourceActive, setIsSourceActive] = useState<any>(null);
    const { setSourceCoordinates, setDestinationCoordinates } = useContext(CoordinatesContext);
    const SessionToken = uuidv4();
    const MAPBOX_RETRIVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/';
    const PUBLIC_MAPBOX_ACCESS_KEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY;

    // API call to fetch suggestions
    const handleAddressSearch = async () => {
        try {
            const searchFor = isSourceActive ? sourceAddress : destinationAddress;
            if (!searchFor) return; // Don't search if input is empty
            const response = await fetch('/api/search-address?searchFor=' + searchFor, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json();
            setAddressList(result);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    }

    // Select source address
    const handleSelectSource = async (item: any) => {
        const address = `${item.name} ${item.full_address ? item.full_address : ''}`;
        setSourceAddress(address);
        setAddressList([]); // Clear the suggestions
        const response = await fetch(MAPBOX_RETRIVE_URL + item.mapbox_id + "?session_token=" + SessionToken + "&access_token=" + PUBLIC_MAPBOX_ACCESS_KEY);



        const result = await response.json();
        setSourceCoordinates({
            longitude: result.features[0].geometry.coordinates[0],
            latitude: result.features[0].geometry.coordinates[1],
        })
    };

    // Select destination address
    const handleSelectDestination = async (item: any) => {
        const address = `${item.name} ${item.full_address ? item.full_address : ''}`;
        setDestinationAddress(address);
        setAddressList([]); // Clear the suggestions
        const response = await fetch(MAPBOX_RETRIVE_URL + item.mapbox_id + "?session_token=" + SessionToken + "&access_token=" + PUBLIC_MAPBOX_ACCESS_KEY);

        const result = await response.json();
        setDestinationCoordinates({
            longitude: result.features[0].geometry.coordinates[0],
            latitude: result.features[0].geometry.coordinates[1],
        })
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsSourceActive(null);
            setAddressList([]);
        }, 200); // Adjust the delay as needed
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            handleAddressSearch();
        }, 1000);
        return () => clearTimeout(delayDebounce);
    }, [sourceAddress, destinationAddress]);

    return (
        <div className='mt-2'>
            {/* Source input */}
            <div>
                <label className='text-gray-400'>From?</label>
                <input
                    type="text"
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'
                    onChange={(e) => setSourceAddress(e.target.value)}
                    value={sourceAddress}
                    onBlur={() => handleBlur()}  // Hide suggestions on blur
                    onFocus={() => setIsSourceActive(true)} // Set focus to source input
                />
                {/* Source suggestions */}
                {addressList?.suggestions?.length > 0 && isSourceActive && (
                    <div className='shadow-md bg-white border border-gray-300 rounded-md mt-1'>
                        {addressList?.suggestions.map((item: any, index: number) => (
                            <h2
                                key={index}
                                className='p-2 hover:bg-gray-100 cursor-pointer'
                                onClick={() => handleSelectSource(item)}
                            >
                                {`${item.name} ${item.full_address ? item.full_address : ''}`}
                            </h2>
                        ))}
                    </div>
                )}
            </div>

            {/* Destination input */}
            <div className='mt-3'>
                <label className='text-gray-400'>To?</label>
                <input
                    type="text"
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    value={destinationAddress}
                    onBlur={() => handleBlur()}  // Hide suggestions on blur
                    onFocus={() => setIsSourceActive(false)} // Set focus to destination input
                />
                {/* Destination suggestions */}
                {addressList?.suggestions?.length > 0 && isSourceActive === false && (
                    <div className='shadow-md bg-white border border-gray-300 rounded-md mt-1'>
                        {addressList?.suggestions.map((item: any, index: number) => (
                            <h2
                                key={index}
                                className='p-2 hover:bg-gray-100 cursor-pointer'
                                onClick={() => handleSelectDestination(item)}
                            >
                                {`${item.name} ${item.full_address ? item.full_address : ''}`}
                            </h2>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressInput;

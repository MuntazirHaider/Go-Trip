import { CoordinatesContext } from '@/app/context/CoordinatesContext';
import { UserLocationContext } from '@/app/context/UserLocationContext';
import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'

const Markers = () => {
    const { userLocation } = useContext(UserLocationContext);
    const { sourceCoordinates, destinationCoordinates } = useContext(CoordinatesContext);
    
    return (
        <div>
            {/* login user marker */}
            {userLocation && <Marker longitude={userLocation?.longitude} latitude={userLocation?.latitude} anchor="bottom">
                <img src="/assets/userlocationpin.png" className='w-10 h-10' />
            </Marker>}

            {/* source marker */}
            {sourceCoordinates.length !== 0 && <Marker longitude={sourceCoordinates?.longitude} latitude={sourceCoordinates?.latitude} anchor="bottom">
                <img src="/assets/selectedpin.jpg" className='w-10 h-10' />
            </Marker>}

            {/* destination marker */}
            {destinationCoordinates.length !== 0 && <Marker longitude={destinationCoordinates?.longitude} latitude={destinationCoordinates?.latitude} anchor="bottom">
                <img src="/assets/selectedpin.jpg" className='w-10 h-10' />
            </Marker>}
        </div>
    )
}

export default Markers
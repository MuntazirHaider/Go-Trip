'use client'
// components
import Booking from "@/components/booking/Booking";
import MainMap from "@/components/map/MainMap";
import { useEffect, useState } from "react";
import { UserLocationContext } from "./context/UserLocationContext";
import { CoordinatesContext } from "./context/CoordinatesContext";
import { RideAmountContext } from "./context/RideAmountContext";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
  const [directionCoordinates, setDirectionCoordinates] = useState<any>([]);
  const [rideAmount, setRideAmount] = useState<any>();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })
  }

  useEffect(() => {
    getUserLocation();
  }, [])

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <CoordinatesContext.Provider value={{ sourceCoordinates, setSourceCoordinates, destinationCoordinates, setDestinationCoordinates, directionCoordinates, setDirectionCoordinates }}>
        <RideAmountContext.Provider value={{ rideAmount, setRideAmount }}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div>
              <Booking />
            </div>
            <div className="col-span-2 order-first md:order-last">
              <MainMap />
            </div>
          </div>
        </RideAmountContext.Provider>
      </CoordinatesContext.Provider>
    </UserLocationContext.Provider>
  );
}

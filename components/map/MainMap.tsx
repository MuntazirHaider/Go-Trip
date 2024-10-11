import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useContext, useEffect, useRef } from 'react';
import { UserLocationContext } from '@/app/context/UserLocationContext';
import { CoordinatesContext } from '@/app/context/CoordinatesContext';
import Markers from './Markers';
import { v4 as uuidv4 } from 'uuid';
import MapRoute from './MapRoute';
import DistanceTime from './DistanceTime';

const MainMap = () => {
  const { userLocation } = useContext(UserLocationContext);
  const { sourceCoordinates, destinationCoordinates, directionCoordinates, setDirectionCoordinates } = useContext(CoordinatesContext);
  const PUBLIC_MAPBOX_ACCESS_KEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY;
  const MAPBOX_DRIVING_ENDPOINT = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
  const SessionToken = uuidv4();
  const mapRef = useRef<any>();

  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates?.longitude, sourceCoordinates?.latitude],
        duration: 2500
      });
    }

    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [sourceCoordinates]);

  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates?.longitude, destinationCoordinates?.latitude],
        duration: 2500
      });
    }

    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  const getDirectionRoute = async () => {
    const response = await fetch(`${MAPBOX_DRIVING_ENDPOINT}${sourceCoordinates.longitude},${sourceCoordinates.latitude};${destinationCoordinates.longitude},${destinationCoordinates.latitude}?overview=full&geometries=geojson&access_token=${PUBLIC_MAPBOX_ACCESS_KEY}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    setDirectionCoordinates(result);
  }

  return (
    <div className="relative h-[86vh] w-full rounded-lg overflow-hidden">
      {userLocation ? (
        <Map
          ref={mapRef}
          mapboxAccessToken={PUBLIC_MAPBOX_ACCESS_KEY}
          initialViewState={{
            longitude: userLocation?.longitude,
            latitude: userLocation?.latitude,
            zoom: 14
          }}
          style={{ width: '100%', height: '86vh', borderRadius: 10 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Markers />
          {directionCoordinates?.routes ? (
            <MapRoute coordinates={directionCoordinates?.routes[0]?.geometry?.coordinates} />
          ) : null}
        </Map>
      ) : null}
      {/* Attach DistanceTime inside the map container */}
      <DistanceTime />
    </div>
  );
};

export default MainMap;

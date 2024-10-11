import { CoordinatesContext } from "@/app/context/CoordinatesContext";
import { useContext } from "react";

const DistanceTime = () => {
    const { directionCoordinates } = useContext(CoordinatesContext);

    return directionCoordinates?.routes && (
        <div className="absolute bottom-4 right-4 max-w-xs w-full bg-yellow-400 text-black rounded-lg shadow-lg p-4 transition-opacity duration-500 ease-out transform hover:scale-105 hover:shadow-xl sm:max-w-sm md:max-w-md z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <h4 className="font-bold text-lg flex items-center">
                    Distance:
                    <span className="text-sm text-gray-700 ml-2">
                        {(directionCoordinates?.routes[0].distance / 1000).toFixed(2)}Km
                    </span>
                </h4>
                <h4 className="font-bold text-lg flex items-center">
                    Time:
                    <span className="text-sm text-gray-700 ml-2">
                        {(directionCoordinates?.routes[0].duration / 60).toFixed(2)}Min
                    </span>
                </h4>
            </div>
        </div>
    );
};

export default DistanceTime;

import Map, { Source, Layer, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";

const osrmUrl = "https://router.project-osrm.org/route/v1/foot";

function GeoLocationMaping({ end }) {
  const [routeGeoJson, setRouteGeoJson] = useState(null);
  const [navigationData, setNavigationData] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // Changed from [] to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user's current location
  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by this browser");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to get your location");
          setLoading(false);
          // Fallback to default location
          setUserLocation([85.3068, 27.7043]);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    };

    getCurrentLocation();
  }, []);

  // Get route when user location is available
  useEffect(() => {
    if (!userLocation || userLocation.length !== 2) return;

    const getRoute = async () => {
      try {
        // Use userLocation instead of hardcoded start
        const url = `${osrmUrl}/${userLocation.join(",")};${end.join(
          ","
        )}?overview=full&geometries=geojson`;

        const res = await fetch(url);
        const data = await res.json();

        // Check if route exists
        if (data.routes && data.routes[0]) {
          const route = data.routes[0].geometry;

          setNavigationData(data.routes[0]);
          setRouteGeoJson({
            type: "Feature",
            geometry: route,
          });
        } else {
          console.error("No route found");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    getRoute();
  }, [userLocation]); // This will trigger when userLocation changes

  const routeLayer = {
    id: "route",
    type: "line",
    paint: {
      "line-color": "#ff0000",
      "line-width": 4,
    },
  };

  return (
    <div>
      {/* Loading state */}
      {loading && (
        <div className="py-4 text-center">
          <p>Getting your location...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="py-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Display route information */}
      {navigationData && (
        <div className="py-4 flex gap-5 mb-4">
          <p className="text-lg font-bold flex gap-2">
            Distance 📏:
            <span className="font-normal">
              {(navigationData.distance / 1000).toFixed(2)} km
            </span>
          </p>
          <p className="text-lg font-bold flex gap-2">
            Duration ⏱:
            <span className="font-normal">
              {(navigationData.duration / 60).toFixed(1)} minutes
            </span>
          </p>
        </div>
      )}

      <div style={{ height: "500px", width: "100%" }}>
        {userLocation && (
          <Map
            initialViewState={{
              longitude: userLocation[0], // Use user's actual longitude
              latitude: userLocation[1], // Use user's actual latitude
              zoom: 15,
            }}
            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=G0JzaoaaWpzTHgeOAjWx"
          >
            {/* User's Current Location Marker (Blue) */}
            <Marker
              longitude={userLocation[0]}
              latitude={userLocation[1]}
              color="blue"
            />

            {/* Destination Marker (Red) */}
            <Marker longitude={end[0]} latitude={end[1]} color="red" />

            {/* Route Line */}
            {routeGeoJson && (
              <Source id="route" type="geojson" data={routeGeoJson}>
                <Layer {...routeLayer} />
              </Source>
            )}
          </Map>
        )}
      </div>
    </div>
  );
}

export default GeoLocationMaping;

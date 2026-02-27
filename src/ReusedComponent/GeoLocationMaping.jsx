import React, { useState, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { Map, Marker, Source, Layer } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";

const MAPTILER_KEY = "G0JzaoaaWpzTHgeOAjWx";
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

function RouteForm() {
  const [routeDetail, setRouteDetail] = useState({
    routeName: "",
    sourceCity: "",
    destinationCity: "",
    distance: "",
    duration: "",
    price: "",
    latitudeS: "",
    longitudeS: "",
    latitudeD: "",
    longitudeD: "",
  });

  const [suggestions, setSuggestions] = useState({
    source: [],
    destination: [],
  });
  const [errors, setErrors] = useState({});
  const [routeGeoJSON, setRouteGeoJSON] = useState(null); // store the route line

  // Handle input change and suggestions
  const handleRouteDetailChange = (e) => {
    const { name, value } = e.target;
    setRouteDetail((pre) => ({ ...pre, [name]: value }));

    if (name === "sourceCity") fetchSuggestions("source", value);
    if (name === "destinationCity") fetchSuggestions("destination", value);
  };

  // Fetch geocoding suggestions
  const fetchSuggestions = async (type, query) => {
    if (!query) {
      setSuggestions((prev) => ({ ...prev, [type]: [] }));
      return;
    }
    try {
      const res = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          query
        )}.json?key=${MAPTILER_KEY}`
      );
      setSuggestions((prev) => ({ ...prev, [type]: res.data.features || [] }));
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  // When user selects a suggestion
  const handleSelectLocation = (type, place) => {
    const [longitude, latitude] = place.center;
    setRouteDetail((prev) => ({
      ...prev,
      [type === "source" ? "sourceCity" : "destinationCity"]: place.place_name,
      [type === "source" ? "latitudeS" : "latitudeD"]: latitude,
      [type === "source" ? "longitudeS" : "longitudeD"]: longitude,
    }));
    setSuggestions((prev) => ({ ...prev, [type]: [] }));
  };

  // Fetch and draw OSRM route when both source & destination are selected
  useEffect(() => {
    const { latitudeS, longitudeS, latitudeD, longitudeD } = routeDetail;

    if (latitudeS && longitudeS && latitudeD && longitudeD) {
      const fetchRoute = async () => {
        try {
          const res = await axios.get(
            `${OSRM_URL}/${longitudeS},${latitudeS};${longitudeD},${latitudeD}?overview=full&geometries=geojson`
          );

          const data = res.data.routes[0];
          const routeGeo = {
            type: "Feature",
            geometry: data.geometry,
          };

          setRouteGeoJSON(routeGeo);

          // Optional: set distance/duration automatically
          setRouteDetail((prev) => ({
            ...prev,
            distance: (data.distance / 1000).toFixed(2) + " km",
            duration: (data.duration / 60).toFixed(2) + " min",
          }));
        } catch (err) {
          console.error("OSRM route fetch error:", err);
        }
      };
      fetchRoute();
    }
  }, [
    routeDetail.latitudeS,
    routeDetail.longitudeS,
    routeDetail.latitudeD,
    routeDetail.longitudeD,
  ]);

  const ErrorText = ({ message }) => (
    <div className="min-h-[20px]">
      <span
        className={`text-[12px] ml-[8px] text-[#DC2626] flex items-center gap-[4px] transition-opacity duration-200 ${
          message ? "opacity-100" : "opacity-0"
        }`}
      >
        <MdErrorOutline className="text-[16px]" />
        {message || "placeholder"}
      </span>
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-[24px]">
        <h2 className="text-[22px] md:text-[24px] lg:text-[32px] font-semibold">
          Add Route
        </h2>
      </div>

      <form className="flex flex-col gap-[20px]">
        {/* Basic Info */}
        <div className="flex gap-[20px] w-full">
          <div className="flex flex-col w-full">
            <label>Route Name</label>
            <input
              type="text"
              name="routeName"
              value={routeDetail.routeName}
              onChange={handleRouteDetailChange}
              placeholder="Enter Route Name"
              className="border-[2px] border-black/50 outline-none mt-[8px] rounded-[10px] px-[16px] py-[8px]"
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Ticket Price</label>
            <input
              type="text"
              name="price"
              value={routeDetail.price}
              onChange={handleRouteDetailChange}
              placeholder="Enter Ticket Price"
              className="border-[2px] border-black/50 outline-none mt-[8px] rounded-[10px] px-[16px] py-[8px]"
            />
          </div>
        </div>

        {/* Source and Destination */}
        <div className="flex gap-[20px] w-full">
          <div className="mb-[16px] relative w-full">
            <label>Source City</label>
            <input
              type="text"
              name="sourceCity"
              value={routeDetail.sourceCity}
              onChange={handleRouteDetailChange}
              placeholder="Enter source location"
              className="border-[2px] w-full border-black/50 outline-none mt-[8px] rounded-[10px] px-[16px] py-[8px]"
            />
            {suggestions.source.length > 0 && (
              <ul className="absolute bg-white border w-full mt-1 rounded-lg shadow-lg z-10 max-h-[150px] overflow-y-auto">
                {suggestions.source.map((place) => (
                  <li
                    key={place.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectLocation("source", place)}
                  >
                    {place.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-[16px] relative w-full">
            <label>Destination City</label>
            <input
              type="text"
              name="destinationCity"
              value={routeDetail.destinationCity}
              onChange={handleRouteDetailChange}
              placeholder="Enter destination location"
              className="border-[2px] w-full border-black/50 outline-none mt-[8px] rounded-[10px] px-[16px] py-[8px]"
            />
            {suggestions.destination.length > 0 && (
              <ul className="absolute bg-white border w-full mt-1 rounded-lg shadow-lg z-10 max-h-[150px] overflow-y-auto">
                {suggestions.destination.map((place) => (
                  <li
                    key={place.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectLocation("destination", place)}
                  >
                    {place.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Map Display */}
        <div className="flex flex-col gap-[20px] w-full">
          <label>Route Map</label>
          <Map
            initialViewState={{
              longitude: 85.324,
              latitude: 27.7172,
              zoom: 9,
            }}
            style={{ width: "100%", height: "400px", borderRadius: "12px" }}
            mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`}
          >
            {/* Source Marker */}
            {routeDetail.latitudeS && routeDetail.longitudeS && (
              <Marker
                longitude={routeDetail.longitudeS}
                latitude={routeDetail.latitudeS}
                color="green"
              />
            )}
            {/* Destination Marker */}
            {routeDetail.latitudeD && routeDetail.longitudeD && (
              <Marker
                longitude={routeDetail.longitudeD}
                latitude={routeDetail.latitudeD}
                color="red"
              />
            )}
            {/* Draw route line */}
            {routeGeoJSON && (
              <Source id="route" type="geojson" data={routeGeoJSON}>
                <Layer
                  id="routeLine"
                  type="line"
                  paint={{
                    "line-color": "#0074D9",
                    "line-width": 4,
                  }}
                />
              </Source>
            )}
          </Map>
        </div>

        {/* Auto-filled Distance & Duration */}
        <div className="flex gap-[20px]">
          <div className="flex flex-col w-full">
            <label>Distance</label>
            <input
              type="text"
              name="distance"
              value={routeDetail.distance}
              readOnly
              className="border-[2px] border-black/50 outline-none mt-[8px] rounded-[10px] px-[16px] py-[8px] bg-gray-100"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={routeDetail.duration}
              readOnly
              className="border-[2px] border-black/50 outline-none mt-[8px] rounded-[10px] px-[16px] py-[8px] bg-gray-100"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default RouteForm;

import React, { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import { useDispatch, useSelector } from "react-redux";
import { futsalById } from "../../redux/futsalSlice/FutsalThunks";
import GeoLocationMaping from "../../ReusedComponent/GeoLocationMaping";
import { bookingList } from "../../redux/bookingSlice/BookingThunks";
import TimeSlot from "./TimeSlot";
import BookingModel from "./venueComponent/BookingModel";
import ChallengeModel from "./venueComponent/ChallengeModel";

function Slot() {
  const { success } = useSelector((state) => state.auth);
  const [listOfBookedGround, setListOfBookedGround] = useState([]);
  const dispatch = useDispatch();
  const [futsalData, setFutsalData] = useState(null);
  const [futsalList, setFutsalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { bookingType } = useOutletContext();
  const param = useParams();

  const futsalId = param.futsalId;
  const [selectDate, setSelectDate] = useState("");
  const [selectGround, setSelectGround] = useState(null);

  // Modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [playingTime, setPlayingTime] = useState({
    starting_time: "",
    ending_time: "",
  });

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Handle date change with proper validation
  const handleChangeDate = (e) => {
    const pickedDate = e.target.value;
    const today = getCurrentDate();

    if (pickedDate < today) {
      setError("Please select a valid date. Past dates are not allowed.");
      return;
    }

    setError(""); // Clear any previous errors
    setSelectDate(pickedDate);
  };

  // Get list of booked grounds with proper validation
  const getListOfBookedGround = useCallback(async () => {
    // Don't make API call if required data is missing
    if (!selectGround || !selectDate) {
      return;
    }

    try {
      setLoading(true);
      const listOfData = await dispatch(
        bookingList({
          groundId: selectGround,
          bookingDate: selectDate,
        })
      );
      setListOfBookedGround(listOfData.payload || []);
    } catch (error) {
      console.error("Error fetching booked grounds:", error);
      setError("Failed to load booking information. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [dispatch, selectGround, selectDate]);

  // Get futsal data by ID
  const getFutsalDataById = async (futsalId) => {
    if (!futsalId || futsalId === "0") {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await dispatch(futsalById(futsalId));
      const groundList = data.payload?.futsalGroundList || [];

      if (groundList.length === 0) {
        setError("No grounds available for this futsal.");
        return;
      }

      setFutsalList(groundList);
      setFutsalData(data.payload);
      setSelectGround(groundList[0].id);

      // Set initial date to today
      const today = getCurrentDate();
      setSelectDate(today);

      // Set first ground as default selection
      const firstGroundId = groundList[0]?.id;
      if (firstGroundId) {
        setSelectGround(firstGroundId);
      }
    } catch (error) {
      console.error("Error fetching futsal data:", error);
      setError("Failed to load futsal information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle ground selection
  const handleGroundSelect = (groundId) => {
    console.log("i have selected ground:", groundId);
    setSelectGround(groundId);
    setError("");
  };

  // Initial data fetch
  useEffect(() => {
    if (futsalId && futsalId !== "0") {
      getFutsalDataById(futsalId);
    }
  }, [futsalId]);

  // Fetch booked grounds when date or ground changes
  useEffect(() => {
    getListOfBookedGround();
  }, [getListOfBookedGround]);

  // Show loading state
  if (loading && !futsalData) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading futsal information...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="pt-[20px] text-[40px] text-[#27D483] font-semibold">
        Choose Slot For Match
      </h2>
      <p className="font-light opacity-50">
        Choose preferred date and time to play from the below options
      </p>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}

      <div>
        <div className="flex justify-between mt-[12px] md:mt-[16px] flex-wrap gap-[1rem]">
          {/* Date Selection */}
          <div className="flex items-center gap-[12px]">
            <label className="text-[14px] sm:text-[16px]">Selected date:</label>
            <div className="flex">
              <input
                type="date"
                placeholder="Search"
                value={selectDate}
                name="selectDate"
                onChange={handleChangeDate}
                min={getCurrentDate()} // Prevent past dates from being selectable
                className="text-[#39908F] border-none outline-none placeholder:text-[#39908F] bg-white text-[16px] p-[12px] sm:py-[12px] sm:px-[32px] rounded-[10px]"
              />
            </div>
          </div>

          {/* Available Grounds */}
          <div className="flex gap-[12px] items-center">
            <label className="text-[14px] sm:text-[16px]">
              Available Ground:
            </label>
            {futsalList?.length > 0 ? (
              futsalList.map((data, index) => {
                const groundId = data.id;
                return (
                  <button
                    key={groundId || index} // Use groundId as key if available
                    className={`rounded-[10px] p-[10px] text-[12px] sm:p-[12px] hover:-translate-y-1 duration-300 transition ease-in-out ${
                      selectGround === groundId
                        ? "bg-[#FACC15] text-[#FFFFFF]"
                        : "bg-[#27D483] text-white"
                    }`}
                    onClick={() => handleGroundSelect(data.id)}
                    disabled={loading}
                  >
                    {data.groundType} Ground
                  </button>
                );
              })
            ) : (
              <span className="text-gray-500">No grounds available</span>
            )}
          </div>
        </div>
      </div>

      {/* Available slot of futsal Ground */}
      {selectGround && selectDate && (
        <div className="mt-[60px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-[1rem] sm:gap-[2rem] md:justify-start">
          {loading ? (
            <div className="col-span-full text-center py-8">
              Loading time slots...
            </div>
          ) : (
            <TimeSlot
              success={success}
              bookingType={bookingType}
              handleOpen={handleOpen}
              handleOpen2={handleOpen2}
              setPlayingTime={setPlayingTime}
              futsalData={futsalData}
              futsalList={futsalList}
              listOfBookedGround={listOfBookedGround}
            />
          )}
        </div>
      )}

      {/* Map Section */}
      {futsalData && (
        <div className="mt-[60px] mb-[1rem]">
          <h2 className="text-[40px] font-semibold mb-6">Futsal Location</h2>
          <GeoLocationMaping
            end={futsalData.coordinates || [85.314, 27.7056]}
          />
        </div>
      )}

      {/* Booking Modal */}
      <BookingModel
        open={open}
        handleClose={handleClose}
        groundDetail={futsalList}
        playingTime={playingTime}
        setPlayingTime={setPlayingTime}
        selectDate={selectDate}
        bookingType={bookingType}
        groundId={selectGround}
        getListOfBookedGround={getListOfBookedGround}
      />

      {/* Challenge Modal */}
      <ChallengeModel
        open2={open2}
        handleClose2={handleClose2}
        selectDate={selectDate}
        groundDetail={futsalList}
        playingTime={playingTime}
        bookingType={bookingType}
        groundId={selectGround}
        getListOfBookedGround={getListOfBookedGround}
      />
    </div>
  );
}

export default Slot;

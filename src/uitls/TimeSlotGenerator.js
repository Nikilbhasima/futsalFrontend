// Convert "7AM" to "07:00"
function convertTo24Hour(time12h) {
  const [time, modifier] = time12h.split(/([AP]M)/);
  let [hours, minutes] = time.split(":");

  if (!minutes) minutes = "00";
  hours = parseInt(hours, 10);

  if (hours === 12) {
    hours = modifier === "AM" ? 0 : 12;
  } else if (modifier === "PM") {
    hours += 12;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

// Convert "07:00" to "7:00AM"
function convertTo12Hour(time24h) {
  const [hours, minutes] = time24h.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes}${ampm}`;
}

// Main function to generate time slots
// export function generateTimeSlots(openingTime, closingTime, slotDuration) {
//   const slots = [];

//   // Convert to 24-hour format
//   const startTime = convertTo24Hour(openingTime);
//   const endTime = convertTo24Hour(closingTime);

//   // Get hours and minutes as numbers
//   const [startHour, startMin] = startTime.split(":").map(Number);
//   const [endHour, endMin] = endTime.split(":").map(Number);

//   let currentHour = startHour;
//   let currentMin = startMin;

//   // Generate slots
//   while (
//     currentHour < endHour ||
//     (currentHour === endHour && currentMin < endMin)
//   ) {
//     // Current slot start time
//     const slotStart = `${currentHour.toString().padStart(2, "0")}:${currentMin
//       .toString()
//       .padStart(2, "0")}`;

//     // Calculate slot end time
//     let nextHour = currentHour;
//     let nextMin = currentMin + slotDuration;

//     if (nextMin >= 60) {
//       nextHour += Math.floor(nextMin / 60);
//       nextMin = nextMin % 60;
//     }

//     const slotEnd = `${nextHour.toString().padStart(2, "0")}:${nextMin
//       .toString()
//       .padStart(2, "0")}`;

//     // Only add if slot doesn't exceed closing time
//     if (nextHour < endHour || (nextHour === endHour && nextMin <= endMin)) {
//       slots.push({
//         id: slots.length + 1,
//         startTime: slotStart,
//         endTime: slotEnd,
//         displayTime: `${convertTo12Hour(slotStart)} - ${convertTo12Hour(
//           slotEnd
//         )}`,
//       });
//     }

//     // Move to next slot
//     currentHour = nextHour;
//     currentMin = nextMin;
//   }

//   return slots;
// }
export function generateTimeSlots(openingTime, closingTime, slotDuration) {
  const slots = [];

  // Convert to 24-hour format
  const startTime = convertTo24Hour(openingTime);
  const endTime = convertTo24Hour(closingTime);

  // Get hours and minutes as numbers
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  let currentHour = startHour;
  let currentMin = startMin;

  // Generate slots
  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMin < endMin)
  ) {
    // Current slot start time
    const slotStart = `${currentHour.toString().padStart(2, "0")}:${currentMin
      .toString()
      .padStart(2, "0")}`;

    // Calculate slot end time
    let nextHour = currentHour;
    let nextMin = currentMin + slotDuration;

    if (nextMin >= 60) {
      nextHour += Math.floor(nextMin / 60);
      nextMin = nextMin % 60;
    }

    const slotEnd = `${nextHour.toString().padStart(2, "0")}:${nextMin
      .toString()
      .padStart(2, "0")}`;

    // Only add if slot doesn't exceed closing time
    if (nextHour < endHour || (nextHour === endHour && nextMin <= endMin)) {
      slots.push({
        id: slots.length + 1,
        startTime: slotStart,
        endTime: slotEnd,
        startTimeDisplay: convertTo12Hour(slotStart),
        endTimeDisplay: convertTo12Hour(slotEnd),
        displayTime: `${convertTo12Hour(slotStart)} - ${convertTo12Hour(
          slotEnd
        )}`,
      });
    }

    // Move to next slot
    currentHour = nextHour;
    currentMin = nextMin;
  }

  return slots;
}
// Example usage with your futsal data
const futsalData = {
  futsalName: "Promotional",
  futsalOpeningHours: "6AM",
  futsalClosingHours: "9PM",
  futsalAddress: "Madhyapur, Thimi, Chardobato",
};

// this function call to generate time slote
// export const timeSlots = generateTimeSlots(st);

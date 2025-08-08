// Convert Java LocalTime format "05:00" to "5:00AM" for display
function convertTo12Hour(time24h) {
  const [hours, minutes] = time24h.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes}${ampm}`;
}

// Validate Java LocalTime format (HH:mm)
export function isValidLocalTime(timeString) {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}

// Convert time string to minutes for easier calculation
function timeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

// Convert minutes back to LocalTime format
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

// Main function to generate time slots compatible with Java LocalTime
export function generateTimeSlots(openingTime, closingTime, slotDuration) {
  // Validate input format
  if (!isValidLocalTime(openingTime) || !isValidLocalTime(closingTime)) {
    throw new Error(
      "Time must be in LocalTime format (HH:mm), e.g., '05:00', '20:00'"
    );
  }

  if (slotDuration <= 0 || slotDuration > 720) {
    throw new Error("Slot duration must be between 1 and 720 minutes");
  }

  const slots = [];

  // Convert times to minutes for easier calculation
  const startMinutes = timeToMinutes(openingTime);
  const endMinutes = timeToMinutes(closingTime);

  // Handle case where closing time is next day (e.g., 22:00 to 02:00)
  const actualEndMinutes =
    endMinutes <= startMinutes ? endMinutes + 24 * 60 : endMinutes;

  let currentMinutes = startMinutes;
  let slotId = 1;

  // Generate slots
  while (currentMinutes < actualEndMinutes) {
    const slotStartMinutes = currentMinutes;
    const slotEndMinutes = currentMinutes + slotDuration;

    // Don't create slot if it exceeds closing time
    if (slotEndMinutes > actualEndMinutes) {
      break;
    }

    // Convert back to LocalTime format
    const slotStart = minutesToTime(slotStartMinutes % (24 * 60));
    const slotEnd = minutesToTime(slotEndMinutes % (24 * 60));

    slots.push({
      id: slotId++,
      startTime: slotStart, // Java LocalTime format: "05:00"
      endTime: slotEnd, // Java LocalTime format: "06:00"
      startTimeDisplay: convertTo12Hour(slotStart), // Display format: "5:00AM"
      endTimeDisplay: convertTo12Hour(slotEnd), // Display format: "6:00AM"
      displayTime: `${convertTo12Hour(slotStart)} - ${convertTo12Hour(
        slotEnd
      )}`, // "5:00AM - 6:00AM"
      duration: slotDuration, // Duration in minutes
    });

    currentMinutes += slotDuration;
  }

  return slots;
}

// Utility function to get current time in LocalTime format
export function getCurrentLocalTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Utility function to check if a time slot is available (not in the past)
export function isSlotAvailable(slotStartTime, selectedDate = null) {
  const now = new Date();
  const today = now.toISOString().split("T")[0]; // YYYY-MM-DD format

  // If no date provided or date is today, check if time has passed
  if (!selectedDate || selectedDate === today) {
    const currentTime = getCurrentLocalTime();
    return slotStartTime >= currentTime;
  }

  // If date is in the future, slot is available
  return selectedDate > today;
}

// Generate time slots
export const generateFutsalTimeSlots = (
  openingTime,
  closingTime,
  duration = 60
) => {
  try {
    return generateTimeSlots(openingTime, closingTime, duration);
  } catch (error) {
    console.error("Error generating time slots:", error.message);
    return [];
  }
};

// remove last two digit of time
export function removeSeconds(timeString) {
  return timeString.length === 8 ? timeString.slice(0, 5) : timeString;
}

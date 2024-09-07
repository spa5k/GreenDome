/**
 * Formats the given number of seconds into a time string in the format "HH:MM:SS".
 *
 * @param seconds - The number of seconds to format.
 * @returns The formatted time string.
 */
export function timeFormatter(seconds: number) {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // Format each part to be two digits
  const formattedHours = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");

  // Concatenate the parts into the final format
  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

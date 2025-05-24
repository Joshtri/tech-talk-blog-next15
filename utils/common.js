export function formatDateSafe(dateString) {
  if (!dateString) return "Waktu tidak tersedia";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Waktu tidak tersedia";
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

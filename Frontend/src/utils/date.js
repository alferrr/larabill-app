// src/utils/date.js

export function getDayName(date = new Date()) {
  return date.toLocaleDateString("en-PH", {
    weekday: "long",
  });
}

export function getFullDate(date = new Date()) {
  return date.toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

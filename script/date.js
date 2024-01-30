import { MONTH_STRING } from "./constants.js";

export default function createDateManager() {
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  function setDate() {
    const currentDate = new Date();
    day.innerText = currentDate.getDate();
    year.innerText = currentDate.getFullYear();
    month.innerText = MONTH_STRING[currentDate.getMonth()] || "ошибка";
  }

  return {
    setDate,
  };
}

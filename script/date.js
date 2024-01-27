export default function createDateManager() {
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  function convertMonthToText(num) {
    let string;
    switch (num) {
      case 0:
        string = "January,";
        break;

      case 1:
        string = "February,";
        break;

      case 2:
        string = "March,";
        break;

      case 3:
        string = "April,";
        break;

      case 4:
        string = "May,";
        break;

      case 5:
        string = "June,";
        break;

      case 6:
        string = "July,";
        break;

      case 7:
        string = "August,";
        break;

      case 8:
        string = "September,";
        break;

      case 9:
        string = "October,";
        break;

      case 10:
        string = "November,";
        break;

      case 11:
        string = "December,";
        break;

      default:
        string = "ошибка";
        break;
    }
    return string;
  }

  function setDate() {
    const currentDate = new Date();
    day.innerText = currentDate.getDate();
    year.innerText = currentDate.getFullYear();
    month.innerText = convertMonthToText(currentDate.getMonth());
  }

  return {
    setDate,
  };
}

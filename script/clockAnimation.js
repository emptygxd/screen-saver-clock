export default function createAnimationManager() {
  const clocks = document.getElementById("clocks");
  const hourArrow = document.getElementById("hourArrow");
  const minArrow = document.getElementById("minArrow");

  function animateHourArrow(hourNum) {
    hourArrow.style.transform = `rotate(${hourNum * 30}deg)`;
  }

  function animateMinArrow(minNum) {
    minArrow.style.transform = `rotate(${minNum * 6}deg)`;
  }

  return {
    animateHourArrow,
    animateMinArrow,
  };
}

import createTimeManager from "./time.js";
import createDateManager from "./date.js";
import createAnimationManager from "./clockAnimation.js";

const timeManager = createTimeManager();
const DateManager = createDateManager();
const AnimationManager = createAnimationManager()

window.updateTime = timeManager.updateTime;
window.setDate = DateManager.setDate;
window.animateHourArrow = AnimationManager.animateHourArrow
window.animateMinArrow = AnimationManager.animateMinArrow

updateTime()
setDate();

const interval = setInterval(() => {
  let zeroString = updateTime();
  let cutString = zeroString.split(":");
  const min = cutString[1];
  const hour = cutString[0];
  animateHourArrow(hour)
  animateMinArrow(min)
 
  if (zeroString === "0:0:0") {
    setDate();
  }
}, 1000);

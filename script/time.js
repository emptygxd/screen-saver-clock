export default function createTimeManager() {
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  class getTime {
    get sec() {
      let currentTime = new Date();

      return currentTime.getSeconds() < 10
        ? "0" + currentTime.getSeconds()
        : currentTime.getSeconds();
    }

    get min() {
      let currentTime = new Date();

      return currentTime.getMinutes() < 10
        ? "0" + currentTime.getMinutes()
        : currentTime.getMinutes();
    }

    get hour() {
      let currentTime = new Date();

      return currentTime.getHours() < 10
        ? "0" + currentTime.getHours()
        : currentTime.getHours();
    }
  }

  function setTimeOnLoad(parent, h1Class, time) {
    let oldH1 = document.createElement("h1");
    oldH1.classList.add(h1Class);
    oldH1.classList.add("oldElem");
    oldH1.innerHTML = time;
    parent.appendChild(oldH1);
  }

  function removeOld(h1Class, parent) {
    let old = parent.querySelector("." + h1Class + ".oldElem");
    if (old !== null) {
      old.classList.add("moveBot");
      setTimeout(() => {
        old.classList.add("hide");
      }, 1000);
      setTimeout(() => {
        parent.removeChild(old);
      }, 1300);
    }
  }

  function fromZeroToBot(parent, newH1) {
    newH1.classList.add("moveBot");
    setTimeout(() => {
      newH1.classList.add("hide");
    }, 1000);
    setTimeout(() => {
      parent.removeChild(newH1);
    }, 1300);
  }

  function createNext(parent, h1Class, time, delay) {
    let h1 = document.createElement("h1");
    h1.classList.add(h1Class);
    h1.classList.add("moveTop");
    h1.innerHTML = time;
    parent.appendChild(h1);
    setTimeout(() => {
      h1.classList.remove("moveTop");
    }, 1000);
    setTimeout(() => {
      fromZeroToBot(parent, h1);
    }, delay);
  }

  let currentTimeOnLoad = new getTime();

  let hourOnLoad = currentTimeOnLoad.hour;
  let minOnLoad = currentTimeOnLoad.min;
  let secOnLoad = currentTimeOnLoad.sec;

  setTimeOnLoad(seconds, "firstS", parseInt(secOnLoad / 10));
  setTimeOnLoad(minutes, "firstM", parseInt(minOnLoad / 10));
  setTimeOnLoad(minutes, "secondM", minOnLoad % 10);
  setTimeOnLoad(hours, "firstH", parseInt(hourOnLoad / 10));
  setTimeOnLoad(hours, "secondH", hourOnLoad % 10);

  function updateTime() {
    let currentTime = new getTime();

    let hour = currentTime.hour;
    let min = currentTime.min;
    let sec = currentTime.sec;

    createNext(seconds, "secondS", sec % 10, 1000);

    if (sec % 10 === 0) {
      removeOld("firstS", seconds);
      createNext(seconds, "firstS", parseInt(sec / 10), 10000);
    }

    if (parseInt(sec / 10) === 0 && sec % 10 === 0) {
      removeOld("secondM", minutes);
      createNext(minutes, "secondM", min % 10, 60000);
    }

    if (min % 10 === 0 && parseInt(sec / 10) === 0 && sec % 10 === 0) {
      removeOld("firstM", minutes);
      createNext(minutes, "firstM", parseInt(min / 10), 600000);
    }

    if (
      parseInt(min / 10) === 0 &&
      min % 10 === 0 &&
      parseInt(sec / 10) === 0 &&
      sec % 10 === 0
    ) {
      console.log(parseInt(min / 10));
      removeOld("secondH", hours);
      createNext(hours, "secondH", hour % 10, (3.6e+6));
    }

    if (
      hour % 10 === 0 &&
      parseInt(min / 10) === 0 &&
      min % 10 === 0 &&
      parseInt(sec / 10) === 0 &&
      sec % 10 === 0
    ) {
      removeOld("firstH", hours);
      createNext(hours, "firstH", parseInt(hour / 10), (3.6e+7));
    }

    return `${hour}:${min}:${sec}`;
  }

  return {
    updateTime,
  };
}

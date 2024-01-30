export default function createTimeManager() {
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  // 'December 17, 1995 11:11:11'
  class getTime {
    get getDate() {
      return new Date();
    }
    get sec() {
      let currentTime = this.getDate;

      return currentTime.getSeconds() < 10
        ? "0" + currentTime.getSeconds()
        : currentTime.getSeconds();
    }

    get min() {
      let currentTime = this.getDate;

      return currentTime.getMinutes() < 10
        ? "0" + currentTime.getMinutes()
        : currentTime.getMinutes();
    }

    get hour() {
      let currentTime = this.getDate;

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

  function fromZeroToBot(parent, newH1) {
    newH1.classList.add("moveBot");
    newH1.classList.add("hide");
    setTimeout(() => {
      parent.removeChild(newH1);
    }, 500);
  }

  function removeOld(parent, h1Class) {
    let old = parent.querySelector("." + h1Class + ".oldElem");
    if (old !== null) {
      fromZeroToBot(parent, old);
    }
  }

  function createNext(parent, h1Class, time) {
    let h1 = document.createElement("h1");
    h1.classList.add(h1Class);
    h1.classList.add("moveTop");
    h1.innerHTML = time;
    parent.appendChild(h1);
    setTimeout(() => {
      h1.classList.remove("moveTop");
      h1.classList.add("oldElem");
    }, 650);
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

    createNext(seconds, "secondS", sec % 10);
    removeOld(seconds, "secondS");

    if (sec % 10 === 0) {
      removeOld(seconds, "firstS");
      createNext(seconds, "firstS", parseInt(sec / 10));
    }

    if (parseInt(sec / 10) === 0 && sec % 10 === 0) {
      removeOld(minutes, "secondM");
      createNext(minutes, "secondM", min % 10);
    }

    if (min % 10 === 0 && parseInt(sec / 10) === 0 && sec % 10 === 0) {
      removeOld(minutes, "firstM");
      createNext(minutes, "firstM", parseInt(min / 10));
    }

    if (
      parseInt(min / 10) === 0 &&
      min % 10 === 0 &&
      parseInt(sec / 10) === 0 &&
      sec % 10 === 0
    ) {
      removeOld(hours, "secondH");
      createNext(hours, "secondH", hour % 10);
    }

    if (
      hour % 10 === 0 &&
      parseInt(min / 10) === 0 &&
      min % 10 === 0 &&
      parseInt(sec / 10) === 0 &&
      sec % 10 === 0
    ) {
      removeOld(hours, "firstH");
      createNext(hours, "firstH", parseInt(hour / 10));
    }

    return `${hour}:${min}:${sec}`;
  }

  return {
    updateTime,
  };
}

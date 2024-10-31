const rangeE1 = document.getElementById("timerrange");
const displayRange = document.getElementById("rangevalue");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const h = document.getElementById("hour");
const m = document.getElementById("min");
const s = document.getElementById("sec");
const message = document.getElementById("message");
const progressE1 = document.getElementById("progress");
const resetE1 = document.getElementById("reset");

let totalHour = Number(rangeE1.value);
let totalTimeMilliseconds = totalHour * 60 * 60 * 1000;
let setTime = totalTimeMilliseconds; // milliseconds
displayRange.textContent = totalHour;

// Update time and progress bar on range change
rangeE1.addEventListener("change", () => {
  totalHour = Number(rangeE1.value);
  totalTimeMilliseconds = totalHour * 60 * 60 * 1000;
  setTime = totalTimeMilliseconds; // Reset setTime to new total
  displayRange.textContent = totalHour;
  progressE1.value = 100; // Reset progress bar when range is changed
});

let stoptimerID;

// Start/Pause button click event
btn1.addEventListener("click", () => {
  if (btn1.disabled == false) {
    btn1.disabled = true; // Disable button while timer is running
    message.textContent = "Timer is now running! Stay focused!";
    message.style.color = "rgb(53, 194, 25)";
    btn1.textContent = "Running...";
    btn1.style.background = "rgb(53, 194, 25)";
    btn1.style.color = "#fff";

    // Start the timer
    stoptimerID = setInterval(() => {
      setTime -= 1000; // Decrease time by 1 second
      let remainingTime = (setTime / totalTimeMilliseconds) * 100; // Calculate remaining percentage

      // Ensure remainingTime is capped between 0 and 100
      remainingTime = Math.min(Math.max(remainingTime, 0), 100);
      progressE1.value = remainingTime; // Update progress bar

      // Calculate hours, minutes, and seconds
      const hours = Math.floor(setTime / (60 * 60 * 1000));
      const minutes = Math.floor((setTime % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((setTime % (60 * 1000)) / 1000);

      // Update timer display with zero-padding
      h.textContent = String(hours).padStart(2, "0");
      m.textContent = String(minutes).padStart(2, "0");
      s.textContent = String(seconds).padStart(2, "0");

      // Check if time has run out
      if (setTime <= 0) {
        clearInterval(stoptimerID); // Stop the timer
        h.textContent = "00";
        m.textContent = "00";
        s.textContent = "00";
        message.textContent = "Time's up! Great job!";
        message.style.color = "#fff";
        message.style.backgroundColor = "rgb(23, 176, 176)";
        message.style.animation = "none"; // Remove animation if applicable
        btn1.disabled = true; // Disable start button
      }
    }, 1000);
  } else {
    // Pause timer
    clearInterval(stoptimerID); // Stop the interval
    btn1.disabled = false; // Re-enable the button
    btn1.textContent = "Resume"; // Change button text to "Resume"
    btn1.style.background = "yellow"; // Change button color
    btn1.style.color = "black";
    message.textContent = "Paused! Click 'Resume' to continue your timer.";
    message.style.color = "yellow";
  }
});

// Stop button click event
btn2.addEventListener("click", () => {
  clearInterval(stoptimerID); // Stop the timer
  btn1.disabled = false; // Re-enable start button
  btn1.textContent = "Resume"; // Reset button text to "Resume"
  btn1.style.background = "yellow"; // Change button color
  btn1.style.color = "black";
  message.textContent = "Timer stopped. You can reset or continue.";
  message.style.color = "red"; // Indicate the timer has been stopped
});

resetE1.addEventListener("click", (e) => {
  location.reload();
});

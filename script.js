/***********************************************************************************************
-------------------------------------CLOCK-BLOCK-START------------------------------------------
********************************************************************************************** */


let btnClock = document.querySelector('.btn-clock');
let displayClock = document.querySelector('.clock');

let C_hours = document.getElementById('c-hours');
let C_mins = document.getElementById('c-mins');
let C_secs = document.getElementById('c-secs');
let ampm = document.getElementById('ampm');

let C_hh = document.getElementById('c-hh');
let C_mm = document.getElementById('c-mm');
let C_ss = document.getElementById('c-ss');

let C_hr_dot = document.querySelector('.c-hr-dot');
let C_min_dot = document.querySelector('.c-min-dot');
let C_sec_dot = document.querySelector('.c-sec-dot');

function clock() {
    setInterval(() => {
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();
        let ap = h >= 12 ? 'PM' : 'AM';

        // Converting 24-hours clock into 12-Hours Clock
        if (h > 12) {
            h = h - 12;
        }

        // Adding zero before single digit
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        //Analog clock
        C_hh.style.strokeDashoffset = 440 - (440 * h) / 12;
        C_mm.style.strokeDashoffset = 440 - (440 * m) / 60;
        C_ss.style.strokeDashoffset = 440 - (440 * s) / 60;

        C_hr_dot.style.transform = `rotate(${h * 30}deg)`;
        C_min_dot.style.transform = `rotate(${m * 6}deg)`;
        C_sec_dot.style.transform = `rotate(${s * 6}deg)`;

        //Digital Clock
        C_hours.innerHTML = h + "<div><span>Hours</span></div>";
        C_mins.innerHTML = m + "<div><span>Minutes</span></div>";
        C_secs.innerHTML = s + "<div><span>Seconds</span></div>";
        ampm.innerHTML = ap;

    })
}

function showClock() {
    displayClock.classList.remove('d-none');
    displayTimer.classList.add('d-none');
    displaySW.classList.add('d-none');
    clock();
}

btnClock.addEventListener('click', showClock);

/***********************************************************************************************
-------------------------------------CLOCK-BLOCK-END------------------------------------------
********************************************************************************************** */


/***********************************************************************************************
-------------------------------------TIMER-BLOCK-START------------------------------------------
********************************************************************************************** */

let displayTimer = document.querySelector('.timer');
let btnTimer = document.querySelector('.btn-timer');
let btnSet = document.querySelector('.btn-set');
let btnStart = document.querySelector('.btn-start');
let btnPlay = document.querySelector('.btn-play');
let btnPause = document.querySelector('.btn-pause');
let btnReset = document.querySelector('.btn-reset');

let startInterval = null;
let isPaused = false;

let T_hrs = document.getElementById('t-hrs');
let T_mins = document.getElementById('t-mins');
let T_secs = document.getElementById('t-secs');

let T_hh = document.getElementById('t-hh');
let T_mm = document.getElementById('t-mm');
let T_ss = document.getElementById('t-ss');

let T_hr_dot = document.querySelector('.t-hr-dot');
let T_min_dot = document.querySelector('.t-min-dot');
let T_sec_dot = document.querySelector('.t-sec-dot');

let input_hours = document.querySelector('.input-hr');
let input_minutes = document.querySelector('.input-min');

function reset() {
    input_minutes.value = input_hours.value = '';
    T_hh.style.strokeDashoffset = T_mm.style.strokeDashoffset = T_ss.style.strokeDashoffset = 1
    T_hr_dot.style.transform = T_min_dot.style.transform = T_sec_dot.style.transform = `rotate(0deg)`;

    T_hrs.innerHTML = '00' + "<div><span>Hours</span></div>"
    T_mins.innerHTML = '00' + "<div><span>Minutes</span></div>";
    T_secs.innerHTML = '00' + "<div><span>Seconds</span></div>";
    clearInterval(startInterval);
    isPaused = false;
    btnSet.classList.remove('disabled');
    btnStart.classList.add('disabled')
    btnPlay.classList.add('disabled');
    btnPlay.classList.add('d-none');
    btnPause.classList.add('disabled');
    btnPause.classList.remove('d-none');
    btnReset.classList.add('disabled');

}
function set() {
    let hours = input_hours.value;
    let minutes = input_minutes.value;
    let seconds = 0;

    if (hours < 0 || minutes < 0) {
        alert('Hours or Minutes should not be negative')
        input_hours.value = "";
        input_minutes.value = "";
    } else if (hours != 0 || minutes != 0) {
        btnStart.classList.remove('disabled');
        btnSet.classList.add('disabled');
        btnReset.classList.remove('disabled');

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        T_hrs.innerHTML = hours + "<div><span>Hours</span></div>"
        T_mins.innerHTML = minutes + "<div><span>Minutes</span></div>";
        T_secs.innerHTML = seconds + "<div><span>Seconds</span></div>";
    }
}

function start() {
    let hours = input_hours.value;
    let minutes = input_minutes.value;
    let seconds = 0;
    let display_hours, display_minutes, display_seconds;

    startInterval = setInterval(() => {
        if (!isPaused) {
            if (hours == 0 && minutes == 0 && seconds == 0) {
                hours = minutes = seconds = 0;
            } else {
                if (seconds != 0) {
                    seconds--;
                } else if (minutes != 0 && seconds == 0) {
                    seconds = 59;
                    minutes--;
                } else if (hours != 0 && minutes == 0) {
                    seconds = minutes = 59;
                    hours--
                }
            }

            display_hours = hours < 10 ? '0' + hours : hours;
            display_minutes = minutes < 10 ? '0' + minutes : minutes;
            display_seconds = seconds < 10 ? '0' + seconds : seconds;

            T_hh.style.strokeDashoffset = 440 - (440 * hours) / 12;
            T_mm.style.strokeDashoffset = 440 - (440 * minutes) / 60;
            T_ss.style.strokeDashoffset = 440 - (440 * seconds) / 60;

            T_hr_dot.style.transform = `rotate(${hours * 30}deg)`;
            T_min_dot.style.transform = `rotate(${minutes * 6}deg)`;
            T_sec_dot.style.transform = `rotate(${seconds * 6}deg)`;

            T_hrs.innerHTML = display_hours + "<div><span>Hours</span></div>"
            T_mins.innerHTML = display_minutes + "<div><span>Minutes</span></div>";
            T_secs.innerHTML = display_seconds + "<div><span>Seconds</span></div>";
        }
    }, 1000)

    btnStart.classList.add('disabled');
    btnPause.classList.remove('disabled');
}
function showTimer() {
    displaySW.classList.add('d-none');
    displayClock.classList.add('d-none');
    displayTimer.classList.remove('d-none');
}
btnTimer.addEventListener('click', showTimer);
btnReset.addEventListener('click', reset);
btnSet.addEventListener('click', set);
btnStart.addEventListener('click', start);
btnPlay.addEventListener('click', (e) => {
    e.preventDefault();
    isPaused = false;
    btnPause.classList.remove('disabled');
    btnPause.classList.remove('d-none');
    btnPlay.classList.add('disabled');
    btnPlay.classList.add('d-none');
})
btnPause.addEventListener('click', (e) => {
    e.preventDefault();
    isPaused = true;
    btnPlay.classList.remove('disabled');
    btnPlay.classList.remove('d-none');
    btnPause.classList.add('disabled');
    btnPause.classList.add('d-none')
})

/***********************************************************************************************
-------------------------------------TIMER-BLOCK-END------------------------------------------
********************************************************************************************** */

/***********************************************************************************************
-------------------------------------STOPWATCH-BLOCK-START------------------------------------------
********************************************************************************************** */
let displaySW = document.querySelector('.stopWatch');
let btnStopWatch = document.querySelector('.btn-stopWatch');
let btnStartSW = document.querySelector('.btn-sw-start');
let btnResumeSW = document.querySelector('.btn-sw-resume');
let btnPauseSW = document.querySelector('.btn-sw-pause');
let btnResetSW = document.querySelector('.btn-sw-reset');

let SW_hrs = document.getElementById('sw-hrs');
let SW_mins = document.getElementById('sw-mins');
let SW_secs = document.getElementById('sw-secs');

let SW_hh = document.getElementById('sw-hh');
let SW_mm = document.getElementById('sw-mm');
let SW_ss = document.getElementById('sw-ss');

let SW_hr_dot = document.querySelector('.sw-hr-dot');
let SW_min_dot = document.querySelector('.sw-min-dot');
let SW_sec_dot = document.querySelector('.sw-sec-dot');

let StartInterval = null;
let Paused = false;

function startSW() {
    let SW_hours = 0;
    let SW_minutes = 0;
    let SW_Seconds = 0;
    let display_hrs, display_mins, display_secs;

    StartInterval = setInterval(() => {
        if (!Paused) {
            if (SW_Seconds != 59) {
                SW_Seconds++;
                console.log('seconds :', SW_Seconds)
            } else if (SW_minutes != 59 && SW_Seconds == 59) {
                SW_Seconds = 0;
                SW_minutes++;
            } else if (SW_hours != 59 && SW_minutes == 59) {
                SW_Seconds = SW_minutes = 0;
                SW_hours++;
            }

            // Adding zero before single digit
            display_hrs = (SW_hours < 10) ? "0" + SW_hours : SW_hours;
            display_mins = (SW_minutes < 10) ? "0" + SW_minutes : SW_minutes;
            display_secs = (SW_Seconds < 10) ? "0" + SW_Seconds : SW_Seconds;

            //Analog clock
            SW_hh.style.strokeDashoffset = 440 - (440 * SW_hours) / 12;
            SW_mm.style.strokeDashoffset = 440 - (440 * SW_minutes) / 60;
            SW_ss.style.strokeDashoffset = 440 - (440 * SW_Seconds) / 60;

            SW_hr_dot.style.transform = `rotate(${SW_hours * 30}deg)`;
            SW_min_dot.style.transform = `rotate(${SW_minutes * 6}deg)`;
            SW_sec_dot.style.transform = `rotate(${SW_Seconds * 6}deg)`;

            //Digital Clock
            SW_hrs.innerHTML = display_hrs + "<div><span>Hours</span></div>";
            SW_mins.innerHTML = display_mins + "<div><span>Minutes</span></div>";
            SW_secs.innerHTML = display_secs + "<div><span>Seconds</span></div>";
        }
    }, 1000)
    btnStartSW.classList.add('disabled')
    btnPauseSW.classList.remove('disabled')
    btnResetSW.classList.remove('disabled')
}
function resetSW() {
    SW_hh.style.strokeDashoffset = SW_mm.style.strokeDashoffset = SW_ss.style.strokeDashoffset = 1
    SW_hr_dot.style.transform = SW_min_dot.style.transform = SW_sec_dot.style.transform = `rotate(0deg)`;

    SW_hrs.innerHTML = '00' + "<div><span>Hours</span></div>"
    SW_mins.innerHTML = '00' + "<div><span>Minutes</span></div>";
    SW_secs.innerHTML = '00' + "<div><span>Seconds</span></div>";
    clearInterval(StartInterval);
    Paused = false;
    btnStartSW.classList.remove('disabled')
    btnResumeSW.classList.add('disabled');
    btnResumeSW.classList.add('d-none');
    btnPauseSW.classList.add('disabled');
    btnPauseSW.classList.remove('d-none');
    btnResetSW.classList.add('disabled');

}

function displayStopWatch() {
    displayTimer.classList.add('d-none');
    displayClock.classList.add('d-none');
    displaySW.classList.remove('d-none');
}

btnStartSW.addEventListener('click', startSW)
btnPauseSW.addEventListener('click', (e) => {
    e.preventDefault();
    Paused = true;
    btnPauseSW.classList.add('d-none')
    btnPauseSW.classList.add('disabled')
    btnResumeSW.classList.remove('disabled')
    btnResumeSW.classList.remove('d-none')
})
btnResumeSW.addEventListener('click', (e) => {
    e.preventDefault();
    Paused = false;
    btnResumeSW.classList.add('d-none')
    btnResumeSW.classList.add('disabled')
    btnPauseSW.classList.remove('disabled')
    btnPauseSW.classList.remove('d-none')
})

btnResetSW.addEventListener('click', resetSW)

btnStopWatch.addEventListener('click', displayStopWatch)

/***********************************************************************************************
-------------------------------------STOPWATCH-BLOCK-END------------------------------------------
********************************************************************************************** */

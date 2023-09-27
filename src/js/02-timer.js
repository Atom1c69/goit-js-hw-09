import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  button: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  minute: document.querySelector('.value[data-minutes]'),
  day: document.querySelector('.value[data-days]'),
  second: document.querySelector('.value[data-seconds]'),
  hour: document.querySelector('.value[data-hours]'),
};

refs.button.addEventListener('click', onClickStartTimer);

refs.input.classList.add('datetime-picker');
refs.button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    closeDataTimePicker(selectedDates);
  },
};

const picker = flatpickr('#datetime-picker', options);

function closeDataTimePicker(selectedDates) {
  const selectedDate = selectedDates[0];
  const currentDay = Date.now();

  if (selectedDate <= currentDay) {
    Notiflix.Notify.failure('Please choose a date in the future');
    refs.button.disabled = true;
  } else {
    refs.button.disabled = false;
  }
}

function onClickStartTimer() {
  const intervalID = setInterval(() => {
    const selectedDate = picker.selectedDates[0].getTime();
    const currentDay = Date.now();
    const delta = selectedDate - currentDay;
    const convertTime = convertMs(delta);

    if (delta <= 0) {
      clearInterval(intervalID);
      return;
    }

    updateTime(convertTime);
  }, 1000);
}

function convertMs(delta) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(delta / day);
  const hours = Math.floor((delta % day) / hour);
  const minutes = Math.floor(((delta % day) % hour) / minute);
  const seconds = Math.floor((((delta % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.minute.textContent = addLeadingZero(minutes);
  refs.day.textContent = addLeadingZero(days);
  refs.second.textContent = addLeadingZero(seconds);
  refs.hour.textContent = addLeadingZero(hours);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

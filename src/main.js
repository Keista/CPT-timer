// Main file to set up alarm clock app
//import AlarmApp from './alarmapp.js';
//import AlarmView from './alarmview.js';
//import AlarmController from './alarmcontroller.js';

// Current Time
const clock = () => {
  const time = new Date();

  document.getElementById('clock').innerText =
    time.toLocaleTimeString('en-US', {hour12: false});
  setTimeout(clock, 1000);
};

document.addEventListener('DOMContentLoaded', () => {
  // Run clock on one second interval
  clock();

  // Grab DOM elements
  const alarmForm = document.getElementById('alarm-form');
  const activePeriodBtn = document.getElementById('am-btn');
  const alarmList = document.getElementById('alarm-list');
  //const periodBtns = document.getElementsByClassName('alarm-period');

  // Initialize Components
  const app = new AlarmApp();
  const view = new AlarmView(activePeriodBtn, alarmList);
  const controller = new AlarmController(app, view);

  // Add Listeners
  // Add Listener to each btn and not container
  //
  controller.submitAlarmFormListener(alarmForm);
  controller.checkAlarmListener();
});

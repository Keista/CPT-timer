// Controller for listeners
//import Alarm from './alarm.js';

class AlarmController {
  constructor(alarmApp, alarmView) {
    this.alarmApp = alarmApp;
    this.alarmView = alarmView;
  }


  // Listener to add Alarm
  submitAlarmFormListener(el) {
    el.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check if inputs are valid
      const hr = this.isValid(e.target.alarmHr.value);
      const min = this.isValid(e.target.alarmMin.value);
      const slam = this.isValid(e.target.slamTime.value);
      const newAlarm = this.convertCPT(hr, min, slam);
      

      // Only add if is valid time and not already existed
      if (newAlarm.isValid()) {
        if (this.alarmApp.isUnique(newAlarm)) {
          this.alarmApp.addAlarm(newAlarm);
          this.alarmView.displayAlarms(this.alarmApp.alarmList);
          this.addRemoveListener();
        } else {
          alert('Alarm already exists');
        }
      } else {
        alert('Invalid input');
      }
    });
  }

  // Listener to remove Alarm
  addRemoveListener() {
    const list = document.getElementsByClassName('alarm-el');
    for (let i = 0; i < list.length; i++) {
      const curr = list[i];
      curr.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('key');
        if (idx) {
          this.alarmApp.removeAlarm(idx);
          this.alarmView.displayAlarms(this.alarmApp.alarmList);
          this.addRemoveListener();
        }
      });
    }
  }

  // Listener on one second interval to check if Alarm has been met
  // If met, alert and remove
  checkAlarmListener() {
    setInterval(() => {
      const idx = this.alarmApp.checkAlarms();

      if (idx >= 0) {
        const alarm = this.alarmApp.alarmList[idx];
        this.alarmApp.alertAlarm(alarm);
        this.alarmApp.removeAlarm(idx);
        this.alarmView.displayAlarms(this.alarmApp.alarmList);
        this.addRemoveListener();
      }
    }, 1000);
  }

  // cpt calculations
  convertCPT(hr, min, slam){
    var hr1 = hr;
    var min1 = min;
    var slam1 = slam;
    console.log(hr1 +'   ' + min1 + '   ' + slam1);

    if(min1 < slam1) {
      if (hr1 === 0 ){
        hr1 = 23;
      } else{
        hr1 = hr1 -1;
        min1 = 60 - (slam1 - min1);
      }
    } else{
      if (hr1 === 0){
        hr1 = 24;
      }else{
        min1 =slam1 - min1;
      }
     
    }
    console.log(hr1 +'   ' + min1 + '   ' + slam1);

    return new Alarm(hr1, min1, slam1);
  }

  // Short helper method to check if input is valid number
  isValid(input) {
    if (!isNaN(input)) return parseInt(input);
  }
}

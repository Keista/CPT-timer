// Alarm Functions

class Alarm {
  constructor(hr, min, slam) {
    this.hr = hr;
    this.min = min;
    this.slam = slam;  
    this.time = new Date();

    // Set Alarm time to 24 Hour Format
    this.time.setHours(hr);
    this.time.setMinutes(min);
    this.time.setSeconds(0);
  }

  // Check if alarms match
  matches(timeToCheck) {
    return this.time.getHours() === timeToCheck.getHours()
      && this.time.getMinutes() === timeToCheck.getMinutes()
      && this.time.getSeconds() === timeToCheck.getSeconds();
  }

  // Check if alarm is valid input
  isValid() {
    return this.hr > 0 && this.hr < 25
      && this.min > -1 && this.min < 60
      && this.slam > -1 && this.slam < 300;
  }

  // Convert to US string format
  toString() {
    return this.time.toLocaleTimeString('en-US', {hour12: false});
  }
}

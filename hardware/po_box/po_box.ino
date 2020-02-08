#include <Servo.h>

#define LEDPIN 13
#define SENSORPIN 4
#define SERVOPIN 9

int sensorState = 0, lastState=0;         // variable for reading the pushbutton status
int flagPosition = -100;
Servo flag;
 
void setup() {
  // initialize the LED pin as an output:
  pinMode(LEDPIN, OUTPUT);      
  // initialize the sensor pin as an input:
  pinMode(SENSORPIN, INPUT);     
  digitalWrite(SENSORPIN, HIGH); // turn on the pullup

  flag.attach(SERVOPIN);
  Serial.begin(9600);
}
 
void loop(){
  sensorState = digitalRead(SENSORPIN);
  
  if (sensorState == LOW) {
    if (flagPosition != 90) {
      flag.write(90);      
    }
  } 
  else {
    if (flagPosition != 0) {
      flag.write(0);
    }
  }
  
  lastState = sensorState;
}

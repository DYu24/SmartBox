#include <Servo.h>

#define LEDPIN 13
#define SENSORPIN 4
#define SERVOPIN 9

#define FLAG_UP 118

int sensorState = 0, lastState=0;         // variable for reading the pushbutton status
int flagPosition;
Servo flag;
 
void setup() {
  // initialize the LED pin as an output:
  pinMode(LEDPIN, OUTPUT);      
  // initialize the sensor pin as an input:
  pinMode(SENSORPIN, INPUT);     
  digitalWrite(SENSORPIN, HIGH); // turn on the pullup

  flag.attach(SERVOPIN);
  Serial.begin(9600);

  flagPosition = 6;
}
 
void loop(){
  sensorState = digitalRead(SENSORPIN);
  
  if (sensorState == LOW) {
      if (flagPosition != FLAG_UP) {
        flag.write(FLAG_UP);
        flagPosition = FLAG_UP;
        digitalWrite(LEDPIN, HIGH);   
      }
      digitalWrite(LEDPIN, HIGH);      
  } 
  else {
      if (flagPosition != 0) {
        Serial.print(flagPosition);
        flag.write(0);
        flagPosition = 0;
        digitalWrite(LEDPIN, LOW);
      }
  }
}

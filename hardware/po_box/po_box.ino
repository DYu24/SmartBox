#include <Servo.h>

#define LEDPIN 13
#define SENSORPIN 4
#define FLAGPIN 9

#define FLAG_UP 118

int sensorState = 0, lastState=0;         // variable for reading the pushbutton status
int flagPosition;
int counter = 0;
Servo flag;
 
void setup() {
  // initialize the LED pin as an output:
  pinMode(LEDPIN, OUTPUT);      
  // initialize the sensor pin as an input:
  pinMode(SENSORPIN, INPUT);     
  digitalWrite(SENSORPIN, HIGH); // turn on the pullup

  Serial.begin(9600);

  flagPosition = 6;
}
 
void loop(){
  sensorState = digitalRead(SENSORPIN);
  
  if (sensorState == LOW) {
      if (flagPosition != FLAG_UP) {
        counter = 0;
        flag.attach(FLAGPIN);
        flag.write(FLAG_UP);
        flagPosition = FLAG_UP;
        digitalWrite(LEDPIN, HIGH);
        Serial.println("ATTACHED");   
      }     
  } 
  else {
      if (flagPosition != 0) {
        counter = 0;
        flag.attach(FLAGPIN);
        flag.write(0);
        flagPosition = 0;
        digitalWrite(LEDPIN, LOW);
        Serial.println("ATTACHED");
      }
  }

  if (counter > 600) {
    flag.detach();
    counter = 0;
    Serial.println("DETACHED");
  }
  counter ++;

  delay(2);
}

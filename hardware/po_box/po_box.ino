#include <Servo.h>
#include <Adafruit_NeoPixel.h>

#define LEDSTRIPPIN 3
#define NUMPIXELS 30

#define LEDPIN 13
#define SENSORPIN 4
#define FLAGPIN 9

#define FLAG_UP 118

#define LEFT_MOTOR_PIN 5
#define RIGHT_MOTOR_PIN 6
#define RIGHT_MOTOR_CLOSED 5
#define RIGHT_MOTOR_OPEN 100
#define LEFT_MOTOR_CLOSED 170
#define LEFT_MOTOR_OPEN 60

Adafruit_NeoPixel pixels(NUMPIXELS, LEDSTRIPPIN, NEO_GRB + NEO_KHZ800);
#define COLOR_DELAYVAL 2

Servo left_motor;
Servo right_motor;

int sensorState = 0, lastState=0;         // variable for reading the pushbutton status
int flagPosition;
int counter = 0;
Servo flag;

char message;

boolean startCloseDown = false;
int closeDownCounter = 0;
 
void setup() {
  // initialize the LED pin as an output:
  pinMode(LEDPIN, OUTPUT);      
  // initialize the sensor pin as an input:
  pinMode(SENSORPIN, INPUT);     
  digitalWrite(SENSORPIN, HIGH); // turn on the pullup

  pixels.begin();

  Serial.begin(9600);

  flagPosition = 6;

  closeBox();

  // GREEN for Available Box
  setColorOfStrip(0,150,0);
}
 
void loop(){
  sensorState = digitalRead(SENSORPIN);

  if (Serial.available())
  {
    message = Serial.read();

    switch(message) {
      case '1':
        // RED, RESERVED BOX
        setColorOfStrip(230, 0, 0);
        openBox();
        break;
      case '2':
        // ORANGE, DELIVERED PACKAGE
        setColorOfStrip(255,191,0);
        closeBox();
        break;
      case '3':
        // GREEN, PICKING UP PACKAGE
        setColorOfStrip(0, 230, 0);
        openBox();
        startCloseDown = true;
        break;
      default:
        break;
    }
  }
  
  if (sensorState == LOW) {
      if (flagPosition != FLAG_UP) {
        counter = 0;
        flag.attach(FLAGPIN);
        flag.write(FLAG_UP);
        flagPosition = FLAG_UP;
        digitalWrite(LEDPIN, HIGH);  
      }     
  } 
  else {
      if (flagPosition != 0) {
        counter = 0;
        flag.attach(FLAGPIN);
        flag.write(0);
        flagPosition = 0;
        digitalWrite(LEDPIN, LOW);
      }
  }

  if (startCloseDown) {
    closeDownCounter ++;
    if (closeDownCounter > 2800) {
      startCloseDown = false;
      closeDownCounter = 0;

      int closeDelay = 350;
      
      setColorOfStrip(150, 0, 150);
      delay(closeDelay);
      setColorOfStrip(221, 150, 242);
      delay(closeDelay);
      setColorOfStrip(150, 0, 150);
      delay(closeDelay);
      setColorOfStrip(221, 150, 242);
      delay(closeDelay);
      setColorOfStrip(150, 0, 150);
      delay(closeDelay);
      setColorOfStrip(221, 150, 242);
      delay(closeDelay);
      setColorOfStrip(150, 0, 150);
      delay(closeDelay);
      setColorOfStrip(221, 150, 242);
      delay(closeDelay);
      
      closeBox();

      setColorOfStrip(0, 150, 0);
    }
  }

  if (counter > 600) {
    flag.detach();
    counter = 0;
  }
  counter ++;

  delay(2);
}

void closeBox() {
  right_motor.attach(RIGHT_MOTOR_PIN);
  left_motor.attach(LEFT_MOTOR_PIN);
  
  right_motor.write(RIGHT_MOTOR_CLOSED);
  left_motor.write(LEFT_MOTOR_CLOSED);
  delay(1500);

  right_motor.detach();
  left_motor.detach();
}

void openBox() {
  right_motor.attach(RIGHT_MOTOR_PIN);
  left_motor.attach(LEFT_MOTOR_PIN);
  
  right_motor.write(RIGHT_MOTOR_OPEN);
  left_motor.write(LEFT_MOTOR_OPEN);
  delay(1500);
}

void setColorOfStrip(int red, int green, int blue) {
  pixels.clear();

  for(int i=0; i<NUMPIXELS; i++) {

    pixels.setPixelColor(i, pixels.Color(red, green, blue));
    pixels.show();
    delay(COLOR_DELAYVAL);
  }
}

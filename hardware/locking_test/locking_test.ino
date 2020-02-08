#include <Servo.h>

#define LEFT_MOTOR_PIN 5
#define RIGHT_MOTOR_PIN 6

#define RIGHT_MOTOR_CLOSED 5
#define RIGHT_MOTOR_OPEN 100

#define LEFT_MOTOR_CLOSED 170
#define LEFT_MOTOR_OPEN 70

Servo left_motor;
Servo right_motor;

void setup() {
  left_motor.attach(LEFT_MOTOR_PIN);
  right_motor.attach(RIGHT_MOTOR_PIN);

  
}

void loop() {
  right_motor.write(RIGHT_MOTOR_CLOSED);
  left_motor.write(LEFT_MOTOR_CLOSED);
  delay(3000);
  right_motor.write(RIGHT_MOTOR_OPEN);
  left_motor.write(LEFT_MOTOR_OPEN);
  delay(3000);
}

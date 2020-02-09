import paho.mqtt.client as mqtt
import serial
import json
import requests

RESERVE = "PO_BOX_RESERVE_REQUEST_EVENT"
DELIVERED = "PACKAGE_DELIVERED_EVENT"
UNREGISTERED = "PO_BOX_UNREGISTERED_EVENT"

PO_BOX_ID = "kY1ObK0TSdHGgOxKRlot"

AMAZON_URL = "https://api.notifymyecho.com/v1/NotifyMe"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.

    # DELIVERY MAN RESERVED BOX
    client.subscribe(RESERVE)

    # DELIVERY MAN DELIVERED PACKAGE
    client.subscribe(DELIVERED)

    # CUSTOMER UNLOCKS BOX
    client.subscribe(UNREGISTERED)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

    payload = json.loads(msg.payload.decode())

    if (payload['boxId'] == PO_BOX_ID):
        print("Received event message for self boxId: " + PO_BOX_ID)

        arduino_message = ""
        alexa_message = {"accessCode":"amzn1.ask.account.AGYXYXDPCSL27OL2TLOQEL6MC6N7S6QOFUZ7YUZS4YTGBTXGP3F6JKBV4GYTQFJUJOZKDTDCQOXPY7KPAQJDD52UMNCXYHMFP73DWSW3FSUMWHUFBYYNDBFUQHOWFMTIFBW5QOOIVNJSYLYZ7G5VYX6VUFMKPZX54FVNKS4MQJRS43DTF4AFEHRCVGIY7PUUWC32B4YKQFCZIIY"}

        if msg.topic == RESERVE:
            print("Reserved PO box for package")
            alexa_message["notification"] = "Your package is currently out for delivery"
            arduino_message = 1
        elif msg.topic == DELIVERED:
            print("Delivered package to PO box")
            alexa_message["notification"] = "Your package is available for pickup at your Smart Box"
            arduino_message = 2
        else:
            print("Customer has picked up package")
            alexa_message["notification"] = "Your package has been picked up from your Smart Box"
            arduino_message = 3
        
        arduinoOut.write(str(arduino_message).encode())
        print("Delivered message to arduino: " + arduino_message)

        requests.post(url = AMAZON_URL, data = json.dumps(alexa_message)) 

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

arduinoOut = serial.Serial('COM3', 9600)

client.username_pw_set('solace-cloud-client', 'c0nvib5l7i28pf91ioo293o2cd')

client.connect('mr2hd0llj3vw0r.messaging.solace.cloud', port=1883)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
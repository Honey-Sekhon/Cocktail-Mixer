from flask import Flask, request, jsonify
from flask_cors import CORS
from gpiozero import OutputDevice
from time import sleep

app = Flask(__name__)
CORS(app)

# Define the GPIO pins where the relays (pumps) are connected
PUMP_PINS = {
    "slot1": 17,
    "slot2": 22,
    "slot3": 23,
    "slot4": 27
}

# Initialize the relays (pumps)
pumps = {slot: OutputDevice(pin, active_high=False, initial_value=False) for slot, pin in PUMP_PINS.items()}

def pump_on(pump):
    pump.on()
    print(f"Pump on GPIO {pump.pin.number} is ON")

def pump_off(pump):
    pump.off()
    print(f"Pump on GPIO {pump.pin.number} is OFF")

def control_pump(slot, duration):
    if slot in pumps:
        pump = pumps[slot]
        pump_on(pump)
        sleep(duration)
        pump_off(pump)
    else:
        print(f"Invalid slot: {slot}")

@app.route('/control_pumps', methods=['POST'])
def control_pumps():
    data = request.json
    for slot, amount in data.items():
        duration = amount * 1.25  # 1.25 seconds per ml
        control_pump(slot, duration)
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

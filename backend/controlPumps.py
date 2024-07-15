from flask import Flask, request, jsonify
from flask_cors import CORS
from gpiozero import OutputDevice
from time import sleep
import time
import subprocess
import threading

app = Flask(__name__)
CORS(app)

# Define the GPIO pins where the relays (pumps) are connected
PUMP_PINS = {
    "slot1": 17,
    "slot2": 22,
    "slot3": 23,
    "slot4": 27
}

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

def control_pumps_parallel(durations):
    threads = []
    for slot, duration in durations.items():
        thread = threading.Thread(target=control_pump, args=(slot, duration))
        threads.append(thread)
        thread.start()
    
    for thread in threads:
        thread.join()

@app.route('/control_pumps', methods=['POST'])
def control_pumps():
    data = request.json
    print("Received data:", data)
    durations = {}
    for slot, amount in data.items():
        try:
            duration = float(amount) * 1.15  # 1.15 seconds per ml
            durations[slot] = duration
        except ValueError:
            print(f"Invalid amount for slot {slot}: {amount}")
    
    if durations:
        control_pumps_parallel(durations)
        
    return jsonify({"status": "success"})

@app.route('/poweroff', methods=['POST'])
def poweroff():
    try:
        # Run the poweroff command
        subprocess.run(['sudo', 'reboot'], check=True)
        return jsonify({"message": "Power off command executed successfully"}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

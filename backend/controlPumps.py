from flask import Flask, request, jsonify
from flask_cors import CORS
from gpiozero import OutputDevice
from time import sleep
import time
import subprocess

app = Flask(__name__)
CORS(app)

# Define the GPIO pins where the relays (pumps) are connected
PUMP_PINS = {
    "slot1": 17,
    "slot2": 22,
    "slot3": 23,
    "slot4": 27
}

Bottle = []
Duration = []
# Initialize the relays (pumps)
pumps = {slot: OutputDevice(pin, active_high=False, initial_value=False) for slot, pin in PUMP_PINS.items()}

def pump_on(pump):
    pump.on()
    print(f"Pump on GPIO {pump.pin.number} is ON")

def pump_off(pump):
    pump.off()
    print(f"Pump on GPIO {pump.pin.number} is OFF")

def control_pump(slot, duration):
            flag = 0
            start_timer = time.time()
            if(Duration[0]==0):
                pump_off(pumps[0])
            else:
                pump_off(pumps[0])
                flag = flag + 1
            if(Duration[1]==0):
                pump_off(pumps[1])
            else:
                pump_off(pumps[1])
                flag = flag + 1

            if(Duration[2]==0):
                pump_off(pumps[2])
            else:
                pump_off(pumps[2])
                flag = flag + 1

            if(Duration[3]==0):
                pump_off(pumps[3])
            else:
                pump_off(pumps[3])
                flag = flag + 1

            while(True):
                if(time.time()-start_timer>=Duration[0]):
                    pump_off(pumps[0])
                    flag = flag - 1
                if(time.time()-start_timer>=Duration[1]):
                    pump_off(pumps[1])
                    flag = flag - 1
                if(time.time()-start_timer>=Duration[2]):
                    pump_off(pumps[2])
                    flag = flag - 1
                if(time.time()-start_timer>=Duration[3]):
                    pump_off(pumps[3])
                    flag = flag - 1
                
                if(flag==0):
                     break

@app.route('/control_pumps', methods=['POST'])
def control_pumps():
    data = request.json
    for slot, amount in data.items():
        duration = amount * 1.15  # 1.25 seconds per ml
        Duration.append(duration)
        Bottle.append(slot)
        print("Duration: ", Duration)
        print("Bottle:", Bottle)
    

        control_pump(slot, duration)
        
    return jsonify({"status": "success"})

@app.route('/poweroff', methods=['POST'])
def poweroff():
    try:
        # Run the poweroff command
        subprocess.run(['sudo', 'poweroff'], check=True)
        return jsonify({"message": "Power off command executed successfully"}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

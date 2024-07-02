from gpiozero import OutputDevice
from time import sleep

# Define the GPIO pins for the pumps
pump1 = OutputDevice(17)
pump2 = OutputDevice(18)
pump3 = OutputDevice(27)
pump4 = OutputDevice(22)

# Function to turn on all pumps for 30 seconds
def activate_pumps():
    try:
        # Turn on all pumps
        pump1.on()
        pump2.on()
        pump3.on()
        pump4.on()
        print("Pumps are ON")
        
        # Keep pumps on for 30 seconds
        sleep(30)
        
        # Turn off all pumps
        pump1.off()
        pump2.off()
        pump3.off()
        pump4.off()
        print("Pumps are OFF")
    
    except KeyboardInterrupt:
        # Handle interruption
        pump1.off()
        pump2.off()
        pump3.off()
        pump4.off()
        print("Pumps are OFF (interrupted)")

# Run the function to activate the pumps
if __name__ == "__main__":
    activate_pumps()

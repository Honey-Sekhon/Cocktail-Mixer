# Cocktail Mixer

Cocktail Mixer is a project designed to automate the process of creating custom cocktails using a Raspberry Pi, peristaltic pumps, and a user-friendly interface built with React and Electron. The application allows users to select, customize, and prepare cocktails with precision and efficiency.

## Features

- **Backend Application**: Built with Python and Flask to control peristaltic pumps for precise ingredient dispensing.
- **Frontend Interface**: A responsive and intuitive GUI developed using React and Electron.
- **Custom Cocktails**: Users can select from a list of predefined recipes or create their own.
- **Frontend-Backend Communication**: Utilizes Axios for seamless interaction between frontend and backend systems.
- **Multithreading**: Enables simultaneous pump operations for accurate ingredient proportions.

## Technologies Used

- **Frontend**: React, Electron, Axios, Bootstrap
- **Backend**: Python, Flask
- **Hardware**: Raspberry Pi, Peristaltic Pumps
- **Testing**: Jest
- **Others**: RESTful API Development, Git

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Raspberry Pi with Raspbian OS
- Python 3.6 or higher
- Node.js and npm
- Required hardware components (peristaltic pumps, relays, power supply, etc.)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Honey-Sekhon/Cocktail-Mixer.git
   cd Cocktail-Mixer/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Cocktail-Mixer/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```

### Hardware Setup

1. Connect the peristaltic pumps to the Raspberry Pi GPIO pins via relays.
2. Update the GPIO pin configurations in the Flask backend (`config.py`) to match your hardware setup.
3. Ensure the Raspberry Pi is powered appropriately to handle the load of the pumps.

## Usage

1. Launch the backend server and the frontend interface.
2. Use the GUI to:
   - Select a predefined cocktail.
   - Customize ingredients and proportions.
   - Initiate the mixing process.
3. Watch the peristaltic pumps dispense the ingredients as per your selections.

## Testing

Run frontend tests using Jest:
```bash
npm test
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request.


---

For any questions or feedback, please contact [Honeypal Sekhon](mailto:sekhonhoneypal@gmail.com).

from flask import Flask
from flask_socketio import SocketIO,emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")
CORS(app)

if __name__ == "__main__":
    socketio.run(app)



@socketio.on("connect") #Ensure connection
def handle_connect():
    print("client connected")
    emit("connected","newMessage")
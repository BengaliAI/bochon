from aiohttp import web
import socketio
import base64
import time

sio = socketio.AsyncServer(cors_allowed_origins="*")
app = web.Application()

sio.attach(app)

@sio.on('message')
async def print_message(sid, message):
    print("Socket ID: " , sid)
    if("text" in message.keys()):
        print(message["text"])
    if("data" in message.keys()):
        '''
        Audio binary data is available in message["data"]
        Pass this data to the model and send the response back through websocket
        For example I saved the audio file
        '''
        count = int((time.time_ns() / 1e8) % 1e6)
        with open(f'audio_{count}.wav', 'wb') as f_audio:
            f_audio.write(message["data"])
        
        '''
        After running the model send back the response value to the client
        '''
        response = "Converted text from audio"
        await sio.emit("message", response, to=sid)

if __name__ == '__main__':
    web.run_app(app)
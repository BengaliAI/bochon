import { io, Socket } from "socket.io-client";
import { SocketURL } from "../config/appRoute";

export type SocketMessageType = {
  text?: string;
  data?: Blob;
};

class ConnectionController {
  private socket: Socket | null = null;
  private onRecognize: (message: string) => void = () => {};

  public connect = (uri: string) => {
    this.socket = io(uri, {
      path: "/audio/general/stt",
    });
    this.socket.on("message", (message) => {
      console.log(message);
      this.onRecognize(message);
    });
  };

  public sendMessage = (text?: string) => {
    const socketMessage: SocketMessageType = { text };
    this.socket?.emit("message", socketMessage);
  };

  public sendData = (data?: Blob) => {
    const socketMessage: SocketMessageType = { data };
    this.socket?.emit("message", socketMessage);
  };

  public setRecognizedCallback = (onRecognize: (message: string) => void) => {
    this.onRecognize = onRecognize;
  };
}

const connectionController = new ConnectionController();
connectionController.connect(SocketURL);
export default connectionController;

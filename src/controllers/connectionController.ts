import { io, Socket } from "socket.io-client";
import { STTModels } from "../config/models";
import { LocalStorageHandler } from "../utils/localstorageHandler";

export type SocketMessageType = {
  text?: string;
  data?: Blob;
};

class ConnectionController {
  private socket: Socket | null = null;
  private onRecognize: (message: string) => void = () => {};
  private socketURL: string = "";
  private socketPath: string = "";

  public connect = (url: string, path: string) => {
    console.log(url, path);
    this.socketURL = url;
    this.socketPath = path;
    this.socket = io(this.socketURL, {
      path: this.socketPath,
    });
    this.socket.on("message", (message) => {
      console.log(message);
      this.onRecognize(message);
    });
    this.socket.on("connect", () => {
      console.log("Connected to server");
      console.log(this.socket?.id);
    });
  };

  public disconnect = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
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

const modelIndex = LocalStorageHandler.getSTTModelIndex();

const connectionController = new ConnectionController();
connectionController.connect(
  STTModels[modelIndex].url,
  STTModels[modelIndex].path
);
export default connectionController;

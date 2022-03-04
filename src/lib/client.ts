import { WEBSOCKET_URL } from '../utils/constants';

class Client {
  private static _ws: WebSocket;

  public static get socket() {
    return this._ws;
  }

  public static set socket(wsConnection: WebSocket) {
    this._ws = wsConnection;
  }

  public static connect(url: string = WEBSOCKET_URL) {
    if (Client.socket) {
      return Client.socket;
    }
    Client.socket = new WebSocket(url);
    return Client.socket;
  }
}

export { Client };

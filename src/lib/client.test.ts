import { Client } from './client';
import { WEBSOCKET_URL } from '../utils/constants';

describe('Websocket client', () => {
  test('Should fail to connect to websocket with invalid url', () => {
    const url = 'test_url';
    function connect() {
      Client.connect(url);
    }
    expect(connect).toThrow(new Error(`The URL '${url}' is invalid.`));
  });

  test('Should success to connect to websocket with valid url and connect function should return socket', () => {
    const socket = Client.connect(WEBSOCKET_URL);
    expect(socket).toBe(Client.socket);
  });
});

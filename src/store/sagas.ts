import { Action } from '@reduxjs/toolkit';
import { EventChannel, eventChannel } from 'redux-saga';
import { fork, apply, call, put, take, takeLatest } from 'redux-saga/effects';

import { setMap, setMessage } from '../board/boardSlice';
import { Client } from '../lib/client';
import { sagaActions } from './sagaActions';

function createSocket(socket: WebSocket) {
  return eventChannel((emit) => {
    const onMessage = (event: MessageEvent) => {
      emit(event.data);
    };

    const errorHandler = (errorEvent: Event) => {
      emit(new Error(errorEvent.type));
    };

    socket.addEventListener('message', onMessage);
    socket.addEventListener('error', errorHandler);

    const unsubscribe = () => {
      socket.removeEventListener('message', onMessage);
    };

    return unsubscribe;
  });
}

function* getMap(socket: WebSocket) {
  yield apply(socket, socket.send, ['map']);
}

export function* startGame(action: Action & { payload: string }) {
  yield apply(Client.socket, Client.socket.send, [action.payload]);
}

export function* watch() {
  const socket: WebSocket = yield call(Client.connect);
  const socketChannel: EventChannel<unknown> = yield call(createSocket, socket);

  while (true) {
    try {
      const data: string = yield take(socketChannel);
      if (data.includes('map:')) {
        yield put(setMap(data));
      }
      if (data.includes('new:')) {
        yield fork(getMap, socket);
      }
      if (data.includes('open:')) {
        yield put(setMessage(data.replace('open: ', '')));
        yield fork(getMap, socket);
      }
    } catch (err) {
      socketChannel.close();
      throw new Error(`Websocket connection error ${err}`);
    }
  }
}

export default function* rootSaga() {
  yield takeLatest(sagaActions.INIT_GAME, watch);
  yield takeLatest(sagaActions.START_GAME, startGame);
}

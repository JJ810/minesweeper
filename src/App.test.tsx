import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { cleanup, render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './store/sagas';
import App from './App';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Should render correctly and match with snapshot', () => {
    const initialState = {
      board: {
        map: [],
        message: ''
      }
    };
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render welcome message and start button', () => {
    const initialState = {
      board: {
        map: [],
        message: ''
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.text().includes('Welcome! Press Start button to get started!')).toBe(true);
    expect(wrapper.text().includes('Start')).toBe(true);
  });

  it('Map render should change start button text to Reset', async () => {
    const initialState = {
      board: {
        map: [
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□'
        ],
        message: ''
      }
    };
    const store = mockStore(initialState);
    sagaMiddleware.run(rootSaga);

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper.getByText('Reset')).toBeTruthy();
  });
});

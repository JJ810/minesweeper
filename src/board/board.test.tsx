import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { cleanup } from '@testing-library/react';
import Board from './board';

describe('Game Board', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Should render correctly and match with snapshot', () => {
    const map: string[] = [];
    const tree = renderer.create(<Board map={map} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render welcome message', () => {
    const map: string[] = [];
    const wrapper = mount(<Board map={map} />);
    expect(wrapper.text().includes('Welcome! Press Start button to get started!')).toBe(true);
  });

  it('Should be able to find at least 1 cell', () => {
    const map: string[] = [
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
    ];
    const wrapper = mount(<Board map={map} />);
    const element = wrapper.find('cell-1-1');
    expect(element).toBeTruthy();
  });
});

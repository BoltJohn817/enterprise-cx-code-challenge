import {
  fireEvent,
  render,
  act,
  getAllByTestId,
  findAllByTestId,
  waitFor,
} from '@testing-library/react';
import { OfferResponse } from './types/types';
import * as ListItem from './components/ListItem';
import { Controllers } from './components/Controllers';
import App from './App';

jest.mock('./components/Controllers', () => {
  const origin = jest.requireActual('./components/Controllers');
  return {
    Controllers: jest.fn().mockImplementation(origin.Controllers),
  };
});

jest.mock('./data.json');

describe('App', () => {
  beforeEach(() => {
    jest
      .spyOn(ListItem, 'ListItem')
      .mockImplementation(({ item }: { item: OfferResponse }) => (
        <div
          data-testid="item-list"
          dangerouslySetInnerHTML={{ __html: item.name }}
        ></div>
      ));
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should display offers sorted by `Annual Percentage Yield` by default', async () => {
    const expectedOrder = [
      'Premium Online Savings',
      'Online Savings Account',
      'Kitten Savings and Checking',
      'Online Savings Account',
    ];
    const { getAllByTestId } = render(<App />);

    await act(async () => {
      await jest.advanceTimersByTime(2500);
    });

    await waitFor(() => {
      const itemList = getAllByTestId('item-list');
      expect(itemList).toHaveLength(expectedOrder.length);

      itemList.forEach((value, index) =>
        expect(value.innerHTML).toEqual(expectedOrder[index])
      );
    });
  });
  it('should display offers sorted by `Minimum Deposit`', async () => {
    (Controllers as jest.Mock).mockImplementation(({ onChange }) => {
      return (
        <div
          data-testid="updateSort"
          onClick={() => onChange('sort')('minDeposit')}
        ></div>
      );
    });

    const expectedOrder = [
      'Online Savings Account',
      'Premium Online Savings',
      'Online Savings Account',
      'Kitten Savings and Checking',
    ];
    const { getByTestId, getAllByTestId } = render(<App />);

    act(() => {
      fireEvent.click(getByTestId('updateSort'));
    });

    await act(async () => {
      await jest.advanceTimersByTime(2500);
    });

    await waitFor(() => {
      const itemList = getAllByTestId('item-list');
      expect(itemList).toHaveLength(expectedOrder.length);

      itemList.forEach((value, index) =>
        expect(value.innerHTML).toEqual(expectedOrder[index])
      );
    });
  });
  it('should display offers sorted by `Minium Deposit` and descending order', async () => {
    const expectedOrder = [
      'Kitten Savings and Checking',
      'Online Savings Account',
      'Online Savings Account',
      'Premium Online Savings',
    ];
    const mockUpdateSort = jest
      .fn()
      .mockImplementation((func) => func('sort')('minDeposit'));
    mockUpdateSort.mockImplementationOnce((func) => func('order')('-1'));

    (Controllers as jest.Mock).mockImplementation(({ onChange }) => {
      return (
        <div
          data-testid="updateSort"
          onClick={() => mockUpdateSort(onChange)}
        ></div>
      );
    });
    const { getByTestId, getAllByTestId } = render(<App />);

    act(() => {
      fireEvent.click(getByTestId('updateSort'));
      fireEvent.click(getByTestId('updateSort'));
    });

    await act(async () => {
      await jest.advanceTimersByTime(2500);
    });

    await waitFor(() => {
      const itemList = getAllByTestId('item-list');
      expect(itemList).toHaveLength(expectedOrder.length);

      itemList.forEach((value, index) =>
        expect(value.innerHTML).toEqual(expectedOrder[index])
      );
    });
  });
  it('should display offers filtered by `CD`', async () => {
    const expectedOrder = [
      'CD (Certificate of Deposit)',
      'CD (Certificate of Deposit)',
      '12 Month <strong>Online</strong> CD',
      '12 Month Online CD',
    ];
    (Controllers as jest.Mock).mockImplementation(({ onChange }) => {
      return (
        <div
          data-testid="updateSort"
          onClick={() => onChange('filter')('CD (Certificate of Deposit)')}
        ></div>
      );
    });
    const { getByTestId, getAllByTestId } = render(<App />);

    act(() => {
      fireEvent.click(getByTestId('updateSort'));
    });

    await act(async () => {
      await jest.advanceTimersByTime(2500);
    });

    await waitFor(() => {
      const itemList = getAllByTestId('item-list');
      expect(itemList).toHaveLength(expectedOrder.length);

      itemList.forEach((value, index) =>
        expect(value.innerHTML).toEqual(expectedOrder[index])
      );
    });
  });
  it('should display entire offers for filter by `Money Market`', async () => {
    const expectedOrder = [
      'Premium Online Savings',
      'Online Savings Account',
      'Kitten Savings and Checking',
      'CD (Certificate of Deposit)',
      'CD (Certificate of Deposit)',
      'Online Savings Account',
      '12 Month <strong>Online</strong> CD',
      '12 Month Online CD',
    ];
    (Controllers as jest.Mock).mockImplementation(({ onChange }) => {
      return (
        <div
          data-testid="updateSort"
          onClick={() => onChange('filter')('Money Market')}
        ></div>
      );
    });
    const { getByTestId, getAllByTestId } = render(<App />);

    act(() => {
      fireEvent.click(getByTestId('updateSort'));
    });

    await act(async () => {
      await jest.advanceTimersByTime(2500);
    });

    await waitFor(() => {
      const itemList = getAllByTestId('item-list');
      expect(itemList).toHaveLength(expectedOrder.length);

      itemList.forEach((value, index) =>
        expect(value.innerHTML).toEqual(expectedOrder[index])
      );
    });
  });
});

import {
  render,
  getByRole,
  getByText,
  getDefaultNormalizer,
  fireEvent,
} from '@testing-library/react';
import { OfferResponse } from '../types/types';
import { ListItem } from './ListItem';

const listItemData = {
  providerObject: {
    uuid: 'c9986942-6429-457e-a7f5-276489510301',
    name: 'Beardly',
    logo: 'https://placebeard.it/125x70',
  },
  details: [
    {
      title: 'Minimum Deposit',
      value: '$20',
      'original-value': 20.0,
      originalValueSchema: {
        type: 'number',
      },
      importance: 2,
      contentType: 'text/plain',
    },
    {
      title: 'Annual Percentage Yield',
      value: '6.10%',
      'original-value': 6.1,
      originalValueSchema: {
        type: 'number',
      },
      importance: 6,
      contentType: 'text/plain',
    },
    {
      title: 'Insurance',
      value: 'fdic',
      'original-value': 'fdic',
      originalValueSchema: {
        type: 'string',
      },
      importance: 5,
      contentType: 'text/plain',
    },
  ],
  url: 'https://letmegooglethat.com/?q=12+Month+Online+CD',
  name: '12 Month Online CD',
  provider: 'c9986942-6429-457e-a7f5-276489510301',
  type: {
    title: 'CD (Certificate of Deposit)',
    details:
      'Certificate of Deposit (CD) is a type of savings account that earns interest on deposited funds for a fixed period of time ending with the “maturity date”. If funds are withdrawn prior to the maturity date penalties may be applied, including loss of interest.',
  },
} as OfferResponse;

describe('ListItem', () => {
  let container: HTMLElement;

  beforeEach(() => {
    jest.spyOn(window, 'open');
    ({ container } = render(<ListItem item={listItemData} />));
  });

  it('should displays the partner logo for that offer', () => {
    expect(getByRole(container, 'img')).toHaveAttribute(
      'src',
      listItemData.providerObject?.logo
    );
  });

  describe('should render details', () => {
    it.each(listItemData.details)(
      `should render details: ( $title, $value )`,
      ({ title, value }) => {
        expect(getByText(container, title)).toBeInTheDocument();
        expect(
          getByText(container, value, {
            exact: false,
            normalizer: getDefaultNormalizer(),
          })
        ).toBeInTheDocument();
      }
    );
  });

  it('should opens in a new tab when click call to', () => {
    const callToLink = getByText(container, 'Call To');

    expect(callToLink).toHaveAttribute('href', listItemData.url);
    expect(callToLink).toHaveAttribute('target', '_blank');
  });
  
});

export interface OfferDetail {
  title: string;
  value: string;
  "original-value": number | string;
  originalValueSchema: {
    type: "number" | "string";
  };
  importance: number;
  contentType: string;
  // Add more properties as needed
}

export interface Provider {
  uuid: string;
  name: string;
  logo: string;
  // Add more properties as needed
}

export interface Offer {
  details: OfferDetail[];
  url: string;
  name: string;
  provider: string;
  type: {
    title: string;
    details: string;
  };
}

export interface Data {
  providers: Provider[];
  offers: Offer[];
  // Add more properties as needed
}

export interface RequestParams {
  sort: keyof OfferResponse,
  order: string,
  filter: string,
}

export interface OfferResponse extends Offer {
  apy: string | number;
  minDeposit: string | number;
  providerObject: Provider | undefined; 
}

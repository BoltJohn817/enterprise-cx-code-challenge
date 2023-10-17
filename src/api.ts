import { Data, OfferResponse, RequestParams } from "./types/types";
const data: Data = require("./data.json")

export const getOffers = async (params: RequestParams): Promise<OfferResponse[]> => {
  const {sort, order, filter} = params;
  return new Promise<OfferResponse[]>((resolve, reject) => {
    setTimeout(() => {
      const mappedOffers: OfferResponse[] = data.offers.map((offer) => ({
        ...offer,
        providerObject: data.providers.find((p) => p.uuid === offer.provider),
        apy: offer.details.find((d) => d.title === "Annual Percentage Yield")?.[
          "original-value"
        ] || "",
        minDeposit: offer.details.find((d) => d.title === "Minimum Deposit")?.[
          "original-value"
        ] || "",
      }));

      const filtered: OfferResponse[] = mappedOffers.filter(
        (offer) => offer.type.title === filter
      );
      return resolve(
        (filtered.length === 0 ? mappedOffers : filtered).sort(
          (a, b) => (+(a[sort] || "") - +(b[sort] || "")) * +order
        )
      );
    }, 2000);
  });
};
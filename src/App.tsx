import { useEffect, useState } from "react";
import { OfferResponse, RequestParams } from "./types/types";
import { Layout, List, message } from "antd";
import { Controllers } from "./components/Controllers";
import { getOffers } from "./api";
import { ListItem } from "./components/ListItem";

function App() {
  const [data, setData] = useState<OfferResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [{ sort, order, filter }, setParams] = useState<RequestParams>({
    sort: "apy",
    order: "1",
    filter: "Savings Account",
  });

  useEffect(() => {
    setLoading(true);
    getOffers({ sort, order, filter })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((e) => {
        message.error(e);
        console.error(e);
        setLoading(false);
      });
  }, [sort, order, filter]);

  const onChange = (key: string) => (value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>
        <div
          data-testid="header"
          style={{ color: "white", textAlign: "center", fontSize: "1.5rem" }}
        >
          Code Challenge
        </div>
      </Layout.Header>
      <Layout.Content
        style={{ width: "80%", margin: "0 auto", paddingBottom: 24 }}
      >
        <Controllers
          data-testid="controllers"
          {...{ filter, sort, order, onChange: onChange }}
        />
        <List
          data-testid="list"
          dataSource={data}
          loading={loading}
          renderItem={(item: OfferResponse, index: number) => (
            <ListItem
              item={item}
              key={index}
              data-testid={`list-item-${index}`}
            />
          )}
        />
      </Layout.Content>
    </Layout>
  );
}

export default App;

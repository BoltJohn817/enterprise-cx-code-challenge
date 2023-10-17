import { Avatar, Descriptions, Flex, List, Tag, Tooltip } from "antd";
import { OfferResponse } from "../types/types";

interface ListItemProps {
  item: OfferResponse;
}

export const ListItem = ({ item }: ListItemProps) => {
  return (
    <List.Item>
      <Flex gap={16}>
        <Avatar
          src={item.providerObject?.logo}
          size="large"
          style={{ minWidth: 40 }}
        />
        <div>
          <Flex
            gap={8}
            align="center"
            justify="space-between"
            style={{ marginBottom: 16 }}
          >
            <Flex align="center" gap={16}>
              <div
                dangerouslySetInnerHTML={{ __html: item.name }}
                style={{ fontSize: "1.25rem" }}
              />
              <Tooltip title={item.type.details}>
                <Tag>{item.type.title}</Tag>
              </Tooltip>
            </Flex>
            <a type="link" href={item.url} target="_blank">
              Call To
            </a>
          </Flex>
          <Descriptions>
            {item.details.map((detail, index) => (
              <Descriptions.Item key={index} label={detail.title}>
                {detail.contentType === "text/html" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detail.value.split(/\n/).join(""),
                    }}
                  />
                ) : (
                  detail.value
                )}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>
      </Flex>
    </List.Item>
  );
};

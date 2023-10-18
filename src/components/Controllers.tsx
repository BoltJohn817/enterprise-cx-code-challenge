import { Flex, Select, Space } from "antd";

const sortOptions = [
  { value: "apy", label: "Annual Percentage Yield" },
  { value: "minDeposit", label: "Minimum Deposit" },
];
const orderOptions = [
  { value: "1", label: "Ascending" },
  { value: "-1", label: "Descending" },
];
const filterOptions = [
  { value: "Savings Account", label: "Savings Account" },
  { value: "Money Market", label: "Money Market" },
  {
    value: "CD (Certificate of Deposit)",
    label: "CD (Certificate of Deposit)",
  },
];

interface ControllersProps {
  filter: string;
  sort: string;
  order: string;
  onChange: (key: string) => (value: string) => void;
}

export const Controllers = ({
  filter,
  sort,
  order,
  onChange,
}: ControllersProps) => {
  return (
    <Flex justify="flex-end" gap={16} style={{ margin: "24px 0px" }}>
      <Select
        options={filterOptions}
        value={filter}
        onChange={onChange("filter")}
      />
      <Space.Compact>
        <Select
          options={sortOptions}
          value={sort}
          onChange={onChange("sort")}
        />
        <Select
          options={orderOptions}
          value={order}
          onChange={onChange("order")}
        />
      </Space.Compact>
    </Flex>
  );
};

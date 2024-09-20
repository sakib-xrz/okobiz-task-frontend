import { Input, Select } from "antd";

export const filterOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Block", value: "BLOCK", danger: true },
];

const sortOptions = [
  {
    label: "Name (A - Z)",
    value: "name",
    data: {
      sortBy: "name",
      sortOrder: "asc",
    },
  },
  {
    label: "Name (Z - A)",
    value: "-name",
    data: {
      sortBy: "name",
      sortOrder: "desc",
    },
  },
  {
    label: "NID Generate (Low to High)",
    value: "generatedPdfCount",
    data: {
      sortBy: "generatedPdfCount",
      sortOrder: "asc",
    },
  },
  {
    label: "NID Generate (High to Low)",
    value: "-generatedPdfCount",
    data: {
      sortBy: "generatedPdfCount",
      sortOrder: "desc",
    },
  },
  {
    label: "Created Date (Old to New)",
    value: "createdAt",
    data: {
      sortBy: "createdAt",
      sortOrder: "asc",
    },
  },
  {
    label: "Created Date (New to Old)",
    value: "-createdAt",
    data: {
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  },
];

export default function UserSearchSortFilter({
  params,
  setParams,
  searchKey,
  setSearchKey,
  debouncedSearch,
}) {
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchKey(value);
    debouncedSearch(value);
  };

  return (
    <div className="flex items-center gap-5">
      <div className="w-6/12">
        <Input
          placeholder="Search by user name or email"
          onChange={handleSearchChange}
          value={searchKey || ""}
          allowClear
        />
      </div>

      <div className="flex w-6/12 items-center gap-5">
        <div className="w-1/2">
          <Select
            placeholder="Filter by user status"
            className="w-full"
            options={filterOptions}
            value={params.status || undefined}
            onChange={(value) => {
              setParams((prevParams) => ({
                ...prevParams,
                status: value,
              }));
            }}
            allowClear
          />
        </div>
        <div className="w-1/2">
          <Select
            placeholder="Sort by"
            className="w-full"
            options={sortOptions}
            value={
              sortOptions.find(
                (opt) =>
                  opt?.data.sortBy === params.sortBy &&
                  opt?.data.sortOrder === params.sortOrder,
              )?.value || undefined
            }
            onChange={(value) => {
              const selectedSortOption = sortOptions.find(
                (opt) => opt.value === value,
              );
              setParams((prevParams) => ({
                ...prevParams,
                sortBy: selectedSortOption?.data.sortBy,
                sortOrder: selectedSortOption?.data.sortOrder,
              }));
            }}
            allowClear
          />
        </div>
      </div>
    </div>
  );
}

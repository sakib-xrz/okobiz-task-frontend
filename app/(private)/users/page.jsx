/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Loading from "@/components/shared/Loading";
import useStore from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import UserSearchSortFilter from "./_components/UserSearchSortFilter";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { generateQueryString, sanitizeParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import ApiKit from "@/common/ApiKit";
import UserCard from "./_components/UserCard";
import { Empty, Pagination } from "antd";

export default function Users() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userLoading } = useStore();

  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 5,
  });

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: value,
      page: 1,
    }));
  }, 400);

  const debouncedUpdateURL = useDebouncedCallback(() => {
    const queryString = generateQueryString(params);
    router.push(`/users${queryString}`, undefined, { shallow: true });
  }, 500);

  useEffect(() => {
    debouncedUpdateURL();
  }, [params]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", params],
    queryFn: () =>
      ApiKit.user.getUsers(sanitizeParams(params)).then((res) => res),
    keepPreviousData: true,
  });

  if (userLoading) {
    return <Loading />;
  }

  if (user?.role !== "ADMIN") {
    router.push("/logout");
    return;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-semibold">Users</h2>

      <UserSearchSortFilter
        params={params}
        setParams={setParams}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        debouncedSearch={debouncedSearch}
      />

      {isLoading ? (
        <Loading />
      ) : data?.meta?.total === 0 ? (
        <div>
          <Empty description="No user found" className="mt-20" />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-2">
            {data?.data?.map((user) => (
              <UserCard key={user._id} user={user} refetch={refetch} />
            ))}
          </div>
          <div>
            <Pagination
              align="center"
              current={params?.page}
              onChange={(page) => {
                setParams((prevParams) => ({
                  ...prevParams,
                  page,
                }));
              }}
              total={data?.meta?.total}
              pageSize={params?.limit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

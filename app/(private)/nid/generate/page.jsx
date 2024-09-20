"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Nid from "../../_components/Nid";
import { useQuery } from "@tanstack/react-query";
import ApiKit from "@/common/ApiKit";
import Loading from "@/components/shared/Loading";
import { Button, Result } from "antd";

export default function GenerateNid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nid", key],
    queryFn: () => ApiKit.nid.getNidByKey(key),
    enabled: !!key,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Result
        status="error"
        title="Failed to load NID"
        subTitle="Please check your internet connection and try again."
        extra={
          <Button type="primary" onClick={() => router.push("/nid")}>
            Generate NID
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <Nid data={data?.data} />
    </div>
  );
}

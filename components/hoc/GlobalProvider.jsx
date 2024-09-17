"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Toaster } from "sonner";
import Loading from "../shared/Loading";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import themeConfig from "@/theme/themeConfig";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }) {
  return (
    <Suspense
      fallback={
        <>
          <Loading className="min-h-screen" />
        </>
      }
    >
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" richColors />
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </Suspense>
  );
}

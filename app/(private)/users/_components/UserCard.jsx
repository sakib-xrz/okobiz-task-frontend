"use client";

import { Select, Tag } from "antd";
import { format } from "date-fns";
import { filterOptions } from "./UserSearchSortFilter";
import ApiKit from "@/common/ApiKit";
import { toast } from "sonner";

export default function UserCard({ user, refetch }) {
  const handleChangeStatus = async (userId, status) => {
    const promise = (async () => {
      await ApiKit.user.changeUserStatus(userId, status);
      refetch();
    })();

    toast.promise(promise, {
      loading: "Changing status...",
      success: "Status changed successfully",
      error: "Failed to change status",
    });
  };

  return (
    <div className="max-w-full rounded-lg border bg-white p-6 shadow-sm">
      {/* Card Layout */}
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12 md:gap-6">
        {/* User Info */}
        <div className="flex items-center sm:space-x-4 md:col-span-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm font-medium text-gray-500">{user.email}</p>
            <div>
              {user.status === "ACTIVE" ? (
                <Tag bordered={false} color="success">
                  Active
                </Tag>
              ) : (
                <Tag bordered={false} color="error">
                  Block
                </Tag>
              )}
            </div>
          </div>
        </div>

        {/* NID Generated */}
        <div className="flex flex-col items-start gap-1 md:col-span-3 md:items-center">
          <h3 className="text-sm font-medium text-gray-500">NID Generated</h3>
          <p className="text-2xl font-semibold text-primary">
            {user.generatedPdfCount}
          </p>
        </div>

        {/* Account Created */}
        <div className="flex flex-col items-start gap-1 md:col-span-3 md:items-center">
          <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
          <p className="text-lg font-semibold">
            {format(new Date(user.createdAt), "dd/MM/yyyy")}
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 md:col-span-3 md:items-center">
          <h3 className="text-sm font-medium text-gray-500">Change Status</h3>
          <div className="flex w-full gap-2 md:justify-center">
            <Select
              className="w-full !text-center xs:w-36"
              options={filterOptions}
              value={filterOptions.find(
                (option) => option.value === user.status,
              )}
              onChange={(value) => handleChangeStatus(user._id, value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

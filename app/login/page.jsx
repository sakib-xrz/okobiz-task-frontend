"use client";

import * as Yup from "yup";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, Card, Input } from "antd";
import Link from "next/link";

import { toast } from "sonner";

import Container from "@/components/shared/Container";
import Label from "@/components/shared/Label";
import FormikError from "@/components/shared/FormikError";

import ApiKit from "@/common/ApiKit";
import { setTokenAndRedirect } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousURL = searchParams.get("next");

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please provide a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      const payload = {
        ...values,
      };

      const promise = ApiKit.auth
        .login(payload)
        .then(({ data }) => {
          formik.resetForm();
          setTokenAndRedirect(data.access, () => {
            if (previousURL) {
              router.push(previousURL);
            } else {
              router.push("/");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });

      toast.promise(promise, {
        loading: "Logging in...",
        success: "Logged in successfully",
        error: (error) => error?.message || "Failed to login",
      });
    },
  });

  return (
    <Container className={"py-0 lg:py-0"}>
      <title>NID GENERATOR | LOGIN</title>
      <div className="flex min-h-screen w-auto items-center justify-center">
        <Card className="w-full max-w-sm shadow">
          <div className="space-y-3">
            <div>
              <h3 className="text-2xl font-semibold">Login</h3>
              <p className="text-base">
                Enter your credentials to get started.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    {...formik.getFieldProps("email")}
                  />
                  <FormikError formik={formik} name="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input.Password
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    {...formik.getFieldProps("password")}
                  />
                  <FormikError formik={formik} name="password" />
                </div>
              </div>

              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>

              <div className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/register">
                  <Button type="link" className="!p-0">
                    Register
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </Container>
  );
}

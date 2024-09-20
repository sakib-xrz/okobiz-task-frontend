"use client";

import * as Yup from "yup";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, Card, Input, Tooltip } from "antd";
import { Info } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";

import Container from "@/components/shared/Container";
import Label from "@/components/shared/Label";
import FormikError from "@/components/shared/FormikError";

import ApiKit from "@/common/ApiKit";
import { setTokenAndRedirect } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousURL = searchParams.get("next");

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at-least 3 character")
        .required("Name is required"),
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
        .register(payload)
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
        loading: "Creating account...",
        success: "Account created successfully",
        error: (error) => error?.message || "Failed to create account",
      });
    },
  });

  return (
    <Container className={"py-0 lg:py-0"}>
      <title>NID GENERATOR | REGISTER</title>
      <div className="flex min-h-screen w-auto items-center justify-center">
        <Card className="w-full max-w-sm shadow">
          <div className="space-y-3">
            <div>
              <h3 className="text-2xl font-semibold">Register</h3>
              <p className="text-base">Create an account to get started.</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    {...formik.getFieldProps("name")}
                  />
                  <FormikError formik={formik} name="name" />
                </div>
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
                Register
              </Button>

              <div className="text-center">
                Already have an account?{" "}
                <Link href="/login">
                  <Button type="link" className="!p-0">
                    Login
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

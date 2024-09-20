"use client";

import Container from "@/components/shared/Container";
import { Button, Card, DatePicker, Input, Select, Upload } from "antd";
import { Upload as UploadIcon } from "lucide-react";
import Label from "@/components/shared/Label";
import { useFormik } from "formik";
import FormikError from "@/components/shared/FormikError";
import { bloodGroups } from "@/lib/keyChain";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { toast } from "sonner";
import ApiKit from "@/common/ApiKit";

const bengaliTextValidation = (fieldName) =>
  Yup.string()
    .matches(
      /^[\u0980-\u09FF\s,\/\-\u0030-\u0039]+$/,
      `Only valid Bengali characters are allowed for ${fieldName}`,
    )
    .required(`${fieldName} is required`);

// const data = {
//   b_name: "মোঃ সাকীবুল ইসলাম",
//   e_name: "MD SAKIBUL ISLAM",
//   father_name: "মোঃ আব্দুস সালাম সিকদার",
//   mother_name: "মোসাঃ শাহীনা বেগম",
//   signature: "Sakibul Islam",
//   nid_no: "4207590631",
//   zila: "ঢাকা",
//   upazila: "ঢাকা উত্তর সিটি  কর্পোরেশন",
//   post_office: "মিরপুর - ৮৭৩০",
//   village_or_road: "ইস্টার্ন হাউজিং, ব্লক-জে,রোড-এন/৮, দ্বিগুন",
//   house_or_holding: "১৭",
// };

export default function NidPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      b_name: "মোঃ সাকীবুল ইসলাম",
      e_name: "MD SAKIBUL ISLAM",
      father_name: "মোঃ আব্দুস সালাম সিকদার",
      mother_name: "মোসাঃ শাহীনা বেগম",
      signature: "Sakibul Islam",
      nid_no: "4207590631",
      dob: "",
      zila: "ঢাকা",
      upazila: "ঢাকা উত্তর সিটি কর্পোরেশন",
      post_office: "মিরপুর - ৮৭৩০",
      village_or_road: "ইস্টার্ন হাউজিং, ব্লক-জে,রোড-এন/৮, দ্বিগুন",
      house_or_holding: "১৭",
      blood_group: null,
      card_issue_date: "",
      photo: null,
    },
    validationSchema: Yup.object().shape({
      b_name: bengaliTextValidation("Name"),
      e_name: Yup.string().required("Name is required"),
      father_name: bengaliTextValidation("Father's Name"),
      mother_name: bengaliTextValidation("Mother's Name"),
      signature: Yup.string().required("Signature is required"),
      nid_no: Yup.string().required("NID No. is required"),
      dob: Yup.string().required("Date of Birth is required"),
      zila: bengaliTextValidation("Zila"),
      upazila: bengaliTextValidation("Upazila"),
      post_office: bengaliTextValidation("Post Office"),
      village_or_road: bengaliTextValidation("Village/Rode"),
      house_or_holding: bengaliTextValidation("House/Holding"),
      blood_group: Yup.object().required("Blood Group is required"),
      card_issue_date: Yup.string().required("Card Issuance Date is required"),
      photo: Yup.mixed().required("Image is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const promise = (async () => {
        const key = uuidv4();

        const payload = {
          ...values,
          key,
        };

        const formData = new FormData();

        for (const key in payload) {
          if (key === "blood_group") {
            formData.append(key, payload[key].value);
          } else if (key === "photo") {
            formData.append("file", payload[key]);
          } else {
            formData.append(key, payload[key]);
          }
        }

        await ApiKit.nid.create(formData);
        router.push("/nid/generate?key=" + key);
      })();

      promise.finally(() => {
        setLoading(false);
      });

      toast.promise(promise, {
        loading: "Generating NID Card...",
        success: "NID Card generated successfully",
        error: (err) => err.message || "Failed to generate NID Card",
      });
    },
  });

  return (
    <Container>
      <div className="mx-auto sm:w-8/12 lg:w-6/12">
        <Card>
          <div className="space-y-3">
            <h4 className="text-center font-[family-name:var(--font-english)] font-semibold text-primary max-sm:text-2xl sm:text-3xl">
              NID Card Maker
            </h4>

            <hr />

            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="b_name" required>
                    Name (বাংলায়)
                  </Label>
                  <Input
                    id="b_name"
                    name="b_name"
                    placeholder="আপনার নাম লিখুন"
                    {...formik.getFieldProps("b_name")}
                  />
                  <FormikError formik={formik} name="b_name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="e_name" required>
                    Name (in English)
                  </Label>
                  <Input
                    id="e_name"
                    name="e_name"
                    placeholder="Enter your name"
                    {...formik.getFieldProps("e_name")}
                  />
                  <FormikError formik={formik} name="e_name" />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="father_name"
                    required
                  >{`Father's Name (বাংলায়)`}</Label>
                  <Input
                    id="father_name"
                    name="father_name"
                    placeholder="আপনার পিতার নাম লিখুন"
                    {...formik.getFieldProps("father_name")}
                  />
                  <FormikError formik={formik} name="father_name" />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="mother_name"
                    required
                  >{`Mother's Name (বাংলায়)`}</Label>
                  <Input
                    id="mother_name"
                    name="mother_name"
                    placeholder="আপনার মাতার নাম লিখুন"
                    {...formik.getFieldProps("mother_name")}
                  />
                  <FormikError formik={formik} name="mother_name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signature" required>
                    Signature (in English)
                  </Label>
                  <Input
                    id="signature"
                    name="signature"
                    placeholder="Enter your signature"
                    {...formik.getFieldProps("signature")}
                  />
                  <FormikError formik={formik} name="signature" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="nid_no" required>
                    NID No. (in English)
                  </Label>
                  <Input
                    id="nid_no"
                    name="nid_no"
                    placeholder="Enter your nid number"
                    {...formik.getFieldProps("nid_no")}
                  />
                  <FormikError formik={formik} name="nid_no" />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Label htmlFor="dob" required>
                    Date of Birth
                  </Label>
                  <DatePicker
                    placeholder="Select your date of birth"
                    onChange={(_, dateString) => {
                      formik.setFieldValue("dob", dateString);
                    }}
                  />
                  <FormikError formik={formik} name="dob" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="zila" required>
                    Zila (বাংলায়)
                  </Label>
                  <Input
                    id="zila"
                    name="zila"
                    placeholder="আপনার জেলার নাম লিখুন"
                    {...formik.getFieldProps("zila")}
                  />
                  <FormikError formik={formik} name="zila" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="upazila" required>
                    Upazila (বাংলায়)
                  </Label>
                  <Input
                    id="upazila"
                    name="upazila"
                    placeholder="আপনার উপজেলার নাম লিখুন"
                    {...formik.getFieldProps("upazila")}
                  />
                  <FormikError formik={formik} name="upazila" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="post_office" required>
                    Post Office (বাংলায়)
                  </Label>
                  <Input
                    id="post_office"
                    name="post_office"
                    placeholder="আপনার ডাকঘর এর নাম লিখুন"
                    {...formik.getFieldProps("post_office")}
                  />
                  <FormikError formik={formik} name="post_office" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="village_or_road" required>
                    Village/Road (বাংলায়)
                  </Label>
                  <Input
                    id="village_or_road"
                    name="village_or_road"
                    placeholder="আপনার গ্রাম/রাস্তার নাম লিখুন"
                    {...formik.getFieldProps("village_or_road")}
                  />
                  <FormikError formik={formik} name="village_or_road" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="house_or_holding" required>
                    House/Holding Number (বাংলায়)
                  </Label>
                  <Input
                    id="house_or_holding"
                    name="house_or_holding"
                    placeholder="আপনার বাড়ির নম্বর লিখুন, যেমনঃ #১৭"
                    {...formik.getFieldProps("house_or_holding")}
                  />
                  <FormikError formik={formik} name="house_or_holding" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="blood_group" required>
                    Select Blood Group
                  </Label>
                  <Select
                    className="w-full"
                    placeholder="Select your blood group"
                    options={bloodGroups}
                    value={formik.values.blood_group}
                    onChange={(value) => {
                      formik.setFieldValue(
                        "blood_group",
                        bloodGroups.find((group) => group.value === value),
                      );
                    }}
                  />
                  <FormikError formik={formik} name="blood_group" />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Label htmlFor="card_issue_date" required>
                    Card Issuance Date
                  </Label>
                  <DatePicker
                    placeholder="Select your card issuance date"
                    onChange={(_, dateString) => {
                      formik.setFieldValue("card_issue_date", dateString);
                    }}
                  />
                  <FormikError formik={formik} name="card_issue_date" />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Label htmlFor="photo" required>
                    Image
                  </Label>
                  <Upload
                    maxCount={1}
                    multiple={false}
                    accept=".jpg,.jpeg,.png"
                    onChange={({ file }) => {
                      formik.setFieldValue("photo", file?.originFileObj);
                    }}
                  >
                    <Button icon={<UploadIcon />} className="!w-full">
                      Click to Upload
                    </Button>
                  </Upload>
                  <FormikError formik={formik} name="photo" />
                </div>
              </div>

              <Button
                htmlType="submit"
                type="primary"
                className="w-full"
                loading={loading}
              >
                Generate NID Card
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Container>
  );
}

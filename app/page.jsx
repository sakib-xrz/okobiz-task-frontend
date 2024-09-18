"use client";

import Container from "@/components/shared/Container";
import Nid from "./_components/Nid";
import { Card, DatePicker, Input } from "antd";
import Label from "@/components/shared/Label";
import { useFormik } from "formik";
import FormikError from "@/components/shared/FormikError";
import moment from "moment";

const data = {
  b_name: "মোঃ সাকীবুল ইসলাম",
  e_name: "MD SAKIBUL ISLAM",
  father_name: "মোঃ আব্দুস সালাম সিকদার",
  mother_name: "মোসাঃ শাহীনা বেগম",
  // dob: "22 Aug 1999",
  dob: "",
  nid_no: "4207590631",
  signature: "Sakibul Islam",
  house_or_holding: "১৭",
  village_or_rode: "ইস্টার্ন হাউজিং, ব্লক-জে,রোড-এন/৮, দ্বিগুন",
  post_office: "মিরপুর - ৮৭৩০",
  upazila: "ঢাকা উত্তর সিটি  কর্পোরেশন",
  zila: "ঢাকা",
  blood_group: "B+",
  birth_place: "বরগুনা",
  delivery_date: "২৯/১১/২০২১",
};

export default function Home() {
  const formik = useFormik({
    initialValues: data,
    // validationSchema: {},
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(formik.values.dob);

  return (
    <Container>
      {/* <Nid data={data} /> */}
      <div className="mx-auto sm:w-8/12 md:w-6/12">
        <Card>
          <h4 className="text-center font-[family-name:var(--font-english)] font-semibold text-primary max-sm:text-2xl sm:text-3xl">
            Old NID Card Maker
          </h4>
          <br />
          <hr />
          <br />
          <form>
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
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}

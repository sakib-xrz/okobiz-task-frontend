"use client";

import Container from "@/components/shared/Container";
import Nid from "./_components/Nid";
import { Button, Card, DatePicker, Input, Select, Upload } from "antd";
import { Upload as UploadIcon } from "lucide-react";
import Label from "@/components/shared/Label";
import { useFormik } from "formik";
import FormikError from "@/components/shared/FormikError";
import moment from "moment";
import { bloodGroups } from "@/lib/keyChain";

// const data = {
//   b_name: "মোঃ সাকীবুল ইসলাম",
//   e_name: "MD SAKIBUL ISLAM",
//   father_name: "মোঃ আব্দুস সালাম সিকদার",
//   mother_name: "মোসাঃ শাহীনা বেগম",
//   dob: "22 Aug 1999",
//   nid_no: "4207590631",
//   signature: "Sakibul Islam",
//   house_or_holding: "১৭",
//   village_or_rode: "ইস্টার্ন হাউজিং, ব্লক-জে,রোড-এন/৮, দ্বিগুন",
//   post_office: "মিরপুর - ৮৭৩০",
//   upazila: "ঢাকা উত্তর সিটি  কর্পোরেশন",
//   zila: "ঢাকা",
//   blood_group: { value: "A+", label: "A+" },
//   birth_place: "বরগুনা",
//   card_issue_date: "২৯/১১/২০২১",
//   photo: null,
// };

export default function Home() {
  const formik = useFormik({
    initialValues: {
      b_name: "",
      e_name: "",
      father_name: "",
      mother_name: "",
      signature: "",
      dob: "",
      zila: "",
      upazila: "",
      post_office: "",
      village_or_rode: "",
      house_or_holding: "",
      blood_group: null,
      card_issue_date: "",
      photo: null,
    },
    // validationSchema: {},
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container>
      <div className="flex items-start justify-center gap-10">
        <div>
          <Card>
            <div className="space-y-3">
              <h4 className="text-center font-[family-name:var(--font-english)] font-semibold text-primary max-sm:text-2xl sm:text-3xl">
                Old NID Card Maker
              </h4>

              <hr />

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
                      // value={
                      //   formik.values.dob
                      //     ? moment(formik.values.dob, "YYYY-MM-DD")
                      //     : null
                      // }
                      placeholder="Select your date of birth"
                      onChange={(_, dateString) => {
                        formik.setFieldValue("dob", dateString);
                      }}
                    />
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
                    <Label htmlFor="village_or_rode" required>
                      Village/Road (বাংলায়)
                    </Label>
                    <Input
                      id="village_or_rode"
                      name="village_or_rode"
                      placeholder="আপনার গ্রাম/রাস্তার নাম লিখুন"
                      {...formik.getFieldProps("village_or_rode")}
                    />
                    <FormikError formik={formik} name="village_or_rode" />
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
                      options={bloodGroups}
                      value={formik.values.blood_group}
                      onChange={(value) => {
                        formik.setFieldValue("blood_group", value);
                      }}
                    />
                    <FormikError formik={formik} name="house_or_holding" />
                  </div>
                  <div className="flex w-full flex-col gap-1">
                    <Label htmlFor="card_issue_date" required>
                      Card Issuance Date
                    </Label>
                    <DatePicker
                      // value={
                      //   formik.values.card_issue_date
                      //     ? moment(formik.values.card_issue_date, "YYYY-MM-DD")
                      //     : null
                      // }
                      placeholder="Select your card issuance date"
                      onChange={(_, dateString) => {
                        formik.setFieldValue("card_issue_date", dateString);
                      }}
                    />
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
                        formik.setFieldValue("photo", file?.originFileObj),
                          console.log(file?.originFileObj);
                      }}
                    >
                      <Button icon={<UploadIcon />} className="!w-full">
                        Click to Upload
                      </Button>
                    </Upload>
                    <FormikError formik={formik} name="photo" />
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>

        <div>
          <div className="space-y-3 rounded-lg border p-4">
            <h4 className="text-center font-[family-name:var(--font-english)] font-semibold text-primary max-sm:text-2xl sm:text-3xl">
              Preview
            </h4>

            <Nid data={formik.values} />
          </div>
        </div>
      </div>
    </Container>
  );
}

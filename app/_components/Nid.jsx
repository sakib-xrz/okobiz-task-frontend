"use client";

import govt_logo from "@/public/govt_logo.png";
import nid_bg from "@/public/nid_bg.png";
import Image from "next/image";
import user from "@/public/user.jpeg";

import provider_sign from "@/public/provider_sign.png";
import barcode from "@/public/barcode.png";

export default function Nid({ data }) {
  const {
    b_name,
    e_name,
    father_name,
    mother_name,
    dob,
    nid_no,
    signature,
    house_or_holding,
    village_or_rode,
    post_office,
    upazila,
    zila,
    blood_group,
    delivery_date,
    photo,
  } = data;

  return (
    <div className="pointer-events-none flex select-none flex-col items-center justify-center gap-6">
      {/* front part */}

      <div className="h-[204px] w-[324px] border-2 border-black font-medium">
        <div className="flex h-[63px] items-center justify-center gap-1 border-b-2 border-black">
          <Image src={govt_logo} alt="govt_logo" className="size-9" />
          <div className="text-center">
            {" "}
            <h4 className="font-[family-name:var(--font-bangla)] text-sm font-[550]">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
            </h4>
            <p className="font-[family-name:var(--font-english)] text-xs tracking-tight text-[#007700]">{`Government of the People's Republic of Bangladesh`}</p>
            <p className="text-xs">
              <span className="font-[family-name:var(--font-english)] text-[#FF0000]">
                National ID Card
              </span>{" "}
              /{" "}
              <span className="font-[family-name:var(--font-bangla)]">
                জাতীয় পরিচয় পত্র
              </span>
            </p>
          </div>
        </div>

        <div className="relative -z-10 p-1">
          <Image
            src={nid_bg}
            alt="nid_bg"
            className="absolute left-1/2 right-0 top-1 size-28 -translate-x-1/2 transform opacity-70"
          />

          <div className="flex gap-2">
            <div className="w-[70px]">
              <Image
                src={photo ? URL.createObjectURL(photo) : ""}
                alt="user"
                className="h-[79px] w-[69px] object-cover"
                width={69}
                height={79}
              />
              <div>
                <p className="mt-1 text-center font-[family-name:var(--font-signature)] text-sm font-semibold">
                  {signature}
                </p>
              </div>
            </div>

            <div className="space-y-.5 z-50">
              <p className="text-sm">
                নাম: <span className="pl-6 font-bold">{b_name}</span>
              </p>
              <p className="text-sm font-normal">
                Name:
                <span className="pl-[14px] font-[450] uppercase">{e_name}</span>
              </p>
              <p className="text-sm">
                পিতা:
                <span className="pl-[22px]">{father_name}</span>
              </p>
              <p className="text-sm">
                মাতা:<span className="pl-[23px]">{mother_name}</span>
              </p>
              <p className="text-sm font-normal">
                Date of Birth:{" "}
                <span className="font-medium text-[#FF0000]">{dob}</span>
              </p>
              <p className="text-sm font-normal">
                ID NO:{" "}
                <span className="font-bold text-[#FF0000]">{nid_no}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* back part */}
      <div className="h-[204px] w-[324px] border-2 border-black font-medium">
        <div className="flex h-[36px] items-center justify-center gap-1 border-b-2 border-black">
          <p className="px-2 py-1 font-[family-name:var(--font-bangla)] text-[8px] font-[450]">
            এই কার্ডটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সম্পত্তি। কার্ডটি
            ব্যবহারকারী ব্যতীত অন্য কোথাও পাওয়া গেলে নিকটস্থ পোস্ট অফিসে জমা
            দেওয়ার জন্য অনুরোধ করা হলো
          </p>
        </div>

        <div className="relative h-[68px] border-b-2 border-black">
          <div>
            <p className="px-2 py-1 text-center font-[family-name:var(--font-bangla)] text-[8.9px]">
              ঠিকানা: বাসা/হোল্ডিং: {house_or_holding}, গ্রাম/রাস্তা:{" "}
              {village_or_rode}, ডাকঘর: {post_office}, {upazila}, {zila}
            </p>
          </div>

          <p className="absolute bottom-0.5 left-2 text-[8.9px]">
            রক্তের গ্রুপ / Blood Group:{" "}
            <span className="text-[10px] text-[#FF0000]">
              {blood_group?.value || ""}
            </span>
          </p>

          {/* mudron no  */}
          <p className="absolute bottom-0 right-0 bg-black text-[8.9px] text-white">
            মূদ্রণ : ০১
          </p>
        </div>

        <div className="p-2">
          <div className="flex items-end justify-between">
            <Image src={provider_sign} alt="provider_sign" className="w-28" />
            <p className="pb-0.5 font-[family-name:var(--font-bangla)] text-[8.9px] font-[450]">
              প্রদানের তারিখ: ২৯/১১/২০২১
            </p>
          </div>
          <div className="h-10 w-[305px] overflow-hidden">
            <Image src={barcode} alt="barcode" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

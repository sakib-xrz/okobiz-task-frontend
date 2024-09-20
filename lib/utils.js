import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import HttpKit from "@/common/HttpKit";
import { AUTH_TOKEN_KEY } from "./keyChain";
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function deferred() {
  let _deferred = {};
  _deferred.promise = new Promise(function (resolve, reject) {
    _deferred.resolve = resolve;
    _deferred.reject = reject;
  });
  return _deferred;
}

export const setTokenAndRedirect = async (token, redirect = () => {}) => {
  try {
    const client = await HttpKit.setClientToken(token);
    const authToken =
      client.defaults.headers.common["Authorization"].split(" ")[1];

    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    HttpKit.defer.resolve(client);
    redirect();
  } catch (error) {
    console.error(error);
  }
};

export function generateQueryString(params) {
  const isEmpty = Object.values(params).every((value) => value === "");

  if (isEmpty) {
    return "";
  }

  const queryString = Object.entries(params)
    .filter(
      ([_key, value]) => value !== "" && value !== null && value !== undefined,
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  return `?${queryString}`;
}

export function sanitizeParams(params) {
  const sanitizedObj = {};

  for (const key in params) {
    if (params[key]) {
      sanitizedObj[key] = params[key];
    }
  }

  return sanitizedObj;
}

export const formatText = (text) => {
  if (text) {
    const textLowerCase = text.split("_").join(" ").toLowerCase();
    const formattedText =
      textLowerCase.charAt(0).toUpperCase() + textLowerCase.slice(1);
    return formattedText;
  } else {
    return "";
  }
};

export const formatDate = (date) => {
  if (date) {
    const dateString = new Date(date);
    const dateParts = format(dateString, "PP").split(" ");
    const month = dateParts[0];
    const day = dateParts[1].slice(0, -1);
    const year = dateParts[2];

    return `${day} ${month} ${year}`;
  } else {
    return "";
  }
};

function convertToBengaliNumber(input) {
  const engToBengaliDigits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  return input
    .toString()
    .replace(/[0-9]/g, (digit) => engToBengaliDigits[digit]);
}

export const formatDateBangla = (date) => {
  if (date) {
    const dateString = new Date(date);
    const dateParts = format(dateString, "P").split("/");
    const month = dateParts[0];
    const day = dateParts[1].slice(0, -1);
    const year = dateParts[2];

    return `${convertToBengaliNumber(day)}/${convertToBengaliNumber(month)}/${convertToBengaliNumber(year)}`;
  } else {
    return "";
  }
};

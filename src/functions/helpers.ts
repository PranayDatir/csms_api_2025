import jwt from "jsonwebtoken";

import bcryptjs from "bcryptjs";
// import config from "../config/config";
const crypto = require("crypto");

export const expiresInADaySec = 2 * 24 * 3600;

export class Helpers {
  // static filterExp = <T>(canUpdateValues: any) => {
  //   var updater: { [key: string]: any } = {};

  //   for (const [key, value] of Object.entries(canUpdateValues)) {
  //     switch (typeof value) {
  //       case "string":
  //         if (value != "") {
  //           updater[key] = value;
  //         }
  //         break;

  //       case "number":
  //       case "boolean":
  //         updater[key] = value;
  //         break;

  //       case "object":
  //         if (value instanceof Array) {
  //           updater[key] = JSON.stringify(value);
  //         } else {
  //           console.log("Unknown Type:", key, typeof value);
  //         }
  //         break;

  //       default:
  //         console.log("Unknown Type:", key, typeof value);
  //         break;
  //     }
  //   }

  //   return updater as T;
  // };

  // add static ts function that generates 6 digit otp as string
  // static generateOTP = (): string => {
  //   const digits = "123456789";
  //   let otp = "";
  //   for (let i = 0; i < 6; i++) {
  //     // otp += digits[Math.floor(Math.random() * 10)]; //generates undefined at some place
  //     otp += digits[crypto.randomInt(digits.length)];
  //   }
  //   return otp;
  // };

  // static signJWT = (
  //   obj: any,
  //   callback: (error: Error | null, token: string | null) => void
  // ): void => {
  //   try {
  //     jwt.sign(
  //       obj,
  //       config.server.token.secret,
  //       {
  //         issuer: config.server.token.issuer,
  //         algorithm: "HS256",
  //         expiresIn: expiresInADaySec,
  //       },
  //       (error, token) => {
  //         if (error) {
  //           callback(error, null);
  //         } else if (token) {
  //           callback(null, token);
  //         }
  //       }
  //     );
  //   } catch (error: any) {
  //     console.error(error);
  //     callback(error, null);
  //   }
  // };

  // static bcryptCompare = (
  //   s: string,
  //   hash: string,
  //   callback: (err: Error | null, success: boolean) => void
  // ) => {
  //   bcryptjs.compare(s, hash, (error: Error | null, result: boolean) => {
  //     if (error) {
  //       console.error(error);
  //     }
  //     callback(error, result);
  //   });
  // };

  static bcryptHash = async (
    s: string,
    salt: number | string = 10
  ): Promise<string> => {
    const res = await bcryptjs.hash(s, salt);
    return res;
  };

  // static compareNumericValueWithHash = (
  //   value: string,
  //   hashedValue: string,
  // ): Promise<boolean> => {
  //   return bcryptjs.compare(value, hashedValue);
  // }

  // static formatToMySQLDate = (dateString: string): string | Error => {
  //   const months: { [key: string]: string } = {
  //     Jan: "01",
  //     Feb: "02",
  //     Mar: "03",
  //     Apr: "04",
  //     May: "05",
  //     Jun: "06",
  //     Jul: "07",
  //     Aug: "08",
  //     Sep: "09",
  //     Oct: "10",
  //     Nov: "11",
  //     Dec: "12",
  //   };

  //   const [day, month, year] = dateString.split("-");
  //   const monthNumber = months[month];

  //   if (!monthNumber) {
  //     throw new Error("Invalid month in date string");
  //   }

  //   return `${year}-${monthNumber}-${day.padStart(2, "0")}`;
  // };

  // static genIds = (input: any): number[] => {
  //   const { affectedRows, insertId } = input;
  //   return Array.from({ length: affectedRows }, (_, i) => insertId + i);
  // };

  // static formatDateToMySQL = (date: Date = new Date()): string => {
  //   const pad = (n: number) => (n < 10 ? "0" + n : n);

  //   return (
  //     `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
  //       date.getDate()
  //     )} ` +
  //     `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
  //       date.getSeconds()
  //     )}`
  //   );
  // };
  // static combineTripDateAndInOutTime = (
  //   tripDate: Date | string,
  //   inTime: string
  // ): Date => {
  //   // Parse trip date and in time
  //   const tripDateObj = new Date(tripDate); // Parse the trip date string
  //   const [hours, minutes, seconds] = inTime.split(":").map(Number); // Split and parse inTime

  //   // Set the time on the trip date object
  //   tripDateObj.setHours(hours, minutes, seconds, 0); // Setting milliseconds to 0

  //   return tripDateObj; // Return the combined Date object
  // };
}

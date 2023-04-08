import { useEffect } from "react";

export const useConsoleLog = (messages: unknown[], prefix?: string) => {
  useEffect(() => {
    messages.forEach((m) => {
      if (prefix) {
        console.log(prefix, m);
      } else {
        console.log("[blum:log]: ", m);
      }
    });
  }, [...messages, prefix]);
};

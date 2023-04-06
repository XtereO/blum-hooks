import { useEffect } from "react";

export const useConsoleLog = (messages: unknown[], prefix?: boolean) => {
  useEffect(() => {
    messages.forEach((m) => {
      if (prefix) {
        console.log(m);
      } else {
        console.log("[blum:log]: ", m);
      }
    });
  }, [messages, prefix]);
};

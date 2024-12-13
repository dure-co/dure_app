import { customElement } from "solid-element";
import { Subapp } from "./components/subapp.jsx";
import { createSignal } from "solid-js";
// import {
//   client,
//   addmsg,
//   messages,
//   setMessages,
// } from "@dure/app/src/lib/mqtt.jsx";

console.log("initiating main.ts");

declare global {
  const __APP_VERSION__: string;
}

customElement(
  "dure-subapp",
  {
    supabaseProjectUrl: "",
    supabaseAnonKey: "",
  },
  Subapp
);

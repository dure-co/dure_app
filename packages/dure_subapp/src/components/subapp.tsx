import { Component, onMount, Suspense, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Router } from "@solidjs/router";
import { TextField, TextFieldInput, TextFieldLabel } from "./ui/text-field";
import { Resizable, ResizableHandle, ResizablePanel } from "./ui/resizable";
import {
  client,
  addmsg,
  messages,
  setMessages,
} from "@dure/app/src/lib/mqtt.jsx";

export const Subapp: Component<{
  supabaseProjectUrl: string;
  supabaseAnonKey: string;
}> = (props) => {
  console.log("initiating subapp");
  console.log(Router);

  onMount(async () => {
    console.log("on mount ", window, props);
    console.log("messages", messages());
    setMessages("test");
  });

  return (
    <Suspense fallback="Loading...">
      subapp loading test
      <br />
      <br />
      baseapp messaging text
      <br />
      <div class="flex h-[600px] " innerHTML={messages()}></div>
      <br />
    </Suspense>
  );
};

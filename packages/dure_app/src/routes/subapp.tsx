import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { For, Show, createSignal } from "solid-js";

import {
  platform,
  version,
  family,
  type,
  arch,
  locale as localeInfo,
  hostname as hostnameInfo,
} from "@tauri-apps/plugin-os";
import { trace, info, error, attachConsole } from "@tauri-apps/plugin-log";
import { channels, sendNotification } from "@tauri-apps/plugin-notification";
// import { Command } from '@tauri-apps/plugin-shell'
import { Stronghold, Location, Client } from "@tauri-apps/plugin-stronghold";
import { appDataDir } from "@tauri-apps/api/path";
import { Dynamic } from "solid-js/web";
import { html } from "lit-html";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "~/components/ui/resizable";

import { use } from "use-m";
import { messages, setMessages, client as mqttClient } from "../lib/mqtt";

export default function Subapp(props: RouteSectionProps) {
  const [logs, setLogs] = createSignal("");
  const addlog = (newlog: string) => {
    setLogs(logs() + "\n<br/>" + newlog);
  };

  // const _ = await use("@dure/subapp"); // use prisma branch
  // https://github.com/esm-dev/esm.sh/tree/main
  // importing web component

  const _ = use("@dure/subapp");
  // const _123 = use("@github/auto-check-element");
  // console.log(_123);

  // console.log(_, __);
  // const duresubapp = () => html`<dure-subapp></dure-subapp> `;
  // console.log(duresubapp());

  return (
    <main class="container">
      <div class="mx-auto w-full min-w-0">
        Subapp(Webcomponent) Launcher
        <br />
        <Dialog>
          <DialogTrigger as={Button<"button">}>Launch Subapp</DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Dure Subapp</DialogTitle>
              <DialogDescription>
                js component app loaded from
                https://www.npmjs.com/package/@dure/subapp
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <dure-subapp
                supabaseProjectUrl="https://enkgalkrwfipwjkmmwwj.supabase.co"
                supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVua2dhbGtyd2ZpcHdqa21td3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0MjE1NTQsImV4cCI6MjA0NTk5NzU1NH0.AvI-jzgm79q3vWXTWYoJw7yi7VPcMzHjp0jESUoD6Fc"
              ></dure-subapp>
            </div>
            <br />
            <div>
              <auto-check src="/signup-check/username"></auto-check>
            </div>
            {/* <DialogFooter>
              <Button type="submit">Close</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
        <br />
        {/* <Resizable class="border">
          <ResizablePanel initialSize={0.0} class="overflow-hidden">
            <span class="font-semibold">Apps</span>
            <div class="flex h-[50px] items-center justify-center p-6"></div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel initialSize={1.0} class="overflow-hidden">
            <Resizable orientation="vertical">
              <span class="font-semibold">Logs</span>
              <div class="flex h-[50px] items-center justify-center p-6">
                {logs()}
              </div>
            </Resizable>
          </ResizablePanel>
        </Resizable> */}
        <br />
      </div>
      <div class="hidden text-sm xl:block">&nbsp;</div>
    </main>
  );
}

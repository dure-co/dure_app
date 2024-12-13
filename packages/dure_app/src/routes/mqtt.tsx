import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { createSignal, untrack, For, Show } from "solid-js";

import { platform, version } from "@tauri-apps/plugin-os";
import { trace, info, error, attachConsole } from "@tauri-apps/plugin-log";
import { channels, sendNotification } from "@tauri-apps/plugin-notification";
// import { Command } from '@tauri-apps/plugin-shell'
import { Stronghold, Location, Client } from "@tauri-apps/plugin-stronghold";
import { appDataDir } from "@tauri-apps/api/path";
import mqtt from "mqtt";

// import { MqttSidebar } from "~/components/mqttsidebar";
// import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "~/components/ui/resizable";
import { messages, setMessages, client } from "../lib/mqtt";

export default function Mqtt(props: RouteSectionProps) {
  // return (
  //   <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
  //     <SidebarProvider>
  //       <MqttSidebar />
  //       <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
  //         <div class="mx-auto w-full min-w-0">
  //           <div class=" text-sm xl:block">
  //             <SidebarTrigger />
  //           </div>
  //         </div>
  //       </main>
  //     </SidebarProvider>
  //   </div>
  // );
  return (
    <main class="container">
      <div class="mx-auto w-full min-w-0">
        MQTT Messaging
        <br />
        <Resizable class="border">
          <ResizablePanel initialSize={0.0} class="overflow-hidden">
            <span class="font-semibold">Topics</span>
            <div class="flex h-[600px] "></div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel initialSize={1.0} class="overflow-hidden">
            <Resizable orientation="vertical">
              <span class="font-semibold">Messages</span>
              <div class="flex h-[600px] " innerHTML={messages()}></div>
            </Resizable>
          </ResizablePanel>
        </Resizable>
      </div>
      <div class="hidden text-sm xl:block">&nbsp;</div>
    </main>
  );
}

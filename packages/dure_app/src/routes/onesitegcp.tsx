import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { For, Show } from "solid-js";

import { platform, version } from "@tauri-apps/plugin-os";
import { trace, info, error, attachConsole } from "@tauri-apps/plugin-log";
import { channels, sendNotification } from "@tauri-apps/plugin-notification";
// import { Command } from '@tauri-apps/plugin-shell'
import { Stronghold, Location, Client } from "@tauri-apps/plugin-stronghold";
import { appDataDir } from "@tauri-apps/api/path";

import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "~/components/ui/resizable";

import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

import { Button } from "~/components/ui/button";

import { createClient } from "@supabase/supabase-js";

export default function OnesiteGcp(props: RouteSectionProps) {
  console.log("onesite gcp");
  return (
    <main class="container">
      <div class="mx-auto w-full min-w-0">
        Onesite on GCP{" "}
        <a
          href="https://supabase.com/dashboard/project/koebugazclfchgnovdis/settings/api"
          target="_blank"
        >
          -
        </a>
        <br />
        GCP Project to Install
        <br />
        <Button>Check & Install Onesite</Button>
        <Resizable class="border">
          <ResizablePanel initialSize={0.25} class="overflow-hidden">
            <span class="font-semibold">Procedures</span>
            <div class="flex h-[600px] justify-center p-6">
              0. Login to GCP
              <br />
              1. DNS/Static Onesite Settings
              <br />
              2. GCP Compute Engine + Docker + Database Settings
              <br />
              3. Enable Application
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel initialSize={0.75} class="overflow-hidden">
            <Resizable orientation="vertical">
              <span class="font-semibold">Logs</span>
              <div class="flex h-[600px] items-center justify-center p-6"></div>
            </Resizable>
          </ResizablePanel>
        </Resizable>
      </div>
      <div class="hidden text-sm xl:block">&nbsp;</div>
    </main>
  );
}

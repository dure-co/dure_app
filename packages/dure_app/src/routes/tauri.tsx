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

export default function Tauri(props: RouteSectionProps) {
  return (
    <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div class="mx-auto w-full min-w-0"> </div>
        <div class=" text-sm xl:block">
          tauri info
          <br />
          <br />
          tauri test
        </div>
      </main>
    </div>
  );
}

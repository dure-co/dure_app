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
import { decycle } from "../lib/utils";
import {
  TextField,
  TextFieldInput,
  TextFieldTextArea,
} from "~/components/ui/text-field";

export default function DeviceInfo(props: RouteSectionProps) {
  const [allSysInfoS, setAllSysInfoS] = createSignal<string | null>(null);
  const [memoryInfoS, setMemoryInfoS] = createSignal<string | null>(null);
  const [staticInfoS, setStaticInfoS] = createSignal<string | null>(null);
  const [cpuInfoS, setCpuInfoS] = createSignal<string | null>(null);
  const [batteriesInfoS, setBatteriesInfoS] = createSignal<string | null>(null);
  if (typeof platform !== "undefined") {
    console.log(platform());
    console.log(version());
  } else {
    console.log("tauri os plugin is not initilized");
  }

  if (typeof attachConsole !== "undefined") {
    // attachConsole();
    // trace("Trace");
    // info("Info");
    // error("Error");
  } else {
    console.log("tauri log plugin is not initialized");
  }

  if (typeof sendNotification !== "undefined") {
    sendNotification({ title: "TAURI", body: "Tauri is awesome!" });
  } else {
    console.log("tauri notification plugin is not setted");
  }

  // console.log("device info");

  // console.log(AllSystemInfo.parse(allSysInfo()));
  // console.log(MemoryInfo.parse(memoryInfo()));
  // console.log(StaticInfo.parse(staticInfo()));
  // console.log(CpuInfo.parse(cpuInfo()));
  // console.log(Batteries.parse(batteries()));

  // const getinfo = async () => {
  //   console.log();
  //   setAllSysInfoS(JSON.stringify(decycle(await allSysInfo()), null, 4));
  //   setMemoryInfoS(JSON.stringify(decycle(await memoryInfo()), null, 4));
  //   setStaticInfoS(JSON.stringify(decycle(await staticInfo()), null, 4));
  //   setCpuInfoS(JSON.stringify(decycle(await cpuInfo()), null, 4));
  //   setBatteriesInfoS(JSON.stringify(decycle(await batteries()), null, 4));
  // };
  // getinfo();

  return (
    <main class="container">
      <div class="mx-auto w-full min-w-0">
        <div>
          내기기 목록
          <br />
          <br />
          <p>디바이스 플랫폼 : {platform()}</p>
          <p>디바이스 버전 : {version()}</p>
          <p>디바이스 패밀리 : {family()}</p>
          <p>디바이스 타입 : {type()}</p>
          <p>디바이스 아키텍쳐 : {arch()}</p>
          {/* <p>디바이스 언어 : {localeInfo() ? "" : ""}</p>
          <p>디바이스 호스트이름 : {hostnameInfo() ? "" : ""}</p> */}
        </div>
      </div>
    </main>
  );
}

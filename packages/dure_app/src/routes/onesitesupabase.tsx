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

import {
  customBorderRadius,
  customButtonColor,
  customSocialLayout,
  customTheme,
  supabase,
  session,
  setSession,
} from "../lib/store";

import { AuthSession } from "@supabase/supabase-js";
import { Component, createEffect, createSignal } from "solid-js";
// import Avatar from "./Avatar";
import { IconBell, IconCheck } from "~/components/icons";

import { createClient } from "@supabase/supabase-js";

export default function OnesiteSupabase(props: RouteSectionProps) {
  const [loading, setLoading] = createSignal(true);
  const [username, setUsername] = createSignal<string | null>(null);
  const [website, setWebsite] = createSignal<string | null>(null);
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);

  createEffect(() => {
    if (username() == null) {
      getWebsite();
    }
  });

  const getWebsite = async () => {
    try {
      setLoading(true);
      const _session = session();
      const user = _session?.user;
      if (user === undefined) return false;
      console.log(supabase);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`website, username`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        // setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main class="container">
      <div class="mx-auto w-full min-w-0">
        Onesite on Supabase{loading() ? "Loading ..." : username()}
        <br />
        <a
          href="https://supabase.com/dashboard/project/koebugazclfchgnovdis/settings/api"
          target="_blank"
        >
          (supabase) Project - Settings - API
        </a>
        <br />
        Website URL
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="website">Website URL</TextFieldLabel>
          <TextFieldInput
            type="text"
            id="website"
            placeholder="Please Login to Proceed"
            value={website() || ""}
            disabled
          />
        </TextField>
        <br />
        Project URL and Service Role Secret Key for Installation
        <br />
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="projecturl">Project URL</TextFieldLabel>
          <TextFieldInput
            type="text"
            id="projecturl"
            placeholder="Projecturl"
            value="https://enkgalkrwfipwjkmmwwj.supabase.co"
          />
        </TextField>
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="servicerole">
            Sevice Role Secret Key
          </TextFieldLabel>
          <TextFieldInput
            type="password"
            id="servicerole"
            placeholder="Servicerole"
            value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVua2dhbGtyd2ZpcHdqa21td3dqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQyMTU1NCwiZXhwIjoyMDQ1OTk3NTU0fQ.vV40qf-B8C7qim-GeeD6GoWrWzuL3vyxq_s_gAiUXcc"
          />
        </TextField>
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="publicanonkey">Public Anon Key</TextFieldLabel>
          <TextFieldInput
            type="password"
            id="publicanonkey"
            placeholder="PublicAnonkey"
            value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVua2dhbGtyd2ZpcHdqa21td3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0MjE1NTQsImV4cCI6MjA0NTk5NzU1NH0.AvI-jzgm79q3vWXTWYoJw7yi7VPcMzHjp0jESUoD6Fc"
          />
        </TextField>
        <Button>Check & Install Onesite</Button>
        <Resizable class="border">
          <ResizablePanel initialSize={0.25} class="overflow-hidden">
            <span class="font-semibold">Procedures</span>
            <div class="flex h-[600px] justify-center p-6">
              0. Login to supabase
              <br />
              1. DNS/Static Onesite Settings
              <br />
              2. Supabase Settings
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

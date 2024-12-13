import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { createEffect, createSignal, untrack, For, Show } from "solid-js";
import { trace, info, error, attachConsole } from "@tauri-apps/plugin-log";
import { channels, sendNotification } from "@tauri-apps/plugin-notification";
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/solid-table";
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
} from "@tanstack/solid-table";
import { IconChevronDown, IconDots, IconSelector } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { A } from "@solidjs/router";
import {
  TextField,
  TextFieldInput,
  TextFieldTextArea,
} from "~/components/ui/text-field";
import { IconBell, IconCheck } from "~/components/icons";
import {
  customBorderRadius,
  customButtonColor,
  customSocialLayout,
  customTheme,
  supabase,
  session,
  setSession,
} from "../lib/store";
import { decycle, makeid } from "../lib/utils";
import {
  platform,
  version,
  family,
  type,
  arch,
  locale as localeInfo,
  hostname as hostnameInfo,
} from "@tauri-apps/plugin-os";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

import { generateKey, readKey } from "openpgp/lightweight";

export default function Certificates(props: RouteSectionProps) {
  const [loading, setLoading] = createSignal(false);
  const [deviceid, setDeviceid] = createSignal<string | null>(null);
  const [deviceName, setDeviceName] = createSignal<string | null>(null);
  const [username, setUsername] = createSignal<string | null>(null);
  const [usergpgkey, setUserGpgKey] = createSignal<string | null>(null);
  const [usergpgkeyinfo, setUserGpgKeyInfo] = createSignal<string | null>(null);
  const [website, setWebsite] = createSignal<string | null>(null);
  const [devicegpgkeys, setDeviceGpgKeys] = createSignal<string | null>(null);
  const [devicegpgkeyinfo, setDeviceGpgKeyInfo] = createSignal<string | null>(
    null
  );

  const [newkey, setNewkey] = createSignal<string | null>(null);

  createEffect(async () => {
    await getKeys();
  });

  createEffect(async () => {
    await parseUserKeyInfo();
  }, usergpgkey());

  createEffect(async () => {
    await parseDeviceKeyInfo();
  }, devicegpgkeyinfo());

  const getKeys = async () => {
    try {
      setLoading(true);

      const _session = session();
      const user = _session?.user;
      if (user === undefined) return false;

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, user_gpg_key`)
        .eq("id", user?.id)
        .single();
      console.log(data, error, status);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);

        setUsername(data.username);
        setWebsite(data.website);
        setUserGpgKey(data.user_gpg_key);
        //setDeviceGpgKeys(data.device_gpg_keys);

        await getDevices();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getDevices = async () => {
    try {
      if (loading() == true || deviceid() == false) {
        return false;
      }
      setLoading(true);
      console.log(deviceid());

      const _session = session();
      const user = _session?.user;
      if (user === undefined) return false;

      let { data, error, status } = await supabase
        .from("devices")
        .select("user_id, id, device_name, device_gpg_key")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setDeviceid(data.id);
        setDeviceGpgKeys(data.device_gpg_key);
      } else {
        setDeviceid(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateDevice = async (e: Event) => {
    e.preventDefault();

    try {
      setLoading(true);
      const _session = session();
      const user = _session?.user;
      if (user === undefined) return false;

      let rst = null;
      if (deviceid() == null) {
        const insert = {
          device_name: deviceName() || null,
          device_gpg_key: devicegpgkeys() || null,
          updated_at: new Date().toISOString(),
        };
        rst = await supabase.from("devices").insert(insert).select();
      } else {
        const updates = {
          id: deviceid() || null,
          device_name: deviceName() || null,
          device_gpg_key: devicegpgkeys() || null,
          updated_at: new Date().toISOString(),
        };
        rst = await supabase.from("devices").upsert(updates).select();
      }
      var data = rst.data;
      if (data != null) {
        setDeviceid(data[0].id);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: Event) => {
    e.preventDefault();

    try {
      setLoading(true);
      const _session = session();
      const user = _session?.user;
      if (user === undefined) return false;
      const updates = {
        id: user?.id,
        user_gpg_key: usergpgkey(),
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const generateNewUserKey = async () => {
    // console.log(website());
    if (website() == null) {
      return false;
    }
    if (newkey() == null) {
      const newkeylog = await generateKey({
        curve: "brainpoolP512r1",
        userIDs: [
          { name: username() || "", email: username() + "@" + website() },
        ],
      });
      console.log(newkeylog.privateKey);
      setUserGpgKey(newkeylog.privateKey);
    }
  };

  const generateNewDeviceKey = async () => {
    console.log();
    // console.log(website());
    if (website() == null) {
      return false;
    }
    if (newkey() == null) {
      const newkeylog = await generateKey({
        curve: "brainpoolP512r1",
        userIDs: [
          { name: username() || "", email: username() + "@" + website() },
        ],
      });
      console.log(newkeylog.privateKey);
      setDeviceGpgKeys(newkeylog.privateKey);
    }
  };

  const parseUserKeyInfo = async () => {
    if (usergpgkey() != null) {
      const gpgstrkey = usergpgkey() || "";
      const keyinfo = await readKey({ armoredKey: gpgstrkey });
      setUserGpgKeyInfo(JSON.stringify(decycle(keyinfo), null, 4));
      console.log(keyinfo);
    }
  };

  const parseDeviceKeyInfo = async () => {
    if (devicegpgkeys() != null) {
      const gpgstrkey = devicegpgkeys() || "";
      const keyinfo = await readKey({ armoredKey: gpgstrkey });
      setDeviceGpgKeyInfo(JSON.stringify(decycle(keyinfo), null, 4));
      console.log(keyinfo);
    }
  };

  return (
    <main class="container">
      <div class="mx-auto w-full min-w-0">
        <form onSubmit={updateProfile} class="form-widget">
          <div>
            gpgkey info
            {/* {loading() ? "Loading ..." : username()} */}
            <br />
            <br />
            user gpgkey
            <br />
            <TextField>
              <TextFieldTextArea placeholder="">
                {usergpgkey()}
              </TextFieldTextArea>
            </TextField>
            <br />
            user gpgkey info
            <br />
            <TextField>
              <TextFieldTextArea placeholder="" disabled>
                {usergpgkeyinfo()}
              </TextFieldTextArea>
            </TextField>
            <Button
              class="w-full"
              disabled={loading()}
              onClick={() => generateNewUserKey()}
              type="button"
            >
              Generate New User Key
            </Button>
            <Button class="w-full" disabled={loading()} type="submit">
              <IconCheck class="mr-2 size-4" />{" "}
              {loading() ? "Saving ..." : "Update User Gpgkey"}
            </Button>
          </div>
        </form>
        <form onSubmit={updateDevice} class="form-widget">
          <div class="mx-auto w-full min-w-0">
            <p>Device ID : {deviceid()} </p>
            <p> Device Name : {deviceName()} </p>
            <p>Device platform : {platform()}</p>
            <p>Device version: {version()}</p>
            <p>Device Family : {family()}</p>
            <p>Device Type : {type()}</p>
            <p>Device Arch : {arch()}</p>
          </div>
          <br />
          <div class="mx-auto w-full min-w-0">
            device gpgkey
            <br />
            <TextField>
              <TextFieldTextArea placeholder="">
                {devicegpgkeys()}
              </TextFieldTextArea>
            </TextField>
            <br />
            device gpgkey info
            <br />
            <TextField>
              <TextFieldTextArea placeholder="" disabled>
                {devicegpgkeyinfo()}
              </TextFieldTextArea>
            </TextField>
            <Button
              class="w-full"
              disabled={loading()}
              onClick={() => generateNewDeviceKey()}
              type="button"
            >
              Generate New Device Key
            </Button>
            <Button class="w-full" disabled={loading()} type="submit">
              <IconCheck class="mr-2 size-4" />{" "}
              {loading() ? "Saving ..." : "Update Device Gpgkey"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

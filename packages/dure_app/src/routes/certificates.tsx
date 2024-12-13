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

const data23: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const columns23: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: (props) => (
      <Checkbox
        checked={props.table.getIsAllPageRowsSelected()}
        indeterminate={props.table.getIsSomePageRowsSelected()}
        onChange={(value) => props.table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: (props) => (
      <Checkbox
        checked={props.row.getIsSelected()}
        onChange={(value) => props.row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => (
      <div class="capitalize">{props.row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: (props) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            props.column.toggleSorting(props.column.getIsSorted() === "asc")
          }
        >
          Email
          <IconSelector />
        </Button>
      );
    },
    cell: (props) => <div class="lowercase">{props.row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div class="text-right">Amount</div>,
    cell: (props) => {
      const formatted = () => {
        const amount = parseFloat(props.row.getValue("amount"));
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      };
      return <div class="text-right font-medium">{formatted()}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: (props) => {
      return (
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger
            as={Button<"button">}
            variant="ghost"
            class="size-8 p-0"
          >
            <span class="sr-only">Open menu</span>
            <IconDots />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(props.row.original.id)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import { generateKey, readKey } from "openpgp/lightweight";

export default function Certificates(props: RouteSectionProps) {
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>(
    {}
  );
  const [rowSelection, setRowSelection] = createSignal({});

  const table = createSolidTable({
    data: data23,
    columns: columns23,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      get sorting() {
        return sorting();
      },
      get columnFilters() {
        return columnFilters();
      },
      get columnVisibility() {
        return columnVisibility();
      },
      get rowSelection() {
        return rowSelection();
      },
    },
  });

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
    if (username() == null && loading() != true) {
      await getKeys();
    }
    if (deviceid() == null && loading() != true) {
      await getDevices();
    }
  });

  createEffect(async () => {
    await parseUserKeyInfo();
  }, usergpgkey());

  createEffect(async () => {
    await parseDeviceKeyInfo();
  }, devicegpgkeyinfo());

  const getKeys = async () => {
    try {
      if (username() != null || loading() == true) return false;

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
      if (loading() == true) return false;

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

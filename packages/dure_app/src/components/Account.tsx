import { AuthSession } from "@supabase/supabase-js";
import { Component, createEffect, createSignal } from "solid-js";
// import Avatar from "./Avatar";
import { supabase } from "../lib/store";
import { Button } from "~/components/ui/button";
import { IconBell, IconCheck } from "~/components/icons";

interface Props {
  session: AuthSession;
}

import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

const Account: Component<Props> = ({ session }) => {
  const [loading, setLoading] = createSignal(true);
  const [username, setUsername] = createSignal<string | null>(null);
  const [website, setWebsite] = createSignal<string | null>(null);
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);

  createEffect(() => {
    getProfile();
  });

  const getProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;
      console.log(supabase);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
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
      const { user } = session;

      const updates = {
        id: user.id,
        username: username(),
        website: website(),
        avatar_url: avatarUrl(),
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

  return (
    <div aria-live="polite">
      <form onSubmit={updateProfile} class="form-widget">
        {/* <Avatar
          url={avatarUrl()}
          size={150}
          onUpload={(e: Event, url: string) => {
            setAvatarUrl(url);
            updateProfile(e);
          }}
        /> */}
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="email">email</TextFieldLabel>
          <TextFieldInput
            type="text"
            id="email"
            placeholder="Email"
            value={session.user.email}
            disabled
          />
        </TextField>
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="username">username</TextFieldLabel>
          <TextFieldInput
            type="text"
            id="username"
            placeholder="Username"
            value={username() || ""}
            onChange={(e: any) => setUsername(e.currentTarget.value)}
          />
        </TextField>
        <TextField class="grid w-full max-w-sm items-center gap-1.5">
          <TextFieldLabel for="website">Website URL</TextFieldLabel>
          <TextFieldInput
            type="text"
            id="website"
            placeholder="Website"
            value={website() || ""}
            onChange={(e: any) => setWebsite(e.currentTarget.value)}
          />
        </TextField>
        <div>
          {/* <button
            type="submit"
            class="button primary block"
            disabled={loading()}
          >
            {loading() ? "Saving ..." : "Update profile"}
          </button> */}
          <Button class="w-full" disabled={loading()} type="submit">
            <IconCheck class="mr-2 size-4" />{" "}
            {loading() ? "Saving ..." : "Update profile"}
          </Button>
        </div>
        {/* <button
          type="button"
          class="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button> */}
        <Button class="w-full" onClick={() => supabase.auth.signOut()}>
          <IconCheck class="mr-2 size-4" /> Sign Out
        </Button>
      </form>
    </div>
  );
};

export default Account;

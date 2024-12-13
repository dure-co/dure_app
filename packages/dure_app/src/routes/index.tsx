import { A } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";
import type { RouteProps } from "@solidjs/router";
import { createClient, AuthSession } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";
import Selectors from "../components/suid/selectors";
import {
  customBorderRadius,
  customButtonColor,
  customSocialLayout,
  customTheme,
  supabase,
  session,
  setSession,
} from "../lib/store";

import Account from "../components/Account";
import { Auth } from "../components/Auth";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { IconBell, IconCheck } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Switch, SwitchControl, SwitchThumb } from "~/components/ui/switch";

export default function Index(props: RouteProps<string>) {
  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });

  // console.log("index.tsx");
  // console.log(session());
  return (
    <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      &nbsp;
      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div class="mx-auto w-full min-w-0">
          dure central registration login
          <br />
          <br />
          <Card class="w-[380px]">
            <CardHeader>
              <CardTitle>Sign In / Profile</CardTitle>
              <CardDescription>
                Please sign in to generate gpg key.
              </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4">
              {!session() ? (
                <Auth
                  supabaseClient={supabase}
                  appearance={{
                    theme: ThemeSupa,
                  }}
                  providers={["google", "github"]}
                  view="sign_in"
                />
              ) : (
                <Account session={session()!} />
              )}
            </CardContent>
            <CardFooter>
              {/* <Button class="w-full">
              <IconCheck class="mr-2 size-4" /> Sign In
            </Button> */}
            </CardFooter>
          </Card>
        </div>
        <div class="hidden text-sm xl:block">&nbsp;</div>
      </main>
    </div>
  );
}

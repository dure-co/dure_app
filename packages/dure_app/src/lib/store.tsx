import { SocialLayout } from "@supabase/auth-ui-shared";
import { createSignal } from "solid-js";
import {
  createClient,
  AuthSession,
  SupabaseClient,
} from "@supabase/supabase-js";

export const [customButtonColor, setCustomButtonColor] =
  createSignal("rgb(202, 37, 37)");
export const [customBorderRadius, setCustomBorderRadius] = createSignal("5px");
export const [customTheme, setCustomTheme] = createSignal("dark");
export const [customSocialLayout, setCustomSocialLayout] =
  createSignal<SocialLayout>("horizontal");

export const supabase = createClient(
  "https://koebugazclfchgnovdis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZWJ1Z2F6Y2xmY2hnbm92ZGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0MjE2MjYsImV4cCI6MjA0NTk5NzYyNn0.JNh1pkFSXL5bc--Q8FdIB789Di_YCqnEStWNYOsZjbg"
);
export const [session, setSession] = createSignal<AuthSession | null>(null);

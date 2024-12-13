import { type VoidComponent, Suspense, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
// import { createSession, signOut, signIn } from "@solid-mediakit/auth/client";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  // const session = createSession();
  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200">
        {/* <li class={`border-b-2 mx-1.5 sm:mx-6`}>두레</li> */}
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">DureCentral</a>
        </li>
        {/* <li class={`border-b-2 ${active("/tauri")} mx-1.5 sm:mx-6`}>
          <a href="/tauri">타우리</a>
        </li> */}
        <li class={`border-b-2 ${active("/certificates")} mx-1.5 sm:mx-6`}>
          <a href="/certificates">GpgKey Mgmt</a>
        </li>
        {/* <li class={`border-b-2 ${active("/deviceinfo")} mx-1.5 sm:mx-6`}>
          <a href="/deviceinfo">디바이스정보</a>
        </li> */}
        <li class={`border-b-2 ${active("/mqtt")} mx-1.5 sm:mx-6`}>
          <a href="/mqtt">MQTT</a>
        </li>
        <li class={`border-b-2 ${active("/subapp")} mx-1.5 sm:mx-6`}>
          <a href="/subapp">SubApp</a>
        </li>
        <li class={`border-b-2 ${active("/onesitesupabase")} mx-1.5 sm:mx-6`}>
          <a href="/onesitesupabase">OnesiteSupa</a>
        </li>
        {/* <li class={`border-b-2 ${active("/onesitegcp")} mx-1.5 sm:mx-6`}>
          <a href="/onesitegcp">OnesiteGCP</a>
        </li> */}
        {/* <Show
          when={session()}
          fallback={
            <li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
              <a href="/login">로그인</a>
            </li>
          }
        >
          <li class={`border-b-2 ${active("/protected")} mx-1.5 sm:mx-6`}>
            <a href="/protected">회원정보</a>
          </li>
          <li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
            <button onClick={() => signOut({ redirectTo: "/" })}>
              로그아웃
            </button>
          </li>
        </Show> */}
      </ul>
    </nav>
  );
}

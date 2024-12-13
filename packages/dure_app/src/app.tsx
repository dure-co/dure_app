import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider, Title } from "@solidjs/meta";
import { getCookie } from "vinxi/http";
import { Suspense, Show } from "solid-js";
// import Footer from "~/components/footer";
// import { MetaTags } from "~/components/meta-tags";

import "./app.css";

import { QueryClient } from "@tanstack/solid-query";
// import { SessionProvider } from "@solid-mediakit/auth/client";

import Nav from "~/components/nav";
// import { Toaster as SonnerToaster } from "~/components/ui/sonner";

export default function App() {
  const queryClient = new QueryClient();
  console.log("app.tsx");
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Dure App/Onesite</Title>
          <Suspense>
            {/* <SessionProvider> */}
            {/* <PRPCProvider queryClient={queryClient}> */}
            <Nav />
            {props.children}
            {/* <SonnerToaster /> */}
            {/* </PRPCProvider> */}
            {/* </SessionProvider> */}
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

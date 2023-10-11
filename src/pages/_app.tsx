import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material";
import { theme } from "~/muiTheme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SessionProvider session={session}>
          <div className="mx-auto flex min-h-[100vh] max-w-7xl flex-col px-8 sm:px-5">
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={true} />
          </div>
        </SessionProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);

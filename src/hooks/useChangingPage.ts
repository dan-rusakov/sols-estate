import { Router } from "next/router";
import { useState } from "react";

export const useChangingPage = () => {
    const [changing, setChanging] = useState(false);

    Router.events.on("routeChangeStart", () => setChanging(true));
    Router.events.on("routeChangeComplete", () => setChanging(false));
    Router.events.on("routeChangeError", () => setChanging(false));

    return changing;
}
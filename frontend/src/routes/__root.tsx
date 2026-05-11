import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "#/index.css";
import { NODE_ENV } from "#/config";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      {/* This is where your pages (index, login, analytics) will render */}
      <div className="min-h-screen bg-bg-0 text-ink-1">
        <Outlet />
      </div>

      {/* TanStack Router Devtools - shows up as a small logo in the corner */}
      {NODE_ENV === "development" && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </>
  );
}

import { createRouteConfig, Outlet } from "@tanstack/react-router";
import { router } from "../../router.tsx";
import { loaderDelayFn } from "../../utils.tsx";

export const layoutRoute = createRouteConfig().createRoute({
  id: "layout",
  component: LayoutWrapper,
  loader: async () => {
    return loaderDelayFn(() => {
      return {
        random: Math.random(),
      };
    });
  },
});

function LayoutWrapper() {
  const { loaderData } = router.useMatch(layoutRoute.id);
  return (
    <div>
      <div>Layout</div>
      <div>Random #: {loaderData.random}</div>
      <hr />
      <Outlet />
    </div>
  );
}

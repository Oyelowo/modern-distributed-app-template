import { bookingsRoute } from "../index.tsx";
import LandingPage from "../../../components/LandingPage/LandingPage.tsx";

export const landingIndexRoute = bookingsRoute.createRoute({
  path: "/",
  component: Landing,
});

function Landing() {
  return <LandingPage />;
}

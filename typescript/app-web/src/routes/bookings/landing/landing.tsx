import { bookingsRoute } from "../index.js";
import LandingPage from "../../../components/LandingPage/LandingPage.js";

export const landingIndexRoute = bookingsRoute.createRoute({
  path: "/",
  component: Landing,
});

function Landing() {
  return <LandingPage />;
}

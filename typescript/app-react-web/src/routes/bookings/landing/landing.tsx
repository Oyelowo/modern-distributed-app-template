import { bookingsRoute } from "../index.jsx";
import LandingPage from "../../../components/LandingPage/LandingPage.jsx";

export const landingIndexRoute = bookingsRoute.createRoute({
  path: "/",
  component: Landing,
});

function Landing() {
  return <LandingPage />;
}

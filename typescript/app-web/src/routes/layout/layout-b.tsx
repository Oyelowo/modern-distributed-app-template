import { layoutRoute } from "./index.js";

export const layoutRouteB = layoutRoute.createRoute({
	path: "layout-b",
	component: LayoutB,
});

function LayoutB() {
	return (
		<div>
			<div>Layout B</div>
		</div>
	);
}

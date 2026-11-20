import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import "../styles.css";

import { DashboardLayout } from "@/components/molecules/dashboard-layout";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<DashboardLayout>
			<Outlet />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</DashboardLayout>
	);
}

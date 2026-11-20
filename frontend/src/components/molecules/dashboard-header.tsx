import { IconUser } from "@tabler/icons-react";
import type React from "react";

import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

interface DashboardHeaderProps {
	title?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
	title = "Overview",
}) => {
	return (
		<header className="sticky top-0 z-10 flex h-16 items-center justify-between border-border border-b bg-white px-4 shadow-[0px_8px_15px_-10px_rgba(0,0,0,0.1)] backdrop-blur-md md:px-6">
			<div className="flex items-center gap-3">
				<SidebarTrigger />
				<h4 className="font-semibold text-foreground text-lg">{title}</h4>
			</div>
			<div className="flex items-center gap-2">
				<Button
					size="icon"
					className="size-9 rounded-full bg-primary text-white shadow-primary/20 shadow-sm hover:bg-primary/90"
				>
					<IconUser stroke={2} className="size-5" />
				</Button>
			</div>
		</header>
	);
};

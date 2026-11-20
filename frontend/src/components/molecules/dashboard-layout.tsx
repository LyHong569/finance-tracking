import {
	IconLayoutDashboard,
	IconPigMoney,
	IconReceipt2,
	IconSettings,
	IconWallet,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import type React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ROUTES } from "@/configs/routes";
import { cn } from "@/lib/utils";

import { DashboardHeader } from "./dashboard-header";

interface NavItem {
	label: string;
	to: string;
	icon: React.ComponentType<{ className?: string; stroke?: number }>;
}

const mainNavItems: NavItem[] = [
	{ label: "Overview", to: ROUTES.OVERVIEW, icon: IconLayoutDashboard },
	{ label: "Transactions", to: ROUTES.TRANSACTIONS, icon: IconReceipt2 },
	{ label: "Budgets", to: ROUTES.BUDGETS, icon: IconPigMoney },
];

const generalNavItems: NavItem[] = [
	{ label: "Settings", to: ROUTES.SETTINGS, icon: IconSettings },
];

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<TooltipProvider>
			<SidebarProvider>
				<Sidebar
					collapsible="icon"
					className="border-border border-r shadow-[8px_0px_15px_-10px_rgba(0,0,0,0.1)]"
				>
					<SidebarHeader className="bg-white p-4">
						<div className="flex items-center gap-x-3 group-data-[collapsible=icon]:justify-center">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-primary/20 shadow-sm">
								<IconWallet stroke={2} className="size-6" />
							</div>
							<div className="flex flex-col group-data-[collapsible=icon]:hidden">
								<h3 className="truncate font-semibold text-base text-foreground leading-tight">
									Finance Tracking
								</h3>
								<span className="truncate font-medium text-neutral text-xs">
									Wealth Core
								</span>
							</div>
						</div>
					</SidebarHeader>

					<SidebarContent className="bg-white px-2 group-data-[collapsible=icon]:px-0">
						<SidebarGroup className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-1">
							<SidebarGroupLabel className="font-semibold text-neutral/70 text-xs uppercase tracking-wider group-data-[collapsible=icon]:hidden">
								Main Menu
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
									{mainNavItems.map((item) => (
										<MenuItem key={item.to} item={item} />
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						<SidebarGroup className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-1">
							<SidebarGroupLabel className="font-semibold text-neutral/70 text-xs uppercase tracking-wider group-data-[collapsible=icon]:hidden">
								General
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
									{generalNavItems.map((item) => (
										<MenuItem key={item.to} item={item} />
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>

					<SidebarRail />
				</Sidebar>

				<SidebarInset>
					<DashboardHeader />
					<div className="flex-1 overflow-y-auto bg-neutral-50 p-4 md:p-6">
						<div className="mx-auto w-full">{children}</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
};

const MenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
	const Icon = item.icon;
	const { isMobile, setOpenMobile } = useSidebar();

	return (
		<SidebarMenuItem className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
			<Link
				to={item.to}
				activeOptions={{ exact: item.to === ROUTES.OVERVIEW }}
				onClick={() => {
					if (isMobile) {
						setOpenMobile(false);
					}
				}}
				className="w-full group-data-[collapsible=icon]:w-auto"
			>
				{({ isActive }) => (
					<SidebarMenuButton
						tooltip={item.label}
						isActive={isActive}
						className={cn(
							"h-10 rounded-xl px-3 py-2.5 text-neutral transition-colors hover:text-foreground",
							"group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:size-9! group-data-[collapsible=icon]:p-0!",
							isActive &&
								"bg-secondary! font-medium text-white! shadow-sm hover:bg-secondary/90 hover:text-white",
						)}
					>
						<Icon
							stroke={1.5}
							className="size-5! shrink-0 group-data-[collapsible=icon]:size-4"
						/>
						<span className="text-sm group-data-[collapsible=icon]:hidden">
							{item.label}
						</span>
					</SidebarMenuButton>
				)}
			</Link>
		</SidebarMenuItem>
	);
};

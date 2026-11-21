import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import * as React from "react";

import { cn } from "@/lib/utils";

type DrawerContextProps = {
	hasSnapPoints: boolean;
	modal: DrawerPrimitive.Root.Props["modal"];
	showSwipeHandle: boolean;
	swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>;
};

const DrawerContext = React.createContext<DrawerContextProps | null>(null);

function useDrawer() {
	const context = React.useContext(DrawerContext);

	if (!context) {
		throw new Error("useDrawer must be used within a Drawer.");
	}

	return context;
}

function Drawer({
	modal = true,
	showSwipeHandle = false,
	snapPoints,
	swipeDirection = "down",
	...props
}: DrawerPrimitive.Root.Props & {
	showSwipeHandle?: boolean;
}) {
	const hasSnapPoints = snapPoints != null && snapPoints.length > 0;
	const contextValue = React.useMemo(
		() => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
		[hasSnapPoints, modal, showSwipeHandle, swipeDirection],
	);

	return (
		<DrawerContext.Provider value={contextValue}>
			<DrawerPrimitive.Root
				data-slot="drawer"
				modal={modal}
				snapPoints={snapPoints}
				swipeDirection={swipeDirection}
				{...props}
			/>
		</DrawerContext.Provider>
	);
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
	className,
	...props
}: DrawerPrimitive.Backdrop.Props) {
	return (
		<DrawerPrimitive.Backdrop
			data-slot="drawer-overlay"
			className={cn(
				"fixed inset-0 z-50 min-h-dvh select-none bg-black/40 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] backdrop-blur-xs transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:pointer-events-none data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-swiping:duration-0 data-snap-points:[--drawer-overlay-min-opacity:0.5]",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerSwipeHandle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-swipe-handle"
			aria-hidden="true"
			className={cn(
				"relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 after:block after:shrink-0 after:rounded-full after:bg-neutral-300 active:cursor-grabbing group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-direction=up]/drawer-popup:items-start group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-axis=x]/drawer-popup:after:h-24 group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-axis=y]/drawer-popup:after:w-12 dark:after:bg-neutral-700",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerContent({
	className,
	children,
	...props
}: DrawerPrimitive.Popup.Props) {
	const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer();
	const swipeAxis =
		swipeDirection === "down" || swipeDirection === "up" ? "y" : "x";

	return (
		<DrawerPortal data-slot="drawer-portal">
			{modal === true && (
				<DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
			)}
			<DrawerPrimitive.Viewport
				data-slot="drawer-viewport"
				data-modal={modal}
				className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
			>
				<DrawerPrimitive.Popup
					data-slot="drawer-popup"
					data-swipe-axis={swipeAxis}
					data-snap-points={hasSnapPoints ? "" : undefined}
					className={cn(
						// Base
						"group/drawer-popup transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] pointer-events-auto fixed z-50 flex flex-col border-border bg-card text-card-foreground text-sm shadow-xl outline-none transition-[transform,height,opacity,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
						// Sizing & Direction
						"data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:max-h-[92dvh] data-[swipe-direction=down]:rounded-t-2xl data-[swipe-direction=down]:border-t",
						"data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-full data-[swipe-direction=right]:border-l data-[swipe-direction=right]:sm:max-w-md",
						"data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-full data-[swipe-direction=left]:border-r data-[swipe-direction=left]:sm:max-w-md",
						"data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:max-h-[92dvh] data-[swipe-direction=up]:rounded-b-2xl data-[swipe-direction=up]:border-b",
						className,
					)}
					{...props}
				>
					{showSwipeHandle && <DrawerSwipeHandle />}
					<DrawerPrimitive.Content
						data-slot="drawer-content"
						className="flex min-h-0 flex-1 select-text flex-col overflow-hidden overscroll-contain rounded-[inherit]"
					>
						{children}
					</DrawerPrimitive.Content>
				</DrawerPrimitive.Popup>
			</DrawerPrimitive.Viewport>
		</DrawerPortal>
	);
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-header"
			className={cn(
				"flex shrink-0 items-center justify-between border-border border-b p-4 pb-3",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn(
				"mt-auto flex shrink-0 items-center justify-end gap-2 border-border border-t p-4",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn(
				"font-semibold text-foreground text-lg tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerDescription({
	className,
	...props
}: DrawerPrimitive.Description.Props) {
	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			className={cn("text-neutral text-xs", className)}
			{...props}
		/>
	);
}

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerSwipeHandle,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};

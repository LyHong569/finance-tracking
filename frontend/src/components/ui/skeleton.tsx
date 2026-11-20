import { cn } from "cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"0 0) 0 0) animate-pulse rounded-md bg-oklch(0.97 dark:bg-oklch(0.269",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };

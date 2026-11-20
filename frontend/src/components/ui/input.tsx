import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import type * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"0 0) 0 0) 0 0) 0 0) 0 0)/50 0 0)/50 0.245 27.325) 0.245 27.325)/20 0 0)/30 0 0)/80 0.245 27.325)/50 0.245 27.325)/40 0 0 / 10%) 0 0 / 15%) 0 0) 0 0) 0 0) 0 0)/50 0 0 / 15%)/50 0.191 22.216) 0.191 22.216)/20 0 0 / 15%)/30 0 0 / 15%)/80 0.191 22.216)/50 0.191 22.216)/40 h-8 w-full min-w-0 rounded-lg border border-oklch(0.922 bg-transparent px-2.5 py-1 text-base outline-none transition-colors file:inline-flex file:h-6 file:border-0 file:bg-transparent file:font-medium file:text-oklch(0.145 file:text-sm placeholder:text-oklch(0.556 focus-visible:border-oklch(0.708 focus-visible:ring-3 focus-visible:ring-oklch(0.708 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-oklch(0.922 disabled:opacity-50 aria-invalid:border-oklch(0.577 aria-invalid:ring-3 aria-invalid:ring-oklch(0.577 md:text-sm dark:border-oklch(1 dark:border-oklch(1 dark:bg-oklch(0.922 dark:dark:bg-oklch(1 dark:aria-invalid:border-oklch(0.577 dark:aria-invalid:border-oklch(0.704 dark:dark:aria-invalid:border-oklch(0.704 dark:aria-invalid:ring-oklch(0.577 dark:aria-invalid:ring-oklch(0.704 dark:dark:aria-invalid:ring-oklch(0.704 dark:dark:disabled:bg-oklch(1 dark:disabled:bg-oklch(0.922 dark:disabled:bg-oklch(1 dark:focus-visible:border-oklch(0.556 dark:focus-visible:ring-oklch(0.556 dark:placeholder:text-oklch(0.708 dark:file:text-oklch(0.985",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
	"group/button 0 0) 0 0) 0 0)/50 0.245 27.325) 0.245 27.325)/20 0.245 27.325)/50 0.245 27.325)/40 0 0 / 10%) 0 0) 0 0)/50 0.191 22.216) 0.191 22.216)/20 0.191 22.216)/50 0.191 22.216)/40 inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-lg border border-oklch(0.922 border-transparent bg-clip-padding font-medium text-sm outline-none transition-all focus-visible:border-oklch(0.708 focus-visible:ring-3 focus-visible:ring-oklch(0.708 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-oklch(0.577 aria-invalid:ring-3 aria-invalid:ring-oklch(0.577 dark:border-oklch(1 dark:aria-invalid:border-oklch(0.577 dark:aria-invalid:border-oklch(0.704 dark:dark:aria-invalid:border-oklch(0.704 dark:aria-invalid:ring-oklch(0.577 dark:aria-invalid:ring-oklch(0.704 dark:dark:aria-invalid:ring-oklch(0.704 dark:focus-visible:border-oklch(0.556 dark:focus-visible:ring-oklch(0.556 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"0 0) 0 0) 0 0)/80 0 0) 0 0) 0 0)/80 bg-oklch(0.205 text-oklch(0.985 hover:bg-oklch(0.205 dark:bg-oklch(0.922 dark:text-oklch(0.205 dark:hover:bg-oklch(0.922",
				outline:
					"0 0) 0 0) 0 0) 0 0) 0 0) 0 0) 0 0) 0 0)/30 0 0)/50 0 0 / 10%) 0 0) 0 0) 0 0) 0 0) 0 0) 0 0 / 15%) 0 0 / 15%)/30 0 0 / 15%)/50 border-oklch(0.922 bg-oklch(1 hover:bg-oklch(0.97 hover:text-oklch(0.145 aria-expanded:bg-oklch(0.97 aria-expanded:text-oklch(0.145 dark:border-oklch(0.922 dark:border-oklch(1 dark:dark:border-oklch(1 dark:bg-oklch(0.145 dark:bg-oklch(0.922 dark:dark:bg-oklch(1 dark:aria-expanded:bg-oklch(0.269 dark:aria-expanded:text-oklch(0.985 dark:dark:hover:bg-oklch(1 dark:hover:bg-oklch(0.269 dark:hover:bg-oklch(0.922 dark:hover:text-oklch(0.985",
				secondary:
					"0 0) 0 0) 0 0) 0 0) 0 0) 0 0) 0 0) 0 0) bg-oklch(0.97 text-oklch(0.205 hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-oklch(0.97 aria-expanded:text-oklch(0.205 dark:bg-oklch(0.269 dark:text-oklch(0.985 dark:aria-expanded:bg-oklch(0.269 dark:aria-expanded:text-oklch(0.985",
				ghost:
					"0 0) 0 0) 0 0) 0 0) 0 0)/50 0 0) 0 0) 0 0) 0 0) 0 0)/50 hover:bg-oklch(0.97 hover:text-oklch(0.145 aria-expanded:bg-oklch(0.97 aria-expanded:text-oklch(0.145 dark:aria-expanded:bg-oklch(0.269 dark:aria-expanded:text-oklch(0.985 dark:dark:hover:bg-oklch(0.269 dark:hover:bg-oklch(0.269 dark:hover:bg-oklch(0.97 dark:hover:text-oklch(0.985",
				destructive:
					"0.245 27.325)/10 0.245 27.325) 0.245 27.325)/20 0.245 27.325)/40 0.245 27.325)/20 0.245 27.325)/20 0.245 27.325)/30 0.245 27.325)/40 0.191 22.216)/10 0.191 22.216) 0.191 22.216)/20 0.191 22.216)/40 0.191 22.216)/20 0.191 22.216)/20 0.191 22.216)/30 0.191 22.216)/40 bg-oklch(0.577 text-oklch(0.577 hover:bg-oklch(0.577 focus-visible:border-oklch(0.577 focus-visible:ring-oklch(0.577 dark:bg-oklch(0.577 dark:bg-oklch(0.704 dark:dark:bg-oklch(0.704 dark:text-oklch(0.704 dark:focus-visible:border-oklch(0.704 dark:dark:focus-visible:ring-oklch(0.704 dark:focus-visible:ring-oklch(0.577 dark:focus-visible:ring-oklch(0.704 dark:dark:hover:bg-oklch(0.704 dark:hover:bg-oklch(0.577 dark:hover:bg-oklch(0.704",
				link: "0 0) 0 0) text-oklch(0.205 underline-offset-4 hover:underline dark:text-oklch(0.922",
			},
			size: {
				default:
					"h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				xs: "h-6 gap-1 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),10px)] px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-7 gap-1 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				icon: "size-8",
				"icon-xs":
					"size-6 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
				"icon-sm":
					"size-7 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),12px)]",
				"icon-lg": "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };

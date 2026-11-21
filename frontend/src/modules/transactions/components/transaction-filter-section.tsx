import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Props {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	categories: string[];
	selectedCategory: string;
	onCategoryChange: (value: string) => void;
	wallets: string[];
	selectedWallet: string;
	onWalletChange: (value: string) => void;
	selectedType: "ALL" | "income" | "expense";
	onTypeChange: (value: "ALL" | "income" | "expense") => void;
	hasActiveFilters: boolean;
	onReset: () => void;
}

export const TransactionFilterSection: React.FC<Props> = (props) => {
	const {
		searchQuery,
		onSearchChange,
		categories,
		selectedCategory,
		onCategoryChange,
		wallets,
		selectedWallet,
		onWalletChange,
		selectedType,
		onTypeChange,
		hasActiveFilters,
		onReset,
	} = props;

	return (
		<div className="space-y-4 rounded-xl border border-border bg-card p-4">
			<div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
				<div className="relative max-w-md flex-1">
					<IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral" />
					<Input
						placeholder="Search by note, category, or ID..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="h-9 bg-background pl-9"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => onSearchChange("")}
							className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral hover:text-foreground"
						>
							<IconX className="size-4" />
						</button>
					)}
				</div>

				<div className="flex flex-wrap items-center gap-2.5">
					<Select
						value={selectedCategory}
						onValueChange={(val) => onCategoryChange(val as string)}
					>
						<SelectTrigger className="h-9! min-w-37.5 bg-background">
							<SelectValue placeholder="All Categories" />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							{categories.map((cat) => (
								<SelectItem key={cat} value={cat}>
									{cat === "ALL" ? "All Categories" : cat}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={selectedWallet}
						onValueChange={(val) => onWalletChange(val as string)}
					>
						<SelectTrigger className="h-9! min-w-35 bg-background">
							<SelectValue placeholder="All Wallets" />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							{wallets.map((wallet) => (
								<SelectItem key={wallet} value={wallet}>
									{wallet === "ALL" ? "All Wallets" : wallet}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<ButtonGroup className="h-9">
						{(["ALL", "income", "expense"] as const).map((type) => (
							<Button
								key={type}
								type="button"
								size="sm"
								variant={selectedType === type ? "default" : "outline"}
								onClick={() => onTypeChange(type)}
								className={cn(
									"h-9 px-3 text-xs capitalize transition-colors",
									selectedType === type
										? "bg-secondary font-medium text-white hover:bg-secondary/90"
										: "bg-background text-neutral hover:text-foreground",
								)}
							>
								{type === "ALL" ? "All Types" : type}
							</Button>
						))}
					</ButtonGroup>

					<Button
						variant="ghost"
						size="sm"
						disabled={!hasActiveFilters}
						onClick={onReset}
						className="h-9 text-neutral text-xs hover:text-foreground"
					>
						<IconFilter className="mr-1 size-3.5" />
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
};

import {
	IconArrowDownLeft,
	IconArrowUpRight,
	IconChevronLeft,
	IconChevronRight,
	IconDotsVertical,
	IconReceipt,
	IconWallet,
} from "@tabler/icons-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import type { Transaction } from "../interface";

interface Props {
	transactions: Transaction[];
	hasActiveFilters: boolean;
	onReset: () => void;
}

export const TransactionTable: React.FC<Props> = ({
	transactions,
	hasActiveFilters,
	onReset,
}) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-45">Category</TableHead>
					<TableHead className="w-40">Wallet</TableHead>
					<TableHead className="w-45">Date & Time</TableHead>
					<TableHead className="min-w-55">Note & Details</TableHead>
					<TableHead className="w-37.5 text-right">Amount</TableHead>
					<TableHead className="w-15" />
				</TableRow>
			</TableHeader>
			<TableBody>
				{transactions.length > 0 ? (
					transactions.map((tx) => {
						const CategoryIcon = tx.icon;
						const isIncome = tx.type === "income";

						return (
							<TableRow key={tx.id} className="group">
								<TableCell>
									<div className="flex items-center gap-3">
										<div
											className={cn(
												"flex size-9 shrink-0 items-center justify-center rounded-lg",
												isIncome
													? "bg-primary/10 text-primary"
													: "bg-secondary/10 text-secondary dark:bg-neutral-800 dark:text-neutral-200",
											)}
										>
											<CategoryIcon stroke={1.8} className="size-5" />
										</div>
										<div className="flex flex-col">
											<span className="font-medium text-foreground text-sm leading-tight">
												{tx.category}
											</span>
											<span className="mt-0.5 text-neutral text-xs">
												{tx.id}
											</span>
										</div>
									</div>
								</TableCell>

								<TableCell>
									<div className="flex items-center gap-2">
										<IconWallet className="size-4 shrink-0 text-neutral" />
										<div className="flex flex-col">
											<span className="font-medium text-foreground text-sm leading-tight">
												{tx.wallet}
											</span>
											<span className="mt-0.5 text-neutral text-xs">
												{tx.walletType}
											</span>
										</div>
									</div>
								</TableCell>

								<TableCell>
									<div className="flex flex-col">
										<span className="font-medium text-foreground text-sm leading-tight">
											{tx.date}
										</span>
										<span className="mt-0.5 text-neutral text-xs">
											{tx.time}
										</span>
									</div>
								</TableCell>

								<TableCell>
									<span className="line-clamp-1 text-foreground/90 text-sm">
										{tx.note}
									</span>
								</TableCell>

								<TableCell className="text-right">
									<div className="inline-flex items-center justify-end gap-1 font-semibold text-sm">
										{isIncome ? (
											<>
												<IconArrowDownLeft className="size-4 text-primary" />
												<span className="text-primary">
													+${tx.amount.toFixed(2)}
												</span>
											</>
										) : (
											<>
												<IconArrowUpRight className="size-4 text-neutral" />
												<span className="text-foreground">
													-${tx.amount.toFixed(2)}
												</span>
											</>
										)}
									</div>
								</TableCell>

								<TableCell className="pr-4 text-right">
									<Button
										variant="ghost"
										size="icon"
										className="size-8 text-neutral opacity-60 transition-opacity hover:text-foreground group-hover:opacity-100"
									>
										<IconDotsVertical className="size-4" />
										<span className="sr-only">Actions</span>
									</Button>
								</TableCell>
							</TableRow>
						);
					})
				) : (
					<TableRow>
						<TableCell colSpan={6} className="h-44 text-center">
							<div className="flex flex-col items-center justify-center gap-2 text-neutral">
								<IconReceipt className="size-8 text-neutral/50" />
								<p className="font-medium text-sm">No transactions found</p>
								<p className="text-neutral/80 text-xs">
									Try adjusting your search query or clearing active filters.
								</p>
								{hasActiveFilters && (
									<Button
										variant="outline"
										size="sm"
										onClick={onReset}
										className="mt-2 text-xs"
									>
										Clear Filters
									</Button>
								)}
							</div>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

interface TransactionPaginationProps {
	totalItems: number;
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export const TransactionPagination: React.FC<TransactionPaginationProps> = ({
	totalItems,
	currentPage,
	totalPages,
	itemsPerPage,
	onPageChange,
}) => {
	return (
		<div className="flex flex-col items-center justify-between gap-4 border-border border-t bg-neutral-50/50 px-4 py-3 sm:flex-row dark:bg-neutral-900/50">
			<div className="text-neutral text-xs">
				Showing{" "}
				<span className="font-semibold text-foreground">
					{totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
				</span>{" "}
				to{" "}
				<span className="font-semibold text-foreground">
					{Math.min(currentPage * itemsPerPage, totalItems)}
				</span>
			</div>

			<ButtonGroup>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
					className="h-8 px-2.5 text-neutral text-xs hover:text-foreground"
				>
					<IconChevronLeft className="mr-1 size-3.5" />
					Prev
				</Button>

				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<Button
						key={page}
						variant={currentPage === page ? "default" : "outline"}
						size="sm"
						onClick={() => onPageChange(page)}
						className={cn(
							"size-8 p-0 text-xs",
							currentPage === page
								? "bg-secondary font-medium text-white hover:bg-secondary/90"
								: "text-neutral hover:text-foreground",
						)}
					>
						{page}
					</Button>
				))}

				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
					disabled={currentPage === totalPages}
					className="h-8 px-2.5 text-neutral text-xs hover:text-foreground"
				>
					Next
					<IconChevronRight className="ml-1 size-3.5" />
				</Button>
			</ButtonGroup>
		</div>
	);
};

import {
	IconBolt,
	IconBriefcase,
	IconDeviceTv,
	IconHeartHandshake,
	IconPlus,
	IconShoppingCart,
	IconToolsKitchen2,
	IconTrendingUp,
	IconX,
} from "@tabler/icons-react";
import type React from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TransactionFilterSection } from "@/modules/transactions/components/transaction-filter-section";
import { TransactionForm } from "@/modules/transactions/components/transaction-form";
import { TransactionStats } from "@/modules/transactions/components/transaction-stats";
import {
	TransactionPagination,
	TransactionTable,
} from "@/modules/transactions/components/transaction-table";
import type { Transaction } from "@/modules/transactions/interface";

const INITIAL_TRANSACTIONS: Transaction[] = [
	{
		id: "TX-9021",
		category: "Salary",
		icon: IconBriefcase,
		wallet: "BCA Primary",
		walletType: "Bank Account",
		date: "Nov 20, 2026",
		time: "09:30 AM",
		amount: 4500.0,
		type: "income",
		note: "November 2026 software engineering payroll",
	},
	{
		id: "TX-9020",
		category: "Food & Dining",
		icon: IconToolsKitchen2,
		wallet: "Cash Wallet",
		walletType: "Cash",
		date: "Nov 20, 2026",
		time: "01:15 PM",
		amount: 38.5,
		type: "expense",
		note: "Organic grocery run & fresh produce",
	},
	{
		id: "TX-9019",
		category: "Utilities",
		icon: IconBolt,
		wallet: "Mandiri Savings",
		walletType: "Bank Account",
		date: "Nov 19, 2026",
		time: "08:45 AM",
		amount: 95.0,
		type: "expense",
		note: "Monthly fiber internet & high-speed Wi-Fi",
	},
	{
		id: "TX-9018",
		category: "Freelance",
		icon: IconTrendingUp,
		wallet: "Mandiri Savings",
		walletType: "Bank Account",
		date: "Nov 19, 2026",
		time: "04:10 PM",
		amount: 850.0,
		type: "income",
		note: "Design system consultation milestone",
	},
	{
		id: "TX-9017",
		category: "Shopping",
		icon: IconShoppingCart,
		wallet: "BCA Primary",
		walletType: "Bank Account",
		date: "Nov 18, 2026",
		time: "07:20 PM",
		amount: 180.25,
		type: "expense",
		note: "Ergonomic keyboard and desk mat",
	},
	{
		id: "TX-9016",
		category: "Entertainment",
		icon: IconDeviceTv,
		wallet: "BCA Primary",
		walletType: "Bank Account",
		date: "Nov 17, 2026",
		time: "11:00 AM",
		amount: 24.99,
		type: "expense",
		note: "Family streaming service subscription",
	},
	{
		id: "TX-9015",
		category: "Investment",
		icon: IconTrendingUp,
		wallet: "Crypto Vault",
		walletType: "Cold Wallet",
		date: "Nov 16, 2026",
		time: "03:40 PM",
		amount: 320.0,
		type: "income",
		note: "Staking rewards & quarterly yield",
	},
	{
		id: "TX-9014",
		category: "Health",
		icon: IconHeartHandshake,
		wallet: "Cash Wallet",
		walletType: "Cash",
		date: "Nov 15, 2026",
		time: "06:15 PM",
		amount: 65.0,
		type: "expense",
		note: "Monthly gym and fitness membership",
	},
];

const ITEMS_PER_PAGE = 5;

export default function TransactionPage() {
	const [transactions, setTransactions] =
		useState<Transaction[]>(INITIAL_TRANSACTIONS);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("ALL");
	const [selectedWallet, setSelectedWallet] = useState("ALL");
	const [selectedType, setSelectedType] = useState<
		"ALL" | "income" | "expense"
	>("ALL");
	const [currentPage, setCurrentPage] = useState(1);

	const categories = useMemo(() => {
		const unique = Array.from(new Set(transactions.map((t) => t.category)));
		return ["ALL", ...unique];
	}, [transactions]);

	const wallets = useMemo(() => {
		const unique = Array.from(new Set(transactions.map((t) => t.wallet)));
		return ["ALL", ...unique];
	}, [transactions]);

	const handleCreateTransaction = (newTx: Omit<Transaction, "id">) => {
		const created: Transaction = {
			id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
			...newTx,
		};
		setTransactions((prev) => [created, ...prev]);
		setIsDrawerOpen(false);
	};

	// Filter transactions
	const filteredTransactions = useMemo(() => {
		return transactions.filter((item) => {
			const matchesSearch =
				item.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.id.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesCategory =
				selectedCategory === "ALL" || item.category === selectedCategory;

			const matchesWallet =
				selectedWallet === "ALL" || item.wallet === selectedWallet;

			const matchesType = selectedType === "ALL" || item.type === selectedType;

			return matchesSearch && matchesCategory && matchesWallet && matchesType;
		});
	}, [
		transactions,
		searchQuery,
		selectedCategory,
		selectedWallet,
		selectedType,
	]);

	const totalPages =
		Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE) || 1;
	const paginatedData = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
	}, [filteredTransactions, currentPage]);

	const hasActiveFilters =
		searchQuery !== "" ||
		selectedCategory !== "ALL" ||
		selectedWallet !== "ALL" ||
		selectedType !== "ALL";

	const resetFilters = () => {
		setSearchQuery("");
		setSelectedCategory("ALL");
		setSelectedWallet("ALL");
		setSelectedType("ALL");
		setCurrentPage(1);
	};

	const totalIncome = useMemo(
		() =>
			filteredTransactions
				.filter((t) => t.type === "income")
				.reduce((acc, t) => acc + t.amount, 0),
		[filteredTransactions],
	);

	const totalExpense = useMemo(
		() =>
			filteredTransactions
				.filter((t) => t.type === "expense")
				.reduce((acc, t) => acc + t.amount, 0),
		[filteredTransactions],
	);

	return (
		<div className="space-y-6">
			<TransactionHeader
				title="Transactions"
				description="Keep track of your daily multi-account transactions and cash flow."
				isDrawerOpen={isDrawerOpen}
				onDrawerOpenChange={setIsDrawerOpen}
				onCreateTransaction={handleCreateTransaction}
			/>

			<TransactionStats
				count={filteredTransactions.length}
				totalIncome={totalIncome}
				totalExpense={totalExpense}
			/>

			<TransactionFilterSection
				searchQuery={searchQuery}
				onSearchChange={(val) => {
					setSearchQuery(val);
					setCurrentPage(1);
				}}
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={(val) => {
					setSelectedCategory(val);
					setCurrentPage(1);
				}}
				wallets={wallets}
				selectedWallet={selectedWallet}
				onWalletChange={(val) => {
					setSelectedWallet(val);
					setCurrentPage(1);
				}}
				selectedType={selectedType}
				onTypeChange={(val) => {
					setSelectedType(val);
					setCurrentPage(1);
				}}
				hasActiveFilters={hasActiveFilters}
				onReset={resetFilters}
			/>

			<div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
				<TransactionTable
					transactions={paginatedData}
					hasActiveFilters={hasActiveFilters}
					onReset={resetFilters}
				/>

				<TransactionPagination
					totalItems={filteredTransactions.length}
					currentPage={currentPage}
					totalPages={totalPages}
					itemsPerPage={ITEMS_PER_PAGE}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}

interface TransactionHeaderProps {
	title: string;
	description?: string;
	isDrawerOpen: boolean;
	onDrawerOpenChange: (open: boolean) => void;
	onCreateTransaction: (data: Omit<Transaction, "id">) => void;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
	title,
	description,
	isDrawerOpen,
	onDrawerOpenChange,
	onCreateTransaction,
}) => {
	const isMobile = useIsMobile();
	const swipeDirection = isMobile ? "down" : "right";

	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 className="font-bold text-2xl text-foreground tracking-tight">
					{title}
				</h2>
				{description && (
					<p className="mt-0.5 text-neutral text-sm">{description}</p>
				)}
			</div>

			<Drawer
				open={isDrawerOpen}
				onOpenChange={onDrawerOpenChange}
				showSwipeHandle={isMobile}
				swipeDirection={swipeDirection}
			>
				<DrawerTrigger
					render={
						<Button className="bg-primary text-white shadow-primary/20 shadow-sm hover:bg-primary/90" />
					}
				>
					<IconPlus stroke={2} className="mr-1.5 size-4" />
					<span>New Entry</span>
				</DrawerTrigger>

				<DrawerContent className="overflow-hidden">
					<DrawerHeader>
						<div>
							<DrawerTitle>New Transaction</DrawerTitle>
							<DrawerDescription>
								Record an income or expense to your financial accounts.
							</DrawerDescription>
						</div>
						<DrawerClose
							render={
								<Button
									variant="ghost"
									size="icon"
									className="size-8 rounded-full text-neutral hover:text-foreground"
								/>
							}
						>
							<IconX className="size-4" />
							<span className="sr-only">Close</span>
						</DrawerClose>
					</DrawerHeader>

					<TransactionForm
						onSubmit={onCreateTransaction}
						onCancel={() => onDrawerOpenChange(false)}
					/>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

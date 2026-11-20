export interface Transaction {
	id: string;
	category: string;
	icon: React.ComponentType<{ className?: string; stroke?: number }>;
	wallet: string;
	walletType: string;
	date: string;
	time: string;
	amount: number;
	type: "income" | "expense";
	note: string;
}

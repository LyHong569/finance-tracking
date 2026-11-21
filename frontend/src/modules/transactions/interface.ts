import type React from "react";

export interface CategoryOption {
	id: number;
	name: string;
	icon: React.ComponentType<{ className?: string; stroke?: number }>;
	defaultType: "income" | "expense";
}

export interface WalletOption {
	id: number;
	name: string;
	type: string;
}

export interface Transaction {
	id: string;
	category: string;
	categoryId?: number;
	icon: React.ComponentType<{ className?: string; stroke?: number }>;
	wallet: string;
	walletId?: number;
	walletType: string;
	date: string;
	time: string;
	amount: number;
	type: "income" | "expense";
	note: string;
}

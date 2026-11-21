import {
	IconBolt,
	IconBriefcase,
	IconDeviceTv,
	IconHeartHandshake,
	IconShoppingCart,
	IconToolsKitchen2,
	IconTrendingUp,
} from "@tabler/icons-react";

import type {
	CategoryOption,
	WalletOption,
} from "@/modules/transactions/interface";

export const CATEGORY_OPTIONS: CategoryOption[] = [
	{ id: 1, name: "Salary", icon: IconBriefcase, defaultType: "income" },
	{ id: 2, name: "Freelance", icon: IconTrendingUp, defaultType: "income" },
	{ id: 3, name: "Investment", icon: IconTrendingUp, defaultType: "income" },
	{
		id: 4,
		name: "Food & Dining",
		icon: IconToolsKitchen2,
		defaultType: "expense",
	},
	{ id: 5, name: "Utilities", icon: IconBolt, defaultType: "expense" },
	{ id: 6, name: "Shopping", icon: IconShoppingCart, defaultType: "expense" },
	{ id: 7, name: "Entertainment", icon: IconDeviceTv, defaultType: "expense" },
	{ id: 8, name: "Health", icon: IconHeartHandshake, defaultType: "expense" },
];

export const WALLET_OPTIONS: WalletOption[] = [
	{ id: 1, name: "BCA Primary", type: "Bank Account" },
	{ id: 2, name: "Mandiri Savings", type: "Bank Account" },
	{ id: 3, name: "Cash Wallet", type: "Cash" },
	{ id: 4, name: "Crypto Vault", type: "Cold Wallet" },
];

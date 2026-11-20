import { createFileRoute } from "@tanstack/react-router";

import TransactionPage from "@/pages/transaction";

export const Route = createFileRoute("/transactions")({
	component: TransactionPage,
});

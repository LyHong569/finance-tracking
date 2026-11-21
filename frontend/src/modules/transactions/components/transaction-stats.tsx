interface Props {
	count: number;
	totalIncome: number;
	totalExpense: number;
}

export const TransactionStats: React.FC<Props> = ({
	count,
	totalIncome,
	totalExpense,
}) => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div className="rounded-xl border border-border bg-card p-4">
				<span className="font-medium text-neutral text-xs uppercase tracking-wider">
					Total Volume
				</span>
				<div className="mt-1 font-bold text-foreground text-xl">
					{count} Entries
				</div>
			</div>
			<div className="rounded-xl border border-border bg-card p-4">
				<span className="font-medium text-neutral text-xs uppercase tracking-wider">
					Total Inflow
				</span>
				<div className="mt-1 font-bold text-primary text-xl">
					+${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
				</div>
			</div>
			<div className="rounded-xl border border-border bg-card p-4">
				<span className="font-medium text-neutral text-xs uppercase tracking-wider">
					Total Outflow
				</span>
				<div className="mt-1 font-bold text-foreground text-xl">
					-${totalExpense.toLocaleString("en-US", { minimumFractionDigits: 2 })}
				</div>
			</div>
		</div>
	);
};

import {
	IconCalendar,
	IconClock,
	IconCurrencyDollar,
	IconNotes,
	IconWallet,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import type React from "react";

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
import {
	CATEGORY_OPTIONS,
	WALLET_OPTIONS,
} from "@/modules/transactions/constants";
import { useTransactionCreateForm } from "@/modules/transactions/hooks/use-transaction-create-form";
import type { Transaction } from "@/modules/transactions/interface";

interface TransactionFormProps {
	onSubmit: (data: Omit<Transaction, "id">) => void;
	onCancel?: () => void;
}

const FieldErrorMessage = ({ error }: { error?: unknown }) => {
	if (!error) return null;
	const message =
		typeof error === "string"
			? error
			: typeof error === "object" && error !== null && "message" in error
				? String((error as { message?: unknown }).message)
				: "Invalid value";

	return (
		<p className="mt-1 font-medium text-red-600 text-xs dark:text-red-400">
			{message}
		</p>
	);
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
	onSubmit,
	onCancel,
}) => {
	const form = useTransactionCreateForm({
		onSubmit: (values) => {
			const selectedCategory =
				CATEGORY_OPTIONS.find((c) => c.id === values.categoryId) ??
				CATEGORY_OPTIONS[0];
			const selectedWallet =
				WALLET_OPTIONS.find((w) => w.id === values.walletId) ??
				WALLET_OPTIONS[0];

			const dateTime = dayjs(`${values.date}T${values.time}:00`);
			const formattedDate = dateTime.isValid()
				? dateTime.format("MMM DD, YYYY")
				: values.date;
			const formattedTime = dateTime.isValid()
				? dateTime.format("hh:mm A")
				: values.time;

			onSubmit({
				category: selectedCategory.name,
				categoryId: selectedCategory.id,
				icon: selectedCategory.icon,
				wallet: selectedWallet.name,
				walletId: selectedWallet.id,
				walletType: selectedWallet.type,
				date: formattedDate,
				time: formattedTime,
				amount: values.amount,
				type: values.type,
				note: values.note.trim() || `${selectedCategory.name} transaction`,
			});
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex h-full flex-col justify-between"
		>
			<div className="space-y-5 overflow-y-auto p-4 sm:p-6">
				{/* Global Form Errors */}
				<form.Subscribe selector={(state) => [state.errors]}>
					{([errors]) => {
						if (!errors || errors.length === 0) return null;
						return (
							<div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-600 text-xs dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400">
								Please correct the errors in the form before submitting.
							</div>
						);
					}}
				</form.Subscribe>

				{/* 1. Transaction Type */}
				<form.Field name="type">
					{(field) => (
						<div className="space-y-1.5">
							<span className="block font-medium text-neutral text-xs uppercase tracking-wider">
								Transaction Type
							</span>
							<ButtonGroup className="w-full">
								<Button
									type="button"
									variant={
										field.state.value === "expense" ? "default" : "outline"
									}
									onClick={() => field.handleChange("expense")}
									className={`h-9 flex-1 font-medium text-xs transition-colors ${
										field.state.value === "expense"
											? "bg-secondary text-white hover:bg-secondary/90"
											: "bg-background text-neutral hover:text-foreground"
									}`}
								>
									Expense
								</Button>
								<Button
									type="button"
									variant={
										field.state.value === "income" ? "default" : "outline"
									}
									onClick={() => field.handleChange("income")}
									className={`h-9 flex-1 font-medium text-xs transition-colors ${
										field.state.value === "income"
											? "bg-primary text-white hover:bg-primary/90"
											: "bg-background text-neutral hover:text-foreground"
									}`}
								>
									Income
								</Button>
							</ButtonGroup>
						</div>
					)}
				</form.Field>

				{/* 2. Amount Input */}
				<form.Field name="amount">
					{(field) => {
						const hasError = field.state.meta.errors.length > 0;
						return (
							<div className="space-y-1.5">
								<label
									htmlFor="tx-amount"
									className="block font-medium text-neutral text-xs uppercase tracking-wider"
								>
									Amount
								</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<IconCurrencyDollar className="size-5 text-neutral" />
									</div>
									<Input
										id="tx-amount"
										type="number"
										step="0.01"
										min="0"
										placeholder="0.00"
										value={field.state.value ?? ""}
										onChange={(e) => {
											const val = e.target.value;
											field.handleChange(
												val === "" ? null : Number.parseFloat(val) || 0,
											);
										}}
										onBlur={field.handleBlur}
										className={`h-11 bg-background pl-9 font-semibold text-foreground text-lg focus:ring-1 focus:ring-primary ${
											hasError ? "border-red-500 focus:ring-red-500" : ""
										}`}
									/>
								</div>
								{hasError && (
									<FieldErrorMessage error={field.state.meta.errors[0]} />
								)}
							</div>
						);
					}}
				</form.Field>

				{/* 3. Category Select */}
				<form.Field name="categoryId">
					{(field) => {
						const hasError = field.state.meta.errors.length > 0;
						return (
							<div className="space-y-1.5">
								<span className="block font-medium text-neutral text-xs uppercase tracking-wider">
									Category
								</span>
								<Select
									value={
										field.state.value !== null ? String(field.state.value) : ""
									}
									onValueChange={(val) => {
										if (val) field.handleChange(Number(val));
									}}
								>
									<SelectTrigger
										className={`h-10 w-full bg-background text-sm ${
											hasError ? "border-red-500" : ""
										}`}
									>
										<SelectValue placeholder="Select Category" />
									</SelectTrigger>
									<SelectContent className="max-h-60">
										{CATEGORY_OPTIONS.map((cat) => {
											const CatIcon = cat.icon;
											return (
												<SelectItem key={cat.id} value={String(cat.id)}>
													<div className="flex items-center gap-2">
														<CatIcon className="size-4 text-neutral" />
														<span>{cat.name}</span>
													</div>
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
								{hasError && (
									<FieldErrorMessage error={field.state.meta.errors[0]} />
								)}
							</div>
						);
					}}
				</form.Field>

				{/* 4. Wallet Select */}
				<form.Field name="walletId">
					{(field) => {
						const hasError = field.state.meta.errors.length > 0;
						return (
							<div className="space-y-1.5">
								<span className="block font-medium text-neutral text-xs uppercase tracking-wider">
									Payment Wallet / Account
								</span>
								<Select
									value={
										field.state.value !== null ? String(field.state.value) : ""
									}
									onValueChange={(val) => {
										if (val) field.handleChange(Number(val));
									}}
								>
									<SelectTrigger
										className={`h-10 w-full bg-background text-sm ${
											hasError ? "border-red-500" : ""
										}`}
									>
										<SelectValue placeholder="Select Wallet" />
									</SelectTrigger>
									<SelectContent>
										{WALLET_OPTIONS.map((w) => (
											<SelectItem key={w.id} value={String(w.id)}>
												<div className="flex items-center gap-2">
													<IconWallet className="size-4 text-neutral" />
													<span>{w.name}</span>
													<span className="text-neutral text-xs">
														({w.type})
													</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{hasError && (
									<FieldErrorMessage error={field.state.meta.errors[0]} />
								)}
							</div>
						);
					}}
				</form.Field>

				{/* 5. Date and Time */}
				<div className="grid grid-cols-2 gap-3">
					<form.Field name="date">
						{(field) => {
							const hasError = field.state.meta.errors.length > 0;
							return (
								<div className="space-y-1.5">
									<label
										htmlFor="tx-date"
										className="block font-medium text-neutral text-xs uppercase tracking-wider"
									>
										Date
									</label>
									<div className="relative">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
											<IconCalendar className="size-4 text-neutral" />
										</div>
										<Input
											id="tx-date"
											type="date"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											className={`h-10 bg-background pl-8 text-xs ${
												hasError ? "border-red-500" : ""
											}`}
										/>
									</div>
									{hasError && (
										<FieldErrorMessage error={field.state.meta.errors[0]} />
									)}
								</div>
							);
						}}
					</form.Field>

					<form.Field name="time">
						{(field) => {
							const hasError = field.state.meta.errors.length > 0;
							return (
								<div className="space-y-1.5">
									<label
										htmlFor="tx-time"
										className="block font-medium text-neutral text-xs uppercase tracking-wider"
									>
										Time
									</label>
									<div className="relative">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
											<IconClock className="size-4 text-neutral" />
										</div>
										<Input
											id="tx-time"
											type="time"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											className={`h-10 bg-background pl-8 text-xs ${
												hasError ? "border-red-500" : ""
											}`}
										/>
									</div>
									{hasError && (
										<FieldErrorMessage error={field.state.meta.errors[0]} />
									)}
								</div>
							);
						}}
					</form.Field>
				</div>

				{/* 6. Note / Description */}
				<form.Field name="note">
					{(field) => (
						<div className="space-y-1.5">
							<label
								htmlFor="tx-note"
								className="block font-medium text-neutral text-xs uppercase tracking-wider"
							>
								Description / Note
							</label>
							<div className="relative">
								<div className="pointer-events-none absolute top-3 left-3">
									<IconNotes className="size-4 text-neutral" />
								</div>
								<Input
									id="tx-note"
									type="text"
									placeholder="e.g. Grocery shopping at Whole Foods"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									className="h-10 bg-background pl-9 text-sm"
								/>
							</div>
						</div>
					)}
				</form.Field>
			</div>

			{/* Form Footer Action Buttons */}
			<div className="flex items-center justify-end gap-2 border-border border-t bg-neutral-50/50 p-4 dark:bg-neutral-900/50">
				{onCancel && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={onCancel}
						className="h-9 px-4 text-xs"
					>
						Cancel
					</Button>
				)}
				<form.Subscribe selector={(state) => [state.isSubmitting]}>
					{([isSubmitting]) => (
						<Button
							type="submit"
							size="sm"
							disabled={isSubmitting}
							className="h-9 bg-primary px-5 text-white text-xs shadow-primary/20 shadow-sm hover:bg-primary/90 disabled:opacity-60"
						>
							{isSubmitting ? "Saving..." : "Save Transaction"}
						</Button>
					)}
				</form.Subscribe>
			</div>
		</form>
	);
};

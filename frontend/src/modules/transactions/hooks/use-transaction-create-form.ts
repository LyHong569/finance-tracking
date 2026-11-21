import { useForm } from "@tanstack/react-form";
import { z } from "zod";

export const transactionFormSchema = z.object({
	type: z.enum(["income", "expense"]),
	amount: z
		.number({ error: "Amount must be a number" })
		.nullable()
		.refine((val): val is number => val !== null && val > 0, {
			message: "Amount must be greater than 0",
		}),
	categoryId: z
		.number({ error: "Please select a category" })
		.nullable()
		.refine((val): val is number => val !== null && val > 0, {
			message: "Please select a category",
		}),
	walletId: z
		.number({ error: "Please select a wallet" })
		.nullable()
		.refine((val): val is number => val !== null && val > 0, {
			message: "Please select a wallet",
		}),
	date: z.string().min(1, "Please select a date"),
	time: z.string().min(1, "Please select a time"),
	note: z.string(),
});

export type TransactionFormInput = z.input<typeof transactionFormSchema>;
export type TransactionFormOutput = z.output<typeof transactionFormSchema>;

export const DEFAULT_TRANSACTION_FORM_VALUES: TransactionFormInput = {
	type: "expense",
	amount: null,
	categoryId: null,
	walletId: null,
	date: "",
	time: "",
	note: "",
};

export interface UseTransactionCreateFormProps {
	defaultValues?: Partial<TransactionFormInput>;
	onSubmit: (values: TransactionFormOutput) => void | Promise<void>;
}

export const useTransactionCreateForm = ({
	defaultValues,
	onSubmit,
}: UseTransactionCreateFormProps) => {
	return useForm({
		defaultValues: {
			...DEFAULT_TRANSACTION_FORM_VALUES,
			...defaultValues,
		},
		validators: {
			onSubmit: transactionFormSchema,
		},
		onSubmit: async ({ value }) => {
			const parsed = transactionFormSchema.safeParse(value);
			if (parsed.success) {
				await onSubmit(parsed.data);
			}
		},
	});
};

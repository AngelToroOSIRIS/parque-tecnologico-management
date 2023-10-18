"use client";

import { emptyValue } from "@/libs/functionsStrings";
import { useState } from "react";
import GraySubtitle from "../Subtitle";
import Textarea from "./Textarea";

interface Validations {
	required?: string;
	minLength?: {
		value: number;
		message: string;
	};
	maxLength?: {
		value: number;
		message: string;
	};
}

const TextareaForm = ({
	name,
	defaultValue,
	placeholder,
	minRows,
	label,
	validations,
	onChange,
}: {
	name: string;
	defaultValue?: string;
	placeholder?: string;
	minRows?: number;
	label?: { value?: string; required?: boolean };
	validations?: Validations;
	onChange: any;
}) => {
	const [error, setError] = useState<string | undefined>(undefined);

	const handleChange = ({ name, value }: { name: string; value: string }) => {
		// WITHOUT VALIDATIONS
		if (Object.keys(validations ?? {}).length === 0) {
			return onChange({ name, value });
		}

		const nullReturn = {
			name,
			value: null,
		};

		const valueInput = { name, value };

		setError(undefined);

		// VALIDATE REQUIRED
		if (validations?.required && emptyValue(value)) {
			setError(
				validations.minLength
					? validations.minLength.message
					: validations?.required
			);
			onChange(nullReturn);
			return;
		} else if (!validations?.required && emptyValue(value)) {
			setError(undefined);
			onChange(nullReturn);
			return;
		}

		// VALIDATE LENGTHS
		if (!emptyValue(value)) {
			// WITHOUT LENGTHS
			if (!validations?.minLength && !validations?.maxLength) {
				setError(undefined);
				onChange(valueInput);
				return;
			}

			// VALIDATE MIN LENGTH
			if (validations?.minLength && !validations?.maxLength) {
				if (value.length < validations?.minLength.value) {
					setError(validations?.minLength.message);
					onChange(nullReturn);
					return;
				} else {
					setError(undefined);
					onChange(valueInput);
					return;
				}
			}

			// VALIDATE MAX LENGTH
			if (!validations?.minLength && validations?.maxLength) {
				if (value.length > validations?.maxLength.value) {
					setError(validations?.maxLength.message);
					onChange(nullReturn);
					return;
				} else {
					setError(undefined);
					onChange(valueInput);
					return;
				}
			}

			// VALIDATE MINMAX LENGTH
			if (validations?.minLength && validations?.maxLength) {
				if (
					value.length <= validations?.maxLength.value &&
					value.length >= validations?.minLength.value
				) {
					setError(undefined);
					onChange(valueInput);
					return;
				}

				if (value.length > validations?.maxLength.value) {
					setError(validations?.maxLength.message);
					onChange(nullReturn);
					return;
				}

				if (value.length < validations?.minLength.value) {
					setError(validations?.minLength.message);
					onChange(nullReturn);
					return;
				}
			}
		}
	};

	return (
		<div className="text-start w-full">
			<GraySubtitle
				text={
					label?.value ??
					name[0].toString().toUpperCase() + name.toString().substring(1) + ":"
				}
				required={label?.required ?? true}
			/>
			<Textarea
				name={name}
				minRows={minRows}
				defaultValue={defaultValue}
				placeholder={placeholder ?? "Ingresar " + name}
				error={error}
				onChange={handleChange}
			/>
		</div>
	);
};

export default TextareaForm;

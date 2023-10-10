import React from "react";
import { Select as SelectNextUi } from "@nextui-org/react";
import Icon from "./Icon";

const Select: React.FC<{
	name?: string;
	icon?: string;
	placeholder: string;
	defaultValue?: string;
	className?: string;
	error?: string;
	onChange?: any;
	children?: any;
}> = ({
	name,
	icon,
	placeholder,
	className,
	error,
	defaultValue,
	onChange,
	children,
}) => {
	return (
		<SelectNextUi
			aria-label={name}
			radius="full"
			size="sm"
			startContent={
				icon && <Icon icon={icon} className={error && "text-red"} />
			}
			placeholder={placeholder}
			errorMessage={error ?? null}
			isInvalid={error ? true : false}
			classNames={{
				errorMessage: "text-sm font-medium",
				value: "text-base",
			}}
			className={"mt-1 mb-[10px] outline-none select-none " + className}
			variant="faded"
			onChange={(e) => {
				const value = String(e.target.value).trim();
				onChange({
					name: String(e.target.name).trim(),
					value: value !== "" ? value : null,
				});
			}}
			name={name}
			defaultSelectedKeys={defaultValue ? [defaultValue] : undefined}
		>
			{children}
		</SelectNextUi>
	);
};

export default Select;

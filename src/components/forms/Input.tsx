import { Input as InputNextUi } from "@nextui-org/react";
import Icon from "./Icon";

const Input: React.FC<{
	type?: string;
	name?: string;
	icon?: string;
	value?: string; 
	clearable?: boolean;
	placeholder?: string;
	className?: string;
	defaultValue?: string;
	error?: string;
	onChange?: ({ name, value }: { name: string; value: string | null }) => any;
	disabled?: boolean;
	description?: string;
}> = ({
	className,
	type = "text",
	name,
	icon,
	value,
	clearable = false,
	placeholder,
	defaultValue,
	error,
	onChange,
	disabled,
	description,
}) => {
	return (
		<InputNextUi
			isClearable={clearable}
			radius="full"
			size="lg"
			variant="faded"
			classNames={{
				inputWrapper: "bg-[#ffff]",
				errorMessage: "text-sm font-medium",
			}}
			className={"mt-1 mb-[10px] outline-none select-none " + className}
			startContent={
				icon && <Icon icon={icon} className={error && "text-red"} />
			}
			value={value}
			isDisabled={disabled}
			isInvalid={error ? true : false}
			errorMessage={error ?? null}
			description={description}
			type={type}
			placeholder={placeholder}
			defaultValue={defaultValue}
			name={name}
			onChange={(e) => {
				if (onChange) {
					const value = String(e.target.value).trim();
					onChange({
						name: String(e.target.name).trim(),
						value: value !== "" ? value : null,
					});
				}
			}}
			autoComplete={
				name === "password"
					? "current-password"
					: name === "email"
					? name
					: undefined
			}
		/>
	);
};

export default Input;

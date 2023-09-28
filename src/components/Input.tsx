import React from "react";

const Input: React.FC<{
	list?: string;
	type?: string;
	name?: string;
	id?: string;
	placeholder?: string;
	className?: string;
	defaultValue?: string | number;
	value?: string;
	onChange?: any;
	disabled?:boolean
}> = ({
	list,
	className,
	type = "text",
	name,
	id,
	placeholder,
	defaultValue,
	value,
	onChange,
	disabled,
	...props
}) => {
	const classInput =
		"my-[10px] mx-0 p-2 w-full h-[39px] rounded-[10px] bg-soft-white border border-borders-light transition-all outline-none select-none hover:border-soft-primary focus:border-primary input-shadow";

	return (
		<input
			list={list}
			id={id}
			className={className ? `${classInput} ${className}` : classInput}
			type={type}
			name={name}
			placeholder={placeholder}
			defaultValue={defaultValue}
			value={value}
			onChange={onChange}
			disabled={disabled}
			{...props}
		/>
	);
};

export default Input;
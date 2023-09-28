import React from "react";

const Select: React.FC<{
	type?: string;
	name?: string;
	placeholder?: string;
	value?: string | number;
	defaultValue?: string | number;
	className?: string;
	onChange?: any;
	children?: any;
}> = ({ type = "text", name, placeholder, className, value, defaultValue, onChange, children, ...props }) => {
	const classSelect = "my-[10px] mx-0 p-2 w-full h-[39px] rounded-[10px] bg-soft-white border border-borders-light transition-all outline-none select-none hover:border-soft-primary focus:border-primary input-shadow";

	return (
		<select
			className={
				className ? `${classSelect} ${className}` : classSelect
			}
			name={name}
			value={value}
			defaultValue={defaultValue}
			onChange={onChange}
			{...props}
		>
			{children}
		</select>
	);
};

export default Select;
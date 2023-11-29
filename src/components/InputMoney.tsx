import CurrencyInput from "react-currency-input-field";

interface Props {
  name: string;
  defaultValue?: number;
  onChange: any;
  label?: string;
  required?: boolean;
}

const InputMoney = ({ name, defaultValue, onChange, label, required = false }: Props) => {
  const classInput =
    "mt-1 mb-[10px] py-2 pl-7 pr-2 w-full h-[50px] rounded-full bg-[#ffffff] border-2 border-borders-light transition-all outline-none select-none hover:border-borders";

  return (
    <>
      <div className="relative">
      <p className="flex justify-start items-center gap-1 mb-1 font-medium text-soft-gray">
        {required && <i className="bi bi-asterisk text-primary text-xs"></i>}{" "}
        {label}
      </p>
        <i
          className="bi bi-currency-dollar absolute mt-[15px] ml-2 text-xl text-gray"
          title="Valor númerico"
        ></i>
        <CurrencyInput
          id={name}
          name={name}
          placeholder="100.000"
          className={classInput}
          defaultValue={defaultValue}
          allowDecimals={false}
          allowNegativeValue={false}
          onValueChange={(value, name) =>
            onChange({ name, value: isNaN(Number(value)) ? 0 : Number(value) })
          }
        />
      </div>
    </>
  );
};

export default InputMoney;

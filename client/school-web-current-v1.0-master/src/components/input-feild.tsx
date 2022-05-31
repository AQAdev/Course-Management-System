import { Dispatch, FC, SetStateAction } from "react";

interface IinputProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  label: string;
  placeholder: string;
}

const InputFeild: FC<IinputProps> = ({
  input,
  setInput,
  label,
  placeholder,
}) => {
  const handleInput = (e: any) => {
    setInput(e.target.value);
  };
  return (
    <>
      <div className="flex items-center">
        <div className="w-32">{label}</div>
        <input
          onChange={handleInput}
          type="text"
          value={input}
          placeholder={placeholder}
          required
          className="text-gray-800 border border-2 border-gray-400 px-4 h-12 outline-none w-full rounded"
        ></input>
      </div>
    </>
  );
};

export default InputFeild;

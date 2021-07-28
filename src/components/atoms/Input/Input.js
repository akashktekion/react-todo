import s from "./input.module.scss";
import useInput from "./useInput";

const Input = ({ id }) => {
  const [input, setInput, add] = useInput(id);
  return (
    <div className={s.input}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? add() : "")}
      />
      <button onClick={add}>Add New</button>
    </div>
  );
};

export default Input;

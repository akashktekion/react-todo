import s from "./input.module.scss";

const Input = ({ input, setInput, add }) => {
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

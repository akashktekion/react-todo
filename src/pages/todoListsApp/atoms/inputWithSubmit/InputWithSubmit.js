import s from "./inputWithSubmit.module.scss";

const InputWithSubmit = ({ input, setInput, add }) => {
  const changeHandler = (e) => setInput(e.target.value);
  const submitHandler = (e) => (e.key === "Enter" ? add() : "");

  return (
    <div className={s.input}>
      <input
        type="text"
        value={input}
        onChange={changeHandler}
        onKeyDown={submitHandler}
      />
      <button onClick={add}>Add New</button>
    </div>
  );
};

export default InputWithSubmit;

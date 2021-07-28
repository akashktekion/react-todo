import "./input.scss";

const Input = ({ add, input, setInput }) => {
  return (
    <div className="input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? add(input) : "")}
      />
      <button onClick={add}>Add New</button>
    </div>
  );
};

export default Input;

import "./Items.css";

const Items = ({ list, remove, update }) => {
  return (
    <div className="items">
      {list &&
        list.map((item) => (
          <div className="item" key={item.id}>
            <input
              type="checkbox"
              onChange={(e) => update(item)}
              checked={item.isCompleted}
            />
            <span
              className="item-name"
              style={{
                textDecoration: item.isCompleted ? "line-through" : "none",
              }}
            >
              {item.task}
            </span>
            <button className="remove" onClick={() => remove(item)}>
              Remove
            </button>
          </div>
        ))}

      {list.length === 0 && <p>No Tasks Yet!</p>}
    </div>
  );
};

export default Items;

import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../redux/todosSlice";
import "./Items.css";

const Items = ({ todoId }) => {
  const tasks = useSelector((state) => getTasks(state, todoId));
  // const dispatch = useDispatch();
  return (
    <div className="items">
      {tasks &&
        tasks.map((item) => (
          <div className="item" key={item.id}>
            <input
              type="checkbox"
              onChange={(e) => {}}
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
            {/* <button className="remove" onClick={() => remove(item)}>
              Remove
            </button> */}
          </div>
        ))}

      {tasks.length === 0 && <p>No Tasks Yet!</p>}
    </div>
  );
};

export default Items;

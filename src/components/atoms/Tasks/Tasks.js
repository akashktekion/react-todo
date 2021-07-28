import s from "./tasks.module.scss";
import classNames from "classnames";

const Tasks = ({ tasks, remove, update }) => {
  return (
    <div className={s.items}>
      {tasks &&
        tasks.map((item) => (
          <div className={s.item} key={item.id}>
            <input
              type="checkbox"
              onChange={(e) => update(item)}
              checked={item.isCompleted}
            />
            <span
              className={classNames(s.itemName, {
                [s.striked]: item.isCompleted,
              })}
            >
              {item.task}
            </span>
            <button onClick={() => remove(item)}>Remove</button>
          </div>
        ))}

      {tasks.length === 0 && <p>No Tasks Yet!</p>}
    </div>
  );
};

export default Tasks;

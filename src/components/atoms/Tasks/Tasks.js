import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../../store/todoSlice";
import s from "./tasks.module.scss";
import classNames from "classnames";
import { removeOne, toggleTaskCompleted } from "../../../store/todoSlice";

const Tasks = ({ todoId }) => {
  const tasks = useSelector((state) => getTasks(state, { todoId }));
  const dispatch = useDispatch();

  return (
    <div className={s.items}>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <div className={s.item} key={task.id}>
            <input
              type="checkbox"
              onChange={(e) =>
                dispatch(toggleTaskCompleted({ todoId, taskId: task.id }))
              }
              checked={task.isCompleted}
            />
            <span
              className={classNames(s.itemName, {
                [s.striked]: task.isCompleted,
              })}
            >
              {task.task}
            </span>
            <button
              onClick={() => dispatch(removeOne({ todoId, taskId: task.id }))}
            >
              Remove
            </button>
          </div>
        ))}

      {tasks.length === 0 && <p>No Tasks Yet!</p>}
    </div>
  );
};

export default Tasks;

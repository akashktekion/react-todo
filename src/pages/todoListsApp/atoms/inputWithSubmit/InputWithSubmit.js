import { connect } from "react-redux";
import { Component } from "react";
import PropTypes from "prop-types";

import s from "./inputWithSubmit.module.scss";
import { getInputText } from "../../../../store/todoListsApp/selectors/todoSelectors";
import { setInputText } from "../../../../store/todoListsApp/actions/createTodoActions";

class InputWithSubmit extends Component {
  render() {
    const { input, setInputText, setEditingItemId, actionType, submitHandler } =
      this.props;

    const changeHandler = (e) => setInputText(e.target.value);

    const cancelHandler = (e) => {
      if (e.target.id === "cancelBtn") {
        setEditingItemId("");
        setInputText("");
      }
    };

    return (
      <div className={s.input}>
        <input
          type="text"
          value={input}
          onChange={changeHandler}
          onKeyDown={submitHandler}
        />
        <button id="addNew" className={s.addNew} onClick={submitHandler}>
          &#43; {actionType === "updateTodoItem" ? "Update This" : "Add New"}
        </button>
        {actionType === "updateTodoItem" && (
          <button id="cancelBtn" onClick={cancelHandler}>
            Cancel
          </button>
        )}
      </div>
    );
  }
}

InputWithSubmit.propTypes = {
  input: PropTypes.string.isRequired,
  setInputText: PropTypes.func,
  actionType: PropTypes.string.isRequired,
  submitHandler: PropTypes.func,
};

const mapStateToProps = (state) => {
  const input = getInputText(state);
  return { input };
};

const mapDispatchToProps = (dispatch) => ({
  setInputText: (input) => dispatch(setInputText(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputWithSubmit);

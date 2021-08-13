import { Component } from "react";
import PropTypes from "prop-types";

import s from "./inputWithSubmit.module.scss";
import { setEditingItemId } from "../../../../store/todoListsApp/actions/createTodoActions";
import { connect } from "react-redux";

class InputWithSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editingInputName !== this.props.editingInputName) {
      this.setState({ input: this.props.editingInputName });
    }
  }

  setEditingInputText(text) {
    this.setState({ input: text });
  }

  changeHandler(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleSubmit(e) {
    if (this.state.input && (e.key === "Enter" || e.target.id === "addNew")) {
      this.props.submitHandler(this.state.input);
      this.setState({ input: "" });
    }
  }

  cancelHandler(e) {
    if (e.target.id === "cancelBtn") {
      this.props.setEditingItemId("");
      this.setState({ input: "" });
    }
  }

  render() {
    const { actionType } = this.props;

    return (
      <div className={s.input}>
        <input
          type="text"
          value={this.state.input}
          onChange={this.changeHandler}
          onKeyDown={this.handleSubmit}
        />
        <button id="addNew" className={s.addNew} onClick={this.handleSubmit}>
          &#43; {actionType === "updateTodoItem" ? "Update This" : "Add New"}
        </button>
        {actionType === "updateTodoItem" && (
          <button id="cancelBtn" onClick={this.cancelHandler}>
            Cancel
          </button>
        )}
      </div>
    );
  }
}

InputWithSubmit.defaultProps = {
  actionType: "",
  submitHandler: () => {},
  editingInputName: "",
  setEditingItemId: () => {},
};

InputWithSubmit.propTypes = {
  actionType: PropTypes.string.isRequired,
  submitHandler: PropTypes.func,
  editingInputName: PropTypes.string,
  setEditingItemId: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  setEditingItemId: (id) => dispatch(setEditingItemId(id)),
});

export default connect(null, mapDispatchToProps)(InputWithSubmit);

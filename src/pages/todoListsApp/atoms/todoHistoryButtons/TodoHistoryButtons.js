import PropTypes from "prop-types";

import s from "./todoHistoryButtons.module.scss";

const TodoHistoryButtons = ({
  goBack,
  goNext,
  goPrev,
  isNextPresent,
  isPrevPresent,
}) => {
  return (
    <div className={s.historyButtons}>
      <button className="btn-back" onClick={goBack}>
        &#8634; Back
      </button>
      <button className="btn-next" onClick={goNext} disabled={!isNextPresent}>
        &#8649; Next
      </button>
      <button className="btn-prev" onClick={goPrev} disabled={!isPrevPresent}>
        &#8647; Prev
      </button>
    </div>
  );
};

TodoHistoryButtons.propTypes = {
  goBack: PropTypes.func.isRequired,
  goNext: PropTypes.func.isRequired,
  goPrev: PropTypes.func.isRequired,
  isNextPresent: PropTypes.bool.isRequired,
  isPrevPresent: PropTypes.bool.isRequired,
};

export default TodoHistoryButtons;

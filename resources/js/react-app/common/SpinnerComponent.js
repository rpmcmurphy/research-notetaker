import React from "react";

import './SpinnerComponentStyles.scss';

const SpinnerComponent = () => {
    return (
        <div className="spinnerInner">
            <div className="spinnerDot"></div>
        </div>
    );
};

export default SpinnerComponent;
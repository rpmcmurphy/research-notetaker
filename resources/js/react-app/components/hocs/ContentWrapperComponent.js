import React from 'react';

import './ContentWrapperComponent.scss';

function ContentWrapperComponent({ children }) {
    return (
        <div className="contentWrapper">
            {children}
        </div>
    );
}

export default ContentWrapperComponent;
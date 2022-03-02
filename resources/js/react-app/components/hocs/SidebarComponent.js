import React from 'react';

import './SidebarComponent.scss';

function SidebarComponent({ children }) {
    return (
        <div className="contentWrapper">
            {children}
        </div>
    );
}

export default SidebarComponent;
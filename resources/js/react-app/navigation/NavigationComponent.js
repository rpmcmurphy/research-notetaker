import { Route, Routes } from 'react-router-dom';

import HomeComponent from '../components/HomeComponent';
import TestComponent from '../components/TestComponent';

const ReactComponent = () => {
    return (
        <>
            <div className="react-component">
                React component
            </div>
        </>
    );
};

const NavigationComponent = () => {
    return (
        <>
            <Routes basename='/react'>
                <Route exact path='react/' element={<ReactComponent />} />
                <Route path='/react/home' element={<HomeComponent />} />
                <Route path='/react/test' element={<TestComponent />} />
            </Routes>
        </>
    );
};

export default NavigationComponent;
import { Route, Routes } from 'react-router-dom';

import NotFoundComponent from '../components/NotFoundComponent';
import HomeComponent from '../components/HomeComponent';
import TestComponent from '../components/TestComponent';

const NavigationComponent = () => {
    return (
        <>
            <Routes>
                <Route path='*' element={<NotFoundComponent />} />
                <Route exact path='/' element={<HomeComponent />} />
                <Route path='/home' element={<HomeComponent />} />
                <Route path='/test' element={<TestComponent />} />
            </Routes>
        </>
    );
};

export default NavigationComponent;
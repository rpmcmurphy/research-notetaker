import { Route, Routes } from 'react-router-dom';

import ContentWrapperComponent from '../components/hocs/ContentWrapperComponent';
import NotFoundComponent from '../components/NotFoundComponent';
import HomeComponent from '../components/HomeComponent';
import SearchComponent from '../components/SearchComponent';
import TopicsComponent from '../components/TopicsComponent';
import DetailsComponent from '../components/DetailsComponent';
import AddTopicComponent from '../components/AddTopicComponent';
import AddDetailsComponent from '../components/AddDetailsComponent';
import UpdateTopicComponent from '../components/UpdateTopicComponent';
import DeleteTopicComponent from '../components/DeleteTopicComponent';
import UpdateDetailComponent from '../components/UpdateDetailComponent';
import ViewDetailComponent from '../components/ViewDetailComponent';
import DeleteDetailsComponent from '../components/DeleteDetailsComponent';
import CategorizedDetailComponent from '../components/CategorizedDetailComponent';
import DetailsListCardComponent from '../components/DetailsListCardComponent';

import AboutUsComponent from '../components/AboutUsComponent';
import UsageComponent from '../components/UsageComponent';
import LicenseComponent from '../components/LicenseComponent';

const NavigationComponent = () => {
    return (
        <>
            <Routes>
                <Route path='*' element={<ContentWrapperComponent><NotFoundComponent /></ContentWrapperComponent>} />
                <Route exact path='/' element={<HomeComponent />} />
                <Route path='/home' element={<HomeComponent />} />
                <Route path='/search' element={<SearchComponent />} />
                <Route path='/topics' element={<ContentWrapperComponent><TopicsComponent /></ContentWrapperComponent>} />
                <Route path='/add-topic' element={<ContentWrapperComponent><AddTopicComponent /></ContentWrapperComponent>} />
                <Route path="topic-edit/:topicId" element={<ContentWrapperComponent><UpdateTopicComponent /></ContentWrapperComponent>} />
                <Route path="topic-delete/:topicId" element={<ContentWrapperComponent><DeleteTopicComponent /></ContentWrapperComponent>} />
                <Route path='/details' element={<ContentWrapperComponent><DetailsComponent /></ContentWrapperComponent>} />
                <Route path='/details-cards' element={<ContentWrapperComponent><DetailsListCardComponent /></ContentWrapperComponent>} />
                <Route path='/add-detail' element={<ContentWrapperComponent><AddDetailsComponent /></ContentWrapperComponent>} />
                <Route path="detail-view/:detailId" element={<ContentWrapperComponent><ViewDetailComponent /></ContentWrapperComponent>} />
                <Route path="detail-edit/:detailId" element={<ContentWrapperComponent><UpdateDetailComponent /></ContentWrapperComponent>} />
                <Route path="detail-delete/:detailId" element={<ContentWrapperComponent><DeleteDetailsComponent /></ContentWrapperComponent>} />
                <Route path="topic/:topicId" element={<ContentWrapperComponent><CategorizedDetailComponent /></ContentWrapperComponent>} />
                <Route path="about-us" element={<ContentWrapperComponent><AboutUsComponent /></ContentWrapperComponent>} />
                <Route path="usage" element={<ContentWrapperComponent><UsageComponent /></ContentWrapperComponent>} />
                <Route path="license" element={<ContentWrapperComponent><LicenseComponent /></ContentWrapperComponent>} />
            </Routes>
        </>
    );
};

export default NavigationComponent;
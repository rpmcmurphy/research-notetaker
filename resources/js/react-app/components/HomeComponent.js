import React, { useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import data from '../data/mock-data.json';

import ContentWrapperComponent from './hocs/ContentWrapperComponent';
import SearchFormComponent from './accessory-components/SearchFormComponent';
import TopicsComponent from './TopicsComponent';
import DetailsComponent from './DetailsComponent';

let PageSize = 10;

const HomeComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <ContentWrapperComponent>
            <SearchFormComponent />
            <Row>
                <Col md={6}>
                    <TopicsComponent />
                </Col>
                <Col md={6}>
                    <DetailsComponent />
                </Col>
                <Col md={6}>
                    {/* <SidebarComponent>
                        Home component sidebar.
                    </SidebarComponent> */}
                    {/* <SidebarComponent> */}
                        {/* <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>FIRST NAME</th>
                                    <th>LAST NAME</th>
                                    <th>EMAIL</th>
                                    <th>PHONE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData.map(item => {
                                    return (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={data.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        /> */}
                    {/* </SidebarComponent> */}
                </Col>
            </Row>
        </ContentWrapperComponent>
    );
};

export default HomeComponent;
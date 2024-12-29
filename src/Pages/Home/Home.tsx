import React, { useState } from 'react';

import { Button, Container } from './styles';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Home: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return <Container>
        <Button onClick={openSidebar}>Expolore web APIs</Button>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </Container>
};

export default Home;
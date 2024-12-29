import React, { memo, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
    Container,
    Wrapper,
    Header,
    HeaderTitle,
    ContentWrapper,
    ContentContainer,
    ContentTitle,
    ContentDesc,
    ContactTitle,
    ButtonContainer,
    Button,
} from './styles';
import Sidebar from '../../Components/Sidebar/Sidebar';
import axios from 'axios';

const ProviderDetail: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const xServiceName = queryParams.get('x-serviceName');
    const { provider } = useParams<{ provider?: string }>();  // Get the 'id' from the URL params
    const [detail, setDetail] = useState<any>(null);
    useEffect(() => {
        const getProviderDetails = async () => {
            try {
                const resp = await axios.get(`https://api.apis.guru/v2/${provider}.json`);
                if (provider === 'amazonaws.com') {
                    const data = resp.data.apis[`${provider}:${xServiceName}`];
                    setDetail(data);
                } else {
                    const data = resp.data.apis[Object.keys(resp.data.apis)[0]];
                    setDetail(data);
                }
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        }
        getProviderDetails();
    }, [provider, xServiceName])

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Utility function to format the text
    const formatText = (text: string) => {
        return text.replace(/\n/g, '<br />');
    };
    return <Container>
        <Wrapper>
            <Header>
                <img src={detail && detail['info']['x-logo']['url']} width={80} />
                <HeaderTitle>
                    {detail && detail['info']['title']}
                </HeaderTitle>
            </Header>
            <ContentWrapper>
                <ContentContainer>
                    <ContentTitle>Description: </ContentTitle>
                    <ContentDesc
                        dangerouslySetInnerHTML={{
                            __html: detail && detail['info']['description']
                                ? formatText(detail['info']['description'])
                                : '',
                        }}
                    />
                </ContentContainer>
                <ContentContainer>
                    <ContentTitle>Swagger: </ContentTitle>
                    <ContentDesc>{detail && detail['swaggerUrl']}</ContentDesc>
                </ContentContainer>
                {detail && detail['info']?.['contact'] && (
                    <ContentContainer>
                        <ContentTitle>Contact: </ContentTitle>
                        {Object.entries(detail['info']['contact']).map(([key, value]) => (
                            <ContentDesc key={key}>
                                <ContactTitle>{key.charAt(0).toUpperCase() + key.slice(1)}</ContactTitle>
                                {String(value)}
                            </ContentDesc>
                        ))}
                    </ContentContainer>
                )}
            </ContentWrapper>
            <ButtonContainer>
                <Button onClick={openSidebar}>Expolore more APIs</Button>
            </ButtonContainer>
        </Wrapper>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </Container>
};

export default memo(ProviderDetail);
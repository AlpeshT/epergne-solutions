import React, { memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Backdrop, MenuItemWrapper, MenuItem, SidebarContainer, ArrowIcon, Header, Expanded, Anchor } from './styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
    const navigate = useNavigate();

    const [providers, setProviders] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [detail, setDetail] = useState<any>(null);

    const toggleMenu = async (menu: string) => {
        setDetail(null);
        setExpanded({});
        await getProviderDetails(menu);
        setExpanded((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleRedirect = (path: string) => {
        closeSidebar();
        navigate(path);
    };

    useEffect(() => {
        const getAllProviders = async () => {
            try {
                const resp = await axios.get('https://api.apis.guru/v2/providers.json');
                const data = resp.data.data;
                setProviders(data);
                const newValues: { [key: string]: boolean } = {};
                data.forEach((item: string) => {
                    newValues[item] = false; // Initialize all menu items as collapsed
                });
                setExpanded(newValues);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        getAllProviders();
    }, []);

    const getProviderDetails = async (providerName: string) => {
        try {
            const resp = await axios.get(`https://api.apis.guru/v2/${providerName}.json`);

            if (providerName === 'amazonaws.com') {
                let data: any = [];
                const objectArray = Object.values(resp.data.apis);
                objectArray.forEach((obj) => {
                    data.push(obj);
                })
                setDetail(data);
            } else {
                const data = resp.data.apis[Object.keys(resp.data.apis)[0]];
                setDetail(data);
            }
        } catch (error) {
            console.error('Error fetching providers:', error);
        }
    }

    return (
        <>
            {/* Backdrop */}
            {isOpen && <Backdrop onClick={closeSidebar} />}

            {/* Sidebar */}
            <SidebarContainer $isOpen={isOpen}>
                <Header>Select Provider</Header>

                {/* Menu Items */}
                {providers.map((item, index) => (
                    <MenuItemWrapper key={`menu_${index.toString()}`} $isOpen={expanded[item]}>
                        <div >
                            <MenuItem onClick={() => toggleMenu(item)}>
                                {item}
                                <ArrowIcon>
                                    <FontAwesomeIcon icon={expanded[item] ? faChevronUp : faChevronDown} />
                                </ArrowIcon>
                            </MenuItem>

                            {expanded[item] && (
                                <Expanded>
                                    {/* Sub-menu items */}
                                    {(detail && item !== 'amazonaws.com') && <Anchor onClick={() => { handleRedirect(`/provider-detail/${item}`) }}>
                                        <img src={detail && detail['info']['x-logo']['url']} height={25} width={25} />
                                        {detail && detail['info']['title']}
                                    </Anchor>}
                                    {(detail && item === 'amazonaws.com') && detail.map((obj: any, index: number) => {
                                        return <Anchor key={`anchor_${index.toString()}`} onClick={() => { handleRedirect(`/provider-detail/${item}?x-serviceName=${obj['info']['x-serviceName']}`) }}>
                                            <img src={obj && obj['info']['x-logo']['url']} height={25} width={25} />
                                            {obj && obj['info']['title']}
                                        </Anchor>
                                    })}
                                </Expanded>
                            )}
                        </div>
                    </MenuItemWrapper>
                ))}
            </SidebarContainer>
        </>
    );
};

export default memo(Sidebar);

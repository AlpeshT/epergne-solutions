import styled from 'styled-components';

// Sidebar Container
export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')}; 
  width: 380px;
  height: 100%;
  background-color: #495e79;
  color: white;
  padding: 20px;
  transition: right 0.3s ease;  /* Smooth sliding effect */
  z-index: 1000;
  overflow-y: auto; /* Ensure content doesn't overflow */
  border-left: 2px solid #0e98ff;
`;

// Backdrop
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);  /* Semi-transparent black */
  z-index: 999;  /* Just below the sidebar */
`;

export const MenuItemWrapper = styled.div<{ $isOpen: boolean }>`
  background-color: ${({ $isOpen }) => ($isOpen ? '#242E3C' : 'transparent')}; 
  border-radius: 5px; 
  padding: 10px 0px;
`;

export const Expanded = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 0px 10px;
  word-break: break-word;
  `;

export const Anchor = styled.button`
  all: unset;
  cursor: pointer;
  text-decoration: none;
  color: white;
  align-items: center;
  display: flex;
  column-gap: 10px;
  width: 100%;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  padding: 0px 10px 10px 10px;
  font-size: 16px;
  color: #fff;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;

export const ArrowIcon = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const Header = styled.h1`
font-size:  18px;
text-align: center;
font-weight: normal
`;

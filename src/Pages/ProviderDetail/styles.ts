import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #495e79; /* Background color */
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  padding: 50px;
`;

export const HeaderTitle = styled.div`
  font-size: 24px;
  color: #fff;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 80%;
  align-self: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  color: #fff;
  font-size: 10px;
  flex-direction: column;
`;

export const ContentTitle = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const ContentDesc = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  margin: 5px 0px;
  max-height: 350px; /* Set the max height for the container */
  overflow-x: hidden; /* Hide horizontal scrollbar */
  overflow-y: auto;  /* Show a vertical scrollbar if the content overflows */
`;

export const ContactTitle = styled.div`
  min-width: 50px;
  margin-right: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #00A1D5; /* Button color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

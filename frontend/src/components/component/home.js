import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

// Styled components for the table, monitor, and p elements
const Table = styled.div`
  width: 100%;
  height: 100px;
  background-color: #d4e5ff;
`;

const MonitorWrapper = styled.div`
  background: #050321;
  width: 100%;
  height: 130px;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.30);
`;

const Monitor = styled.div`
  width: 100%;
  height: 100px;
  background-color: #344151;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: inset 0px 5px 10px 2px rgba(0, 0, 0, 0.3);
`;

const MovingTextContainer = styled.div`
  width: 200%;
  animation: move 20s linear infinite; /* Adjust animation duration */
`;

const MovingText = styled.p`
  font-family: 'VT323', monospace;
  font-size: 80px; /* Adjust font size */
  position: relative;
  display: inline-block;
  color: #ebb55f;
`;

// Keyframes for the move animation
const move = `
  @keyframes move {
    from {
      transform: translateX(-0%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "In the middle of every difficulty lies opportunity. - Albert Einstein",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "It always seems impossible until it is done. - Nelson Mandela",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
];


const Home = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Select a random quote when the component mounts
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);
  return (
    <Box marginTop="50px">
      <Heading fontSize="5xl" color={"white"} marginBottom="20px">
        Welcome to{" "}
        <Text color="white" fontSize="6xl" fontFamily="Josefin Slab" fontWeight="bold">
          J o u r n a l - I t  😊
        </Text>
      </Heading>
      <Text fontSize="xl" color={"white"} fontStyle="italic">
        "Journaling is like whispering to one's self and listening at the same time."
      </Text>
      {/* <style>{move}</style>
      <Table className="table center">
        <MonitorWrapper className="monitor-wrapper center">
          <Monitor className="monitor center">
            <MovingTextContainer>
            <MovingText>{quote}</MovingText>
            </MovingTextContainer>
          </Monitor>
        </MonitorWrapper>
      </Table> */}
    </Box>
  );
};

export default Home;

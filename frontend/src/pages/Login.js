import {
  Container,
  Box,
  Text,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Button, 
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/authentication/login_page";
import SignUp from "../components/authentication/signup_page";

const LoginPage = () => {
  return (
    
    <Container>
      {/* <Link to = '/admin'>
      <Button
          variant="solid"
          bg="green.400"
          color="white"
          size="lg"
          borderRadius="full"
          _hover={{ bg: "green.500" }}
          position="absolute"
          top={3}
          right={3}
        >
          Admin Panel
        </Button>
        </Link> */}
      <Box
        d="flex"
        justifyContent="space-between" 
        alignItems="center"
        p={3}
        ps={40}
        bg="rgb(34, 34, 34)"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderColor="whitesmoke"
        borderWidth="1px"
      >
        <Text color={"white"} fontSize="2xl" fontFamily="Josefin Slab" fontWeight='bold'>
           J o u r n a l  -  I t
        </Text>
      </Box>
      <Box
        bg="rgb(34, 34, 34)"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color='white'
        marginBottom='40px'
      >
        <Tabs variant="soft-rounded">
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default LoginPage;

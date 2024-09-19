import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); 

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    try {
      const response = await fetch(isAdmin ? "http://localhost:3001/user/admin-login" : "http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.userId;
        localStorage.setItem("userId", userId);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(isAdmin ? "/admin/panel" : "/layout");
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: errorData.message || "Invalid User Name Or Password",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <VStack spacing="5px">
      

      <FormControl id="email" isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input
          placeholder="Enter Your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Checkbox
        isChecked={isAdmin}
        class="mt-2"
        onChange={(e) => setIsAdmin(e.target.checked)}
        style={{ alignSelf: "flex-start" }}
        fontWeight={"bold"}
      >
        Admin
      </Checkbox>
      <Button
        colorScheme="green"
        variant="outline"
        width={"100%"}
        style={{ margin: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        colorScheme="blue"
        variant="outline"
        width={"100%"}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("guest123");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login;
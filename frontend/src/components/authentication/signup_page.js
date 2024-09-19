import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submitHandler = async () => {
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            if(response.status == 400){
              Swal.fire({
                //icon: "error",
                title: "Email Already Exists!",
                text: "Try Siging In",
              });
            }
            if (response.ok) {
                const data = await response.json();
                const userId = data.userId;
                localStorage.setItem("userId", userId);
                console.log(data);
                navigate('/layout');
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
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
            <FormControl id="confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="green"
                variant='outline'
                width={"100%"}
                style={{ margin: 15 }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default SignUp;

import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Button, Flex } from "@chakra-ui/react";
import Swal from "sweetalert2";

export default function DisplayUsers() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const getRandomLightColor = () => {
    const letters = "BCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const regularUsers = data.filter(user => !user.isAdmin);
        const adminUsers = data.filter(user => user.isAdmin);
        setUsers(regularUsers);
        setAdmins(adminUsers);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteUser = (userId) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3001/user/${userId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            setUsers(users.filter(user => user._id !== userId));
            setAdmins(admins.filter(admin => admin._id !== userId));
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          } else {
            console.error("Failed to delete user");
            Swal.fire("Error!", "Failed to delete user.", "error");
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire("Error!", "An error occurred while deleting user.", "error");
        }
      }
    });
  };

  return (
    <VStack spacing="4" align="center">
      <Heading><Text fontFamily="Varela Round" color={"white"}>Users</Text></Heading>
      {users.map((user) => (
        <Box key={user._id} borderWidth="1px" width={"100%"} bg={getRandomLightColor()} borderRadius="lg" p="4">
          <Flex justifyContent="space-between" alignItems="center">
            <VStack spacing="2" align="flex-start">
              <Heading size="md">{user.name}</Heading>
              <Text>{user.email}</Text>
            </VStack>
            <Button colorScheme="red" onClick={() => deleteUser(user._id)}>Delete</Button>
          </Flex>
        </Box>
      ))}

      <Heading><Text fontFamily="Varela Round" color={"white"}>Admins</Text></Heading>
      {admins.map((admin) => (
        <Box key={admin._id} borderWidth="1px" width={"100%"} bg={getRandomLightColor()} borderRadius="lg" p="4">
          <Flex justifyContent="space-between" alignItems="center">
            <VStack spacing="2" align="flex-start">
              <Heading size="md">{admin.name}</Heading>
              <Text>{admin.email}</Text>
            </VStack>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
}

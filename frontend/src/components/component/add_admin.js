import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import Swal from "sweetalert2";

const AddAdminPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire("Error!", "Passwords do not match.", "error");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/user/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        Swal.fire("Success!", "Admin added successfully.", "success").then(() => {
          window.location.href = "/admin/panel"; // Navigate to '/admin/panel' after success
        });
      } else {
        const data = await response.json();
        Swal.fire("Error!", data.message || "Failed to add admin.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error!", "Failed to add admin.", "error");
    }
  };

  return (
    <VStack spacing="4" align="stretch" maxW="400px" m="auto">
      <FormControl>
        <FormLabel color={"white"}>Name</FormLabel>
        <Input type="text" value={name} color={"white"} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel color={"white"}>Email</FormLabel>
        <Input type="email" value={email} color={"white"} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel color={"white"}>Password</FormLabel>
        <Input type="password" value={password} color={"white"} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel color={"white"}>Confirm Password</FormLabel>
        <Input type="password" value={confirmPassword} color={"white"} onChange={(e) => setConfirmPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>Add Admin</Button>
    </VStack>
  );
};

export default AddAdminPage;
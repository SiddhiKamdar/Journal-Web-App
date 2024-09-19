import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const JournalEntry = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch("http://localhost:3001/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, title, entry, date }), 
      });

      if (response.ok) {
        toast({
          title: "Journal entry saved successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/layout/entries");
      } else {
        toast({
          title: "Failed to save journal entry",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="2" >
      <form onSubmit={handleSubmit}>
      <FormControl id="date" mb="4">
          <FormLabel color="white" fontFamily="Cedarville Cursive" fontSize="xl">date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            width="30%"
            color="whitesmoke"
          />
        </FormControl>
        <FormControl id="title" mb="4">
          <FormLabel color="white" fontFamily="Cedarville Cursive" fontSize="xl">title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            width="100%"
            height="10vh"
            color="whitesmoke"
          />
        </FormControl>

        <FormControl id="entry" mb="4">
          <FormLabel color="white" fontFamily="Cedarville Cursive" fontSize="xl">entry</FormLabel>
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={6}
            required
            width="100%"
            height="50vh"
            color="white"
          />
        </FormControl>

        

        <Button type="submit" colorScheme="blue">Save Entry</Button>
      </form>
    </Box>
  );
};

export default JournalEntry;

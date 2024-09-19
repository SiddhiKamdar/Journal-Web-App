import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, VStack, IconButton, Input } from "@chakra-ui/react";
import { FaTrash, FaHeart, FaCheck, FaEdit } from "react-icons/fa";

const getRandomLightColor = () => {
  const letters = "BCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

function FavoriteEntries() {
  const [entries, setEntries] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedEntry, setEditedEntry] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchEntries(userId);
    }
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const fetchEntries = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/entries/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const entriesWithColors = data.entries.map(entry => ({
          ...entry,
          color: getRandomLightColor()
        }));
        setEntries(entriesWithColors);
        const favoritesMap = {};
        entriesWithColors.forEach(entry => {
          favoritesMap[entry._id] = entry.isFavorite;
        });
        setFavorites(favoritesMap);
        setLoading(false); 
      } else {
        console.error("Failed to fetch entries");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteEntry = async (entryId) => {
    try {
      const response = await fetch(`http://localhost:3001/entries/${entryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEntries(entries.filter(entry => entry._id !== entryId));
      } else {
        console.error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleFavorite = async (entryId, isFavorite) => {
    try {
      const response = await fetch(`http://localhost:3001/entries/${entryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ propName: "isFavorite", value: !isFavorite }]),
      });
      const updatedEntries = entries.map(entry => {
        if (entry._id === entryId) {
          entry.isFavorite = !isFavorite;
          sessionStorage.setItem(entry._id, entry.isFavorite);
        }
        return entry;
      });
      setEntries(updatedEntries);
      if (response.ok) {
        const updatedFavorites = { ...favorites };
        updatedFavorites[entryId] = !isFavorite;
        setFavorites(updatedFavorites);
      } else {
        console.error("Failed to toggle favorite status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleEdit = (entryId) => {
    const entryToEdit = entries.find(entry => entry._id === entryId);
    setEditedTitle(entryToEdit.title);
    setEditedEntry(entryToEdit.entry);
    setEditMode(entryId);
  };

  const handleSaveEdit = async (entryId) => {
    try {
      const response = await fetch(`http://localhost:3001/entries/${entryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          { propName: "title", value: editedTitle },
          { propName: "entry", value: editedEntry }
        ]),
      });

      if (response.ok) {
        setEntries(entries.map(entry => entry._id === entryId ? { ...entry, title: editedTitle, entry: editedEntry } : entry));
        setEditMode(null);
      } else {
        console.error("Failed to save edit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCardClick = (entryId) => {
    if (!editMode) {
      handleEdit(entryId);
    }
  };

  const favoriteEntries = entries.filter(entry => sessionStorage.getItem(entry._id) === "true");


  if (loading) {
    return <Text color="white">Loading...</Text>;
  }
  
  console.log("Favorite Entries:", favoriteEntries);
  
  return (
    <VStack spacing="4">
      <Flex flexWrap="wrap" justifyContent="center">
        {favoriteEntries.length === 0 ? (
          <Box marginTop="100px"> 
            <Heading fontSize="5xl" color={"white"} marginBottom="20px">
              No Favorite Entries Found
            </Heading>
            <Text fontSize="xl" color={"white"} fontStyle="italic">
            Rediscover cherished moments ✨. Your favorites page holds the stories closest to your heart—each entry a treasure trove of memories and reflections. Mark your favorites ! 💖
            </Text>
          </Box>
        ) : (
          favoriteEntries.map((entry) => (
            <Box
              key={entry._id}
              p="4"
              borderWidth="1px"
              borderRadius="md"
              maxW="300px"
              m="2"
              h="300px"
              overflow="hidden"
              position="relative"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
              boxShadow="md"
              bg={entry.color}
              color="black"
            >
              {editMode === entry._id ? (
                <>
                  <Input mb="2" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                  <Input mb="2" value={editedEntry} onChange={(e) => setEditedEntry(e.target.value)} />
                  <IconButton
                    icon={<FaCheck />}
                    aria-label="Save Edit"
                    colorScheme="blue"
                    size="sm"
                    position="absolute"
                    bottom="4"
                    right="4"
                    onClick={() => handleSaveEdit(entry._id)}
                  />
                </>
              ) : (
                <>
                  <Heading size="md">
                    {entry.title}
                  </Heading>
                  <Box maxHeight="200px" overflowY="auto">
                    <Text overflow="hidden" textOverflow="ellipsis">{entry.entry}</Text>
                  </Box>
                  <Text position="absolute" bottom="4" left="4" fontFamily="Varela Round">
                    {entry.date}
                  </Text>
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete Entry"
                    colorScheme="red"
                    size="sm"
                    position="absolute"
                    bottom="4"
                    right="4"
                    onClick={() => deleteEntry(entry._id)}
                  />
                  <IconButton
                    icon={<FaEdit />}
                    aria-label="Edit Entry"
                    colorScheme="blue"
                    size="sm"
                    position="absolute"
                    bottom="4"
                    right="14"
                    onClick={() => handleCardClick(entry._id)}
                  />
                  <IconButton
                    icon={<FaHeart />}
                    aria-label="Toggle Favorite"
                    colorScheme={sessionStorage.getItem(entry._id) === 'true' ? "pink" : "gray"}
                    size="sm"
                    position="absolute"
                    top="4"
                    right="4"
                    onClick={() => toggleFavorite(entry._id, entry.isFavorite)}
                  />
                </>
              )}
            </Box>
          ))
        )}
      </Flex>
    </VStack>
  );
  
}

export default FavoriteEntries;

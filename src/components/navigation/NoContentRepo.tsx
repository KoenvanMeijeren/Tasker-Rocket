import { Box, Text } from '@chakra-ui/react';

const NoContentRepo = () => {
  return (
    <Box
      height="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Box p={6} border="1px solid #ccc" borderRadius="md">
        <Text fontSize="lg" mb={4}>
          No content repository is set right now, or the repository you set
          doesn't exist.
        </Text>
        <Text fontSize="md" mb={4}>
          Click on "Change content repository" in the top-left corner to change the current repo.
        </Text>
      </Box>
    </Box>
  );
};

export default NoContentRepo;

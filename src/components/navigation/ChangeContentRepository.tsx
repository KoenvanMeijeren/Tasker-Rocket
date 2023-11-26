import { useState } from 'react';
import { Box, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';

const ChangeContentRepository = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    onOpen();
  };

  const handleModalButtonClick = () => {
    // Trim 'github' from the URL input value
    const trimmedValue = inputValue.trim().replace(/^https?:\/\/github\.com\//, '');

    // Set item in local storage
    localStorage.setItem('repositoryName', trimmedValue);

    // Close modal and reload the page
    onClose();
    window.location.reload();
  };

  return (
    <Box>
      <Button onClick={handleButtonClick}
        colorScheme="green"
        variant="solid"
        borderRadius="md"
        borderWidth="1px">Change content repository</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter the new content repository</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Enter URL without 'github' in front"
              value={inputValue}
              onChange={handleInputChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleModalButtonClick}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChangeContentRepository;

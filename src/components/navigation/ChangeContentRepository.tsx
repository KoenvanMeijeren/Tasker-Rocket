import { SetStateAction, useState } from 'react';
import { Box, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';

const ChangeContentRepository = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    onOpen();
  };

  const handleModalButtonClick = () => {
    // Find the content repo URL -> Anything after github.com/
    const trimmedValue = inputValue.match(/github\.com\/(.*)/);
    const result = trimmedValue ? trimmedValue[1] : inputValue;

    // Set item in local storage
    localStorage.setItem('repositoryName', result);

    // Close modal and reload the page
    onClose();

    // Redirect to home page
    window.location.href = window.location.origin;
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

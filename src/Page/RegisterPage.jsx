import { Text, Button, Card, FormControl, FormLabel, Heading, Input, VStack, InputGroup, InputRightElement, IconButton, useToast, Image, Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { addDoc, doc, setDoc } from 'firebase/firestore';

const RegisterPage = () => {

    const navigate = useNavigate()
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [date, setDate] = useState(null)
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("User registered:", userCredential);
            const uid = userCredential.user.uid;
            const currentDate = new Date()
            const userData = {
                email: email,
                name: name,
                phoneNumber: phoneNumber, // Storing phone number as well
                date: currentDate
            };
            // const user = userCredential.user;
            await storeUserData(uid, userData);

            // Show success toast notification
            toast({
                title: "Registration successful.",
                description: "You have successfully registered!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            navigate("/login");
        } catch (error) {
            console.error("Error signing up : ", error);

            // Show error toast notification
            toast({
                title: "Registration failed.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const storeUserData = async (uid, userData) => {
        try {
            await setDoc(doc(db, "usersdata", uid), userData);
            console.log("User data stored successfully");
        } catch (error) {
            console.error("Error storing user data:", error);
        }
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <VStack w='100vw' h='auto' justifyContent={'center'}>
            <Card textAlign="center" w={'30%'} p='5'>
                <VStack w='100%'>
                    <Text fontSize='xl'>
                        Sign up
                    </Text>
                    <Text>
                        to enjoy all of our cool features ✌️
                    </Text>
                    <Image
                        w='100%'
                        borderRadius='full'
                        boxSize='150px'
                        src='https://cdni.iconscout.com/illustration/premium/thumb/sign-up-3391266-2937870.png?f=webp'
                        alt='Sign up'
                    />
                </VStack>

                <FormControl id="name" isRequired marginTop="4">
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </FormControl>
                <FormControl id="phone" isRequired marginTop="4">
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                        type="number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                </FormControl>
                <FormControl id="email" isRequired marginTop="4">
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <InputRightElement>
                            <IconButton
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                onClick={handlePasswordVisibility}
                                variant="ghost"
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    onClick={handleSubmit}
                    colorScheme="blue"
                    marginTop="6"
                    width="100%"
                    type="submit">
                    Sign up
                </Button>

                <Flex gap={3} align={'center'} mt={3} width="100%">
                    <Text>Already a user?</Text>
                    <Text
                        cursor='pointer'
                        _hover={{ color: 'blue' }}
                        onClick={() => navigate('/login')}>
                        Login
                    </Text>
                </Flex>
            </Card>
        </VStack>
    )
}

export default RegisterPage;

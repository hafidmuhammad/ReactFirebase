import { Box, Button, Card, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, Stack, Text,  Image, Flex, Spacer } from '@chakra-ui/react'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth} from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle, FcPhone } from 'react-icons/fc';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Login berhasil: ", user);
                navigate("/home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Login gagal:", errorCode, errorMessage);
            });
    };

    const LoginWithGoogle = (e) => {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then((res) => {
                console.log(res, "userData");
                navigate('/home');
            })
            .catch((err) => console.log(err, "error"));
    }

    const handleNavigate = (e) =>{
        console.log(e)
        navigate(e)
    }

    useEffect(() => {
        // auth.onAuthStateChanged((userData => {
        //     console.log(userData)
        // }))
    },[])

    return (

        <Stack
            w='100vw'
            h='100vh'
            margin="auto"
            justifyContent={'center'}
            align={'center'}
        >
            <Card w={'30%'} p={'5'}>
                <Box align={'center'}>
                    <Text fontWeight='bold' fontSize='lg'>Sign in to your account</Text>
                    <Image

                        borderRadius='full'
                        boxSize='150px'
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnQm8KtwSBoUBFUaheB5EDu-K3bXfsYZHHRUYpAO4gA&s'
                        alt='Dan Abramov'
                    />
                </Box>
                    <FormControl isRequired>
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
                    <Flex>
                        <Text
                            onClick={() => navigate('/register')}
                            m={3}
                            cursor='pointer'
                            _hover={{ color: 'blue' }}
                        >
                            Create Acount
                        </Text>
                        <Spacer />
                        <Text
                            onClick={() => navigate('/forgetpassword')}
                            m={3}
                            cursor='pointer'
                            _hover={{ color: 'blue' }}
                        >
                            Forget Password?
                        </Text>
                    </Flex>
                    <Button onClick={handleSubmit} colorScheme="blue" marginTop="20px" width="100%">
                        Sign in
                    </Button>

                <Button onClick={LoginWithGoogle} colorScheme="red" marginTop="10px" width="100%" justifyContent='center' gap={2}>
                    <FcGoogle /> Login With Google
                </Button>
                {/* <Button  colorScheme='green' marginTop="10px" width="100%" justifyContent='center' gap={2}> */}
                    <Link to='phone'>
                    <FcPhone /> 
                    <Text>Login With Phone</Text>
                    </Link>
                {/* </Button> */}

            </Card>
        </Stack >
    );
}

export default LoginPage;

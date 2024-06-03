import { FormControl, FormLabel, Input, Text, VStack, Button, Card } from '@chakra-ui/react'
import React, { useState } from 'react'
import { auth } from '../config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom'; // Import Link untuk membuat tombol kembali ke halaman login

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showLoginButton, setShowLoginButton] = useState(false);
    // State untuk mengontrol visibilitas tombol kembali ke login

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            setResetMessage("Password reset email sent successfully.");
            setErrorMessage("");
            setShowLoginButton(true);
        } catch (error) {
            setResetMessage("");
            setErrorMessage(error.message);
        }
    }

    return (
        <VStack h='100vh' w='100vw' justifyContent='center' alignItems='center'>
            <Card p='5' gap={5} w={'30%'} boxShadow="xl">
                <Text as='h1' fontSize='2xl'>Forgot your password ?</Text>
                <Text>You'll get an email with a reset link</Text>

                <FormControl isRequired >
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </FormControl>
                <Button onClick={handleSubmit} colorScheme="blue">Request Reset</Button>

                {resetMessage && <Text color="green">{resetMessage}</Text>}
                {errorMessage && <Text color="red">{errorMessage}</Text>}
                {/* Tombol kembali ke halaman login */}
                {showLoginButton && (
                    <Link to="/login">
                        <Button colorScheme="teal" marginTop="4">Back to Login</Button>
                    </Link>
                )}
            </Card>
        </VStack>
    )
}
export default ForgetPassword;

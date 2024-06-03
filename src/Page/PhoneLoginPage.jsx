import { Box, Button, Heading, Input, Stack, VStack, Text, Card, Center } from '@chakra-ui/react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { auth } from '../config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import TodoListTest from './TodoListTest';

const PhoneLoginPage = () => {
    const [phone, setPhone] = useState("")
    const [user, setUser] = useState(null)
    const [otp, setOtp] = useState("")
    

    const sendOtp = async() => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
            const confirmation = signInWithPhoneNumber(auth, phone, recaptcha)
            // console.log(confirmation)
            setUser(confirmation)
        }catch(err){
            console.error(err)
        }
        
    }

    const verifyOtp = async () => {
        try {
           await user.confirm(otp)
        } catch(err) {
         console.error(err)
        }
    }

    return (
        <Stack
            w='100vw'
            h='100vh'
            margin='auto'
            justifyContent='center'
            align={'center'}
        >
            <Card w='auto' p={5} gap={5} align={'center'} >
                <Text>Sign In dengan Nomor HP</Text>
                <Center>
                <PhoneInput
                    
                    country={'id'}
                    value={phone}
                    onChange={(phone) => setPhone ("+" + phone)}
                />
                <Button onClick={sendOtp} h={'100%'}>Send OTP</Button>
                </Center>
                <Box id='recaptcha'></Box>
                <Input onChange={(e) => setOtp(e.target.value)} placeholder='Enter Otp' w='auto' h='' />
                <Button onClick={verifyOtp} h={'100%'}>VERIFY OTP</Button>
            </Card>
            {/* <TodoListTest/> */}






        </Stack>
    );
};

export default PhoneLoginPage;

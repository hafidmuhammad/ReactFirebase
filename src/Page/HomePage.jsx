import React, { useState, useEffect } from 'react';
import { Box, Button, VStack, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Card } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc, query, limit, orderBy, startAfter, endBefore, limitToLast } from 'firebase/firestore';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const HomePage = () => {
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState("");
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [editId, setEditId] = useState("");
    const [users, setUsers] = useState([]);
    const [lastUser, setLastUser] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersCollectionRef = collection(db, "users");
    const navigate = useNavigate();

    // Fungsi untuk mendapatkan informasi pengguna yang saat ini login
    const userEmail = auth.currentUser ? auth.currentUser.email : "Guest";

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

    const columns = ['Name', 'Age', 'Action'];
    const pageSize = 5;

    const createUser = async () => {
        await addDoc(usersCollectionRef, { Name: newName, Age: parseInt(newAge) });
        onClose(); // Tutup modal setelah menambahkan pengguna
        setNewName(""); // Bersihkan input setelah menambahkan pengguna
        setNewAge(""); // Bersihkan input setelah menambahkan pengguna
    };

    // Fungsi untuk menghapus pengguna
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter(user => user.id !== id));
    };

    // Fungsi untuk mengupdate informasi pengguna
    const updateUser = async () => {
        await updateDoc(doc(db, "users", editId), { Name: editName, Age: parseInt(editAge) });
        onEditClose();
        setEditName("");
        setEditAge("");
    };

    // Mengambil data pengguna saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            const q = query(usersCollectionRef, orderBy("Name"), limit(pageSize));
            const data = await getDocs(q);
            const userData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUsers(userData);
            if (data.docs.length > 0) {
                setLastUser(data.docs[data.docs.length - 1]);
                setHasNextPage(data.docs.length === pageSize);
            }
        };

        fetchData();
    }, []);

    // Fungsi untuk logout pengguna
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/login'); // Arahkan kembali ke halaman login setelah logout
        });
    };

    // Fungsi untuk membuka modal edit dengan data pengguna yang dipilih
    const handleEditOpen = (user) => {
        setEditId(user.id);
        setEditName(user.Name);
        setEditAge(user.Age.toString());
        onEditOpen();
    };

    // Fungsi untuk memuat data halaman berikutnya
    const loadNextPage = async () => {
        if (lastUser) {
            const q = query(usersCollectionRef, orderBy("Name"), startAfter(lastUser), limit(pageSize));
            const data = await getDocs(q);
            const userData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUsers(userData);
            if (data.docs.length > 0) {
                setLastUser(data.docs[data.docs.length - 1]);
                setHasNextPage(data.docs.length === pageSize);
                setHasPreviousPage(true);
                setCurrentPage(currentPage + 1);
            }
        }
    };

    // Fungsi untuk memuat data halaman sebelumnya
    const loadPreviousPage = async () => {
        const q = query(usersCollectionRef, orderBy("Name"), endBefore(users[0]), limitToLast(pageSize));
        const data = await getDocs(q);
        const userData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUsers(userData);
        if (data.docs.length > 0) {
            setLastUser(data.docs[data.docs.length - 1]);
            setHasNextPage(true);
            setHasPreviousPage(currentPage > 2);
            setCurrentPage(currentPage - 1);
        }
    };

    if (!auth.currentUser) {
        navigate('/login');
        return null;
    }

    return (
        <VStack w='100vw' h='100vh' spacing={4}>
            <Box textAlign='center' size='80%'>
                <Heading as="h1" size="xl" marginBottom="4">
                    Welcome to Home Page
                </Heading>
                <Card p={5} m={5}>
                    <Box>Selamat Datang</Box>
                    <Box>{userEmail}</Box>
                </Card>
                <Button colorScheme='red' variant='outline' onClick={handleSignOut}>Sign Out</Button>
            </Box>

            <Box w='100%' align={'center'}>
                <Box w={'30%'} align='end'>
                    <Button onClick={onOpen} gap={2} colorScheme='blue'> <AddIcon /> Add New</Button>
                </Box>
                <Table variant='striped' colorScheme='teal' size={'sm'} w={'30%'} align='center' mt={3}>
                    <Thead>
                        <Tr>
                            {columns.map((column) => (
                                <Th key={column}>{column}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user) => (
                            <Tr key={user.id}>
                                <Td>{user.Name}</Td>
                                <Td>{user.Age}</Td>
                                <Td gap={5}>
                                    <Button onClick={() => deleteUser(user.id)} mr={2} colorScheme='red'><DeleteIcon /></Button>
                                    <Button onClick={() => handleEditOpen(user)} colorScheme='green'><EditIcon /></Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Box mt={4}>
                    {hasPreviousPage && <Button onClick={loadPreviousPage}>Previous</Button>}
                    {hasNextPage && <Button onClick={loadNextPage}>Next</Button>}
                </Box>
            </Box>

            {/* Modal Edit Dan Tambah Data  */}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="sm"
            >
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder='Name'
                                value={newName}
                                onChange={(event) => {
                                    setNewName(event.target.value);
                                }}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Age</FormLabel>
                            <Input
                                placeholder='Age'
                                value={newAge}
                                onChange={(event) => {
                                    setNewAge(event.target.value);
                                }}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={createUser} colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isEditOpen}
                onClose={onEditClose}
                size="sm"
            >
                <ModalContent>
                    <ModalHeader>Edit user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder='Name'
                                value={editName}
                                onChange={(event) => {
                                    setEditName(event.target.value);
                                }}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Age</FormLabel>
                            <Input
                                placeholder='Age'
                                value={editAge}
                                onChange={(event) => {
                                    setEditAge(event.target.value);
                                }}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={updateUser} colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onEditClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
};

export default HomePage;

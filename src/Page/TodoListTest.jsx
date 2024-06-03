import { Button, Checkbox, Input, Stack, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'

const TodoListTest = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [totalTasks, setTotalTasks] = useState(0);
    // State untuk menyimpan total tugas

    const inputRef = useRef(null);

    useEffect(() => {
    // Fokuskan input ketika komponen dipasang
        inputRef.current.focus();
    }, []);

    useEffect(() => {
    // Hitung jumlah total tugas setiap kali todos berubah
        setTotalTasks(todos.length);
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };


    return (
        <VStack mt={8} spacing={4}>
            <Input
                ref={inputRef}
                placeholder="Tambahkan todo baru"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button onClick={addTodo}>Tambahkan</Button>
            <Stack spacing={2} width="100%">
                {todos.map((todo, index) => (
                    <Stack direction="row" alignItems="center" key={index}>
                        <Checkbox
                            isChecked={todo.completed}
                            onChange={() => toggleTodo(index)}
                        />
                        <Text textDecoration={todo.completed ? 'line-through' : 'none'}>
                            {todo.text}
                        </Text>
                        <Button onClick={() => removeTodo(index)} size="xs">Hapus</Button>
                    </Stack>
                ))}
            </Stack>
            <Text>Jumlah Total Tugas: {totalTasks}</Text>
        </VStack>
    )
}

export default TodoListTest
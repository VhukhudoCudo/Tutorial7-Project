import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));

        const q = query(collection(db, 'todos'), where('userId', '==', auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setTodos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
      }
    };

    fetchUserData();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (editId) {
        await updateDoc(doc(db, 'todos', editId), {
          text: input,
          timestamp: serverTimestamp(),
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, 'todos'), {
          text: input,
          userId: auth.currentUser.uid,
          timestamp: serverTimestamp(),
        });
      }
      setInput('');
    }
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const editTodo = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Redirect to the login page or desired route
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container">
      <h2>Todo List</h2>
      <button onClick={handleLogout}>Log Out</button>
      <form onSubmit={addTodo}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a todo" />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>
      <br />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

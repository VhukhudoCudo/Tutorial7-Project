// import React, { useState, useEffect } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";

// const Recipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [newRecipe, setNewRecipe] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");

//   const recipesCollection = collection(db, "recipes");

//   const fetchRecipes = async () => {
//     const data = await getDocs(recipesCollection);
//     setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   };

//   const addRecipe = async () => {
//     if (newRecipe.trim()) {
//       await addDoc(recipesCollection, { title: newRecipe });
//       setNewRecipe("");
//       fetchRecipes();
//     }
//   };

//   const deleteRecipe = async (id) => {
//     await deleteDoc(doc(db, "recipes", id));
//     fetchRecipes();
//   };

//   const startEdit = (id, title) => {
//     setEditId(id);
//     setEditTitle(title);
//   };

//   const saveEdit = async () => {
//     if (editTitle.trim()) {
//       await updateDoc(doc(db, "recipes", editId), { title: editTitle });
//       setEditId(null);
//       setEditTitle("");
//       fetchRecipes();
//     }
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setEditTitle("");
//   };

//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   return (
//     <div>
//       <h1>Recipes</h1>
//       <input
//         type="text"
//         placeholder="New Recipe"
//         value={newRecipe}
//         onChange={(e) => setNewRecipe(e.target.value)}
//       />
//       <button onClick={addRecipe}>Add Recipe</button>
//       <ul>
//         {recipes.map((recipe) => (
//           <li key={recipe.id}>
//             {editId === recipe.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                 />
//                 <button onClick={saveEdit}>Save</button>
//                 <button onClick={cancelEdit}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 {recipe.title}
//                 <button onClick={() => startEdit(recipe.id, recipe.title)}>
//                   Edit
//                 </button>
//                 <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Recipes;


import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  const recipesCollection = collection(db, "recipes");
  const auth = getAuth();

  const fetchRecipes = async () => {
    const data = await getDocs(recipesCollection);
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addRecipe = async () => {
    if (newRecipe.trim()) {
      await addDoc(recipesCollection, { title: newRecipe });
      setNewRecipe("");
      fetchRecipes();
    }
  };

  const deleteRecipe = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
    fetchRecipes();
  };

  const startEdit = (id, title) => {
    setEditId(id);
    setEditTitle(title);
  };

  const saveEdit = async () => {
    if (editTitle.trim()) {
      await updateDoc(doc(db, "recipes", editId), { title: editTitle });
      setEditId(null);
      setEditTitle("");
      fetchRecipes();
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Redirect to the login page or desired route
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Grocery List</h1>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Log Out
      </button>
      <input
        type="text"
        placeholder="New Item"
        value={newRecipe}
        onChange={(e) => setNewRecipe(e.target.value)}
      />
      <button onClick={addRecipe}>Add</button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {editId === recipe.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {recipe.title}
                <button onClick={() => startEdit(recipe.id, recipe.title)}>
                  Edit
                </button>
                <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;




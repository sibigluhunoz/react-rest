import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState()

  useEffect(() => {
    getUsers()
  },[])

  const getUsers = () => {
    fetch("https://kv63mr-3000.csb.app/users")
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => console.log(err))
  }
//post
  const createNewUser = () => {
    fetch("https://kv63mr-3000.csb.app/users", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: newUser
      })
    })
    .then(res => res.json())
    .then(data => getUsers())
    .catch(err => console.log(err))
  }

  //delete
  const deleteUser = (userId) => {
    fetch(`https://kv63mr-3000.csb.app/users/${userId}`, {
      method: "DELETE",
    })
      .then(data => getUsers())
      .catch(err => console.log(err))
  }



  // const getUsers = async () => {
  //   try {
  //     const res = await fetch("https://kv63mr-3000.csb.app/users")
  //     const data = await res.json()
  //     setUsers(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
  return (
    <div className="App">
      {
        users.map(({id, name}) => {
          return(
            <div key={id}>
              <span>{name}</span><button style={{backgroundColor:"red", padding:"0"}} onClick={() => deleteUser(id)}>Delete</button>
            </div>
          )
        })
      }
      <h2>Create new user</h2>
      <input type="text" onChange={(event) => setNewUser(event.target.value)}/>
      <button onClick={createNewUser}>Kreiraj</button>
    </div>
  )
}

export default App

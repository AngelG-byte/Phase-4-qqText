import React, { useState, useEffect } from "react"
import Signup from "./components/SignUp";
import Messages from "./routes/Messages"
import { Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Login from "./routes/Login";
import Feed from "./routes/Feed"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet, } from "react-router-dom";
import SignOut from "./routes/SignOut";
// import './App.css'
// import { useNavigate } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState([])
  const [currentRoom, setCurrentRoom] = useState([])
  const [chats, setChats] = useState([])



  useEffect(() => {
    fetch("/me")
      .then(res => {
        if (res.ok) {
          res.json()
            .then(data => {
              setUser(data)
            })
        } else {
          // navigate('/signup')
        }
      })
  }, [])

  // useEffect(() => {
  //   fetch("/chats")
  //   .then( res => {
  //     if (res.ok) {
  //       res.json()
  //       .then( data => {
  //         setChats( data )
  //         console.log(chats);
  //       })
  //     }
  //   } )
  // }, [])
  const AppLayout = () => (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Login setUser={setUser} />} />
        <Route path="/feed" element={<Feed user={user} />} />
        <Route path="/messages" element={<Messages currentRoom={currentRoom} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<SignOut />} />
      </Route>
    ))


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

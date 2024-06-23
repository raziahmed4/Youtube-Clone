

import React , {useState} from 'react'
import Navbar from './Component/Navbar/Navbar' 
import Sidebar from './Component/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'



function App() {


  const[sidebar,setSidebar]= useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      
    
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video/>} />

      </Routes>
    
     </div>
  )
}

export default App
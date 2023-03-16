import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';

import {Header} from './components/header.js';
import {Admin} from './pages/admin.js';
import {Home} from './pages/home.js';
import {Outils} from './pages/outils.js';
import {SignIn} from './pages/signIn.js';
import {DetailOutil} from '../src/pages/detailOutil.js';
import {Portofolio} from './pages/portofolio.js';
import {Contacts} from './pages/contacts.js';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CustomerType } from './types/CustomerType';
import { CreneauType } from './types/CreneauType';
import { OutilType } from './types/OutilType';



//

function App() {

  // const [customerList, setCustomerList] = useState<CustomerType[]>([]);
  // useEffect(() => {
  //   fetch('http://localhost:3005/api/customers').then(response => response.json()).then(json => setCustomerList(json));
  // }, []);

  // console.log("customerList", customerList);
  
  
  const [outilList, setOutilList] = useState<OutilType[]>([]);
  useEffect(() => {
    fetch('https://api-solec-l8wc.onrender.com/api/outils').then(response => response.json()).then(json => setOutilList(json));
  }, []);
  
  console.log("outilListeuh", outilList);

  // const nouveauUser =
  // {
  //   name: "userPost",
  //   industry: "c'est incroyable"
  // };
  // const lol ={};

  //postData('http://localhost:3005/api/customers', nouveauUser, lol);

  return (
    <BrowserRouter>
    {/* <listOutilsContext.Provider value={[outilList, setOutilList]}> */}
        <Header/>
        <main className="d-flex align-items-stretch" style={{"minHeight": "100vh"}}>
          <div id='navbar fictive'>
            <span className='text-dark text-opacity-25'>ooooooooooooooooooooooooooooooo</span>
          </div>
          <div className="w-100 m-5 p-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/portofolio" element={<Portofolio />} />
              <Route path="/outils" element={<Outils outilList={outilList}/>} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/outils/:id" element={<DetailOutil outilList={outilList}/>} />
            </Routes>
          </div>
        </main>
      {/* </listOutilsContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;

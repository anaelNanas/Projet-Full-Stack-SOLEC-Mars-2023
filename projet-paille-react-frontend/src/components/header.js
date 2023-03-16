//import logo from '../logo Solec.PNG';
import { Link } from 'react-router-dom';

import { useContext } from 'react';

const menus = [
    {
      name: 'Accueil',
      url: '/',
    },
    {
      name: 'Mes Chantiers',
      url: '/portofolio',
    },
    // {
    //   name: 'Admin',
    //   url: '/admin',
    // },
    {
      name: 'Outils',
      url: '/outils',
    },
    {
      name: "S'inscrire",
      url: '/signIn',
    },
    {
      name: "Me Contacter",
      url: '/contacts',
    }
  ];


export const Header = () =>
{
  const navItems = menus.map(menu => 
  {
      return (
          <li className="nav-item my-3" key={menu.name}>
              <Link className="nav-link active text-white text-center fw-bold bg-dark bg-opacity-25" aria-current="page" to={menu.url} style={{border: '6px dashed'}} ><span className='p-2'>{menu.name}</span></Link>
          </li>
          
      );
  });

  return (
    <header className="App-header d-flex flex-column justify-content-between align-items-center">
      <img src={"https://perso.isima.fr/~ancourjaud/Photos%20pour%20le%20projet%20paille/logo%20Solec.PNG"} alt="logo" width="180" className="navbar-brand mx-5 mt-5 rounded" href="#" />
      {/* <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div> */}
      <ul className="navbar-nav flex-grow-1 d-flex flex-column justify-content-end mx-5 mb-2">
        {navItems}
      </ul>
    </header>
  );
};



        {/* </nav> */}
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav> */}
{/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav> */}



{/* //Pareil mais en plus "sale"

// export const Header = () =>
// { */}
//     return (
//         <header className="App-header">
//             <nav className="navbar navbar-light bg-light w-100 d-flex walign-items-center">
//                 <img src={logo} alt="logo" width="120" className="navbar-brand mx-5" href="#" />
//                 <ul className="navbar-nav flex-grow-1 d-flex flex-row justify-content-end mx-5 mb-2">
//                 {
//                     menus.map(menu => 
//                     {
//                         return (
//                             <li className="nav-item mx-3" key={menu.name}>
//                                 <a className="nav-link active" aria-current="page" href={menu.url} >
//                                      {
//                                          menu.name
//                                      }
//                                  </a>
//                             </li>
//                         );
//                     })
//                 }
//                 </ul>
//             </nav>
//         </header>
//     );
// };

  
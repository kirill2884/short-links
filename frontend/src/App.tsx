import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator from './components/navigators/Navigator';
import navConfig from './config/nav.json'
import CreateShortLink from './components/pages/CreateShortLinks';
import Analitics from './components/pages/Analytics';
import ShortLinks from './components/pages/ShortLinks';

function getMenuItem():string[][]{

        return navConfig.nav
    }

const App: React.FC = () => {

const menuItems = useMemo(() => getMenuItem(), [])

  return  <BrowserRouter>
            <Routes>    
            <Route path ='/' element = {<Navigator navItem={menuItems}/>}>
                <Route path="create-short-link" element = {<CreateShortLink></CreateShortLink>}/>
                <Route path="analitics" element = {<Analitics></Analitics>}/>
                <Route path="short-links" element = {<ShortLinks></ShortLinks>}/>
              </Route>
            </Routes>
          </BrowserRouter> 
                  
}

export default App;

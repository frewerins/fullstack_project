import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';
import ToDoList from './MasterFolder';
import Calendar from './Calendar';
import {Context} from "../context";
import "../style/header.css";
import AddItem from './AddItem';
import PagesList from './PagesList';
import { createPage } from '../services/BackApi';

function App() {

    return (
        /*<div>
            <nav>
                <a href='/'>блабла</a>
                <a href='/about'>хехех</a>
            </nav>
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/' component={About}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
            <h1>епта</h1>
            <Article title={'нанана лалала'}></Article>
            <Article/>
            <Article></Article>
            <Article></Article>
            <Article></Article>
        </div>*/
       <div class="home">
            <div class="header">
            <nav>
                <a class="header_link" href='/'>Основная страничка</a>
                <a class="header_link" href='/about'>Как все работает</a>
            </nav>
            </div>
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/about' component={About}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App
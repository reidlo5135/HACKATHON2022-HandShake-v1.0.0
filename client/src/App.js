import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Main from "./component/Main";
import Tutorial from "./component/Tutorial";
import Select from "./component/Select";
import {AnimatePresence} from "framer-motion";

export default function App(){
    return (
        <div className='App'>
            <AnimatePresence>
                <Switch>
                    <Route exact path = '/' component={Main}/>
                    <Route path = '/tutorial' component={Tutorial}/>
                    <Route path = '/select' component={Select}/>
                </Switch>
            </AnimatePresence>
        </div>
    );
}
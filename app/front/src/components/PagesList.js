import React, {useContext} from 'react';
import '../style/folder.css';
import '../style/descr.css';
import {Context} from "../context";
import {onDragOver, onDrop} from "../actions/drag.js";
import AddItem from './AddItem';
import ToDoItem from './ToDoItem';
import Page from './Page';
import {createPage, getPages} from '../services/BackApi.js';
import AddPage from './AddPage';
import '../style/pagesList.css';

function PagesList(props) {
    let {pages} = props;
    return(
        <div>
            <AddPage/>
            <div class="pagesList">
                {pages.map(item => <Page title={item.title} id={item.id}/>)}
            </div>
        </div>
        
        
    )
}
export default PagesList
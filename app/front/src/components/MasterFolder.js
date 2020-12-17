import React, {useState} from 'react';
import ToDoItem from './ToDoItem';
import AddItem from './AddItem';
import '../style/list.css';
import {onDragOver, onDrop} from "../actions/drag.js";

function MasterFolder(props) {
    const {title, list} = props;
    return(
        <div className="master_folder" onDragOver={onDragOver} onDrop={onDrop}>
            <p>{title}</p>
        {list.map(item => <ToDoItem item={item}/>)}
        </div>
    )
}
export default MasterFolder
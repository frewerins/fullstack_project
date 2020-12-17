import React, {useContext} from 'react';
import '../style/folder.css';
import '../style/descr.css';
import {Context} from "../context";
import {onDragOver, onDrop} from "../actions/drag.js";
import AddItem from './AddItem';
import ToDoItem from './ToDoItem';

function Folder(props) {
    const {title, list} = props;
    return(
        <div className="folder" onDragOver={onDragOver} onDrop={onDrop}>
            <div>папка</div>
        {list.map(item => <ToDoItem item={item} />)}
        </div>
    )
}
export default Folder
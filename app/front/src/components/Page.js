import React, {useContext} from 'react';
import '../style/folder.css';
import '../style/descr.css';
import {Context} from "../context";
import {onDragOver, onDrop} from "../actions/drag.js";
import AddItem from './AddItem';
import ToDoItem from './ToDoItem';
import { deletePageBack, getPageById } from '../services/BackApi';

function Page(props) {
    const {id, title} = props;
    const {deletePage, changeCurrentPage} = useContext(Context);
    const {changeAllItems} = useContext(Context);

    function drop(event) {
        event.preventDefault();
        deletePageBack(id);
        deletePage(id);
    }
    function goToPage(event) {
        event.preventDefault();
        let response = getPageById(id);
        response.then(data => {
            console.log(data);
            changeCurrentPage(data.id, data.title);
            changeAllItems(data.items);
        });
        
    }

    document.getElementById("addItem").style.display = "inline-block";
    return(
        <div class="pageItem">
            <button onClick={goToPage}>{title}</button>
            <button page_id={id} onClick={drop}>х</button>
        </div>
    )
}
export default Page
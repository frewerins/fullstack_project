import React, {useContext} from 'react';
import '../style/item.css';
import ToDoItem from './ToDoItem';
import {Context} from "../context";
import "../style/addItem.css";
import { cleanup } from '@testing-library/react';
import { createPage } from '../services/BackApi';
import {createItem} from '../services/BackApi'

function AddItem(props) {
    const pageId = props.pageId;
    const {addItem} = useContext(Context);
    let newTitle = "";
    let newLink = "";
    let newDescr = "";
    function CleanAfterAdd() {
        document.getElementById("title").value = ""; 
        document.getElementById("link").value = ""; 
        document.getElementById("link").style.display = "none";
        document.getElementById("title").style.display = "none";
        document.getElementById("title").style.display = "none";
        document.getElementById("addNewItemBtn").style.display = "none";
        document.getElementById("addBtn").style.display = "block";
        document.getElementById("link").value = "";
    }

    function AddItemHandler(event) {
        if (event.key === 'Enter') {
            addItem("", event.target.value);
            CleanAfterAdd();
        }
    }

    function AddItemHandlerOnClick(event) {
        //addItem(newTitle, newLink, newDescr);
        event.preventDefault();
        let response = createItem({"title": newTitle, "link": newLink, "descr": newDescr, "page": pageId});
        response.then(data => {
            console.log(data);
            addItem(data.id, data.title, data.link, data.descr, data.pageId)
        });
        CleanAfterAdd();
    }
    
    function firstAddItem(event) {
        event.target.style.display = "none";
        document.getElementById("link").style.display = "block";
        document.getElementById("title").style.display = "block";
        document.getElementById("addNewItemBtn").style.display = "block";
    }

    return(
        <div class="addItem" id="addItem">
            <button id="addBtn" class="addBtn" onClick={firstAddItem}>+</button>
            <form onSubmit={AddItemHandlerOnClick}>
                <input onChange={event => newTitle = event.target.value} placeholder="название" id="title" class="formAddItem"></input>
                <input onChange={event => newLink = event.target.value} placeholder="вставьте ссылку" id="link" class="formAddItem"></input>
                <button id="addNewItemBtn">добавить</button>
            </form>
        </div>
    )
}
export default AddItem
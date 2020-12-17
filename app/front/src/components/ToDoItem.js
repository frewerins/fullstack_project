import React, {useContext} from 'react';
import '../style/item.css';
import '../style/descr.css';
import {Context} from "../context";
import {onDragStart} from '../actions/drag.js';
import { waitForDomChange } from '@testing-library/react';
import {deleteItemBack} from '../services/BackApi.js';

function openMenu(event) {
    const menu = event.target;
    const item = menu.parentNode;
    item.childNodes[3].style.display = "block";
    menu.style.display = "none";
}

function closeMenu(event) {
    const menu = event.target;
    const item = menu.parentNode.parentNode;
    item.childNodes[3].style.display = "none";
    item.childNodes[1].style.display = "block";
}

function deleteItemWithAll(event, id, deleteItem) {
    event.preventDefault();
    deleteItemBack(id);
    deleteItem(id);
    // let item = event.target.parentNode.parentNode.parentNode;
    // item.childNodes[2].style.display = "none";
    // item.childNodes[0].style.display = "block";
}

function ChangeItem(event, id, changeItem) {
    changeItem(id, document.getElementById("title").value, 
    document.getElementById("link").value, 
    document.getElementById("descr").value);
}

function ToDoItem(props) {
    let {id, title, descr, link} = props.item;
    let title_b = title, descr_b = descr, link_b = link;
    if (!descr) {
        descr_b = "описание";
    }
    if (!title) {
        title_b = "название";
    }
    if (!link) {
        link_b = "ссылочка";
    }
    const {deleteItem, changeItem} = useContext(Context);
    function autoCopy() {
        document.execCommand("copy", false, link);
      }

      document.getElementById("addItem").style.display = "inline-block";

    return(
        <div>
        <div id={id} className="item" draggable='false' onDragStart={onDragStart}>
            <form action={link} target="_blank">
                <button className="itemHiddenBtn"></button>
            </form>
            <button draggable='false' onClick={ openMenu } className="menu" >?</button>
            <p className="title_in_item" draggable='false'>{title}</p>
            <div className="descr" draggable='false'>
                <button className="deleteInfoBtn" onClick={closeMenu}>ᳵ</button>
                <div className="info">
                    <input className="formAddItem" placeholder={title_b}></input>
                    <input className="formAddItem" placeholder={link_b}></input>
                    <button className="deleteBtn" onClick={(event) => deleteItemWithAll(event, id, deleteItem)}>удалить</button>
                </div>
            </div>
        </div>
        </div>
    )
}
export default ToDoItem
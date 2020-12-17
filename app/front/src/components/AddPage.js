import React, {useContext} from 'react';
import '../style/item.css';
import ToDoItem from './ToDoItem';
import {Context} from "../context";
import "../style/addItem.css";
import { cleanup } from '@testing-library/react';
import { createPage } from '../services/BackApi';
import {createItem} from '../services/BackApi';

function AddPage(props) {
    const {addPage} = useContext(Context);
    let newTitle = "";
    let def = "-";

    function AddPageHandlerOnClick(event) {
        if (!newTitle) {
            newTitle = def;
        }
        event.preventDefault();
        let response = createPage({"title": newTitle});
        response.then(data => addPage(data.id, data.title));
        document.getElementById("addItem").style.display = "inline-block";
    }

    return(
        <div class="addItem addPage" id="addPage">
            <form onSubmit={AddPageHandlerOnClick}>
                <input onChange={event => newTitle = event.target.value} placeholder="название папки" class="formAddItem"></input>
                <button>добавить</button>
            </form>
        </div>
    )
}
export default AddPage
import React, {useState, useEffect} from 'react';
import AddItem from './AddItem';
import MasterFolder from "./MasterFolder";
import PagesList from './PagesList';
import {Context} from "../context";
import Folder from "./Folder";
import { createStore } from "redux";
import "../style/page.css";
import {createItem, createPage, getPageById} from "../services/BackApi.js";

//const store = createStore(reducer)

function Home() {
    const [data, setList] = useState([]);

    useEffect(() => {
        const raw = localStorage.getItem('data') || '[]';
        setList(JSON.parse(raw));
    }, []);

    useEffect(() => 
    localStorage.setItem('data', JSON.stringify(data)), [data]);
        

    const addItem = (id, title, link, descr, pageId) => { setList([...data, 
        {
            id: id,
            title: title ,
            link: link,
            descr: descr,
            pageId: pageId
        }])
    }

    const changeItem = (id, title, link, descr, pageId) => setList(
        data.map(elem => {
            if (elem.id === id) {
                elem.title = title;
                elem.link = link;
                elem.descr = descr;
                elem.pageId = pageId;
            }
            return elem
        })
    )
    const changeAllItems = (data) => setList(data)

    const deleteItem = (id) => setList(
        data.filter(elem => elem.id !== id)
    )

    const [pages, setPage] = useState([]);

    useEffect(() => {
        const raw = localStorage.getItem('pages') || '[]';
        setPage(JSON.parse(raw));
    }, []);

    useEffect(() => 
    localStorage.setItem('pages', JSON.stringify(pages)), [pages]);
        

    const addPage = (id, title) => { setPage([...pages, 
        {
            id: id,
            title: title
        }])
        changeCurrentPage(id, title)
    }

    const changePage = (id, title) => setPage(
        pages.map(elem => {
            if (elem.id === id) {
                elem.title = title;
            }
            return elem
        })
    )
    const deletePage = (id) => setPage(
        pages.filter(elem => elem.id !== id)
    )


    const [currentPage, setCurrentPage] = useState([{"id": 1, "title": ""}]);

    useEffect(() => {
        const raw = localStorage.getItem('currentPage') || '[]';
        setCurrentPage(JSON.parse(raw));
    }, []);

    useEffect(() => 
    localStorage.setItem('currentPage', JSON.stringify(currentPage)), [currentPage]);
        

    const changeCurrentPage = (id, title) => {setCurrentPage(
        currentPage.map(elem => {
            elem.id = id;
            elem.title = title;
            return elem
        }))
    }
    
    return (
        <Context.Provider value={{addPage, changePage, deletePage, changeCurrentPage, addItem, changeItem, deleteItem, changeAllItems}}>
        <div>
            <div class="header">
                <PagesList pages={pages}/>
            </div>
            <div class="page">
            <div class="page_menu">
                 <h1 class="page_header">{currentPage[0].title}</h1>
                <AddItem pageId={currentPage[0].id}/>
            </div>
            <MasterFolder master="true" list={data}/>
        </div>
        </div>
        </Context.Provider>
    )
}

export default Home
import React, { useEffect, useState } from 'react'

const fromlocalstorage = ()=>{
    const listt = localStorage.getItem("mytodolist") 
    if (listt){
        return JSON.parse(listt)
    }
    else{
        return[]
    }
}

const Todo = () => {
    const [inputitem, setInputitem] = useState("")
    const [addeddata, setAddeddata] = useState(fromlocalstorage())
    const [edititemid, setEdititemid] = useState(null)
    const [condi, setCondi] = useState(false)
    const aditem = () => {
        if (!inputitem) {
            alert('Plz add item in todo list')
        }
        else if (inputitem && condi) {
            setAddeddata(addeddata.map((curElem) => {
                if (curElem.id === edititemid) {
                    return { ...curElem, name: inputitem }
                }
                return curElem
            }))
            setInputitem('')
            setEdititemid(null)
            setCondi(false)
        }
        else {
            const newaddeddata = {
                id:new Date().getTime().toString(),
                name:inputitem
            }
            setAddeddata([...addeddata, newaddeddata])
            setInputitem('')
        }
    }
    
    const delfun = (index)=>{
        const updatedlist = addeddata.filter((cur)=>{
            return cur.id!==index
        })
        setAddeddata(updatedlist)
        setEdititemid(updatedlist.id)
    }

    const editfun = (index)=>{
        const edititem = addeddata.find((curr)=>{
            return curr.id===index 
        })
        setInputitem(edititem.name)
        setCondi(true)
        setEdititemid(index)

    }
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(addeddata))
    },[addeddata])
    return (
        <>
            <body class="container my-5">
                <form class="form-signin">
                    <div class="text-center mb-4">
                        <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                        <h1 class="h3 mb-3 font-weight-normal">ToDo List</h1>

                    </div>

                    <div class="form-label-group">

                        <input type="text" id="intext" class="form-control" placeholder="Add Here" required="" autofocus="" fdprocessedid="8jprgm" value={inputitem} onChange={(e) => { setInputitem(e.target.value) }} /> <span>

                            <button class="btn btn-primary my-2" onClick={(event) => {
                                aditem();
                                event.preventDefault();
                            }
                            }>Add</button>
                        </span>
                    </div>

                </form>

                {
                    addeddata.map((cur) => {
                        return (
                            <div class="media text-muted pt-3">
                                <img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_187d15b93e3%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_187d15b93e3%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.541290283203125%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                                <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div class="d-flex justify-content-between align-items-center w-100">
                                        <strong class="text-gray-dark">{cur.name}</strong>
                                        <a href='#'onClick={()=>{editfun(cur.id)}}>Edit</a>
                                        <a href='#' onClick={()=>{delfun(cur.id)}}>Delete</a>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }





            </body>
        </>
    )
}

export default Todo
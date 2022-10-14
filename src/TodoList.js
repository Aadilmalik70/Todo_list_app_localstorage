import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
const getData = () => {
    const data = localStorage.getItem("tasks");
    if (data) {
        return JSON.parse(localStorage.getItem("tasks"))
    } else {
        return [];
    }
}
const TodoList = () => {
    const [task, setTask] = useState([{
        Title: undefined,
        Desc: undefined,
        StartDate: undefined,
        EndDate: undefined,
        CreatorName: undefined
    }])
    const [items, setItems] = useState(getData);

    const handelChange = (e) => {
        setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handelClick = (e) => {
        e.preventDefault();
        const date = new Date()
        task[0].StartDate = date
        if (task) {
            setItems([...items, { task }])
        }
       
        console.log(task)
    }
    const handelDelete = (id) => {
        const updatedItems = items.filter((item, index) => {
            return index !== id;
        })
        setItems(updatedItems)
    }
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(items))
    })
    return (
        <div style={{ backgroundColor: "#f5f5f5" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px", marginTop: "3rem" }}>
                <h1>Todo List</h1>
                <div style={{ backgroundColor: "white", width: "50%", padding: "30px", borderRadius: "5px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                        <label>Title :</label>
                        <input type="text" onChange={(e) => handelChange(e)} name="Title" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                        <label>Description :</label>
                        <input type="text" onChange={(e) => handelChange(e)} name="Desc" />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                        <label>Creator name :</label>
                        <input type="text" onChange={(e) => handelChange(e)} name="CreatorName" />
                    </div>
                    {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                        <label>Start date :</label>
                        <input type="Date" onChange={(e) => handelChange(e)} name="StartDate" />
                    </div> */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                        <label>End date :</label>
                        <input type="Date" onChange={(e) => handelChange(e)} name="EndDate" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" ,marginTop:"20px"}}>

                        <Button variant="outlined" onClick={e => handelClick(e)}>Add task </Button>
                    </div>
                </div>

            </div>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "15px" }}>
                {
                    items && items.map((val, i) => {
                        return (
                            <div key={i} style={{ backgroundColor: "white", width: "50%", padding: "30px", borderRadius: "5px", gap: "5px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <h1>{val.task.Title}</h1>
                                    <Button variant="outlined" onClick={() => handelDelete(i)}>Delete</Button>
                                </div>
                                <h4>{val.task.Desc}</h4>
                                <h4>{val.task.EndDate}</h4>
                                <h4>{val.task.StartDate}</h4>
                                <h4>{val.task.CreatorName}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default TodoList
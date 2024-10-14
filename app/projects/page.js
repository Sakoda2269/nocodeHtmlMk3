"use client"

import Popup from "@/components/popup";
import Link from "next/link";
import { useEffect, useState } from "react"
import styles from "./page.module.css";

export default function Projects(){

    const [projects, setProjects] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState("");

    useEffect(() => {
        const getProjects = async () => {
            const res = await fetch("/api/projects", {method: "GET"});
            setProjects(await res.json())
        };
        getProjects();
    }, []);

    const createPrject = async () => {
        const res = await fetch("/api/projects", {
            method: "POST", 
            body: JSON.stringify({title: newProjectTitle}), 
            headers: {
                'Content-Type': 'application/json'
            }});
        const json = await res.json();
        const newId = json.id;
        setProjects([...projects, {_id: newId, title: newProjectTitle}]);
        setFormOpen(false);
        setNewProjectTitle("");
    }

    return (
        <div>
            <div className="row" style={{margin: "30px"}}>
                <button className={`btn btn-secondary col-2 ${styles.buttonStyle}`} onClick={() => {setFormOpen(true)}}>新規作成</button>
                {projects.map((value) => (
                    <div className={`col-2 ${styles.buttonStyle}`} key={value._id}>
                        <Link href={`/projects/${value._id}`}>
                            <button className={`btn border-secondary ${styles.full}`}>{value.title}</button>
                        </Link>
                    </div>
                ))}
            </div>

            <Popup isOpen={formOpen}>
                <h3>プロジェクト新規作成</h3>
                <label className="form-label">プロジェクト名</label>
                <input type="text" className="form-control" onChange={(e) => {setNewProjectTitle(e.target.value)}} value={newProjectTitle}/>
                <div className={styles.leftRight}>
                    <button className="btn btn-secondary" onClick={() => {setFormOpen(false);setNewProjectTitle("")}}>キャンセル</button>
                    <button className="btn btn-primary" onClick={createPrject}> 決定</button>
                </div>
            </Popup>

        </div>
    )
}
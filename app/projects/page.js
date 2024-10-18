"use client"

import Popup from "@/components/popup";
import Link from "next/link";
import { useEffect, useState } from "react"
import styles from "./page.module.css";
import useFetchGet from "@/hooks/useFetchGet";

export default function Projects(){
    const {data, loading, error} = useFetchGet("/api/projects")
    const [projects, setProjects] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState("");

    useEffect(() => {
        if(!loading) {
            setProjects(data);
        }
    }, [loading]);

    const createPrject = async () => {
        const sid = self.crypto.randomUUID();
        const project = {
            title: newProjectTitle, 
            screens: {
                [sid]: {
                    title: "screen1",
                    components: []
                }
            }
        }

        const res = await fetch("/api/projects", {
            method: "POST", 
            body: JSON.stringify(project), 
            headers: {
                'Content-Type': 'application/json'
            }});
        const json = await res.json();
        const newId = json.id;
        setProjects([...projects, {_id: newId, ...project}]);
        setFormOpen(false);
        setNewProjectTitle("");
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>


    return (
        <div>
            <div style={{margin: "20px"}}>
                <h2>プロジェクト一覧</h2>
            </div>
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
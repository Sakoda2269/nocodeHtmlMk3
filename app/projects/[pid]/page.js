"use client"
import Canvas from "@/components/canvas/canvas";
import styles from "./page.module.css"
import { useEffect, useState } from "react";
import { FaPlus, FaDatabase, FaLayerGroup  } from "react-icons/fa6";
import useFetchGet from "@/hooks/useFetchGet";

export default function Project({params}) {
    
    const {data, loading, error} = useFetchGet(`/api/projects/${params.pid}`)
    const [open, setOpen] = useState(0);
    const [project, setProject] = useState(data);

    useEffect(() => {
        console.log(data);
    }, [loading])
    
    const leftClass = {
        true: `${styles.container} ${styles.left}`,
        false: `${styles.container} ${styles.leftClose}`
    }

    const buttonClass = {
        true: "btn btn-secondary",
        false: "btn border-secondary"
    }
    
    const openMenubar = (num) => {
        if(open != num) {
            setOpen(num);
        }else {
            setOpen(0);
        }
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>
    
    return (
        <div>
            <div className={`${styles.header}`}>
            </div>
            <div className={`${styles.all}`}>
                <div className={`${styles.leftIcons}`}>
                    <div>
                        <button className={buttonClass[open == 1]} onClick={() => {openMenubar(1)}}>
                            <FaLayerGroup />
                        </button>
                    </div>
                    <div>
                        <button className={buttonClass[open == 2]} onClick={() => {openMenubar(2)}}>
                            <FaPlus />
                        </button>
                    </div>
                    <div>
                        <button className={buttonClass[open == 3]} onClick={() => {openMenubar(3)}}>
                            <FaDatabase />
                        </button>
                    </div>
                </div>
                <div className={`${leftClass[open!=0]}`}>
                    {open == 1 && 
                        <div className={`${styles.leftContainer}`}>

                        </div>
                    }
                    {open == 2 && 
                        <div className={`${styles.leftContainer}`}>
                            <span style={{width: "80%"}}>
                                <button style={{width: "100%"}}>hello</button>
                            </span>
                            <span style={{width: "80%"}}>
                                <button style={{width: "100%"}}>hello</button>
                            </span>
                            <span style={{width: "80%"}}>
                                <button style={{width: "100%"}}>hello</button>
                            </span>
                        </div>
                    } 
                    {open == 3 && 
                        <div className={`${styles.leftContainer}`}>
                            good
                        </div>
                    } 
                </div>

                <div className={`${styles.container} ${styles.center}`}>
                    <Canvas />
                </div>
            </div>
        </div>
    )
}
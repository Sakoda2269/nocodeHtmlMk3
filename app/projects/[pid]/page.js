"use client"
import Canvas from "@/components/canvas/canvas";
import styles from "./page.module.css"
import { useState } from "react";
import { FaPlus, FaDatabase } from "react-icons/fa6";

export default function Project({params}) {
    
    const [open, setOpen] = useState(0);
    
    const leftClass = {
        true: `${styles.container} ${styles.left}`,
        false: `${styles.container} ${styles.leftClose}`
    }
    
    const openMenubar = (num) => {
        if(open != num) {
            setOpen(num);
        }else {
            setOpen(0);
        }
    }
    
    return (
        <div>
            <div className={`${styles.all}`}>
                <div className={`${styles.leftIcons}`}>
                    <div>
                        <button className="btn border-secondary" onClick={() => {openMenubar(1)}}>
                            <FaPlus />
                        </button>
                    </div>
                    <div>
                        <button className="btn border-secondary" onClick={() => {openMenubar(2)}}>
                            <FaDatabase />
                        </button>
                    </div>
                </div>
                <div className={`${leftClass[open==1]}`}>
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
                <div className={`${leftClass[open==2]}`}>good</div>

                <div className={`${styles.container} ${styles.center}`}>
                    <Canvas />
                </div>
            </div>
        </div>
    )
}
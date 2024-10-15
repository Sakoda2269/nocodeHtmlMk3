"use client"

import { useState } from "react"
import styles from "./canvas.module.css"

export default function Canvas() {
    
    const [scale, setScale] = useState(100);
    
    return(
        <div className={`${styles.all}`}>
            <div className={`${styles.canvasContaienr}`}>
                <div className={`${styles.canvas}`}
                 style={{transform: `scale(${(scale / 100)})`}}>
                    
                 </div>
            </div>
            <div className={`${styles.footer}`}>
                <div style={{paddingLeft: "30px"}}>
                    <input type="range" min="10" max="200"
                    value={scale} onChange={(e) => {setScale(e.target.value)}}/>
                    {scale}%
                </div>
            </div>
        </div>
    )
}
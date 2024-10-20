"use client"

import { useState } from "react";
import styles from "./canvas.module.css";

import { componentMap, ComponentWrapper } from "../screen_component/components";

export default function Canvas({currentScreen}) {
    
    const [scale, setScale] = useState(100);
    
    return(
        <div className={`${styles.all}`}>
            <div className={`${styles.canvasContaienr}`}>
                <div className={`${styles.canvas}`}
                    style={{transform: `scale(${(scale / 100)})`}}
                >
                    {currentScreen.map((value, index) => {
                        const Comp = componentMap[value.type];
                        return (
                            <ComponentWrapper 
                                key={index} 
                                bounds={value.data.bounds} 
                                layout="absolute"
                                componentPath={`components/${index}`}
                                data={value.data}
                                type={value.type}
                            >
                                <Comp />
                            </ComponentWrapper>
                        )
                    })}
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
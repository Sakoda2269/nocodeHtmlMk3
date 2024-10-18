"use client"
import { useState } from "react"
import styles from "./layer.module.css";
import { Collapse } from "react-bootstrap";


export default function Layer({screens}) {

    return(
        <div style={{width: "100%"}}>
            <div style={{padding: "10px"}}>
                <button style={{width: "100%"}}>スクリーンを追加する</button>
            </div>
            <p></p>
            {Object.entries(screens).map(([key, value]) => (
                <Screen key={key} screen={value}/>
            ))}
        </div>
    )

}

function Screen({screen}) {

    const [open, setOpen] = useState(false);

    return(
        <div className={`${styles.layerContainer}`}>
            <button 
                onClick={() => setOpen(!open)}
                aria-controls="components"
                aria-expanded={open}
                className={`${styles.screenButton}`}
            >
                {screen.title}
            </button>
            <Collapse in={open}>
                <div id="components">
                    hello
                </div>
            </Collapse>

        </div>
    )
}
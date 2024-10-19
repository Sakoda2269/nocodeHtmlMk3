import { Collapse } from "react-bootstrap";
import { AbsoluteContainer, HorizonContainer, VerticalContainer } from "./container/container";
import { Button, Text, TextInput } from "./element/element";
import { useState } from "react";
import styles from "./components.module.css"

export const componentMap ={
    "AbsoluteContainer": AbsoluteContainer,
    "HorizonContainer": HorizonContainer,
    "VerticalContainer": VerticalContainer,
    "Button": Button,
    "Text": Text,
    "TextInput": TextInput
}

export const containerComponents = new Set();
containerComponents.add("AbsoluteContainer");
containerComponents.add("HorizonContainer");
containerComponents.add("VerticalContainer");

export default function ComponentsList({addComponent}) {

    return(
        <div style={{width: "100%"}}>
            <Elements addComponent={addComponent}/>
            <p></p>
            <Contaienrs addComponent={addComponent}/>
        </div>
    )
}

function Elements({addComponent}) {
    const [open, setOpen] = useState(false);
    const id = self.crypto.randomUUID();

    const onClick = (type) => {
        addComponent({
                type: type, 
                data: {
                    id: id,
                    name: type,
                    text: "hello",
                    bounds: {
                        x: 0,
                        y: 0,
                        w: 100,
                        h: 30
                    }
                }
            })
    }

    return(
        <div className={styles.all}>
            <button 
                onClick={() => setOpen(!open)}
                aria-controls="components"
                aria-expanded={open}
                className={`${styles.collapseButton}`}
            >
                エレメント
            </button>
            <Collapse in={open}>
                <div id="components" className={`${styles.elementsContaienr}`}>
                    <button 
                        className={`${styles.componentsButton}`}
                        onClick={() => onClick("Button")}
                    >
                        Button
                    </button>
                    <button 
                        className={`${styles.componentsButton}`}
                        onClick={() => onClick("Text")}
                    >
                        Text
                    </button>
                    <button 
                        className={`${styles.componentsButton}`}
                        onClick={() => onClick("TextInput")}
                    >
                        TextInput
                    </button>
                </div>
            </Collapse>
        </div>
    )
}

function Contaienrs({addComponent}) {
    const [open, setOpen] = useState(false);
    const id = self.crypto.randomUUID();

    const onClick = (type) => {
        addComponent({
                type: type, 
                data: {
                    id: id,
                    name: type,
                    children: [],
                    bounds: {
                        x: 10,
                        y: 10,
                        w: 100,
                        h: 100
                    }
                }
            })
    }


    return(
        <div className={styles.all}>
            <button 
                onClick={() => setOpen(!open)}
                aria-controls="components"
                aria-expanded={open}
                className={`${styles.collapseButton}`}
            >
                コンテナ
            </button>
            <Collapse in={open}>
                <div id="components" className={`${styles.elementsContaienr}`}>
                    <button 
                        className={`${styles.componentsButton}`}
                        onClick={() => onClick("AbsoluteContainer")}
                    >
                        Absolute
                    </button>
                    <button 
                        className={`${styles.componentsButton}`}
                        onClick={() => onClick("HorizonContainer")}
                    >
                        Horizon
                    </button>
                    <button 
                        className={`${styles.componentsButton}`}
                        onClick={() => onClick("VerticalContainer")}
                    >
                        Vertical
                    </button>
                </div>
            </Collapse>
        </div>
    )
}

export function ComponentWrapper({children, bounds, layout}) {

    const onSelect = (e) => {
        e.preventDefault();
        alert("hello");
    }

    return (
        <span style={{
                border: "1px solid black", 
                left: `${bounds.x}px`,
                top: `${bounds.y}px`,
                width: `${bounds.w}px`,
                height: `${bounds.h}px`,
                position: layout
            }}
            onClick={onSelect}
        >
            {children}
        </span>
    )

}
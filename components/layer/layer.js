"use client"
import { useState } from "react"
import styles from "./layer.module.css";
import { Collapse } from "react-bootstrap";
import { containerComponents } from "../screen_component/components";


export default function Layer({screens, setCurrentContainerPath, currentContainerPath}) {

    return(
        <div style={{width: "100%", height: "100vh", overflow: "auto"}}>
            <div style={{padding: "10px"}}>
                <button style={{width: "100%"}}>スクリーンを追加する</button>
            </div>
            <p></p>
            {Object.entries(screens).map(([key, screen]) => (
                <ContainerLayer 
                    container={screen.components}
                    name={screen.title}
                    depth={0}
                    containerPath={"components"}
                    setCurrentContainerPath={setCurrentContainerPath}
                    currentContainerPath={currentContainerPath}
                    key={key}
                />
            ))}
        </div>
    )

}

function ContainerLayer({name, container, depth, containerPath, setCurrentContainerPath, currentContainerPath}) {

    const [open, setOpen] = useState(true);

    const selectContainer = () => {
        setOpen(!open);
        setCurrentContainerPath(containerPath);
    }

    return(
        <div>
             <div className={`${styles.layerContainer}`}>
                <button 
                    onClick={selectContainer}
                    aria-controls="components"
                    aria-expanded={open}
                    className={`${styles.screenButton}
                         ${currentContainerPath==containerPath ? styles.selecting : styles.notSelecting}`}
                > {name}
                </button>
                <Collapse in={open}>
                    <div id="components" style={{width: "90%"}}>
                        {container.map((value, index) => {
                            const type = value.type;
                            if(type) {
                                if(containerComponents.has(type)) {
                                    return (<ContainerLayer 
                                        name={value.data.name} 
                                        container={value.data.children}
                                        depth={depth + 1}
                                        containerPath={`${containerPath}/${index}/data/children`}
                                        setCurrentContainerPath={setCurrentContainerPath}
                                        currentContainerPath={currentContainerPath}
                                        key={index}
                                    />)
                                } else {
                                    return(
                                        <div key={index} className={`${styles.layerContainer}`}>
                                            <button 
                                                className={`${styles.elementButton}`}
                                            >
                                                {value.data.name}
                                            </button>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                </Collapse>
            </div>
        </div>
    )
}
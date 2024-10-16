
import React, { useState } from "react";
import styles from "./sidebar.module.css";

export function Sidebar({children}) {

    const [openNum, setOpenNum] = useState(-1);

    const childrenArray = React.Children.toArray(children);
    const center = childrenArray.find((child) => React.isValidElement(child) && child.type == CenterBody);
    const sideItems = childrenArray.filter((child) => React.isValidElement(child) && child.type == SideItem);
    const sideIcons = [];
    const sideBodies = [];    
    sideItems.map((child, index) => {
        const sides = React.Children.toArray(child.props.children);
        sideIcons.push(sides.find((child) => React.isValidElement(child) && child.type == SideIcon));
        sideBodies.push(sides.find((child) => React.isValidElement(child) && child.type == SideBody));
    });

    const buttonClass = {
        true: "btn btn-secondary",
        false: "btn border-secondary"
    }

    const leftClass = {
        true: `${styles.container} ${styles.left}`,
        false: `${styles.container} ${styles.leftClose}`
    }
        
    const openBody = (num) => {
        if(openNum != num) {
            setOpenNum(num);
        }else {
            setOpenNum(-1);
        }
    }

    return (
        <div>
            <div className={styles.all}>
                <div className={styles.leftIcons}>
                    {sideIcons.map((icon, index) => (
                        <button className={buttonClass[openNum == index]} onClick={() => {openBody(index)}} key={index}>{icon}</button>
                    ))}
                </div>
                <div className={leftClass[openNum!=-1]}>
                    {sideBodies.map((body, index) => {
                        if (openNum == index) return (<div className={styles.leftContainer} key={index}>{body}</div>);
                        return null;
                    })}
                </div>
                <div className={`${styles.container} ${styles.center}`}>
                    {center}
                </div>
            </div>
        </div>
    )

}

export function SideItem({children}) {
    return <>{children}</>
}

export function SideIcon({children}) {
    return <>{children}</>
}

export function SideBody({children}) {
    return <>{children}</>
}

export function CenterBody({children}) {
    return <>{children}</>
}
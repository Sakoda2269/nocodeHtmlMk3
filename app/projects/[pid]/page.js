"use client"
import Canvas from "@/components/canvas/canvas";
import styles from "./page.module.css"
import { useEffect, useState } from "react";
import { FaPlus, FaDatabase, FaLayerGroup  } from "react-icons/fa6";
import useFetchGet from "@/hooks/useFetchGet";
import { CenterBody, Sidebar, SideBody, SideIcon, SideItem } from "@/components/sidebar/sidebar";

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
            <Sidebar>
                <SideItem>
                    <SideIcon>
                        <FaLayerGroup />
                    </SideIcon>
                    <SideBody>
                        <div className={`${styles.leftContainer}`}>

                        </div>
                    </SideBody>
                </SideItem>

                <SideItem>
                    <SideIcon>
                        <FaPlus />
                    </SideIcon>
                    <SideBody>
                        <span style={{width: "80%"}}>
                            <button style={{width: "100%"}}>hello</button>
                        </span>
                        <span style={{width: "80%"}}>
                            <button style={{width: "100%"}}>hello</button>
                        </span>
                        <span style={{width: "80%"}}>
                            <button style={{width: "100%"}}>hello</button>
                        </span>
                    </SideBody>
                </SideItem>

                <SideItem>
                    <SideIcon>
                        <FaDatabase />
                    </SideIcon>
                    <SideBody>
                        good
                    </SideBody>
                </SideItem>

                <CenterBody>
                    <Canvas />
                </CenterBody>

            </Sidebar>
        </div>
    )
}
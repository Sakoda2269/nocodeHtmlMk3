"use client"
import Canvas from "@/components/canvas/canvas";
import styles from "./page.module.css"
import { useEffect, useState } from "react";
import { FaPlus, FaDatabase, FaLayerGroup, FaGear } from "react-icons/fa6";
import useFetchGet from "@/hooks/useFetchGet";
import { CenterBody, Sidebar, SideBody, SideIcon, SideItem } from "@/components/sidebar/sidebar";

export default function Project({params}) {
    
    const {data, loading, error} = useFetchGet(`/api/projects/${params.pid}`)
    const [project, setProject] = useState(data);


    if(loading) return <p>Loading...</p>
    if(error) return (
        <div>
            <p>{error.message}</p>
            <p>管理者に問い合わせてください</p>
        </div>
    )
    
    return (
        <div>
            <div className={`${styles.header}`}>
            </div>
            <Sidebar>
                {/* レイヤー */}
                <SideItem>
                    <SideIcon>
                        <FaLayerGroup />
                    </SideIcon>
                    <SideBody>
                        <div className={`${styles.leftContainer}`}>
                        </div>
                    </SideBody>
                </SideItem>

                {/* コンポーネント追加 */}
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
                
                {/* データベース */}
                <SideItem>
                    <SideIcon>
                        <FaDatabase />
                    </SideIcon>
                    <SideBody>
                        good
                    </SideBody>
                </SideItem>
                
                {/* プロジェクト設定 */}
                <SideItem>
                    <SideIcon>
                        <FaGear />
                    </SideIcon>
                    <SideBody>
                        delete
                    </SideBody>
                </SideItem>

                <CenterBody>
                    <Canvas />
                </CenterBody>

            </Sidebar>
        </div>
    )
}
"use client"
import Canvas from "@/components/canvas/canvas";
import styles from "./page.module.css"
import { useEffect, useState } from "react";
import { FaPlus, FaDatabase, FaLayerGroup, FaGear } from "react-icons/fa6";
import useFetchGet from "@/hooks/useFetchGet";
import { CenterBody, Sidebar, SideBody, SideIcon, SideItem } from "@/components/sidebar/sidebar";
import Layer from "@/components/layer/layer";
import ComponentsList from "@/components/screen_component/components";

export default function Project({params}) {
    
    const {data, loading, error} = useFetchGet(`/api/projects/${params.pid}`)
    const [project, setProject] = useState({});

    const [selectingScreenId, setSelectingScreenId] = useState("");
    const [currentContainerPath, setCurrentContainerPath] = useState("components");

    useEffect(() => {
        if(!loading) {
            setProject(data);
            const firstScreen = Object.keys(data.screens)[0];
            setSelectingScreenId(firstScreen)
        }
    }, [loading]);

    const addComponent = (newComponent) => {
        const containerPath = currentContainerPath.split("/");
        let nowContainer = project.screens[selectingScreenId];
        console.log(nowContainer, containerPath)
        containerPath.map((path) => {
            nowContainer = nowContainer[path];
        });
        nowContainer.push(newComponent);
        setProject({...project});
    };


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
                        <Layer 
                            screens={project.screens}
                            selectingScreenId={selectingScreenId}
                            setCurrentContainerPath={setCurrentContainerPath}
                            currentContainerPath={currentContainerPath}
                            setSelectingScreenId={setSelectingScreenId}
                            />
                    </SideBody>
                </SideItem>

                {/* コンポーネント追加 */}
                <SideItem>
                    <SideIcon>
                        <FaPlus />
                    </SideIcon>
                    <SideBody>
                        <ComponentsList
                            screenId={selectingScreenId}
                            addComponent={addComponent}
                        />
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
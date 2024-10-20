"use client"
import Canvas from "@/components/canvas/canvas";
import styles from "./page.module.css"
import { useEffect, useState } from "react";
import { FaPlus, FaDatabase, FaLayerGroup, FaGear } from "react-icons/fa6";
import useFetchGet from "@/hooks/useFetchGet";
import { CenterBody, RightBody, Sidebar, SideBody, SideIcon, SideItem } from "@/components/sidebar/sidebar";
import Layer from "@/components/layer/layer";
import ComponentsList from "@/components/screen_component/components";
import PropertyArea from "@/components/propertyArea/propertyArea";
import SetSelectingComponentContext from "@/contexts/setSelectingComponentContext";
import SetCurrentContainerPathContext from "@/contexts/setCurrentContainerPathContext";

export default function Project({params}) {
    
    const {data, loading, error} = useFetchGet(`/api/projects/${params.pid}`)
    const [project, setProject] = useState({});

    const [selectingScreenId, setSelectingScreenId] = useState("");
    const [currentContainerPath, setCurrentContainerPath] = useState("components");
    const [selectingComponent, setSelectingComponent] = useState(""); 

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
        containerPath.map((path, index) => {
            nowContainer = nowContainer[path];
            if(index != 0) {
                nowContainer = nowContainer.data.children;
            }
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
        <SetSelectingComponentContext.Provider value={{setSelectingComponent}}>
        <SetCurrentContainerPathContext.Provider value={{setCurrentContainerPath}}>            <div className={`${styles.header}`}>
            </div>
            <Sidebar>
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
                            setSelectingComponent={setSelectingComponent}
                        />
                    </SideBody>
                </SideItem>

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
                
                <SideItem>
                    <SideIcon>
                        <FaDatabase />
                    </SideIcon>
                    <SideBody>
                        good
                    </SideBody>
                </SideItem>
                
                <SideItem>
                    <SideIcon>
                        <FaGear />
                    </SideIcon>
                    <SideBody>
                        delete
                    </SideBody>
                </SideItem>

                <CenterBody>
                    {selectingScreenId && 
                        <Canvas 
                            currentScreen={project.screens[selectingScreenId].components}
                        />
                    }
                </CenterBody>

                <RightBody>
                    <PropertyArea 
                        selectingCopmponent={selectingComponent}
                        selectingScreenId={selectingScreenId}
                        project={project}
                    />
                </RightBody>

            </Sidebar>
        </SetCurrentContainerPathContext.Provider>
        </SetSelectingComponentContext.Provider>
        </div>
    )
}
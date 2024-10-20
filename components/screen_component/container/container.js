import {componentMap, ComponentWrapper} from "./../components";
import styles from "./container.module.css"

export function AbsoluteContainer({data, componentPath}){
    return (
        <div className={`${styles.absolute}`}>
            {data.children.map((component, index) => {
                const Comp = componentMap[component.type];
                return(
                    <ComponentWrapper 
                        key={index} 
                        bounds={component.data.bounds} 
                        layout="absolute"
                        data={component.data}
                        componentPath={`${componentPath}/${index}`}
                        type={component.type}
                    >
                       <Comp />
                    </ComponentWrapper>
                );
            })}
        </div>
    )
}

export function HorizonContainer() {

}

export function VerticalContainer() {

}
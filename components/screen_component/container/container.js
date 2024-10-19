import {componentMap, ComponentWrapper} from "./../components";
import styles from "./container.module.css"

export function AbsoluteContainer({data}){
    return (
        <div className={`${styles.absolute}`}>
            {data.children.map((component, index) => {
                const Comp = componentMap[component.type];
                return(
                    <ComponentWrapper key={index} bounds={component.data.bounds} layout="absolute">
                       <Comp data={component.data}/>
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
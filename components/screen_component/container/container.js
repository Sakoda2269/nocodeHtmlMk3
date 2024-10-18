import {componentMap} from "./../components";
import styles from "./container.module.css"

export function AbsoluteContainer({data}){
    return (
        <div className={`${styles.absolute}`}>
            {data.cihldren.map((component, index) => {
                const Comp = componentMap[component.type];
                <Comp key={index} data={component.data}/>
            })}
        </div>
    )
}

export function HorizonContainer() {

}

export function VerticalContainer() {

}
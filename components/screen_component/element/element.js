import { componentMap } from "./../components";

export function Button({ data }) {
    return (<button style={{width: "100%", height: "100%"}}>{data.text}</button>)
}

export function Text({ data }) {
    return (<span style={{width: "100%", height: "100%"}}>{data.text}</span>)
}

export function TextInput() {
}
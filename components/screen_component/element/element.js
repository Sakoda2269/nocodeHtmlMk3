import { componentMap } from "./../components";

export function Button({ data }) {
    return (<button>{data.text}</button>)
}

export function Text({ data }) {
    return (<span>{data.text}</span>)
}

export function TextInput() {
}
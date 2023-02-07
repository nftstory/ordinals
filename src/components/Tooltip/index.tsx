import type { JSX } from "solid-js/jsx-runtime"
import styles from "./style.module.scss"

interface TooltipProps {
    children?: JSX.Element | JSX.Element[],
    info: string
}

export default ({ children, info }: TooltipProps) => {
    return <span class={`underline ${styles.after}`}>{children}
        <span class={styles.hidden} >
            {info}
        </span>
    </span>
}
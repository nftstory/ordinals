import { createEffect, createSignal } from "solid-js"
import type { JSX } from "solid-js/jsx-runtime"

interface TimeoutClickableProps {
    children?: JSX.Element | JSX.Element[],
    clickedElement?: JSX.Element | JSX.Element[],
    onClick?: Function,
    class: string
}

export default ({ class: className, children, clickedElement, onClick }: TimeoutClickableProps) => {
    const [justClicked, setJustClicked] = createSignal(false)

    let pendingTimeout: NodeJS.Timeout | null = null;

    createEffect(() => {
        if (pendingTimeout) {
            clearTimeout(pendingTimeout)
        }

        if (justClicked()) {
            pendingTimeout = setTimeout(() => {
                setJustClicked(false)
            }, 700)
        }
    })

    return <button class={className} onClick={() => {
        setJustClicked(true)
        if (onClick) {
            onClick();
        }
    }}>
        {!justClicked() ? children : clickedElement}
    </button>
}
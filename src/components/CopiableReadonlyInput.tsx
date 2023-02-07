import { createEffect, createSignal } from "solid-js";
import { copy, truncate } from "../utils";

export default ({ value, valueToCopy, className }: { value: string | number, valueToCopy?: string | number, className?: string }) => {
    const [justCopied, setJustCopied] = createSignal(false)

    let pendingTimeout: NodeJS.Timeout | null = null;

    createEffect(() => {
        if (pendingTimeout) {
            clearTimeout(pendingTimeout)
        }

        if (justCopied()) {
            pendingTimeout = setTimeout(() => {
                setJustCopied(false)
            }, 700)
        }
    })

    let inputRef: HTMLInputElement | undefined;

    return <div class={`flex-1 relative mb-3 ${className || ''}`}>
        <input
            class="border border-gray-400 p-2 w-full pr-8"
            id="input-field"
            type="text"
            placeholder="Enter text"
            readOnly
            disabled
            value={truncate(value.toString(), 21)}
            ref={inputRef}
        />
        <span class="absolute pointer-events-none top-1/2 right-1 icon is-small mr-1 -translate-y-1/2" >
            {!justCopied() && <svg width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="black" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>}
            {justCopied() && <svg width="1em" height="1em" viewBox="0 0 512 512" data-v-4740c6d6=""><path fill="currentColor" d="m173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69L432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>}
        </span>
        <div class="absolute inset-0 cursor-pointer" onClick={() => {
            setJustCopied(true)

            if (inputRef) {
                copy(valueToCopy as string || value.toString())
            }
        }}>
        </div>
    </div>
}
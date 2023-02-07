import { createSignal, createEffect, onMount, onCleanup } from 'solid-js'
import { copy } from '../../../utils';
import CopiableReadonlyInput from '../../CopiableReadonlyInput';
import TimeoutClickable from '../../TimeoutClickable';
import Tooltip from '../../Tooltip';

export default function Modal(props: { open: boolean, onClose: Function }) {
    function close() {
        props.onClose();
    }

    let ref: HTMLCanvasElement | undefined;
    let [txDetails, setTXDetails] = createSignal<{ address: string, amount: number, bip21: string, qr: string } | null>(null)

    let keyListener: ((this: Window, ev: KeyboardEvent) => any) | null = null;

    onMount(() => {
        keyListener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        }

        window.addEventListener('keyup', keyListener);
    })

    onMount(async () => {
        const res = await fetch('/generatewallet', { method: 'POST', body: "{}" })
        const details = await res.json();
        setTXDetails(details)
    })

    onCleanup(() => {
        if (keyListener) {
            window.removeEventListener('keyup', keyListener);
        }
    })

    function copyBIP21() {
        if (txDetails()) {
            copy(txDetails()!.bip21)
        }
    }

    return (
        <div>
            {props.open && txDetails() && (
                <div class="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-75" >
                    <div class='flex h-full align-middle' onClick={(e) => {
                        close();
                    }}>
                        <div class="m-auto max-w-sm bg-white" onClick={(e) => e.stopPropagation()}>
                            <div class="p-10 ">
                                <h2 class="text-center" >Buy with BTC</h2>
                                {txDetails() && <img class="mx-auto" src={txDetails()!.qr}>
                                </img>}
                                <div class="flex w-2/3 mx-auto text-white">
                                    <a class="rounded-r-none rounded-l w-3/4 bg-emerald-800 py-2 text-center" href={txDetails()!.bip21}>
                                        Open in wallet
                                    </a>
                                    <TimeoutClickable onClick={() => copyBIP21()} class="rounded-l-none rounded-r w-1/4 bg-emerald-800 py-2 flex justify-center items-center " clickedElement={<svg width="1em" height="1em" viewBox="0 0 512 512" data-v-4740c6d6=""><path fill="currentColor" d="m173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69L432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>}>
                                        <svg width="0.88em" height="1em" viewBox="0 0 448 512"><path style={{ fill: 'currentcolor' }} d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>
                                    </TimeoutClickable>
                                </div>
                                <div class="flex">
                                    <div class="w-1/3">
                                        <label class="font-medium mb-1 text-gray-400 text-sm" for="input-field">
                                            Amount (BTC)
                                        </label>
                                        <CopiableReadonlyInput value={txDetails()!.amount} />
                                    </div>

                                    <div class="w-2/3 text-right">
                                        <label class="font-medium mb-1 text-gray-400 text-sm" for="input-field">
                                            One-time Payment Address
                                        </label>
                                        <CopiableReadonlyInput value={txDetails()!.address} />
                                    </div>
                                </div>
                                <div class="flex justify-end">
                                    <p><Tooltip info="We will reimburse whoever sends us BTC after the ordinal has already been sold">Will I get frontrun ?</Tooltip></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
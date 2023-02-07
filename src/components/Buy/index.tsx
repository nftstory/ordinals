import { createSignal, onMount } from "solid-js"
import Modal from "./Modal"
import styles from "./style.module.scss"

export default ({ insriptionId, onClick, price }: { insriptionId?: string, onClick: Function, price: number }) => {

    const [isOpen, setOpen] = createSignal(false)
    const [priceInUSD, setPriceInUSD] = createSignal("")

    onMount(async () => {
        const res = await fetch("/prices", {
            method: "POST",
            body: JSON.stringify({ symbol: 'BTC', amount: price })
        })

        const inUSD = parseFloat(await res.json());
        setPriceInUSD(`$${inUSD.toFixed(2)} USD`);
    })

    return <>
        <Modal open={isOpen()} onClose={() => setOpen(false)} />
        <div class={`fixed bottom-0 w-full bg-gray-900 ${styles.buyBar}`}>
            <div class="flex h-full items-center">
                <div class="w-5/6 flex mx-auto">
                    <div class="flex flex-col items-start">
                        <span class="font-semibold text-white text-2xl">{price} ₿</span>
                        <span class="text-stone-300">{priceInUSD()}</span>
                    </div>
                    <button class={`ml-auto bg-orange-500 text-white text-lg px-10 py-3 ${styles.buyButton}`} onClick={() => setOpen(true)}>
                        Buy Now
                    </button>
                    <a class="ml-6" href="#" onClick={e => e.preventDefault()}>
                        <svg width="27" height="42" viewBox="0 0 27 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.10345 16.4482H1V41H25.5517V16.4482H20.4483" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
                            <path d="M13.4136 28.4483V1" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
                            <path d="M13.4136 1L6.24121 8.17241" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
                            <path d="M13.414 1L20.5864 8.17241" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </>
}
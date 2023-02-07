export default ({ number }: { number: string | number }) => {
    return <div class="flex justify-center">
        <div class="rounded-lg shadow-lg bg-gray-900 text-white max-w-sm">
            <a href="/21">
                <img class="rounded-t-lg" src={`/images/inscriptions/${number}.jpg`} alt="" />
            </a>
            <h2 class="mt-4 text-center text-lg">
                Bitcoin miner #{number}
            </h2>
            <hr class="w-3/4 mx-auto"></hr>
            <div class="px-6 flex items-center my-5">
                <span>0.1 BTC</span>
                <a href={`/inscriptions/${number}`} class="ml-auto bg-orange-500  font-bold py-2 px-4 rounded-full" type="button">Buy</a>
            </div>
        </div>
    </div>
}
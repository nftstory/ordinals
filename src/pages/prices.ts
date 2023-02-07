import type { APIRoute } from 'astro';
import redstone from "redstone-api"

export const post: APIRoute = async function post({ params, request }) {
    const data = await request.json();

    const { value } = await redstone.getPrice(data.symbol)

    return new Response(JSON.stringify(
        value * data.amount
    ), { status: 200 });
}
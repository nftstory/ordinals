import type { APIRoute } from 'astro';

export const post: APIRoute = async function post({ params, request }) {
    const { inscriptionId } = await request.json();
    const status: 'AVAILABLE' | 'SOLD' = inscriptionId == 3 ? 'SOLD' : 'AVAILABLE';

    return new Response(JSON.stringify({
        inscriptionId,
        status
    }), { status: 200 });
}
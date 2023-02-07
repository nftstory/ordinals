import type { APIRoute } from 'astro';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import { webcrypto } from "crypto"
import bip21 from 'bip21'
import QRCode from "qrcode"

const bip32 = BIP32Factory(ecc);

function getAddress(node: any, network?: any): string {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address!;
}

const toQRDataURL = (value: string) => {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(value, (err, value) => {
            if (err) {
                reject(err)
            } else {
                resolve(value);
            }
        })
    })
}

export const post: APIRoute = async function post({ params, request }) {
    const data = await request.json();

    const path = "m/0'/0/0";

    const array = new Uint8Array(32);
    webcrypto.getRandomValues(array);

    const root = bip32.fromSeed(Buffer.from(array));

    const child1 = root.derivePath(path);
    const address = getAddress(child1);

    const encoded = bip21.encode(address, { amount: 0.1 });



    return new Response(JSON.stringify(
        {
            address, amount: 0.1,
            bip21: encoded,
            qr: await toQRDataURL(encoded)
        }
    ), { status: 200 });
}
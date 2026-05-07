export const charMap = "!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/"

const _translateMap_encode = new Map<string, string>(Array.from(charMap.slice(0, 26), (v, i) => [String.fromCharCode(i + 65), v]))
    , _translateMap_decode = new Map<string, string>(Array.from(charMap.slice(0, 26), (v, i) => [v, String.fromCharCode(i + 65)]))

export function encode(input: Uint8Array | string): string {
    if (typeof input == 'string') {
        input = new TextEncoder().encode(input)
    }
    return (
        typeof input.toBase64 == 'function'
            ? input.toBase64()
            : typeof Uint8Array.prototype.toBase64 == 'function'
                ? Uint8Array.from(input).toBase64()
                : btoa(String.fromCharCode(...input))
    ).replace(/[A-Z]/g, m => _translateMap_encode.get(m))
}

export function decode(input: string): Uint8Array<ArrayBuffer> {
    input = ('' + input).replace(/[!#$%&()*,\-\.:;<>?@[\]^_`{|}~]/g, m => _translateMap_decode.get(m))
    return typeof Uint8Array.fromBase64 == 'function'
        ? Uint8Array.fromBase64(input)
        : Uint8Array.from(atob(input), m => m.charCodeAt(0))
}

export function decodeToString(input: string, textDecoder = new TextDecoder()): string {
    return textDecoder.decode(decode(input))
}

const base64NoUpperCase = {
    charMap,
    encode,
    decode,
    decodeToString
}

export default base64NoUpperCase

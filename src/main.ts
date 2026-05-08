import { encode as _encode, _base64ToBytes } from "@bddjr/base64"

export const charMap = "!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/"

const __replacement_encode = Map.prototype.get.bind(
    new Map<string, string>(Array.from(charMap.slice(0, 26), (v, i) => [String.fromCharCode(i + 65), v]))
) as (match: string) => string

const __replacement_decode = Map.prototype.get.bind(
    new Map<string, string>(Array.from(charMap.slice(0, 26), (v, i) => [v, String.fromCharCode(i + 65)]))
) as (match: string) => string

export function _translate_encode_output(base64: string) {
    return base64.replace(/[A-Z]/g, __replacement_encode)
}

export function _translate_decode_input(input: string) {
    return ('' + input).replace(/[!#$%&()*,\-\.:;<>?@[\]^_`{|}~]/g, __replacement_decode)
}

export function encode(input: Uint8Array | string): string {
    return _translate_encode_output(_encode(input))
}

export function decode(input: string): Uint8Array<ArrayBuffer> {
    return _base64ToBytes(_translate_decode_input(input))
}

export function decodeToString(input: string, textDecoder = new TextDecoder()): string {
    return textDecoder.decode(decode(input))
}

const base64NoUpperCase = {
    charMap: charMap as typeof charMap,
    _translate_encode_output,
    _translate_decode_input,
    encode,
    decode,
    decodeToString
}

export default base64NoUpperCase

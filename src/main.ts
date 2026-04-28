export const charMap = "!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/"

const _charMapBytes = new TextEncoder().encode(charMap)
    , _decodeMap = new Map<string, number>(Array.from(charMap, (v, i) => [v, i])).set('=', 0).set(''[0], 0)
    , _translateMap_encode = new Map<string, string>(Array.from(charMap.slice(0, 26), (v, i) => [String.fromCharCode(i + 65), v]))
    , _translateMap_decode = new Map<string, string>(Array.from(charMap.slice(0, 26), (v, i) => [v, String.fromCharCode(i + 65)]))

function _translate_encode(base64: string): string {
    return base64.replace(/[A-Z]/g, m => _translateMap_encode.get(m))
}

function _translate_decode(input: string): string {
    return input.replace(/[!#$%&()*,\-\.:;<>?@[\]^_`{|}~]/g, m => _translateMap_decode.get(m))
}

export function encode(input: Uint8Array | string): string {
    if (typeof input == 'string') {
        input = new TextEncoder().encode(input)
    }
    if (typeof (input as any).toBase64 == 'function') {
        return _translate_encode((input as any).toBase64())
    }
    if (typeof (Uint8Array.prototype as any).toBase64 == 'function') {
        return _translate_encode((Uint8Array.from(input) as any).toBase64())
    }
    if (
        typeof Buffer == 'function' &&
        typeof Buffer.isBuffer == 'function' &&
        typeof Buffer.from == 'function' &&
        typeof Buffer.isEncoding == 'function' &&
        Buffer.isEncoding("base64")
    ) {
        return _translate_encode(Buffer.prototype.toString.call(
            (Buffer.isBuffer(input)
                ? input
                : Buffer.from(input.buffer || input as any)
            ),
            "base64"
        ))
    }
    var il = input.length
        , out = new Uint8Array(Math.ceil(il / 3) * 4)
        , ii = 0
        , oi = 0
    while (ii < il) {
        // 00000000 11111111 22222222
        // __000000 __001111 __111122 __222222
        out[oi++] = _charMapBytes[input[ii] >> 2 & 63]
        out[oi++] = _charMapBytes[(input[ii++] << 4 | input[ii] >> 4) & 63]
        out[oi++] = ii >= il ? 61 : _charMapBytes[(input[ii++] << 2 | input[ii] >> 6) & 63]
        out[oi++] = ii >= il ? 61 : _charMapBytes[input[ii++] & 63]
    }
    return new TextDecoder().decode(out)
}

export function decode(input: string): Uint8Array<ArrayBuffer> {
    input += ''
    if (typeof (Uint8Array as any).fromBase64 == 'function') {
        return (Uint8Array as any).fromBase64(_translate_decode(input))
    }
    if (
        typeof Buffer == 'function' &&
        typeof Buffer.from == 'function' &&
        typeof Buffer.isEncoding == 'function' &&
        Buffer.isEncoding("base64")
    ) {
        return Uint8Array.from(Buffer.from(_translate_decode(input), "base64"))
    }
    var il = input.length
        , out = new Uint8Array((il / 4 * 3) - (
            input[il - 1] === '=' &&
            1 + ((input[il - 2] === '=') as any)
        ))
        , ii = 0
        , oi = 0
        , cache: number
        , next = () => {
            if ((cache = _decodeMap.get(input[ii++])) === void 0)
                throw Error(`InvalidCharacterError: '"${input[--ii]}"' at ${ii}`)
            return cache
        }
    while (ii < il) {
        // __000000 __111111 __222222 __333333
        // 00000011 11112222 22333333
        out[oi++] = next() << 2 | next() >> 4
        out[oi++] = cache << 4 | next() >> 2
        out[oi++] = cache << 6 | next()
    }
    return out
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

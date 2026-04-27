export const charMap = "!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/"

const charMapBytes = new TextEncoder().encode(charMap)
    , decodeMap = new Map<string, number>(Array.from(charMap, (v, i) => [v, i]))
    , translateMap_encode = new Map<string, string>(Array.from(charMap.slice(0, 26), (v, i) => [String.fromCharCode(i + 65), v]))
    , translateMap_decode = new Map<string, string>(Array.from(charMap.slice(0, 26), (v, i) => [v, String.fromCharCode(i + 65)]))

export function encode(input: Uint8Array | string): string {
    if (typeof input == 'string')
        input = new TextEncoder().encode(input)
    if (typeof (input as any).toBase64 == 'function') {
        return ((input as any).toBase64() as string).replace(/[A-Z]/g, m => translateMap_encode.get(m))
    }
    var il = input.length
        , out = new Uint8Array(Math.ceil(il / 3) * 4)
        , ii = 0
        , oi = 0
    while (ii < il) {
        // 00000000 11111111 22222222
        // __000000 __001111 __111122 __222222
        out[oi++] = charMapBytes[input[ii] >> 2 & 63]
        out[oi++] = charMapBytes[(input[ii++] << 4 | input[ii] >> 4) & 63]
        out[oi++] = ii >= il ? 61 : charMapBytes[(input[ii++] << 2 | input[ii] >> 6) & 63]
        out[oi++] = ii >= il ? 61 : charMapBytes[input[ii++] & 63]
    }
    return new TextDecoder().decode(out)
}

export function decode(input: string): Uint8Array {
    input += ''
    if (typeof (Uint8Array as any).fromBase64 == 'function') {
        return (Uint8Array as any).fromBase64(
            input.replace(/[!#$%&()*,\-\.:;<>?@[\]^_`{|}~]/g, m => translateMap_decode.get(m))
        ) as Uint8Array
    }
    var il = input.length
        , out = new Uint8Array(Math.floor(il / 4 * 3) - (
            ((input[il - 1] == '=') as unknown as number) &&
            (1 + ((input[il - 2] == '=') as unknown as number))
        ))
        , ii = 0
        , oi = 0
        , char: string
        , cache: number
        , next = () => {
            if (ii >= il || (char = input[ii++]) == '=')
                return cache = 0
            if ((cache = decodeMap.get(char)) == null)
                throw Error(`InvalidCharacterError: '"${char}"' at ${ii - 1}`)
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

const Base64NoUpperCase = {
    charMap,
    encode,
    decode,
    decodeToString
}

export default Base64NoUpperCase

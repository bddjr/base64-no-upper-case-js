type Uint8ArrayLike = ArrayLike<number>

export const charMap = "!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/"

export function encode(input: Uint8ArrayLike | string): string {
    if (typeof input == 'string')
        input = new TextEncoder().encode(input)
    var il = input.length
        , out = Array<string>(Math.ceil(il / 3) * 4)
        , ii = 0
        , oi = 0
    while (ii < input.length) {
        // 00000000 11111111 22222222
        // __000000 __001111 __111122 __222222
        out[oi++] = charMap[input[ii] >> 2]
        out[oi++] = charMap[input[ii++] << 4 & 63 | input[ii] >> 4]
        out[oi++] = ii >= il ? '=' : charMap[input[ii++] << 2 & 63 | input[ii] >> 6]
        out[oi++] = ii >= il ? '=' : charMap[input[ii++] & 63]
    }
    return out.join('')
}

export function decode(input: string): Uint8Array {
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
            if ((char = input[ii++]) == '=')
                return cache = 0
            if ((cache = charMap.indexOf(char)) < 0)
                throw Error("InvalidCharacterError: '" + char + "' at " + (ii - 1))
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

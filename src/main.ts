import {
    make_bytesToBase64,
    make_encode,
    make_decode,
    make_decodeToString,
} from "@bddjr/base64/make"

export const alphabet = "!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/"

export const _bytesToBase64 = /*@__PURE__*/ make_bytesToBase64(alphabet)
export const encode = /*@__PURE__*/ make_encode(_bytesToBase64)

export const decode = /*@__PURE__*/ make_decode(alphabet)
export const decodeToString = /*@__PURE__*/ make_decodeToString(decode)

const base64NoUpperCase = {
    alphabet: alphabet as typeof alphabet,
    _bytesToBase64,
    encode,
    decode,
    decodeToString
}

export default base64NoUpperCase

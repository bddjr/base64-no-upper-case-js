import {
    make_bytesToBase64,
    make_base64ToBytes,
    make_encode,
    make_decode,
    make_decodeToString,
} from "@bddjr/base64/make"

export const alphabet = "!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/"

/** @deprecated Use 'alphabet' instead */
export const charMap = alphabet

export const _bytesToBase64 = /*@__PURE__*/ make_bytesToBase64(alphabet)
export const encode = /*@__PURE__*/ make_encode(_bytesToBase64)

export const _base64ToBytes = /*@__PURE__*/ make_base64ToBytes(alphabet)
export const decode = /*@__PURE__*/ make_decode(_base64ToBytes)
export const decodeToString = /*@__PURE__*/ make_decodeToString(decode)

const base64NoUpperCase = {
    alphabet: alphabet as typeof alphabet,
    /** @deprecated Use 'alphabet' instead */
    charMap: charMap as typeof charMap,
    _bytesToBase64,
    encode,
    _base64ToBytes,
    decode,
    decodeToString
}

export default base64NoUpperCase

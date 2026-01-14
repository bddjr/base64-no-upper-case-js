import Base64NoUpperCase from '../dist/module.mjs'
import Base64NoUpperCase_require from './test-require.cjs'
import { exit } from 'process'
import fs from 'fs'

let allSuccess = true

/**
 * 
 * @param {typeof Base64NoUpperCase} Base64NoUpperCase 
 */
function test(Base64NoUpperCase) {
    /**
     * @param {string | Uint8Array} v
     */
    function test2(v) {
        console.log('------------------')
        console.log(v)
        const enc = Base64NoUpperCase.encode(v)
        console.log(enc)
        var isEqual = false
        if (typeof v == 'string') {
            const dec = Base64NoUpperCase.decodeToString(enc)
            console.log(dec)
            isEqual = dec === v
        } else {
            const dec = Base64NoUpperCase.decode(enc)
            console.log(dec)
            isEqual = (() => {
                if (dec.length !== v.length) return false
                for (const i in dec) {
                    if (dec[i] !== v[i]) return false
                }
                return true
            })()
        }
        allSuccess &&= isEqual
        console.log('equal:', isEqual)
    }

    test2("Hello world!")
    test2("123456")
    test2("1234567")
    test2("12345678")
    test2(crypto.getRandomValues(new Uint8Array(12)))
    test2(crypto.getRandomValues(new Uint8Array(13)))
    test2(crypto.getRandomValues(new Uint8Array(14)))
    test2(crypto.getRandomValues(new Uint8Array(15)))
    test2(crypto.getRandomValues(new Uint8Array(16)))
}

// test module
test(Base64NoUpperCase);

// test main
test(Base64NoUpperCase_require);

// test browser
(function () {
    eval(fs.readFileSync('dist/browser.min.js').toString())
    //@ts-ignore
    if (Object.keys(this).length != 1) throw this;
    //@ts-ignore
    test(this.Base64NoUpperCase)
}).call({});

console.log('------------------')
console.log('allSuccess:', allSuccess)
console.log()

allSuccess || exit(1)

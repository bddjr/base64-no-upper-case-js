Base64, but no UPPER CASE.

```
!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/
```

## Setup

### npm

```
npm i base64-no-upper-case
```

```js
import Base64NoUpperCase from "base64-no-upper-case"

// Encode string
var enc = Base64NoUpperCase.encode("Hello world!")
console.log(enc)

// Decode to string
var dec = Base64NoUpperCase.decodeToString("])`sb)8gd29yb)@h")
console.log(dec)

// Encode Uint8Array
var enc = Base64NoUpperCase.encode(new Uint8Array(16))
console.log(enc)

// Decode to Uint8Array
var dec = Base64NoUpperCase.decode("^2rn8;ffl7<z*}{.|m@|{w==")
console.log(dec)
```

### Browser

```html browser
<script>
{const e="!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/",r=function(r){"string"==typeof r&&(r=(new TextEncoder).encode(r));for(var n=r.length,t=Array(4*Math.ceil(n/3)),o=0,a=0;o<r.length;)t[a++]=e[r[o]>>2],t[a++]=e[r[o++]<<4&63|r[o]>>4],t[a++]=o>=n?"=":e[r[o++]<<2&63|r[o]>>6],t[a++]=o>=n?"=":e[63&r[o++]];return t.join("")},n=function(r){for(var n,t,o=r.length,a=new Uint8Array(Math.floor(o/4*3)-("="==r[o-1]&&1+("="==r[o-2]))),c=0,d=0,i=()=>{if("="==(n=r[c++]))return t=0;if((t=e.indexOf(n))<0)throw Error("InvalidCharacterError: '"+n+"' at "+(c-1));return t};c<o;)a[d++]=i()<<2|i()>>4,a[d++]=t<<4|i()>>2,a[d++]=t<<6|i();return a},t=function(e,r=new TextDecoder){return r.decode(n(e))};self.base64NoUpperCase={charMap:e,encode:r,decode:n,decodeToString:t}}
</script>
```

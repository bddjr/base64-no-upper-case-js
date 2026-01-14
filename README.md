Base64, but no UPPER CASE.

It is useful in case-insensitive scenarios, such as Scratch.

```
!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/
```

For Scratch:  
<https://scratch.mit.edu/projects/1263900629/>  

For Python:  
<https://pypi.org/project/base64-no-upper-case/>  

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
{const r="!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/",e=function(e){"string"==typeof e&&(e=(new TextEncoder).encode(e));for(var n=e.length,t=Array(4*Math.ceil(n/3)),o=0,a=0;o<n;)t[a++]=r[e[o]>>2&63],t[a++]=r[63&(e[o++]<<4|e[o]>>4)],t[a++]=o>=n?"=":r[63&(e[o++]<<2|e[o]>>6)],t[a++]=o>=n?"=":r[63&e[o++]];return t.join("")},n=function(e){for(var n,t,o=e.length,a=new Uint8Array(Math.floor(o/4*3)-("="==e[o-1]&&1+("="==e[o-2]))),c=0,i=0,d=()=>{if(c>=o||"="==(n=e[c++]))return t=0;if((t=r.indexOf(n))<0)throw Error("InvalidCharacterError: '"+n+"' at "+(c-1));return t};c<o;)a[i++]=d()<<2|d()>>4,a[i++]=t<<4|d()>>2,a[i++]=t<<6|d();return a},t=function(r,e=new TextDecoder){return e.decode(n(r))};this.Base64NoUpperCase={charMap:r,encode:e,decode:n,decodeToString:t}}
</script>
```

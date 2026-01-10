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
{const r="!#$%&()*,-.:;<>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyz0123456789+/",e=function(e){"string"==typeof e&&(e=(new TextEncoder).encode(e));for(var n=e.length,o=Array(4*Math.ceil(n/3)),t=0,a=0;t<n;)o[a++]=r[e[t]>>2&63],o[a++]=r[63&(e[t++]<<4|e[t]>>4)],o[a++]=t>=n?"=":r[63&(e[t++]<<2|e[t]>>6)],o[a++]=t>=n?"=":r[63&e[t++]];return o.join("")},n=function(e){for(var n,o,t=e.length,a=new Uint8Array(Math.floor(t/4*3)-("="==e[t-1]&&1+("="==e[t-2]))),c=0,d=0,i=()=>{if(c>=t||"="==(n=e[c++]))return o=0;if((o=r.indexOf(n))<0)throw Error("InvalidCharacterError: '"+n+"' at "+(c-1));return o};c<t;)a[d++]=i()<<2|i()>>4,a[d++]=o<<4|i()>>2,a[d++]=o<<6|i();return a},o=function(r,e=new TextDecoder){return e.decode(n(r))};self.Base64NoUpperCase={charMap:r,encode:e,decode:n,decodeToString:o}}
</script>
```

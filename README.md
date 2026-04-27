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

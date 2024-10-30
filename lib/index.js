var Base64Utility = /** @class */ (function () {
    function Base64Utility() {
    }
    Base64Utility.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64Utility._utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                Base64Utility._keyStr.charAt(enc1) +
                Base64Utility._keyStr.charAt(enc2) +
                Base64Utility._keyStr.charAt(enc3) +
                Base64Utility._keyStr.charAt(enc4);
        }
        return output;
    };
    Base64Utility.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9+/=]/g, "");
        while (i < input.length) {
            enc1 = Base64Utility._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64Utility._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64Utility._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64Utility._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64Utility._utf8Decode(output);
        console.log("开始解码-结果为", output);
        return output;
    };
    Base64Utility._utf8Encode = function (input) {
        var output = "";
        for (var n = 0; n < input.length; n++) {
            var charCode = input.charCodeAt(n);
            if (charCode < 128) {
                output += String.fromCharCode(charCode);
            }
            else if (charCode > 127 && charCode < 2048) {
                output += String.fromCharCode((charCode >> 6) | 192);
                output += String.fromCharCode((charCode & 63) | 128);
            }
            else {
                output += String.fromCharCode((charCode >> 12) | 224);
                output += String.fromCharCode(((charCode >> 6) & 63) | 128);
                output += String.fromCharCode((charCode & 63) | 128);
            }
        }
        return output;
    };
    Base64Utility._utf8Decode = function (input) {
        var output = "";
        var i = 0;
        var c1, c2, c3;
        while (i < input.length) {
            c1 = input.charCodeAt(i++);
            if (c1 < 128) {
                output += String.fromCharCode(c1);
            }
            else if (c1 > 191 && c1 < 224) {
                c2 = input.charCodeAt(i++);
                output += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            }
            else {
                c2 = input.charCodeAt(i++);
                c3 = input.charCodeAt(i++);
                output += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            }
        }
        return output;
    };
    Base64Utility._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return Base64Utility;
}());
export default Base64Utility;

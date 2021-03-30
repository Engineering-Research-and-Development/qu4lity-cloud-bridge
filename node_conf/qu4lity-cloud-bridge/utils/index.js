module.exports = {
    float32ToHex: function(float32){
        const getHex = i => ('00' + i.toString(16)).slice(-2);
        var view = new DataView(new ArrayBuffer(4))
        view.setFloat32(0, float32);
        return Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join('');
    },

    float32ToBin: function(float32){
        const HexToBin = hex => (parseInt(hex, 16).toString(2)).padStart(32, '0');
        const getHex = i => ('00' + i.toString(16)).slice(-2);
        var view = new DataView(new ArrayBuffer(4))
        view.setFloat32(0, float32);
        return HexToBin(Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join(''));
    },

    hexToFloat32: function(str) {
        var int = parseInt(str, 16);
        if (int > 0 || int < 0) {
            var sign = (int >>> 31) ? -1 : 1;
            var exp = (int >>> 23 & 0xff) - 127;
            var mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
            var float32 = 0
            for (i = 0; i < mantissa.length; i += 1) { float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp-- }
            return float32 * sign;
        }
        else return 0;
    },

    binToFloat32: function(str) {
        var int = parseInt(str, 2);
        if (int > 0 || int < 0) {
            var sign = (int >>> 31) ? -1 : 1;
            var exp = (int >>> 23 & 0xff) - 127;
            var mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
            var float32 = 0
            for (i = 0; i < mantissa.length; i += 1) { float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp-- }
            return float32 * sign;
        }
        else return 0;
    },

    iee754Extractor: function(str){
        var json = {};

        json["timestamp"] = this.hexToFloat32(str.substr(0,16));
        json["active_value"] = this.hexToFloat32(str.substr(16,8));
        json["last_value"] = this.hexToFloat32(str.substr(24,8));
        json["data_warning"] = this.hexToFloat32(str.substr(84,8));
        json["data_damage"] = this.hexToFloat32(str.substr(92,8));

        var data = [];
        for(var i = 0;i<100;i++)
            data.push(this.hexToFloat32(str.substr(100+i*8,8)))

        json["values"] = data;

        var ret = {
            dataSeriesValue : json
        }

        return ret;
    }
};

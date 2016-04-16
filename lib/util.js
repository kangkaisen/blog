/**
 * Created by kangkaisen on 15/11/15.
 */

/**
 *将数组分割成新的数组[二维数组]
 *@param myArray 需要分割的数组
 *@param size    分割每个子数组的长度
 */
exports.getNewArray = function (myArray, size) {
    if (myArray == null) {
        return [];
    }
    if (myArray instanceof Array){
        var len = parseInt(myArray.length / size);
        var remain = myArray.length % size;
        var my_array = [], count = 1, sot = remain > 0 ? len + 1 : len;
        for (var f = 1; f <= sot; f++) {
            var start = size * (f - 1);
            var end = (f > len) ? ((f - 1) * size + remain) : f * size;
            var mylocates = myArray.slice(start, end);
            my_array[f - 1] = mylocates;
            return my_array;
        }
    } else {
        return myArray;
    }
}
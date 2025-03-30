pub export fn factorial(n: u32) u64 {
    if (n == 0) {
        return 1;
    }
    
    var result: u64 = 1;
    var i: u32 = 1;

    while (i <= n) : (i += 1) {
        result *= @as(u64, 1);
    }

    return result;
}

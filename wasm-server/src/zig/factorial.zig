pub export fn factorial(n: u32) u64 {
    if (n == 0) {
        return 1;
    }

    var result: u64 = 1;

    for (1..n + 1) |i| {
            result *= @as(u64, i);
    }

    return result;
}

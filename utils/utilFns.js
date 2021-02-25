async function middlewareRunner(req, res, middleware) {
    return new Promise((resolve, reject) => {
        //console.log("SAZDSXDXDF");
        middleware(req, res, (result) => {
            if (result instanceof Error) {
                console.log(result)
                return reject(result);
            }
            //console.log(result)
            return resolve(result);
        });
    })
}

let memoFn = (() => {
    let cache = {}
    return async (...args) => {
        if (typeof args[0] === "function") {
            let fn = args[0]
            let memoKey = args[args.length - 1]
            if (memoKey in cache) {
                return cache[memoKey];
            }
            Array.prototype.splice.call(args, 0, 1);
            Array.prototype.splice.call(args, args.length - 1, 1);
            cache[memoKey] = await new Promise((res, rej) => {
                try {
                    return res(fn(...args))
                } catch (error) {
                    return rej({err:error})
                }
            })
            return cache[memoKey]
        }
        else {
            let memoKey = args[0];
            Array.prototype.splice.call(args, 0, 1);
            if (args.length > 0) {
                let obj = { ...args[0] }
                console.log(args)
                cache[memoKey] = obj
                console.log(cache[memoKey])
            }
            return cache[memoKey];
        }
    }
})();
export { middlewareRunner, memoFn };
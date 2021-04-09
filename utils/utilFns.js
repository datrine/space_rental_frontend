import { object } from "prop-types";

function stateMgr() {
    let loadingState = {
        None: 0,
        Loading: 1,
        Failed: 2,
        Loaded: 3,
        Current: undefined,
        getLoadingState() {
            return this.Current;
        },
        setLoadingState(state) {
            for (const key in this) {
                if (this[key] === state) {
                    this.Current === this[key];
                    console.log("Initial current is set to "+this.Current)
                }
            }
        },
        init() {
            let { None, setLoadingState } = this
            setLoadingState(None)
        }
    }
    loadingState.init()
    return loadingState;
}

let screenMgr = () => {
    if (typeof window !== "undefined") {
        let screenType;
        let screenWidth = screen.width
        if (screenWidth < 992) {
            screenType = "small";
            return { screenType }
        }
        else if (screenWidth >= 992) {
            screenType = "large";
            return { screenType }
        }
    }
}

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
    let timeId=0;
    return async (...args) => {
    clearTimeout(timeId)
     timeId= setTimeout(()=>{
        cache={}
        console.log("Cache cleared...")
    },40000)
        if (typeof args[0] === "function") {
            let fn = args[0]
            let memoKey = args[args.length - 1]
            if (memoKey in cache) {
                return cache[memoKey];
            }
            Array.prototype.splice.call(args, 0, 1);
            Array.prototype.splice.call(args, args.length - 1, 1);
            cache[memoKey] = await new Promise(async(res, rej) => {
                try {
                    let result=await fn(...args)
                    console.log("result")
                    console.log(result)
                    console.log("result")
                    return res(result)
                } catch (error) {
                    return rej({ err: error })
                }
            })
            console.log("cache[memoKey]")
            console.log(cache[memoKey])
            console.log("cache[memoKey]")
            return cache[memoKey]
        }
        else {
            let memoKey = args[0];
            Array.prototype.splice.call(args, 0, 1);
            if (args.length > 0) {
                let obj = { ...args[0] }
                cache[memoKey] = obj
            }
            return cache[memoKey];
        }
    }
})();
export { middlewareRunner, memoFn, screenMgr ,stateMgr};
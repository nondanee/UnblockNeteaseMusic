module.exports = (func, args, ttl = 30 * 60 * 1000) => new Promise(resolve => {
    const cache = func.cache ? func.cache : func.cache = {}
    const key = args ? (typeof(args) === 'object' ? args.id : args) : 'default'
    if(!(key in cache) || cache[key].expiration < Date.now())
        func(args)
        .then(result =>
            resolve(cache[key] = {
                error: false,
                data: result,
                expiration: Date.now() + ttl
            })
        )
        .catch(() =>
            resolve(cache[key] = {
                error: true,
                data: null,
                expiration: Date.now() + ttl
            })
        )
    else
        resolve(cache[key])
})
.then(value =>
    value.error ? Promise.reject(value.data) : Promise.resolve(value.data)
)
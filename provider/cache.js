module.exports = (ttl = 30 * 60 * 1000) => {
    const cache = {}
    return (fetch, data) => new Promise(resolve => {
        const key = typeof(data) === 'object' ? data.id : data
        if(!(key in cache) || cache[key].expiration < Date.now())
            fetch(data)
            .then(result => 
                resolve(cache[key] = {
                    error: false,
                    data: result,
                    expiration: Date.now() + ((typeof(result) == 'string' && result.startsWith('http')) ? 0 : ttl)
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
}
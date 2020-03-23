const collector = (job, cycle) =>
	setTimeout(() => {
		let keep = false
		Object.keys(job.cache || {})
		.forEach(key => {
			if (!job.cache[key]) return
			job.cache[key].expiration < Date.now()
				? job.cache[key] = null
				: keep = keep || true
		})
		keep ? collector(job, cycle) : job.collector = null
	}, cycle)

module.exports = (job, parameter, live = 30 * 60 * 1000) => {
	const cache = job.cache ? job.cache : job.cache = {}
	if (!job.collector) job.collector = collector(job, live / 2)
	const key = parameter == null ? 'default' : (typeof(parameter) === 'object' ? (parameter.id || parameter.key || JSON.stringify(parameter)) : parameter)
	const done = (status, result) => cache[key].execution = Promise[status](result)
	if (!cache[key] || cache[key].expiration < Date.now())
		cache[key] = {
			expiration: Date.now() + live,
			execution: job(parameter)
				.then(result => done('resolve', result))
				.catch(result => done('reject', result))
		}
	return cache[key].execution
}
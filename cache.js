const collector = (job, cycle) =>
	setInterval(
		() => Object.keys(job.cache || {}).forEach(key => job.cache[key] && job.cache[key].expiration < Date.now() ? job.cache[key] = null : false),
		cycle
	)

module.exports = (job, parameter, live = 30 * 60 * 1000) => {
	const cache = job.cache ? job.cache : job.cache = {}
	if(!job.collector) job.collector = collector(job, live / 2)
	const key = parameter == null ? 'default' : (parameter.id || parameter.key || parameter)
	if(!cache[key] || cache[key].expiration < Date.now())
		cache[key] = {
			execution: job(parameter),
			expiration: Date.now() + live
		}
	return cache[key].execution
}
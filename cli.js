const cli = {
	_prog: {},
	_args: [],
	program: (option = {}) => {
		cli._prog = option
		return cli
	},
	argument: (flags, option = {}) => {
		// name or flags - Either a name or a list of option strings, e.g. foo or -f, --foo.
		// dest - The name of the attribute to be added to the object returned by parse_args().
		
		// nargs - The number of command-line arguments that should be consumed. // N, ?, *, +, REMAINDER
		// action - The basic type of action to be taken when this argument is encountered at the command line. // store, store_true, store_false, append, append_const, count, help, version
		
		// const - A constant value required by some action and nargs selections. (supporting store_const and append_const action)

		// metavar - A name for the argument in usage messages.
		// help - A brief description of what the argument does.

		// required - Whether or not the command-line option may be omitted (optionals only).
		// default - The value produced if the argument is absent from the command line.
		// type - The type to which the command-line argument should be converted.
		// choices - A container of the allowable values for the argument.

		flags = Array.isArray(flags) ? flags : [flags]
		option.flags = flags
		option.positional = !flags[0].startsWith('-')
		option.dest = option.dest || flags.slice(-1)[0].toLowerCase().replace(/^-+/, '').replace(/-[a-z]/g, character => character.slice(1).toUpperCase())
		option.help = option.help || {'help': 'output usage information', 'version': 'output the version number'}[option.action]
		cli._args.push(option)
		return cli
	},
	parse: argv => {
		let optionals = {}, positionals = cli._args.map((option, index) => option.positional ? index : null).filter(index => index !== null)
		cli._args.forEach((option, index) => {if(!option.positional){option.flags.forEach(flag => optionals[flag] = index)}})

		cli._prog.name = cli._prog.name || require('path').parse(argv[1]).base
		let args = argv.slice(2)
		.reduce((result, part) => /^-[^-]/.test(part) ? result.concat(part.slice(1).split('').map(string => '-' + string)) : result.concat(part), [])
		
		let pointer = 0
		while(pointer < args.length) {
			let value = args[pointer]
			let picked = null
			let index = value.startsWith('-') ? optionals[value] : positionals.shift()
			if(index == undefined)  value.startsWith('-') ? error(`no such option: ${value}`) : error(`extra arguments found: ${value}`)
			if(value.startsWith('-')) pointer += 1
			let action = cli._args[index].action

			let step = args.slice(pointer).findIndex(part => part in optionals)
			let next = step === -1 ? args.length : step + pointer

			if(['help', 'version'].includes(action)){
				if(action === 'help') help()
				else if(action === 'version') version()
			}            
			else if(['store_true', 'store_false'].includes(action)){
				picked = action === 'store_true'
			}
			else{
				picked = args.slice(pointer, next)
				if(picked.length === 0){
					cli._args[index].positional ? 
					error(`the following arguments are required: ${value}`) :
					error(`arguments: ${value} expected at least one argument`)
				}
				if(cli._args[index].nargs != '+'){
					picked = picked[0]
					pointer += 1
				}
				else{
					pointer = next
				}
			}
			cli[cli._args[index].dest] = picked
		}
		if(positionals.length){
			error(`the following arguments are required: ${positionals.map(index => cli._args[index].flags[0]).join(', ')}`)
		}
		// cli._args.forEach(option => console.log(option.dest, cli[option.dest]))
		return cli
	}
}

const pad = length => (new Array(length + 1)).join(' ')

const usage = () => {
	let options = cli._args.map(option => {
		let flag = option.flags[0]
		let name = option.metavar || option.dest
		if(option.positional){
			if(option.nargs === '+')
				return `${name} [${name} ...]`
			else
				return `${name}`
		}
		else{
			if(['store_true', 'store_false', 'help', 'version'].includes(option.action))
				return `[${flag}]`
			else if(option.nargs === '+')
				return `[${flag} ${name} [${name} ...]]`
			else
				return `[${flag} ${name}]`
		}
	}).map(name => ' ' + name)
	let maximum = 80
	let prefix = `usage: ${cli._prog.name}`
	let lines = [prefix]

	options.forEach(option => {
		lines[lines.length - 1].length + option.length < maximum ?
		lines[lines.length - 1] += option :
		lines.push(pad(prefix.length) + option)
	})
	console.log(lines.join('\n'))
}

const help = () => {
	usage()
	let positionals = cli._args.filter(option => option.positional)
	.map(option => [option.metavar || option.dest, option.help])
	let optionals = cli._args.filter(option => !option.positional)
	.map(option => {
		let flags = option.flags
		let name = option.metavar || option.dest
		let use = ''
		if(['store_true', 'store_false', 'help', 'version'].includes(option.action)) 
			use = flags.map(flag => `${flag}`).join(', ')
		else if(option.nargs === '+') 
			use = flags.map(flag => `${flag} ${name} [${name} ...]`).join(', ')
		else
			use = flags.map(flag => `${flag} ${name}`).join(', ')
		return [use, option.help]
	})
	let align = Math.max.apply(null, positionals.concat(optionals).map(option => option[0].length))
	align = align > 26 ? 26 : align
	const publish = option => {
		option[0].length > align ? 
		console.log(`  ${option[0]}\n${pad(align + 4)}${option[1]}`) :
		console.log(`  ${option[0]}${pad(align - option[0].length)}  ${option[1]}`)
	}
	if(positionals.length) console.log('\npositional arguments:')
	positionals.forEach(publish)
	if(optionals.length) console.log('\noptional arguments:')
	optionals.forEach(publish)
	process.exit()
}

const version = () => {
	console.log(cli._prog.version)
	process.exit()
}

const error = message => {
	usage()
	console.log(cli._prog.name + ':', 'error:', message)
	process.exit(1)
}

module.exports = cli
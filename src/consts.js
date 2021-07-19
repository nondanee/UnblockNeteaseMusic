const DEFAULT_SOURCE = ['kuwo', 'migu', 'qq', 'youtube'];
const PROVIDERS = {
	netease: require('./provider/netease'),
	qq: require('./provider/qq'),
	baidu: require('./provider/baidu'),
	kugou: require('./provider/kugou'),
	kuwo: require('./provider/kuwo'),
	migu: require('./provider/migu'),
	joox: require('./provider/joox'),
	youtube: require('./provider/youtube'),
	bilibili: require('./provider/bilibili'),
	pyncmd: require('./provider/pyncmd')
}

module.exports = {
    DEFAULT_SOURCE,
    PROVIDERS,
};

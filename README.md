<img src="https://user-images.githubusercontent.com/26399680/47980314-0e3f1700-e102-11e8-8857-e3436ecc8beb.png" alt="logo" width="140" height="140" align="right">

# UnblockNeteaseMusic

解锁网易云音乐客户端变灰歌曲

## 特性

- 使用网易云旧链 / QQ / 虾米 / 百度 / 酷狗 / 酷我 / 咕咪 / JOOX 音源替换变灰歌曲链接 (默认仅启用前四)
- 为请求增加 `X-Real-IP` 参数解锁海外限制，支持指定网易云服务器 IP，支持设置上游 HTTP / HTTPS 代理
- 完整的流量代理功能 (HTTP / HTTPS)，可直接作为系统代理 (同时支持 PAC)

## 运行

从源码运行

```
$ node app.js
```

或使用 Docker

```
$ docker run nondanee/unblockneteasemusic
```

```
$ docker-compose up
```

### 配置参数

```
$ node app.js -h
usage: unblockneteasemusic [-v] [-p port] [-u url] [-f host]
                           [-o source [source ...]] [-t token] [-s] [-h]

optional arguments:
  -v, --version               output the version number
  -p port, --port port        specify server port
  -u url, --proxy-url url     request through upstream proxy
  -f host, --force-host host  force the netease server ip
  -o source [source ...], --match-order source [source ...]
                              set priority of sources
  -t token, --token token     set up http basic authentication
  -s, --strict                enable proxy limitation
  -h, --help                  output usage information
```

## 使用

**警告：本项目不提供线上 demo，请不要轻易信任使用他人提供的公开代理服务，以免发生安全问题**

**若将服务部署到公网，强烈建议使用严格模式 (此模式下仅放行网易云音乐所属域名的请求) `-s`  限制代理范围 (需使用 PAC 或 hosts)，~~或启用 Proxy Authentication `-t <name>:<password>` 设置代理用户名密码~~ (目前密码认证在 Windows 客户端设置和 macOS 系统设置都无法生效，请不要使用)，以防代理被他人滥用**

支持 Windows 客户端，UWP 客户端，Linux 客户端，macOS 客户端 (726 版本以上需要自签证书)，Android 客户端和网页版 (需要自签证书)

目前除 UWP 外其它客户端都优先请求 HTTPS 接口，默认情况下本代理对网易云所有 HTTPS API 连接返回空数据，促使客户端降级使用HTTP接口 (降级有时不能自动触发，若提示 "网络不给力" 请切换页面标签试试)

测试发现 iOS 客户端设置 WLAN 代理有效果 (HD 版不行)，虽 Apple 强制要求使用 HTTPS 但 API 请求仍可以降级，不过播放音源地址需要 HTTPS，因此需要一个有可信任证书的 (公网)  HTTPS 接口来转发流量，设置代理无法直接使用 (其它项目有提到使用 Surge，Shadowrocket 可以直接转发 HTTPS 流量到 HTTP，有兴趣可以试试)

### 方法 1. 修改 hosts

向 hosts 文件添加两条规则

```
<Server IP> music.163.com
<Server IP> interface.music.163.com
```

> 使用此方法必须监听 80 端口 `-p 80` 
>
> **若在本机运行程序**，请指定网易云服务器 IP `-f xxx.xxx.xxx.xxx` (可在修改 hosts 前通过 `ping music.163.com` 获得) **或** 使用代理 `-u http(s)://xxx.xxx.xxx.xxx:xxx`，以防请求死循环
>
> **Android 客户端下修改 hosts 无法使用**，原因和解决方法详见[云音乐安卓又搞事啦](https://jixun.moe/post/netease-android-hosts-bypass/)，[安卓免 root 绕过网易云音乐 IP 限制](https://jixun.moe/post/android-block-netease-without-root/)

### 方法 2. 设置代理

> PAC 自动代理脚本地址 `http://<Server Name:PORT>/proxy.pac`
>
> 全局代理地址填写服务器地址和端口号即可

| 平台    | 设置方法                         |
| :------ | :------------------------------- |
| Windows | 设置 > 工具 > 自定义代理 (客户端内) |
| UWP     | Windows 设置 > 网络和 Internet > 代理  |
| Linux   | 系统设置 > 网络 > 网络代理           |
| macOS   | 系统偏好设置 > 网络 > 高级 > 代理      |
| Android | WLAN > 修改网络 > 高级选项 > 代理      |
| iOS     | Surge，Shadowrocket 等添加配置    |

> UWP 应用需要开启 loopback 才能会使用系统代理，请以**管理员身份**执行命令
>
> ```
> checknetisolation loopbackexempt -a -n="1F8B0F94.122165AE053F_j2p0p5q0044a6"
> ```

> iOS Surge 配置
> 
> ```
> [Proxy]
> UnblockNeteaseMusic = http,<Server Name>,<PORT>,,
> 
> [Rule]
> USER-AGENT,NeteaseMusic*,UnblockNeteaseMusic 
> FINAL,DIRECT
> ```

### ✳方法 3. 调用接口

作为依赖库使用

```javascript
const match = require('./UnblockNeteaseMusic')

/** 
 * Set proxy or hosts if needed
 */
global.proxy = require('url').parse('http://127.0.0.1:1080')
global.hosts = {'i.y.qq.com': '59.37.96.220'}

/**
 * Find matching song from other platforms
 * @param {Number} id netease song id
 * @param {Array<String>||undefined} source support netease, qq, xiami, baidu, kugou, kuwo, migu, joox
 * @return {Promise<Object>}
 */
match(557581404, ['netease', 'qq', 'xiami', 'baidu']).then(song => console.log(song))
```

## 效果

#### Windows 客户端

<img src="https://user-images.githubusercontent.com/26399680/52214951-f24c3c80-28cd-11e9-99d0-f1e68fa6ae2e.png" width="100%">

#### UWP 客户端

<img src="https://user-images.githubusercontent.com/26399680/52215123-5a028780-28ce-11e9-8491-08c4c5dac3b4.png" width="100%">

#### Linux 客户端

<img src="https://user-images.githubusercontent.com/26399680/52214856-a7cac000-28cd-11e9-92dd-0c41dc619481.png" width="100%">

#### macOS 客户端

<img src="https://user-images.githubusercontent.com/26399680/52196035-51418f80-2895-11e9-8f33-78a631cdf151.png" width="100%">

#### Android 客户端

<img src="https://user-images.githubusercontent.com/26399680/52219366-7525c500-28d7-11e9-8ae8-b09e2a81f0cb.jpg" width="50%">

#### iOS 客户端

<img src="https://user-images.githubusercontent.com/26399680/52219399-8373e100-28d7-11e9-9011-686d0caba369.jpg" width="50%">

## 感谢

感谢大佬们为逆向 eapi 所做的努力

使用的其它平台音源 API 出自

[trazyn/ieaseMusic](https://github.com/trazyn/ieaseMusic)

[listen1/listen1_chrome_extension](https://github.com/listen1/listen1_chrome_extension)

向所有同类产品致敬

[EraserKing/CloudMusicGear](https://github.com/EraserKing/CloudMusicGear)

[EraserKing/Unblock163MusicClient](https://github.com/EraserKing/Unblock163MusicClient)

[ITJesse/UnblockNeteaseMusic](https://github.com/ITJesse/UnblockNeteaseMusic/)

[bin456789/Unblock163MusicClient-Xposed](https://github.com/bin456789/Unblock163MusicClient-Xposed)

[YiuChoi/Unlock163Music](https://github.com/YiuChoi/Unlock163Music)

[yi-ji/NeteaseMusicAbroad](https://github.com/yi-ji/NeteaseMusicAbroad)

[stomakun/NeteaseReverseLadder](https://github.com/stomakun/NeteaseReverseLadder/)

[fengjueming/unblock-NetEaseMusic](https://github.com/fengjueming/unblock-NetEaseMusic)

[acgotaku/NetEaseMusicWorld](https://github.com/acgotaku/NetEaseMusicWorld)

[mengskysama/163-Cloud-Music-Unlock](https://github.com/mengskysama/163-Cloud-Music-Unlock)

[azureplus/163-music-unlock](https://github.com/azureplus/163-music-unlock)

[typcn/163music-mac-client-unlock](https://github.com/typcn/163music-mac-client-unlock)

## 许可

The MIT License
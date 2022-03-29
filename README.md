<div align="center">
    <h1>🚨 本 UnblockNeteaseMusic 版本已暂停维护 🚨</h1>
    <p>
        以下是其他开发者制作的 UNM 版本。使用这些版本可以获得更完善的支援，
        以及更积极的更新。您可以自由选择您想使用的分支版本：
    </p>
    <table>
        <tr>
            <th>名称</th>
            <th>连结</th>
            <th>特点</th>
        </tr>
        <tr>
            <td>UnblockNeteaseMusic/server</td>
            <td><a href="https://github.com/UnblockNeteaseMusic/server">https://github.com/UnblockNeteaseMusic/server</a></td>
            <td>已积极维护数月，改善各种原版问题（音源失效、支援新版网易云、内存泄漏问题）的分支版本</td>
        </tr>
        <!-- Insert your fork here! -->
    </table>
</div>

---

<img src="https://user-images.githubusercontent.com/26399680/47980314-0e3f1700-e102-11e8-8857-e3436ecc8beb.png" alt="logo" width="140" height="140" align="right">

# UnblockNeteaseMusic

解锁网易云音乐客户端变灰歌曲

## 特性

- 使用 QQ / 虾米 / 百度 / 酷狗 / 酷我 / 咪咕 / JOOX 音源替换变灰歌曲链接 (默认仅启用一、五、六)
- 为请求增加 `X-Real-IP` 参数解锁海外限制，支持指定网易云服务器 IP，支持设置上游 HTTP / HTTPS 代理
- 完整的流量代理功能 (HTTP / HTTPS)，可直接作为系统代理 (同时支持 PAC)

## 运行

使用 npx

```
$ npx @nondanee/unblockneteasemusic
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
$ unblockneteasemusic -h
usage: unblockneteasemusic [-v] [-p port] [-a address] [-u url] [-f host]
                           [-o source [source ...]] [-t token] [-e url] [-s]
                           [-h]

optional arguments:
  -v, --version                   output the version number
  -p port, --port port            specify server port
  -a address, --address address   specify server host
  -u url, --proxy-url url         request through upstream proxy
  -f host, --force-host host      force the netease server ip
  -o source [source ...], --match-order source [source ...]
                                  set priority of sources
  -t token, --token token         set up proxy authentication
  -e url, --endpoint url          replace virtual endpoint with public host
  -s, --strict                    enable proxy limitation
  -h, --help                      output usage information
```

## 使用

**警告：本项目不提供线上 demo，请不要轻易信任使用他人提供的公开代理服务，以免发生安全问题**

**若将服务部署到公网，强烈建议使用严格模式 (此模式下仅放行网易云音乐所属域名的请求) `-s`  限制代理范围 (需使用 PAC 或 hosts)，~~或启用 Proxy Authentication `-t <name>:<password>` 设置代理用户名密码~~ (目前密码认证在 Windows 客户端设置和 macOS 系统设置都无法生效，请不要使用)，以防代理被他人滥用**

支持 Windows 客户端，UWP 客户端，Android 客户端，Linux 客户端 (1.2 版本以上需要自签证书 MITM，启动客户端需要增加 `--ignore-certificate-errors` 参数)，macOS 客户端 (726 版本以上需要自签证书)，iOS 客户端 (配置 https endpoint 或使用自签证书) 和网页版 (需要自签证书，需要脚本配合)

目前除 UWP 外其它客户端均优先请求 HTTPS 接口，默认配置下本代理对网易云所有 HTTPS API 连接返回空数据，促使客户端降级使用 HTTP 接口 (新版 Linux 客户端和 macOS 客户端已无法降级)

因 UWP 应用存在网络隔离，限制流量发送到本机，若使用的代理在 localhost，或修改的 hosts 指向 localhost，需为 "网易云音乐 UWP" 手动开启 loopback 才能使用，请以**管理员身份**执行命令

```powershell
checknetisolation loopbackexempt -a -n="1F8B0F94.122165AE053F_j2p0p5q0044a6"
```

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
> **Android 客户端下修改 hosts 无法直接使用**，原因和解决方法详见[云音乐安卓又搞事啦](https://jixun.moe/post/netease-android-hosts-bypass/)，[安卓免 root 绕过网易云音乐 IP 限制](https://jixun.moe/post/android-block-netease-without-root/)

### 方法 2. 设置代理

PAC 自动代理脚本地址 `http://<Server Name:PORT>/proxy.pac`

全局代理地址填写服务器地址和端口号即可

| 平台    | 基础设置 |
| :------ | :------------------------------- |
| Windows | 设置 > 工具 > 自定义代理 (客户端内) |
| UWP     | Windows 设置 > 网络和 Internet > 代理 |
| Linux   | 系统设置 > 网络 > 网络代理 |
| macOS   | 系统偏好设置 > 网络 > 高级 > 代理 |
| Android | WLAN > 修改网络 > 高级选项 > 代理 |
| iOS     | 无线局域网 > HTTP 代理 > 配置代理 |

> 代理工具和方法有很多请自行探索，欢迎在 issues 讨论

### ✳方法 3. 调用接口

作为依赖库使用

```
$ npm install @nondanee/unblockneteasemusic
```

```javascript
const match = require('@nondanee/unblockneteasemusic')

/** 
 * Set proxy or hosts if needed
 */
global.proxy = require('url').parse('http://127.0.0.1:1080')
global.hosts = {'i.y.qq.com': '59.37.96.220'}

/**
 * Find matching song from other platforms
 * @param {Number} id netease song id
 * @param {Array<String>||undefined} source support qq, xiami, baidu, kugou, kuwo, migu, joox
 * @return {Promise<Object>}
 */
match(418602084, ['qq', 'kuwo', 'migu']).then(console.log)
```

## 效果

#### Windows 客户端

<img src="https://user-images.githubusercontent.com/26399680/60316017-87de8a80-999b-11e9-9381-16d40efbe7f6.png" width="100%">

#### UWP 客户端

<img src="https://user-images.githubusercontent.com/26399680/52215123-5a028780-28ce-11e9-8491-08c4c5dac3b4.png" width="100%">

#### Linux 客户端

<img src="https://user-images.githubusercontent.com/26399680/60316169-18b56600-999c-11e9-8ae5-5cd168b0edae.png" width="100%">

#### macOS 客户端

<img src="https://user-images.githubusercontent.com/26399680/52196035-51418f80-2895-11e9-8f33-78a631cdf151.png" width="100%">

#### Android 客户端

<img src="https://user-images.githubusercontent.com/26399680/57972549-eabd2900-79ce-11e9-8fef-95cb60906298.png" width="50%">

#### iOS 客户端

<img src="https://user-images.githubusercontent.com/26399680/57972440-f90a4580-79cc-11e9-8dbf-6150ee299b9c.jpg" width="50%">

## 致谢

感谢大佬们为逆向 eapi 所做的努力

使用的其它平台音源 API 出自

[trazyn/ieaseMusic](https://github.com/trazyn/ieaseMusic)

[listen1/listen1_chrome_extension](https://github.com/listen1/listen1_chrome_extension)

向所有同类项目致敬

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

<img src="logo.png" alt="logo" width="140" height="140" align="right">

# UnblockNeteaseMusic

解锁网易云音乐客户端变灰歌曲

## 特性

- 使用QQ/虾米/百度/~~酷狗/酷我/咕咪/JOOX~~音源替换变灰歌曲链接(如有需要请自行启用)
- 为请求增加 `X-Real-IP` 参数解锁海外限制，支持指定网易云服务器IP，支持设置上游HTTP/HTTPS代理
- 完整的流量代理功能(HTTP/HTTPS)，可直接作为系统代理(同时支持PAC)

## 运行

```
$ node app.js
```

### 配置参数

```
$ node app.js -h

  Usage: unblockneteasemusic [options] [value ...]

  Options:

    -V, --version            output the version number
    -p, --port <port>        specify server port
    -f, --force-host <host>  force the netease server ip
    -u, --proxy-url <url>    request through another proxy
    -h, --help               output usage information
```

### 使用

> 支持Windows客户端，UWP客户端，Linux客户端，Mac客户端和Android客户端 (Mac客户端和Android客户端默认请求HTTPS接口，代理后端对网易云的HTTPS接口连接都会返回空数据，客户端将自动降级使用HTTP接口)
>
> 不支持iOS客户端，因Apple强制要求使用HTTPS所以无法降级，~~要支持只能自签证书做MITM了~~ ，看其它项目提到用surge，shadowrocket可以转发，有兴趣可以试试
>
> 移除了预下载和ffmpeg转码的相关逻辑以加快返回速度，仅酷我音源是aac格式(默认未开启)应该会下载失败，其它音源均为mp3格式不受影响

有如下两种方法

#### 方法1. 修改hosts

向hosts文件添加两条规则

```
<Server IP> music.163.com
<Server IP> interface.music.163.com
```

> 使用此方法必须监听80端口 `-p 80` 
>
> **若在本机运行程序，还需指定网易云服务器IP** `-f xxx.xxx.xxx.xxx` ，可在修改hosts前 `ping music.163.com` 得
>
> **Android客户端下修改hosts无法使用**，原因和解决方法详见[云音乐安卓又搞事啦](https://jixun.moe/post/netease-android-hosts-bypass/)，[安卓免 root 绕过网易云音乐 IP 限制](https://jixun.moe/post/android-block-netease-without-root/)

#### 方法2. 设置代理

> PAC自动代理脚本地址 `http://<Server Name:PORT>/proxy.pac`
>
> 全局代理地址填写服务器地址和端口号即可

| 平台    | 设置方法                         |
| :------ | :------------------------------- |
| Windows | 设置>工具>自定义代理（客户端内） |
| UWP     | Windows设置>网络和Internet>代理  |
| Linux   | 系统设置>网络>网络代理           |
| macOS   | 系统偏好设置>网络>高级>代理      |
| Android | WLAN>修改网络>高级选项>代理      |

> UWP应用需要开启loopback才会使用系统代理，可借助[Fiddler](https://www.telerik.com/fiddler)，[EnableLoopback Utility](https://github.com/tiagonmas/Windows-Loopback-Exemption-Manager)等工具

## 效果

#### Windows客户端

<img src="https://user-images.githubusercontent.com/26399680/46274493-40ea7280-c58c-11e8-8065-8e04ddaa27cd.png" width="100%" alt="windows">

#### UWP客户端

<img src="https://user-images.githubusercontent.com/26399680/46275283-f4546680-c58e-11e8-8041-16ee26b3dfbb.png" width="100%" alt="uwp">

#### Linux客户端

<img src="https://user-images.githubusercontent.com/26399680/46274631-aa6a8100-c58c-11e8-89f8-e5da3564ac92.png" width="100%" alt="linux">

#### macOS客户端

<img src="https://user-images.githubusercontent.com/26399680/46274674-d2f27b00-c58c-11e8-8ed8-6e0384a870c5.png" width="100%" alt="macos">

#### Android客户端

<img src="https://user-images.githubusercontent.com/26399680/46274600-96bf1a80-c58c-11e8-9210-9fc86ffd8557.png" width="40%" alt="android">

## 感谢

感谢大佬们为逆向eapi所做的努力

使用的其它平台音源API出自

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
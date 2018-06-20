# UnblockNeteaseMusic

> 解锁网易云音乐客户端变灰歌曲

## 特性

- 使用QQ/虾米~~/酷狗/酷我~~音源替换变灰歌曲链接
- 请求增加参数解锁海外限制，支持设置第二级HTTP/HTTPS代理
- 完整的流量代理功能(HTTP/HTTPS)，可直接作为系统代理(不过没有PAC)

## 使用

```
$ node app.js
```

### 配置参数

```
$ node app.js -h

  Usage: unblockneteasemusic [options] [value ...]

  Options:

    -V, --version            output the version number
    -p, --port <port>        specific server port
    -f, --force-host <host>  force the netease server ip
    -u, --proxy-url <url>    request through another proxy
    -h, --help               output usage information
```

### 支持客户端

> 支持Windows客户端，UWP客户端和Linux客户端 (不支持Mac客户端因为Mac上用的接口走HTTPS要MITM)

有如下两种方案

#### 1. 修改hosts
```
<Server IP> music.163.com
<Server IP> interface.music.163.com
```

> 修改hosts只能使用80端口，**若在本地运行，务必指定网易云服务器IP**(改hosts前ping一下)。因https需自己签根证书，暂时无法处理https请求

#### 2. 设置代理
Windows客户端设置内使用HTTP代理

UWP客户端下使用系统代理

> UWP应用需开启loopback才能走系统代理，可使用[Fiddler](https://www.telerik.com/fiddler)或[EnableLoopback Utility](https://github.com/tiagonmas/Windows-Loopback-Exemption-Manager)等工具

Linux客户端下使用环境代理

>

## 效果

![](./screenshot.png)

## 感谢

感谢大佬们为逆向eapi所做的努力

使用的其它平台音源API出自

[listen1/listen1_chrome_extension](https://github.com/listen1/listen1_chrome_extension)

向所有同类产品致敬

[EraserKing/CloudMusicGear](https://github.com/EraserKing/CloudMusicGear)

[EraserKing/Unblock163MusicClient](https://github.com/EraserKing/Unblock163MusicClient)

[ITJesse/UnblockNeteaseMusic](https://github.com/ITJesse/UnblockNeteaseMusic/)

[bin456789/Unblock163MusicClient-Xposed](https://github.com/bin456789/Unblock163MusicClient-Xposed)

[yi-ji/NeteaseMusicAbroad](https://github.com/yi-ji/NeteaseMusicAbroad)

[stomakun/NeteaseReverseLadder](https://github.com/stomakun/NeteaseReverseLadder/)

[LesterLyu/NeteaseReverseLadder](https://github.com/LesterLyu/NeteaseReverseLadder)

## License

MIT
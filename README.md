# UnblockNeteaseMusic

> 用于替换网易云音乐客户端变灰歌曲的播放地址的代理服务器

## 特性

- 使用QQ/虾米/酷狗/酷我音源替换变灰歌曲链接
- 完整的流量代理功能(HTTP/HTTPS)，并支持设置第二级代理(SS/SSR/...)，可直接作为系统代理(不过没有PAC)

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

> 暂时只支持Windows端，应该是不支持linux和mac端的(之后会完善)

有如下两种方案

#### 1. 修改hosts
```
<Server IP> music.163.com
<Server IP> interface.music.163.com
```

> 修改hosts只能使用80端口，**若在本地运行，务必指定网易云服务器IP**(改hosts前ping一下)。因为没有证书，无法处理https请求，当然自己签根证书也不是不行

#### 2. 设置代理
Windows客户端设置内使用HTTP代理

UWP客户端下使用系统代理

> UWP应用需开启loopback才能走系统代理，可使用[Fiddler](https://www.telerik.com/fiddler)或[EnableLoopback Utility](https://github.com/tiagonmas/Windows-Loopback-Exemption-Manager)等工具

## 效果

![](./screenshot.png)

## 感谢

使用的音源API出自

[listen1/listen1_chrome_extension](https://github.com/listen1/listen1_chrome_extension)

并向所有同类产品致敬

[EraserKing/CloudMusicGear](https://github.com/EraserKing/CloudMusicGear)

[EraserKing/Unblock163MusicClient](https://github.com/EraserKing/Unblock163MusicClient)

[ITJesse/UnblockNeteaseMusic](https://github.com/ITJesse/UnblockNeteaseMusic/)

[bin456789/Unblock163MusicClient-Xposed](https://github.com/bin456789/Unblock163MusicClient-Xposed)

[yi-ji/NeteaseMusicAbroad](https://github.com/yi-ji/NeteaseMusicAbroad)

[stomakun/NeteaseReverseLadder](https://github.com/stomakun/NeteaseReverseLadder/)

[LesterLyu/NeteaseReverseLadder](https://github.com/LesterLyu/NeteaseReverseLadder)

## License

MIT
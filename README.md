# Telegram-cn-l10n-bot
这只是一个发布 Telegram 翻译的 Bot  
开放实例：`@tgcnlang_bot`  
我们将该 Bot 作为分发语言文件的最佳途径。  

# How to install  
首先：  
```shell
npm install
```
然后使用文本编辑器打开main.js，在开头的指定位置填入API Key和管理员密码（不能有空格）。向下走，将所有的`@tgcnlang_bot`替换为您的bot名，并保存。 
最后：
```shell
node main.js
```
现在可以将shell放到一边，拿起自己的Telegram——
首先将要上传的语言文件发给Bot，获取file_id
然后使用`/setandroid`、`/setios`、`/setdesktop`这三个命令分别将file_id指定到文件槽中
具体用法：
```
/setxxxx file_id 管理员密码
```
收到Update xxx OK的消息即为上传成功，测试一下就可以投入使用了。

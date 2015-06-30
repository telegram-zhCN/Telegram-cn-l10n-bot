// 请不要尝试维护这段代码，除非您真的知道您在做什么，并且有一个很好的方案。 ----wfjsw
// 如果您真的维护了这段代码，并意识到这真的是浪费时间，请增加下面的计数器，以警示后人：
// total_hours_wasted_here = 8
        
var Telegram = require('telegram-bot');
var fs = require('fs')
var config = {};
var subscriber = {subscriber: []};


console.log("卫星准备发射")
// Read Config
config = JSON.parse(fs.readFileSync('config.json', {encoding: "utf8"}));
subscriber = JSON.parse(fs.readFileSync('subscriber.json', {encoding: "utf8"}));
// Done Read.


var tg = new Telegram(config.token);
var admin_password = config.password;

// Event to write config on exit.
process.on('SIGINT', function(code) {
  console.log('About to exit with code:', code);
  console.log('Writing file...');
  fs.writeFileSync('config.json', JSON.stringify(config));
  fs.writeFileSync('subscriber.json', JSON.stringify(subscriber));
  console.log('File Wrote. Exiting...');
  process.exit();
});
// End Exit Event.


tg.on('message', function(msg) {

    //Process File Uploading.
    if (msg.document) {
        tg.sendMessage({
            text: "[Dev Function]我发给您的是这个文件的 file_id",
            chat_id: msg.chat.id
        });
        tg.sendMessage({
            text: msg.document.file_id,
            chat_id: msg.chat.id
        });
        console.log("File_id sent. ")
        return;
    }
    //End of the sub process.

    //Process Commands.
    if (msg.text) {
        console.log("User " + msg.from.id + " : " + msg.from.username + " Group " + msg.chat.id + " : " + msg.chat.title + " Content " + msg.text);
        switch(msg.text)
        {
            case "/start@tgcnlang_bot":
            case "/start":
                tg.sendMessage({
                    text: "您好，欢迎访问 telegram-zhCN 项目的中文支持机器人。\n我的使命是向您发布最新的 Telegram 翻译文件，同时为您提供基础支持。\n您可以使用如下命令：\n\n/help：获取本帮助文档\n/getandroid：获取Android版翻译\n/getios：获取iOS版翻译\n/getdesktop：获取桌面版翻译\n/contact：获取我主人的联系方式\n/contrib：获取关于参与该项目的信息\n/subscribe：订阅语言包更新\n/unsubscribe：取消订阅语言包更新\n\n请注意 Telegram 软件一直在为实现更多功能而更新，未来我将担负起通知软件更新的职责，但当前您只能通过访问 http://telegram-china.org 网站来获取最新版软件。软件更新后，请回到我这里来查阅新的翻译文件。",
                    chat_id: msg.chat.id,
                    disable_web_page_preview: true
                });
                break;
            case "/help@tgcnlang_bot":
            case "/help":
                tg.sendMessage({
                    text: "您好，欢迎访问 telegram-zhCN 项目的中文支持机器人。\n我的使命是向您发布最新的 Telegram 翻译文件，同时为您提供基础支持。\n您可以使用如下命令：\n\n/help：获取本帮助文档\n/getandroid：获取Android版翻译\n/getios：获取iOS版翻译\n/getdesktop：获取桌面版翻译\n/contact：获取我主人的联系方式\n/contrib：获取关于参与该项目的信息\n/subscribe：订阅语言包更新\n/unsubscribe：取消订阅语言包更新\n\n请注意 Telegram 软件一直在为实现更多功能而更新，未来我将担负起通知软件更新的职责，但当前您只能通过访问 http://telegram-china.org 网站来获取最新版软件。软件更新后，请回到我这里来查阅新的翻译文件。",
                    chat_id: msg.chat.id,
                    disable_web_page_preview: true
                });
                break;
            case "/getandroid@tgcnlang_bot":
            case "/getandroid":
                if (config.file_android) {
                    tg.sendMessage({
                        text: "本次向您发送的是 Android 版的语言文件。请点击下载之后触摸该文件的右上角三个点，选择“Apply Localization File（应用本地化文件）”，然后选择“简体中文”。\n\n我们建议您回复 /subscribe 订阅语言包更新，订阅后我们将在语言包每次更新时通知到您，您可以随时取消订阅。（已订阅用户无视这句话）",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id
                    });
                    tg.sendDocument({
                        document: config.file_android,
                        chat_id: msg.chat.id
                    });
                }
                else {
                    tg.sendMessage({
                        text: "对不起，Android 翻译当前没有准备好。请联系 @wfjsw 获取详情。\n\n我们建议您回复 /subscribe 订阅语言包更新，订阅后我们将在语言包每次更新时通知到您，您可以随时取消订阅。（已订阅用户无视这句话）",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id
                    });
                }
                break;
            case "/getios@tgcnlang_bot":
            case "/getios":
                if (config.file_ios) {
                    tg.sendMessage({
                        text: "本次向您发送的是 iOS 版的语言文件。请点击下载之后触摸该文件，选择“Apply Localization File（应用本地化文件）”，然后选择“简体中文”。\n\n我们建议您回复 /subscribe 订阅语言包更新，订阅后我们将在语言包每次更新时通知到您，您可以随时取消订阅。（已订阅用户无视这句话）",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id
                    });
                    tg.sendDocument({
                        document: config.file_ios,
                        chat_id: msg.chat.id
                    });
                }
                else {
                    tg.sendMessage({
                        text: "对不起，iOS 翻译当前没有准备好。请联系 @wfjsw 获取详情。\n\n我们建议您回复 /subscribe 订阅语言包更新，订阅后我们将在语言包每次更新时通知到您，您可以随时取消订阅。（已订阅用户无视这句话）",
                        chat_id: msg.chat.id
                    });
                }
                break;
            case "/getdesktop@tgcnlang_bot":
            case "/getdesktop":
                if (config.file_desktop) {
                    tg.sendMessage({
                        text: "本次向您发送的是 桌面版 的语言文件。请点击下载之后将其保存到硬盘上，解压。点击标题栏上的“Settings(设置)”，下拉找到“Change Language(更换语言)”按住键盘上的Alt+Shift并点击它，在打开的对话框中找到刚刚解压的“桌面版汉化包.strings”文件并打开。\n\n我们建议您回复 /subscribe 订阅语言包更新，订阅后我们将在语言包每次更新时通知到您，您可以随时取消订阅。（已订阅用户无视这句话）",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id
                    });
                    tg.sendDocument({
                        document: config.file_desktop,
                        chat_id: msg.chat.id
                    });
                }
                else {
                    tg.sendMessage({
                        text: "对不起，桌面 版翻译当前没有准备好。请联系 @wfjsw 获取详情。\n\n我们建议您回复 /subscribe 订阅语言包更新，订阅后我们将在语言包每次更新时通知到您，您可以随时取消订阅。（已订阅用户无视这句话）",
                        chat_id: msg.chat.id
                    });
                }
                break;
            case "/contact@tgcnlang_bot":
            case "/contact":
                tg.sendMessage({
                    text: "我的作者： @wfjsw , 对各类问题有意见尽管来提吧w\n项目成员： @cD72082D948D199F , @wfjsw , @brainbush\n当然，聪明的人都会去GitHub瞅一眼，发个issue什么的，\n我们的团队地址： https://github.com/telegram-zhCN \nTelegram 中国网站： http://telegram-china.org/",
                    chat_id: msg.chat.id,
                    disable_web_page_preview: true
                });
                break;
            case "/contrib@tgcnlang_bot":
            case "/contrib":
                tg.sendMessage({
                    text: "想要加入这个项目？\n先来参观一下我们的GitHub团队吧： https://github.com/telegram-zhCN \n如果您有意向加入，请联系 @wfjsw 或 @cD72082D948D199F ，我们一直在这里等着您。",
                    reply_to_message_id: msg.message_id,
                    chat_id: msg.chat.id,
                    disable_web_page_preview: true
                });
                break;
            case "/subscribe@tgcnlang_bot":
            case "/subscribe":
                if (subscriber.subscriber.indexOf(msg.chat.id) == -1) {
                    subscriber.subscriber.push(msg.chat.id);
                    tg.sendMessage({
                        text: "我们已将您（或本群组）加入订阅者列表，您将实时收到语言文件更新通知。您可以随时输入 /unsubscribe 来取消订阅。",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id,
                    });
                }
                else 
                {
                    tg.sendMessage({
                        text: "您（或本群组）已经加入订阅者列表，无需重复加入。要取消订阅请输入 /unsubscribe",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id,
                    });
                }
                break;
            case "/unsubscribe@tgcnlang_bot":
            case "/unsubscribe":
                var thissubid = subscriber.subscriber.indexOf(msg.chat.id);
                if (thissubid > -1) {
                    subscriber.subscriber.splice(thissubid, 1);
                    tg.sendMessage({
                        text: "我们已将您（或本群组）移出订阅者列表，您将不会再收到语言文件更新通知。",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id,
                    });
                }
                else 
                {
                    tg.sendMessage({
                        text: "您（或本群组）没有加入订阅者列表。要加入订阅请输入 /subscribe",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id,
                    });
                }
                break;
            default:
                var setaction = /^\/(setandroid|setios|setdesktop|broadcast){1}\s(\S+)\s(\S+)$/;
                if (setaction.test(msg.text)) {
                    var matchresult = setaction.exec(msg.text);
                    if (matchresult[3]==admin_password){
                        switch(matchresult[1]) {
                            case "setandroid":
                                config.file_android = matchresult[2];
                                tg.sendMessage({
                                    text: "Update Android OK",
                                    chat_id: msg.chat.id
                                });
                                break;
                            case "setios":
                                config.file_ios = matchresult[2];
                                tg.sendMessage({
                                    text: "Update iOS OK",
                                    chat_id: msg.chat.id
                                });
                                break;
                            case "setdesktop":
                                config.file_desktop = matchresult[2];
                                tg.sendMessage({
                                    text: "Update Desktop OK",
                                    chat_id: msg.chat.id
                                });
                                break;
                            case "broadcast":
                                tg.sendMessage({
                                    text: "We will broadcast '" + matchresult[2] + "' to all subscribers. ",
                                    chat_id: msg.chat.id
                                });
                                for(var i = subscriber.subscriber - 1; i >= 0; i--) {
                                    tg.sendMessage({
                                        text: '订阅更新：\n' + matchresult[2] + '\n\n回复 /unsubscribe 取消订阅。',
                                        chat_id: subscriber.subscriber[i]
                                    });
                                }
                            default:
                                tg.sendMessage({
                                    text: "程式错误，请检查您的输入。",
                                    chat_id: msg.chat.id
                                });

                        }
                    }
                    else
                    {
                        tg.sendMessage({
                            text: "密码错误，请检查您的输入。",
                            chat_id: msg.chat.id
                        });
                    }
                }
                else
                {
                    if (!msg.chat.title) {
                        tg.sendMessage({
                        text: "对不起，但我无法理解您在说什么，请回复 /help 获取帮助，或回复 /contact 来找个人类聊天('・ω・')",
                        reply_to_message_id: msg.message_id,
                        chat_id: msg.chat.id
                        });
                    }
                }
        }
    }
    //End of the sub process.
});

tg.start();
console.log("卫星成功发射")

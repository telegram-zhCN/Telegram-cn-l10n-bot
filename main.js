//请不要尝试维护这段代码，除非您真的知道您在做什么，并且有一个很好的方案。 ----wfjsw
//total_hours_wasted_here = 4

var Telegram = require('telegram-bot');
var tg = new Telegram('<Give me your token>'); //TODO: Make this progress automatic.
var sessions = {
    "file_android": "",
    "file_ios": "",
    "file_desktop": ""
    };


tg.on('message', function(msg) {

    //Process File Uploading.
    if (msg.document) {
        tg.sendMessage({
            text: "[Dev Function]接下来我发给您的是这个文件的 file_id",
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
        console.log("Get Text Message: " + msg.text);
        switch(msg.text)
        {
            case "/start":
                tg.sendMessage({
                    text: "您好，欢迎访问 telegram-zhCN 项目的中文支持机器人。\n我的使命是向您发布最新的 Telegram 翻译文件，同时为您提供基础支持。\n您可以使用如下命令：\n\n/help：获取本帮助文档\n/getandroid：获取Android版翻译\n/getios：获取iOS版翻译\n/getdesktop：获取Desktop版翻译\n/contact：获取我主人的联系方式，如果您想提出一些问题，或只是为了交个朋友闲聊天w\n/contrib：获取关于参与该项目的信息\n\n请注意 Telegram 软件一直在为实现更多功能而更新，未来我将担负起通知软件更新的职责，但当前您只能通过访问 http://telegram-china.org 网站来获取最新版软件。软件更新后，请回到我这里来查阅新的翻译文件。",
                    chat_id: msg.chat.id
                });
                break;
            case "/help":
                tg.sendMessage({
                    text: "您好，欢迎访问 telegram-zhCN 项目的中文支持机器人。\n我的使命是向您发布最新的 Telegram 翻译文件，同时为您提供基础支持。\n您可以使用如下命令：\n\n/help：获取本帮助文档\n/getandroid：获取Android版翻译\n/getios：获取iOS版翻译\n/getdesktop：获取Desktop版翻译\n/contact：获取我主人的联系方式，如果您想提出一些问题，或只是为了交个朋友闲聊天w\n/contrib：获取关于参与该项目的信息\n\n请注意 Telegram 软件一直在为实现更多功能而更新，未来我将担负起通知软件更新的职责，但当前您只能通过访问 http://telegram-china.org 网站来获取最新版软件。软件更新后，请回到我这里来查阅新的翻译文件。",
                    chat_id: msg.chat.id
                });
                break;
            case "/getandroid":
                if (sessions.file_android!="") {
                    tg.sendMessage({
                        text: "接下来将向您发送 Android 版的语言文件。请点击下载之后触摸该文件的右上角三个点，选择“Apply Localization File（应用本地化文件）”，然后选择“简体中文”。",
                        chat_id: msg.chat.id
                    });
                    tg.sendDocument({
                        document: sessions.file_android,
                        chat_id: msg.chat.id
                    });
                }
                else {
                    tg.sendMessage({
                        text: "对不起，Android 翻译当前没有准备好。请联系 @wfjsw 获取详情。",
                        chat_id: msg.chat.id
                    });
                }
                break;
            case "/getios":
                if (sessions.file_ios!="") {
                    tg.sendMessage({
                        text: "接下来将向您发送 iOS 版的语言文件。请点击下载之后触摸该文件，选择“Apply Localization File（应用本地化文件）”，然后选择“简体中文”。",
                        chat_id: msg.chat.id
                    });
                    tg.sendDocument({
                        document: sessions.file_ios,
                        chat_id: msg.chat.id
                    });
                }
                else {
                    tg.sendMessage({
                        text: "对不起，iOS 翻译当前没有准备好。请联系 @wfjsw 获取详情。",
                        chat_id: msg.chat.id
                    });
                }
                break;
            case "/getdesktop":
                if (sessions.file_desktop!="") {
                    tg.sendMessage({
                        text: "接下来将向您发送 桌面 版的语言文件。请点击下载之后将其保存到硬盘上。点击标题栏上的“Settings(设置)”，下拉找到“Change Language(更换语言)”按住键盘上的Alt+Shift并点击它，在打开的对话框中找到刚刚下载的“strings”文件并打开。",
                        chat_id: msg.chat.id
                    });
                    tg.sendDocument({
                        document: sessions.file_desktop,
                        chat_id: msg.chat.id
                    });
                }
                else {
                    tg.sendMessage({
                        text: "对不起，桌面 版翻译当前没有准备好。请联系 @wfjsw 获取详情。",
                        chat_id: msg.chat.id
                    });
                }
                break;
            case "/contact":
                tg.sendMessage({
                    text: "我的作者： @wfjsw , 对各类问题有意见尽管来提吧w\n项目成员： @cD72082D948D199F , @wfjsw , @brainbush\n当然，聪明的人都会去GitHub瞅一眼，发个issue什么的，\n我们的团队地址： https://github.com/telegram-zhCN \nTelegram 中国网站： http://telegram-china.org/",
                    chat_id: msg.chat.id
                });
                break;
            case "/contrib":
                tg.sendMessage({
                    text: "想要加入这个项目？\n先来参观一下我们的GitHub团队吧： https://github.com/telegram-zhCN \n如果您有意向加入，请联系 @wfjsw 或 @cD72082D948D199F ，我们一直在这里等着您。",
                    chat_id: msg.chat.id
                });
                break;
            default:
                var actionregex = /^\/set(android|ios|desktop){1}\s(.+)$/;
                if (actionregex.test(msg.text)) {
                    var matchresult = actionregex.exec(msg.text);
                    switch(matchresult[1]) {
                        case "android":
                            sessions.file_android = matchresult[2];
                            tg.sendMessage({
                                text: "Upload Android OK",
                                chat_id: msg.chat.id
                            });
                            break;
                        case "ios":
                            sessions.file_ios = matchresult[2];
                            tg.sendMessage({
                                text: "Upload iOS OK",
                                chat_id: msg.chat.id
                            });
                            break;
                        case "desktop":
                            sessions.file_desktop = matchresult[2];
                            tg.sendMessage({
                                text: "Upload Desktop OK",
                                chat_id: msg.chat.id
                            });
                            break;
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
                    text: "对不起我不知道您在说什么，请回复/help获取帮助，或回复/contact来找个人类聊天('・ω・')",
                    chat_id: msg.chat.id
                    });
                }
        }
    }
    //End of the sub process.
});

console.log("Rocket is ready to launch.")
tg.start();

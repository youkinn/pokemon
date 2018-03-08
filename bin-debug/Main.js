//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
                // console.log('hello,world')
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("create_role");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "create_role") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var bg = this.createBitmapByName('create_role_bg_jpg');
        this.addChild(bg);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        bg.width = stageW;
        bg.height = stageH;
        var create_chose_role = new egret.Bitmap(RES.getRes('create_chose_role_png'));
        create_chose_role.x = 160;
        create_chose_role.y = 0;
        create_chose_role.width = 320;
        this.addChild(create_chose_role);
        var back_server = new egret.Bitmap(RES.getRes('back_server_png'));
        back_server.x = 500;
        back_server.y = 5;
        this.addChild(back_server);
        var roleWidth = 158;
        var roleHeight = roleWidth / (118 / 227);
        var roleHeight2 = roleWidth / (118 / 179);
        var roles = [
            {
                pic: 'role_1_png',
                pic2: '21000_12_1_png',
                x: 0,
                y: 50,
                width: roleWidth,
                height: roleHeight
            }, {
                pic: 'role_2_png',
                pic2: '21000_12_2_png',
                x: 160,
                y: 95,
                width: roleWidth,
                height: roleHeight2
            }, {
                pic: 'role_3_png',
                pic2: '21000_12_3_png',
                x: 320,
                y: 95,
                width: roleWidth,
                height: roleHeight2
            }, {
                pic: 'role_4_png',
                pic2: '21000_12_4_png',
                x: 480,
                y: 50,
                width: roleWidth,
                height: roleHeight
            }
        ];
        var that = this;
        var role;
        var rolePic2;
        var item;
        var arr = [];
        var msec = 1050;
        for (var i = 0, j = roles.length; i < j; i++) {
            item = roles[i];
            role = new egret.Bitmap(RES.getRes(item.pic));
            role.x = item.x;
            role.y = item.y;
            role.width = item.width;
            role.height = item.height;
            rolePic2 = new egret.Bitmap(RES.getRes(item.pic2));
            arr.push(rolePic2);
            this.addChild(role);
            role.touchEnabled = true;
            var handle;
            (function (i, role, rolePic2) {
                role.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    for (var i_1 = 0, j_1 = arr.length; i_1 < j_1; i_1++) {
                        arr[i_1].width = 0;
                        arr[i_1].height = 0;
                    }
                    rolePic2.width = 280;
                    rolePic2.height = rolePic2.width / (212 / 319);
                    rolePic2.x = (640 - rolePic2.width) / 2;
                    rolePic2.y = 390;
                    that.addChild(rolePic2);
                    if (handle) {
                        clearInterval(handle);
                    }
                    shakeRole(rolePic2, msec / 2);
                    handle = setInterval(function () {
                        shakeRole(rolePic2, msec / 2);
                    }, msec);
                }, that);
            })(i, role, rolePic2);
        }
        function shakeRole(target, msec2) {
            egret.Tween.get(target)
                .to({ y: target.y + 10 }, msec2, egret.Ease.cubicIn)
                .to({ y: target.y }, msec2, egret.Ease.cubicOut);
        }
    };
    // private shakeRole(target, y, msec) {
    //     setInterval(function () {
    //         target
    //             .to({ y: y + 10 }, msec / 2, egret.Ease.cubicIn)
    //             .to({ y: y }, msec / 2, egret.Ease.cubicOut);
    //     }, msec);
    // }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map
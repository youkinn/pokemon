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

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
                // console.log('hello,world')
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("create_role");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "create_role") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        let bg = this.createBitmapByName('create_role_bg_jpg');
        this.addChild(bg);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        bg.width = stageW;
        bg.height = stageH;

        let create_chose_role = new egret.Bitmap(RES.getRes('create_chose_role_png'));
        create_chose_role.x = 160;
        create_chose_role.y = 0;
        create_chose_role.width = 320;
        this.addChild(create_chose_role);

        let back_server = new egret.Bitmap(RES.getRes('back_server_png'));
        back_server.x = 500;
        back_server.y = 5;
        this.addChild(back_server);

        const roleWidth = 158;
        const roleHeight = roleWidth / (118 / 227);
        const roleHeight2 = roleWidth / (118 / 179);
        const roles = [
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
        const that = this;
        let role;
        let rolePic2;
        let item;
        let arr = [];
        const msec = 1050;
        for (let i = 0, j = roles.length; i < j; i++) {
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
            (function (i, role, rolePic2) {
                role.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    for (let i = 0, j = arr.length; i < j; i++) {
                        arr[i].parent && arr[i].parent.removeChild(arr[i]);
                    }
                    jump(rolePic2);
                }, that);
            })(i, role, rolePic2);
            if (i == 0) {
                jump(rolePic2);
            }
        }

        let roleNameContainer = new egret.Sprite();
        roleNameContainer.x = 160;
        roleNameContainer.y = 800;
        roleNameContainer.width = 320;
        roleNameContainer.height = 50;
        this.addChild(roleNameContainer);

        let role_name_bg_png = new egret.Bitmap(RES.getRes('role_name_bg_png'));
        role_name_bg_png.x = 160;
        role_name_bg_png.y = 800;
        role_name_bg_png.width = 320;
        this.addChild(role_name_bg_png);

        let label: egret.TextField = new egret.TextField();
        label.x = 180;
        label.y = 810;
        label.text = '嘎啦嘎啦';
        label.textColor = 0xffffff;
        label.size = 24;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.touchEnabled = true;
        roleNameContainer.addChild(label); 

        label.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
            label.setFocus();
        }, this);

        function jump(obj) {
            obj.width = 240;
            obj.height = obj.width / (212 / 349);
            obj.x = (640 - obj.width) / 2;
            obj.y = 370;
            that.addChild(obj);

            egret.Tween.get(obj, { loop: true })
                .to({ y: obj.y + 10 }, msec / 2, egret.Ease.backInOut)
                .to({ y: obj.y }, msec / 2, egret.Ease.backInOut);
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}



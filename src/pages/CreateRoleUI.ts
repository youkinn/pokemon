class CreateRoleUI extends eui.Component {
    private rolePic: eui.Image;
    private rdRole1: eui.RadioButton;
    private rdRole2: eui.RadioButton;
    private rdRole3: eui.RadioButton;
    private rdRole4: eui.RadioButton;
    private btnRoles: eui.RadioButton[];
    private btnCrap: eui.RadioButton;
    private txtName: eui.TextInput;
    private btnStart: eui.Button;
    private nameConfig;
    private sex = {
        MALE: 'male',
        FEMALE: 'female',
    };

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = 'resource/skins/createRoleUISkin.exml';
    }

    private uiCompHandler(e: egret.Event): void {
        this.loadNameConfig();

        let item = {};
        this.btnRoles = [this.rdRole1, this.rdRole2, this.rdRole3, this.rdRole4];
        const rolePics = ['21000_12_1_png', '21000_12_2_png', '21000_12_3_png', '21000_12_4_png'];
        for (let i = 0, j = this.btnRoles.length; i < j; i++) {
            this.btnRoles[i].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.touchHandler(rolePics[i]);
            }, this);
        }
        this.btnRoles[0].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, rolePics[0]);

        this.btnCrap.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
            const name = this.createRoleName(this.sex.MALE);
            this.txtName.text = name;
            console.log(name);
        }, this);

        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
            console.log('start');
        }, this);
    }

    private touchHandler(source): void {
        this.rolePic.source = source;
        this.addChild(this.rolePic);
        egret.Tween.get(this.rolePic, { loop: true })
            .to({ y: this.rolePic.y + 8 }, 800, egret.Ease.backIn)
            .to({ y: this.rolePic.y }, 800, egret.Ease.backIn);
    }

    private loadNameConfig(): void {
        var urlloader: egret.URLLoader = new egret.URLLoader();
        var urlreq: egret.URLRequest = new egret.URLRequest();
        urlreq.url = "resource/config/nameConfig.json";
        urlloader.load(urlreq);
        urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
    }

    // 读取配置文件完成
    private onComplete(event: egret.Event): void {
        var data = event.target.data;
        this.nameConfig = JSON.parse(data);
    }

    /**
     * 随机产生角色名字
     */
    private createRoleName(sex: string): string {
        const nameList = this.nameConfig[sex];
        const index = Math.random();
        const firstName = nameList['first_name'][parseInt(index * nameList['first_name'].length + '')];
        const secondName = nameList['second_name'][parseInt(index * nameList['second_name'].length + '')];
        return firstName + secondName;
    }
}
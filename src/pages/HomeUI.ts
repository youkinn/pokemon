/**
 * Created by egret on 2016/1/20.
 */

class HomeUI extends eui.Component {
    private btns;
    private _mbtnFocused;
    private mbtnHome; // 首页
    private mbtnTeam; // 阵容
    private mbtnAdventure; // 冒险
    private mbtnChance; // 奇遇
    private mbtnPackage; // 背包

    public _uiFocused: eui.Component;
    private _pageFocusedPrev: string;
    private imgBg: eui.Image;
    private _pageFocused: string;
    private _teamUI: TeamUI;
    private _adventureUI: AdventureUI;
    private _chanceUI: ChanceUI;
    private _packageUI: PackageUI;
    private _stageUI: StageUI;

    private mbtnStage: eui.ToggleButton; // 王者之路
    private mbtnBoss: eui.ToggleButton; // 世界boss
    private mbtnWarCenter: eui.ToggleButton; // 对战中心
    private mbtnGuildHall: eui.ToggleButton; // 工会大厅
    private mbtnThomas: eui.ToggleButton; // 扭蛋机
    private mbtnResearchCenter: eui.ToggleButton; // 研究中心

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = 'resource/skins/homeUISkin.exml';
    }

    private uiCompHandler(): void {
        console.log('HomeUI uiCompHandler');

        this.btns = [this.mbtnHome, this.mbtnTeam, this.mbtnAdventure, this.mbtnChance, this.mbtnPackage];
        for (let i = 0, j = this.btns.length; i < j; i++) {
            this.btns[i].touchEnabled = true;
            this.btns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        }

        /// 首次加载完成首先显示home
        this.goHome();
    }

    private resetFocus(): void {
        console.log(' resetFocus ');
        if (this._uiFocused) {
            if (this._uiFocused.parent) {
                this._uiFocused.parent.removeChild(this._uiFocused);
            }
            this._uiFocused = null;
        }
        if (this._mbtnFocused != null) {
            this._mbtnFocused.getChildByName('mbtn').selected = false;
            this._mbtnFocused.enabled = true;
            this._mbtnFocused = null;
        }
    }

    private goHome(): void {
        console.log(' ---------- HOME ---------- ');
        this._pageFocusedPrev = this._pageFocused = GamePages.HOME;
        this.imgBg.visible = false;
    }

    private mbtnHandler(evt: egret.TouchEvent): void {

        /// 已经选中不应当再处理!
        if (evt.currentTarget === this._mbtnFocused) {
            console.log(evt.currentTarget.name, '已经选中不应当再处理!');
            return;
        }
        /// 逻辑生效，所有按钮锁定
        for (var i: number = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = false;
        }

        /// 移除上一焦点对应的按钮
        if (this._mbtnFocused) {
            this._mbtnFocused.getChildByName('mbtn').selected = false;
            this._mbtnFocused.enabled = true;
        }

        /// 移除上一焦点对应的UI
        if (this._uiFocused && this._uiFocused.parent) {
            this._uiFocused.parent.removeChild(this._uiFocused);
        }

        /// 设置当前焦点按钮
        this._mbtnFocused = evt.currentTarget;
        console.log('选中', this._mbtnFocused.name);
        this._mbtnFocused.enabled = false;
        /// 焦点UI重置
        this._uiFocused = null;

        this._pageFocusedPrev = this._pageFocused;
        switch (this._mbtnFocused) {
            case this.mbtnHome:
                this._pageFocused = GamePages.HOME;
                this.goHome();
                return;
            case this.mbtnStage:
                this._pageFocused = GamePages.STAGE;
                break;
            case this.mbtnTeam:
                this._pageFocused = GamePages.TEAM;
                break;
            case this.mbtnAdventure:
                this._pageFocused = GamePages.ADVENTURE;
                break;
            case this.mbtnChance:
                this._pageFocused = GamePages.CHANCE;
                break;
            case this.mbtnPackage:
                this._pageFocused = GamePages.PACKAGE;
                break;
        }
        this.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false, {
            module: 'home',
            page: this._pageFocused
        });
    }

    createChildren(): void {
        super.createChildren();
    }

    public pageReadyHandler(pageName: String): void {
        console.log('页面就绪:', pageName);

        // 页面加载完成，所有非焦点按钮解锁
        for (var i: number = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = !this.btns[i].getChildByName('mbtn').selected;
        }

        switch (pageName) {
            case GamePages.STAGE:
                if (!this._stageUI) {
                    this._stageUI = new StageUI();
                }
                this.imgBg.source = 'common_bg_jpg';
                this.imgBg.visible = true;
                this._uiFocused = this._stageUI;
                break;
            case GamePages.TEAM:
                if (!this._teamUI) {
                    this._teamUI = new TeamUI();
                }
                this.imgBg.source = 'common_bg_jpg';
                this.imgBg.visible = true;
                this._uiFocused = this._teamUI;
                break;
            case GamePages.ADVENTURE:
                if (!this._adventureUI) {
                    this._adventureUI = new AdventureUI();
                }
                this.imgBg.source = 'common_bg_jpg';
                this.imgBg.visible = true;
                this._uiFocused = this._adventureUI;
                break;
            case GamePages.CHANCE:
                if (!this._chanceUI) {
                    this._chanceUI = new ChanceUI();
                }
                this.imgBg.source = 'common_bg_jpg';
                this.imgBg.visible = true;
                this._uiFocused = this._chanceUI;
                break;
            case GamePages.PACKAGE:
                if (!this._packageUI) {
                    this._packageUI = new PackageUI();
                }
                this.imgBg.source = 'common_bg_jpg';
                this.imgBg.visible = true;
                this._uiFocused = this._packageUI;
                break;
        }
        this._uiFocused.visible = true;
        /// 总是把页面放在背景的上一层！
        this.addChildAt(this._uiFocused, this.getChildIndex(this.imgBg) + 1);
    }
}
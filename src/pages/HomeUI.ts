/**
 * Created by egret on 2016/1/20.
 */

class HomeUI extends eui.Component {
    private btns: eui.ToggleButton[];
    private mbtnStage: eui.ToggleButton; // 王者之路
    private mbtnBoss: eui.ToggleButton; // 世界boss
    private mbtnWarCenter: eui.ToggleButton; // 对战中心
    private mbtnGuildHall: eui.ToggleButton; // 工会大厅
    private mbtnThomas: eui.ToggleButton; // 扭蛋机
    private mbtnResearchCenter: eui.ToggleButton; // 研究中心
    private _mbtnFocused: eui.ToggleButton;
    private _stageUI: StageUI;
    private _uiFocused: eui.Component;
    private imgBg: eui.Image;
    private _pageFocused: string;

    constructor() {
        super();

        //console.log( 'new HomeUI 资源：', RES.getRes( 'commonBg_jpg' ) );
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = 'resource/skins/homeUISkin.exml';
    }

    private uiCompHandler(): void {
        console.log('HomeUI uiCompHandler');

        this.btns = [this.mbtnStage, this.mbtnBoss, this.mbtnBoss, this.mbtnWarCenter, this.mbtnGuildHall, this.mbtnThomas, this.mbtnResearchCenter];
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
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
            this._mbtnFocused = null;
        }
    }

    private goHome(): void {
        console.log(' ---------- HOME ---------- ');
        this._pageFocusedPrev = this._pageFocused = GamePages.HOME;
        // this.imgBg.source = '';
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
        //console.log( 'remove _mbtnFocused:', this._mbtnFocused );
        if (this._mbtnFocused) {
            this._mbtnFocused.selected = false;
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
            case this.mbtnStage:
                this._pageFocused = GamePages.STAGE;
                break;
        }
        this.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false, this._pageFocused);
    }
    private _pageFocusedPrev: string;

    createChildren(): void {
        super.createChildren();
    }

    public pageReadyHandler(pageName: String): void {
        console.log('页面就绪:', pageName);

        // 页面加载完成，所有非焦点按钮解锁
        for (var i: number = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = !this.btns[i].selected;
        }

        switch (pageName) {
            case GamePages.STAGE:
                if (!this._stageUI) {
                    this._stageUI = new StageUI();
                    this._stageUI.addEventListener(GameEvents.EVT_RETURN, () => {
                        this.resetFocus();
                        this.goHome();
                    }, this);
                }
                this._uiFocused = this._stageUI;
                break;
        }
        /// 总是把页面放在背景的上一层！
        this.addChildAt(this._uiFocused, 100);
    }
}
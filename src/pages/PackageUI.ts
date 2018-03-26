class PackageUI extends eui.Component {
    private tabBar: eui.TabBar;
    private viewStack: eui.ViewStack;

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/skins/packageUISkin.exml";
    }

    private uiCompHandler(e: egret.Event): void {
        let index = 0;
        let mtbn: eui.ToggleButton;
        this.tabBar.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
            index = this.tabBar.selectedIndex;
            for (let i = 0, j = this.tabBar.numChildren; i < j; i++) {
                mtbn = this.tabBar.getChildAt(i).$children[0] as eui.ToggleButton;
                mtbn.selected = (index === i) ? true : false;
                console.log(mtbn);
            }
        }, this);
    }
}
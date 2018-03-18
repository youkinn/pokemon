class PackageUI extends eui.Component {

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/skins/packageUISkin.exml";
    }

    private uiCompHandler(e: egret.Event): void {
        
    }
}
class ChanceUI extends eui.Component {

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/skins/chanceUISkin.exml";
    }

    private uiCompHandler(e: egret.Event): void {
        
    }
}
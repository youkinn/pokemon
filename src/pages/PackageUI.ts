class PackageUI extends eui.Component {
    private tabBar: eui.TabBar;
    private viewStack: eui.ViewStack;

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/skins/packageUISkin.exml";
    }

    private uiCompHandler(e: egret.Event): void {
        // //将 tabBat 的数据源设置为 viewStack
        // this.tTabBar.dataProvider = [];
        // const arr = [{ label: '物品' }, { label: '装备' }];
        // let collection = new eui.ArrayCollection();
        // collection.source = arr;
        // this.tTabBar.dataProvider = collection;
        // debugger;



        // this.tViewStack.selectedIndex = 1;
        // this.tTabBar.dataProvider = this.tViewStack;
    }
}
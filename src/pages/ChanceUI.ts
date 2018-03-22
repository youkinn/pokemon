class ChanceUI extends eui.Component {
    private listHeros: eui.List;
    private scrListHeros: eui.Scroller;

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = 'resource/skins/chanceUISkin.exml';
    }

    private uiCompHandler(): void {
        console.log('\t\tHerosUI uiCompHandler');

        /// 填充数据
        let dsListHeros: Array<Object> = [];
        for (let i = 1, j = 14; i < j; i++) {
            dsListHeros.push({
                image: 'activity' + i + '_png'
            });
        }
        this.listHeros.dataProvider = new eui.ArrayCollection(dsListHeros);
        this.listHeros.itemRenderer = ChanceListIRSkin;

        this.scrListHeros.viewport.validateNow();
        this.scrListHeros.viewport.scrollV = 0;
    }

    protected createChildren(): void {
        super.createChildren();
    }
}

class ChanceListIRSkin extends eui.ItemRenderer {

    constructor() {
        super();
        this.skinName = 'resource/skins/chanceItemSkin.exml';
    }

    protected createChildren(): void {
        super.createChildren();
    }

}
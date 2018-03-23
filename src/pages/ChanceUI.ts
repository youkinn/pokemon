class ChanceUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.skinName = 'resource/skins/chanceUISkin.exml';
  }

  private uiCompHandler(): void {
    console.log('\t\t ChanceUI uiCompHandler');

    /// 填充数据
    let dsListHeros: Array<Object> = [];
    for (let i = 1, j = 14; i < j; i++) {
      dsListHeros.push({
        image: 'activity' + i + '_png'
      });
    }
    this.listActivity.dataProvider = new eui.ArrayCollection(dsListHeros);
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

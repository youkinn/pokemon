class GoodsUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.skinName = 'resource/skins/package/goodsUISkin.exml';
  }

  private uiCompHandler(): void {
    console.log('\t\t GoodsUI uiCompHandler');
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

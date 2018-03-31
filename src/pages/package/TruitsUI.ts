class TruitsUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.skinName = 'resource/skins/package/truitsUISkin.exml';
  }

  private uiCompHandler(): void {
    console.log('\t\t TruitsUI uiCompHandler');
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

class TaloUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.skinName = 'resource/skins/package/taloUISkin.exml';
  }

  private uiCompHandler(): void {
    console.log('\t\t TaloUI uiCompHandler');
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

class DiamondUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.skinName = 'resource/skins/package/diamondUISkin.exml';
  }

  private uiCompHandler(): void {
    console.log('\t\t DiamondUI uiCompHandler');
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

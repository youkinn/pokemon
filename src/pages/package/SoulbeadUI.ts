class SoulbeadUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.skinName = 'resource/skins/package/soulbeadUISkin.exml';
  }

  private uiCompHandler(): void {
    console.log('\t\t SoulbeadUI uiCompHandler');
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

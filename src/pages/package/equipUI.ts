class EquipUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.skinName = 'resource/skins/package/equipUISkin.exml';
  }

  private uiCompHandler(): void {
    console.log('\t\t EquipUI uiCompHandler');
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

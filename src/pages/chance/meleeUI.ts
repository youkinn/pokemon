class MeleeUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.name = GamePages.MELEE;
    this.skinName = 'resource/skins/chance/meleeUISkin.exml';
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
  }

  private uiCompHandler(): void {
    console.log('\t\t Melee uiCompHandler');
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

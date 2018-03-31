class PokemomUI extends eui.Component {
  private listActivity: eui.List;

  constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.skinName = 'resource/skins/package/pokemomUISkin.exml';
  }

  private uiCompHandler(): void {
    console.log('\t\t PokemomUI uiCompHandler');
  }

  protected createChildren(): void {
    super.createChildren();
  }
}

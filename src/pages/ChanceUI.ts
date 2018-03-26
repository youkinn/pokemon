class ChanceUI extends eui.Component {
  private listActivity: eui.List;
  private _pageFocusedPrev: string;

  private _uiFocused: eui.Component;
  private imgBg: eui.Image;
  private _meleeUI: MeleeUI;

  constructor() {
    super();
    this.name = GamePages.CHANCE;
    this.skinName = 'resource/skins/chanceUISkin.exml';
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
    this.addEventListener(eui.UIEvent.DEACTIVATE, this.uiChangeHandler, this);
  }

  private uiCompHandler(): void {
    console.log('\t\t ChanceUI uiCompHandler');

    const config = RES.getRes('aitivety_json');

    /// 填充数据
    const dsListHeros: Array<Object> = config.activitys;
    this.listActivity.dataProvider = new eui.ArrayCollection(dsListHeros);
    this.listActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandle, this);
  }

  private uiChangeHandler(): void {
    debugger;
  }

  protected createChildren(): void {
    super.createChildren();
  }

  /**
   * 列表点击事件处理函数
   */
  private tapHandle(e: egret.TouchEvent): void {
    this.parent.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false, {
      module: 'chance',
      page: e.target.name
    });
  }

  /**
   * 页面显示
   */
  public pageReadyHandler(pageName: String): void {
    console.log('页面就绪:', pageName);

    switch (pageName) {
      case GamePages.MELEE:
        if (!this._meleeUI) {
          this._meleeUI = new MeleeUI();
        }
        this._uiFocused = this._meleeUI;
        break;
    }
    /// 总是把页面放在背景的上一层！
    this.parent.addChildAt(this._uiFocused, this.parent.getChildIndex(this) + 1);
    this.visible = false;
  }
}

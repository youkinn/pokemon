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

    //创建内容，边长为50 * 50 的格子 9 * 9个。
    // var content: egret.Shape = this.createGird(50, 50, 200, 200);
    var scaleX = 1;
    var scaleY = 1;
    var content: eui.Group = this.createGird(256 * scaleX, 159 * scaleY, 20, 20);

    //创建ScrollView
    var myscrollView: egret.ScrollView = new egret.ScrollView();
    myscrollView.setContent(content);
    myscrollView.width = this.stage.width;
    myscrollView.height = this.stage.height;
    myscrollView.x = 0;
    myscrollView.y = 0;
    // myscrollView.anchorOffsetX = myscrollView.width / 2;
    // myscrollView.anchorOffsetY = myscrollView.height / 2;
    this.addChild(myscrollView);
  }

  //创建格子函数，根据输入的宽和高来创建一个 cloumn * row的格子图。并返回Shape对象。
  private createGird(width: number, height: number,  totalRow: number, totalCloumn: number): eui.Group {
    var shape: eui.Group = new eui.Group();
    shape.width = 10000;
    shape.height = 10000;

    var offsetX = 1000;
    var offsetY = 1000;

    // shape.anchorOffsetX = (((totalRow - 1) * 130 + offsetX) + (totalCloumn - 1) * 130) / 2;
    // shape.anchorOffsetY = (((totalRow - 1) * 79.5 + offsetX) + (totalCloumn - 1) * 79.5) / 2;
    // console.log(shape.anchorOffsetX, shape.anchorOffsetY);

    var baseX = 0;
    var baseY = 0;
    let minY = 0;
    let maxY = 0;

    for (var row = 1; row < totalRow + 1; row++) {
      baseX = (row - 1) * 130 ;
      baseY = (row - 1) * -79.5 + (510.5 + 2510.5) / 2;
      for (var cloumn = 1; cloumn < totalCloumn + 1; cloumn++) {
        var image: eui.Image = new eui.Image(RES.getRes('melee_json.melee_ground_1'));
        image.x = baseX + (cloumn - 1) * 130;
        image.y = baseY + (cloumn - 1) * 79.5;
        if (image.y < minY){
          minY = image.y;
        }
        if (image.y > maxY){
          maxY = image.y;
        }
        console.log(`第${row}行第${cloumn}列，坐标：(${image.x},${image.y})`);
        image.width = width;
        image.height = height;
        shape.addChild(image);
      }
    }
    console.log(minY, maxY);
    // return shape;
    return shape;
  }
}

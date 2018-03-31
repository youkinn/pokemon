class MeleeUI extends eui.Component {
  private scrollContent: eui.Group;
  private listGround: eui.List;

  /*设置请求*/
  private request: egret.HttpRequest;
  /*设置资源加载路径*/
  private url: string;

  constructor() {
    super();
    this.name = GamePages.MELEE;
    this.skinName = 'resource/skins/chance/meleeUISkin.exml';
    // this.skinName = 'resource/skins/test.exml';
    this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);

    this.url = "resource/part/melee/tt.tmx";
    /*初始化请求*/
    this.request = new egret.HttpRequest();
    /*监听资源加载完成事件*/
    this.request.once(egret.Event.COMPLETE, this.onMapComplete, this);
    /*发送请求*/
    this.request.open(this.url, egret.HttpMethod.GET);
    this.request.send();
  }

  private uiCompHandler(): void {
    console.log('\t\t Melee uiCompHandler');


    

    // var scaleX = 1;
    // var scaleY = 1;

    // var arr = this.createGird2(256 * scaleX, 159 * scaleY, 20, 20);
    // console.log(arr);
    // // arr = [{x: 0, y: 0}, {x: 130, y: 79.5}, {x: 260, y: 159}, {x: 390, y: 238.5}, {x: 520, y: 318}];
    // this.listGround.dataProvider = new eui.ArrayCollection(arr);

    var content: eui.Group = this.scrollContent;


    // //创建ScrollView
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

  protected createChildren(): void {
    super.createChildren();

    //创建内容，边长为50 * 50 的格子 9 * 9个。
    // var content: egret.Shape = this.createGird(50, 50, 200, 200);
    // var content: eui.Group = this.createGird(256 * scaleX, 159 * scaleY, 20, 20);

  }

  /*地图加载完成*/
  private onMapComplete(event: egret.Event) {
    /*获取到地图数据*/
    var data: any = egret.XML.parse(event.currentTarget.response);
    /*初始化地图*/
    var tmxTileMap: tiled.TMXTilemap = new tiled.TMXTilemap(2000, 2000, data, this.url);
    tmxTileMap.render();
    /*将地图添加到显示列表*/
    this.scrollContent.addChild(tmxTileMap);
  }

  //创建格子函数，根据输入的宽和高来创建一个 cloumn * row的格子图。并返回Shape对象。
  private createGird(width: number, height: number, totalRow: number, totalCloumn: number): eui.Group {
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
      baseX = (row - 1) * 130;
      baseY = (row - 1) * -79.5 + (510.5 + 2510.5) / 2;
      for (var cloumn = 1; cloumn < totalCloumn + 1; cloumn++) {
        var image: eui.Image = new eui.Image(RES.getRes('melee_json.melee_ground_1'));
        image.x = baseX + (cloumn - 1) * 130;
        image.y = baseY + (cloumn - 1) * 79.5;
        if (image.y < minY) {
          minY = image.y;
        }
        if (image.y > maxY) {
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

  private createGird2(width: number, height: number, totalRow: number, totalCloumn: number): Array<Object> {
    // var shape: eui.Group = new eui.Group();
    // shape.width = 10000;
    // shape.height = 10000;

    // var offsetX = 1000;
    // var offsetY = 1000;

    // shape.anchorOffsetX = (((totalRow - 1) * 130 + offsetX) + (totalCloumn - 1) * 130) / 2;
    // shape.anchorOffsetY = (((totalRow - 1) * 79.5 + offsetX) + (totalCloumn - 1) * 79.5) / 2;
    // console.log(shape.anchorOffsetX, shape.anchorOffsetY);

    var baseX = 0;
    var baseY = 0;
    let minY = 0;
    let maxY = 0;

    let result = [];
    for (var row = 1; row < totalRow + 1; row++) {
      baseX = (row - 1) * 130;
      baseY = (row - 1) * -79.5;// + (510.5 + 2510.5) / 2;
      for (var cloumn = 1; cloumn < totalCloumn + 1; cloumn++) {
        result.push({
          x: baseX + (cloumn - 1) * 130,
          y: baseY + (cloumn - 1) * 79.5
        });
        // var image: eui.Image = new eui.Image(RES.getRes('melee_json.melee_ground_1'));
        // image.x = baseX + (cloumn - 1) * 130;
        // image.y = baseY + (cloumn - 1) * 79.5;
        // if (image.y < minY){
        //   minY = image.y;
        // }
        // if (image.y > maxY){
        //   maxY = image.y;
        // }
        // console.log(`第${row}行第${cloumn}列，坐标：(${image.x},${image.y})`);
        // image.width = width;
        // image.height = height;
        // shape.addChild(image);
      }
    }
    console.log(minY, maxY);
    // return shape;
    return result;
  }
}

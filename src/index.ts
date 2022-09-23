// デコレータファクトリ
function methodDecoratorFactorySample(str: string) {
  //console.log(`メソッドデコレータファクトリが呼ばれました: ${str}`);

  // デコレータ関数を返す
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // console.log(`メソッドデコレータが呼ばれました: ${str}`);

    // target引数の確認
    // console.log(target);
    // インスタンスメンバのメソッドの場合
    // var tmp = new target.constructor("こんばんは");
    // tmp.printStr();
    // staticメソッドの場合
    // var tmp = new target("こんばんは");
    // tmp.printStr();

    // propertyKeyの確認
    console.log(propertyKey);

    //descriptor.value = () => {
    //console.log(`対象のメソッドが呼ばれました: ${str}`);
    //};
  };
}

class SampleClass {
  str: string;
  constructor(str: string) {
    console.log(`コンストラクタが呼び出されました: ${str}`);
    this.str = str;
  }

  @methodDecoratorFactorySample("")
  static printHello() {
    console.log("Hello from static method");
  }

  @methodDecoratorFactorySample("おはよう")
  printStr() {
    console.log(this.str);
  }
}

// var sampleClass = new SampleClass("こんにちは");
//sampleClass.printStr();

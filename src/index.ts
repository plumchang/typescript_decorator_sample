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

    // -- target引数の確認 --
    // console.log(target);
    // - クラスのインスタンス化（インスタンスメンバのメソッドの場合）
    // var tmp = new target.constructor("こんばんは");
    // tmp.printStr();
    // - クラスのインスタンス化（staticメソッドの場合）
    // var tmp = new target("こんばんは");
    // tmp.printStr();

    // -- propertyKeyの確認 --
    // console.log(propertyKey);

    // -- descriptorの確認 --
    console.log(descriptor);
    // - configurableの確認
    // descriptor.configurable = false;
    // - enumerableの確認
    // descriptor.enumerable = true;
    // - valueの確認
    // descriptor.value();
    // - writableの確認
    // descriptor.writable = false;
    // -- メソッドの書き換え --
    // descriptor.value = () => {
    // console.log(`対象のメソッドが呼ばれました: ${str}`);
    // };
    // - get・setの確認
    var orgMethod = descriptor.value;
    var retDesc = {
      configurable: true,
      enumerable: false,
      get() {
        console.log("getter called");
        return orgMethod;
      },
      set(value: any) {
        console.log("setter called");
        orgMethod = value;
      },
    };
    return retDesc;
  };
}

// サンプルクラス
class SampleClass {
  str: string;
  constructor(str: string) {
    console.log(`コンストラクタが呼び出されました: ${str}`);
    this.str = str;
  }

  //@methodDecoratorFactorySample("static method")
  static printHello() {
    console.log("Hello from static method");
  }

  @methodDecoratorFactorySample("instance method")
  printStr() {
    console.log(this.str);
  }
}

var sampleClass = new SampleClass("こんにちは");

// PropertyDescriptorの出力（デコレータで変更された後の値確認）
console.log(
  Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(sampleClass),
    "printStr"
  )
);

// configurableの確認（メソッドを削除できるかどうか）
// delete Object.getPrototypeOf(sampleClass).printStr;
// sampleClass.printStr();

// enumerableの確認
// for (var key in sampleClass) {
// console.log(`要素の列挙：${key}`);
// }

// valueの確認
// sampleClass.printStr();

// writableの確認（メソッドの内容変更）
// sampleClass.printStr = () => {
//   console.log("changed");
// };
// sampleClass.printStr();

// getの確認
// sampleClass.printStr();

// setの確認
sampleClass.printStr = () => {
  console.log("changed by setter");
};
sampleClass.printStr();

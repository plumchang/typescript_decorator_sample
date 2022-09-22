function methodDecoratorFactorySample(str: string) {
  console.log(`メソッドデコレータファクトリが呼ばれました: ${str}`);

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`メソッドデコレータが呼ばれました: ${str}`);

    console.log(target);

    descriptor.value = () => {
      console.log(`対象のメソッドが呼ばれました: ${str}`);
    };

    return descriptor;
  };
}

class SampleClass {
  str: string;
  constructor(str: string) {
    console.log(`コンストラクタが呼び出されました: ${str}`);
    this.str = str;
  }

  @methodDecoratorFactorySample("おはよう")
  printStr() {
    console.log(this.str);
  }
}

var sampleClass = new SampleClass("こんにちは");
sampleClass.printStr();

// 测试文件 - 用来验证 Find All References 扩展
class TestClass {
    public testMethod(): string {
        return "Hello World";
    }
    
    public anotherMethod(): void {
        // 调用 testMethod，这里应该能找到引用
        const result = this.testMethod();
        console.log(result);
    }
}

// 创建实例
const testInstance = new TestClass();

// 调用方法 - 这些都是引用
testInstance.testMethod();
testInstance.anotherMethod();

// 另一个引用
function useTestClass() {
    const obj = new TestClass();
    return obj.testMethod();
}

// 导出类型
export { TestClass }; 
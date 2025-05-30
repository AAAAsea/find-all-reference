// 演示文件 - 测试新的交互功能
// 1. 在文件开头应该看到 CodeLens: "References"
// 2. 将鼠标悬停在下面的符号上应该看到 "Find All References" 链接

export class DemoClass {
    public demoMethod(): string {
        return "Hello World";
    }
    
    public anotherMethod(): void {
        // 悬停在 demoMethod 上应该显示引用查找链接
        const result = this.demoMethod();
        console.log(result);
    }
}

// 悬停在 DemoClass 上应该显示引用查找链接
const demoInstance = new DemoClass();

// 悬停在 anotherMethod 上应该显示引用查找链接
demoInstance.anotherMethod();

// 悬停在 demoInstance 上应该显示引用查找链接
console.log(demoInstance); 
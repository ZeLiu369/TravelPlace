import React from "react";

const Test: React.FC = () => {
  return (
    <div>
      {/* Tailwind CSS 测试 */}
      <div className="p-8 bg-blue-500 text-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Tailwind CSS 测试</h1>
        <p className="mb-4">
          如果您能看到这个蓝色的卡片样式，说明 Tailwind CSS 正在工作！
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
          测试按钮
        </button>
      </div>

      {/* 备用CSS测试 */}
      <div className="test-tailwind">
        <h2>备用CSS测试</h2>
        <p>
          如果上面的卡片没有样式，但这个有蓝色背景，说明CSS加载了但Tailwind可能有问题。
        </p>
      </div>

      {/* 纯HTML样式测试 */}
      <div
        style={{
          backgroundColor: "#ef4444",
          color: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          margin: "1rem auto",
          maxWidth: "32rem",
          textAlign: "center",
        }}
      >
        <h2>内联样式测试</h2>
        <p>这个红色卡片使用内联样式，应该总是能看到。</p>
      </div>
    </div>
  );
};

export default Test;

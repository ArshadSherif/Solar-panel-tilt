import { useEffect, useRef } from "react";

export default function EnergyVisualization() {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    drawBarChart();
    drawLineChart();
  }, []);

  const drawBarChart = () => {
    const canvas = barChartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = [65, 40, 70, 81, 56, 75, 40, 60, 80, 75];
    const barWidth = 30;
    const spacing = 15;
    const maxValue = Math.max(...data);

    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, canvas.height - 40);
    ctx.lineTo(canvas.width - 20, canvas.height - 40);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.height - 80);
      const x = 60 + index * (barWidth + spacing);
      const y = canvas.height - 40 - barHeight;

      ctx.fillStyle = "#000";
      ctx.fillRect(x, y, barWidth, barHeight);
    });

    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Daily Energy Output (kWh)", canvas.width / 2, canvas.height - 10);
  };

  const drawLineChart = () => {
    const canvas = lineChartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data1 = [30, 50, 45, 70, 65, 55, 70, 60, 80, 75];
    const data2 = [20, 30, 40, 30, 45, 35, 40, 50, 40, 35];
    const maxValue = Math.max(...data1, ...data2);

    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, canvas.height - 40);
    ctx.lineTo(canvas.width - 20, canvas.height - 40);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    data1.forEach((value, index) => {
      const x = 40 + (index * (canvas.width - 60)) / (data1.length - 1);
      const y = canvas.height - 40 - (value / maxValue) * (canvas.height - 80);

      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    data2.forEach((value, index) => {
      const x = 40 + (index * (canvas.width - 60)) / (data2.length - 1);
      const y = canvas.height - 40 - (value / maxValue) * (canvas.height - 80);

      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Energy Output Trends", canvas.width / 2, canvas.height - 10);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4">Energy Output Visualization</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-2">
          <canvas ref={barChartRef} width={400} height={300} className="w-full h-full" />
        </div>
        <div className="border rounded-lg p-2">
          <canvas ref={lineChartRef} width={400} height={300} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

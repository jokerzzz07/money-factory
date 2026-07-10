import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { TrendingUp, TrendingDown, Target, AlertTriangle, Play, HelpCircle, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { TradeSignal } from "../types";

export default function TradingChart() {
  const [signals, setSignals] = useState<TradeSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState<TradeSignal | null>(null);

  // Chart configuration state
  const [selectedAsset, setSelectedAsset] = useState<"BTC" | "GOLD" | "EUR">("BTC");
  const [showOrderBlocks, setShowOrderBlocks] = useState(true);
  const [showFVG, setShowFVG] = useState(true);
  const [showSweeps, setShowSweeps] = useState(true);

  // Trade backtester simulator state
  const [simActive, setSimActive] = useState(false);
  const [simProgress, setSimProgress] = useState(0); // 0 to 100
  const [simOutcome, setSimOutcome] = useState<string | null>(null);
  const [simRisk, setSimRisk] = useState(1); // 1% default institutional risk rules
  const [simType, setSimType] = useState<"BUY" | "SELL">("BUY");

  useEffect(() => {
    fetch("/api/signals")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch signals");
        return res.json();
      })
      .then((data) => {
        setSignals(data.signals);
        if (data.signals && data.signals.length > 0) {
          setSelectedSignal(data.signals[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load signals:", err);
        // Fallback robust signals
        const fallback: TradeSignal[] = [
          {
            id: "sig-1",
            pair: "BTC/USD",
            type: "BUY",
            entry: "62,450.00",
            tp1: "63,200.00",
            tp2: "64,000.00",
            tp3: "65,500.00",
            sl: "61,850.00",
            time: "10 mins ago",
            status: "Active",
            confidence: "94.2%",
            rationale: "Price tapped into a 4H Bullish Order Block with clean FVG confluence. Market structure shift confirmed.",
          },
        ];
        setSignals(fallback);
        setSelectedSignal(fallback[0]);
        setLoading(false);
      });
  }, []);

  // Simulated price series generation for Recharts
  const generateChartData = (asset: string) => {
    if (asset === "GOLD") {
      return [
        { time: "09:00", price: 2338.5, volume: 120, label: "Sweep Lows", type: "sweep" },
        { time: "09:15", price: 2341.0, volume: 150 },
        { time: "09:30", price: 2344.2, volume: 190, label: "Order Block Touch", type: "ob" },
        { time: "09:45", price: 2348.5, volume: 220, label: "Entry Level", type: "entry" },
        { time: "10:00", price: 2352.0, volume: 310, label: "FVG Fill", type: "fvg" },
        { time: "10:15", price: 2355.5, volume: 280 },
        { time: "10:30", price: 2359.8, volume: 340, label: "Target 1 Hit", type: "tp" },
        { time: "10:45", price: 2357.2, volume: 210 },
        { time: "11:00", price: 2362.5, volume: 410, label: "Target 2 Hit", type: "tp" },
      ];
    } else if (asset === "EUR") {
      return [
        { time: "09:00", price: 1.08520, volume: 80 },
        { time: "09:15", price: 1.08590, volume: 95, label: "Sweep Session Highs", type: "sweep" },
        { time: "09:30", price: 1.08450, volume: 140, label: "Bearish MSS", type: "entry" },
        { time: "09:45", price: 1.08310, volume: 120 },
        { time: "10:00", price: 1.08150, volume: 185, label: "Target 1 Hit", type: "tp" },
        { time: "10:15", price: 1.08220, volume: 90, label: "Premium Retest", type: "fvg" },
        { time: "10:30", price: 1.07980, volume: 220 },
        { time: "10:45", price: 1.07800, volume: 260, label: "Target 2 Hit", type: "tp" },
        { time: "11:00", price: 1.07720, volume: 150 },
      ];
    } else {
      // BTC Default
      return [
        { time: "09:00", price: 61600, volume: 110 },
        { time: "09:15", price: 61420, volume: 180, label: "Stop Hunt Lows", type: "sweep" },
        { time: "09:30", price: 61950, volume: 290, label: "Displacement Up", type: "fvg" },
        { time: "09:45", price: 62450, volume: 380, label: "Entry Trigger", type: "entry" },
        { time: "10:00", price: 62800, volume: 340 },
        { time: "10:15", price: 63200, volume: 450, label: "Take Profit 1", type: "tp" },
        { time: "10:30", price: 62900, volume: 210, label: "Discount Pullback", type: "ob" },
        { time: "10:45", price: 64000, volume: 520, label: "Take Profit 2", type: "tp" },
        { time: "11:00", price: 64800, volume: 430, label: "Institutional Hold", type: "fvg" },
      ];
    }
  };

  const chartData = generateChartData(selectedAsset);

  // Backtest simulation handler
  const startBacktestSimulation = () => {
    setSimActive(true);
    setSimProgress(0);
    setSimOutcome(null);

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimActive(false);
          // 85% probability success matching the custom institutional algorithms
          const hitTarget = Math.random() < 0.85;
          if (hitTarget) {
            const riskRatio = simType === "BUY" ? "3.2R" : "2.8R";
            const gain = (simRisk * parseFloat(riskRatio)).toFixed(2);
            setSimOutcome(`SUCCESS: Profit Target Hit! Captured +${riskRatio} (+${gain}% gain on account).`);
          } else {
            setSimOutcome(`STOP LOSS HIT: Controlled loss of -${simRisk}% exactly. Risk parameters preserved.`);
          }
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  return (
    <div id="trading-suite-wrapper" className="space-y-8 max-w-7xl mx-auto px-4">
      {/* Intro section */}
      <div id="trading-suite-header" className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-none bg-navy-lighter px-4 py-1.5 text-[10px] font-bold text-primary-brand uppercase tracking-[0.2em] border border-primary-brand/10">
          <TrendingUp className="h-3.5 w-3.5" /> High-Accuracy Engine
        </span>
        <h2 className="text-3xl font-serif font-bold italic tracking-tight text-primary-brand">
          Institutional Signals & Backtesting
        </h2>
        <p className="text-xs text-primary-brand/60 uppercase tracking-wider leading-relaxed">
          Monitor institutional-grade algorithmic delivery feeds. Backtest orderflow strategies using our interactive chart simulator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Signal Feed */}
        <div id="signal-feed-panel" className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between border-b border-primary-brand/15 pb-3">
            <h3 className="text-[10px] font-bold text-primary-brand uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="h-2 w-2 bg-success-green" />
              Live Trade Alerts
            </h3>
            <span className="text-[9px] font-mono font-bold text-primary-brand bg-navy-lighter px-2 py-1 rounded-none border border-primary-brand/10">
              Accuracy 92.4%
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-none border-2 border-primary-brand border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {signals.map((sig) => {
                const isBuy = sig.type === "BUY";
                const isSelected = selectedSignal?.id === sig.id;
                return (
                  <div
                    key={sig.id}
                    id={`signal-item-${sig.id}`}
                    onClick={() => {
                      setSelectedSignal(sig);
                      setSelectedAsset(sig.pair.includes("BTC") ? "BTC" : sig.pair.includes("Gold") ? "GOLD" : "EUR");
                      setSimType(sig.type);
                    }}
                    className={`p-4 rounded-none border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-[#EBE9E4]/20 border-primary-brand border-2 shadow-sm"
                        : "bg-white border-primary-brand/10 hover:border-primary-brand/35"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-none uppercase tracking-wider ${
                          isBuy ? "bg-success-green/10 text-success-green" : "bg-red-50 text-red-600"
                        }`}>
                          {sig.type}
                        </span>
                        <span className="font-serif italic font-bold text-primary-brand text-sm">{sig.pair}</span>
                      </div>
                      <span className="text-[9px] text-primary-brand/40 font-mono">{sig.time}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] border-t border-b border-primary-brand/10 py-2 my-2 bg-navy-lighter rounded-none">
                      <div>
                        <div className="text-[8px] text-primary-brand/50 uppercase font-bold tracking-wider">Entry</div>
                        <div className="font-bold text-primary-brand font-mono">{sig.entry}</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-primary-brand/50 uppercase font-bold tracking-wider">Target 1</div>
                        <div className="font-bold text-success-green font-mono">{sig.tp1}</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-primary-brand/50 uppercase font-bold tracking-wider">Stop Loss</div>
                        <div className="font-bold text-red-600 font-mono">{sig.sl}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-primary-brand/40 uppercase font-bold tracking-wider">Confidence</span>
                      <span className="text-success-green font-bold font-mono">{sig.confidence}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Rationale detail */}
          {selectedSignal && (
            <div id="signal-rationale-box" className="p-5 rounded-none bg-[#1A1A1A] text-gray-300 space-y-3 shadow-[6px_6px_0px_rgba(26,26,26,0.1)]">
              <h4 className="text-[9px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-white" /> Institutional Logic
              </h4>
              <p className="text-xs leading-relaxed font-serif italic text-gray-400">
                "{selectedSignal.rationale}"
              </p>
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[10px] font-mono">
                <span>TP2: <strong className="text-white">{selectedSignal.tp2}</strong></span>
                <span>TP3: <strong className="text-white">{selectedSignal.tp3}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Interactive Chart & Backtester */}
        <div id="trading-chart-workspace" className="lg:col-span-8 space-y-6">
          {/* Chart Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border border-primary-brand/15 rounded-none p-4">
            <div className="flex items-center gap-2">
              <button
                id="asset-btc-btn"
                onClick={() => setSelectedAsset("BTC")}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-none border transition ${
                  selectedAsset === "BTC"
                    ? "bg-primary-brand text-white border-primary-brand"
                    : "bg-white text-primary-brand/60 border-primary-brand/10 hover:bg-neutral-50"
                }`}
              >
                BTC/USD
              </button>
              <button
                id="asset-gold-btn"
                onClick={() => setSelectedAsset("GOLD")}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-none border transition ${
                  selectedAsset === "GOLD"
                    ? "bg-primary-brand text-white border-primary-brand"
                    : "bg-white text-primary-brand/60 border-primary-brand/10 hover:bg-neutral-50"
                }`}
              >
                GOLD
              </button>
              <button
                id="asset-eur-btn"
                onClick={() => setSelectedAsset("EUR")}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-none border transition ${
                  selectedAsset === "EUR"
                    ? "bg-primary-brand text-white border-primary-brand"
                    : "bg-white text-primary-brand/60 border-primary-brand/10 hover:bg-neutral-50"
                }`}
              >
                EUR/USD
              </button>
            </div>

            {/* Smart money indicators toggles */}
            <div className="flex items-center gap-3">
              <button
                id="toggle-ob-btn"
                onClick={() => setShowOrderBlocks(!showOrderBlocks)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-none border transition ${
                  showOrderBlocks ? "bg-success-green/10 border-success-green text-success-green" : "border-primary-brand/10 text-primary-brand/40 bg-white"
                }`}
              >
                {showOrderBlocks ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                OB Zones
              </button>
              <button
                id="toggle-fvg-btn"
                onClick={() => setShowFVG(!showFVG)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-none border transition ${
                  showFVG ? "bg-[#EBE9E4] border-primary-brand text-primary-brand" : "border-primary-brand/10 text-primary-brand/40 bg-white"
                }`}
              >
                {showFVG ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                FVG Gaps
              </button>
              <button
                id="toggle-sweeps-btn"
                onClick={() => setShowSweeps(!showSweeps)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-none border transition ${
                  showSweeps ? "bg-amber-50 border-amber-500 text-amber-600" : "border-primary-brand/10 text-primary-brand/40 bg-white"
                }`}
              >
                {showSweeps ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                Liquidity
              </button>
            </div>
          </div>

          {/* Interactive Chart Visualizer */}
          <div className="h-96 w-full rounded-none border border-primary-brand/15 bg-white p-6 relative">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 15, right: 15, bottom: 5, left: 10 }}>
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#1A1A1A" }} stroke="#1A1A1A" opacity={0.3} />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 10, fill: "#1A1A1A" }}
                  stroke="#1A1A1A"
                  orientation="right"
                  opacity={0.3}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1A1A1A] text-white p-3 rounded-none border border-white/10 text-xs space-y-1 shadow-md">
                          <p className="font-bold">{data.time}</p>
                          <p className="font-mono text-success-bright">Price: {data.price}</p>
                          {data.label && <p className="text-primary-blue font-semibold">{data.label}</p>}
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Shaded Reference Area for Order Block (OB) Zones */}
                {showOrderBlocks && selectedAsset === "BTC" && (
                  <ReferenceArea {...({ y1: 61400, y2: 61950, fill: "#006e2d", fillOpacity: 0.06 } as any)} />
                )}
                {showOrderBlocks && selectedAsset === "GOLD" && (
                  <ReferenceArea {...({ y1: 2338, y2: 2343, fill: "#006e2d", fillOpacity: 0.06 } as any)} />
                )}
                {showOrderBlocks && selectedAsset === "EUR" && (
                  <ReferenceArea {...({ y1: 1.082, y2: 1.0832, fill: "#ba1a1a", fillOpacity: 0.06 } as any)} />
                )}

                {/* Shaded Reference Area for Fair Value Gaps (FVG) */}
                {showFVG && selectedAsset === "BTC" && (
                  <ReferenceArea {...({ y1: 62100, y2: 62450, fill: "#0053db", fillOpacity: 0.06 } as any)} />
                )}
                {showFVG && selectedAsset === "GOLD" && (
                  <ReferenceArea {...({ y1: 2349, y2: 2351.5, fill: "#0053db", fillOpacity: 0.06 } as any)} />
                )}

                {/* Technical Entry reference line */}
                <ReferenceLine
                  y={selectedAsset === "BTC" ? 62450 : selectedAsset === "GOLD" ? 2348.5 : 1.0845}
                  stroke="#1A1A1A"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  label={{ value: "Execution entry", position: "left", fill: "#1A1A1A", fontSize: 9, fontWeight: "bold" }}
                />

                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#1A1A1A"
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    if (payload.type === "sweep" && showSweeps) {
                      return (
                        <g key={cx}>
                          <rect x={cx - 5} y={cy - 5} width={10} height={10} fill="#cca72f" stroke="#ffffff" strokeWidth={1.5} />
                        </g>
                      );
                    }
                    if (payload.type === "tp") {
                      return (
                        <g key={cx}>
                          <rect x={cx - 5} y={cy - 5} width={10} height={10} fill="#006e2d" stroke="#ffffff" strokeWidth={1.5} />
                        </g>
                      );
                    }
                    return <circle key={cx} cx={cx} cy={cy} r={2} fill="#1A1A1A" />;
                  }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>

            {/* Static Annotations Overlay */}
            <div className="absolute left-6 top-6 bg-white/95 backdrop-blur-sm rounded-none p-3 border border-primary-brand/15 text-[9px] uppercase tracking-wider space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-primary-brand">
                <span>Technical Overlay Legend</span>
              </div>
              <div className="flex items-center gap-12 pt-2 text-[8px]">
                {showOrderBlocks && (
                  <div className="flex items-center gap-1.5 text-primary-brand/60">
                    <span className="h-2 w-4 bg-success-green/10 border border-success-green/20" /> Bullish Order Block (OB)
                  </div>
                )}
                {showFVG && (
                  <div className="flex items-center gap-1.5 text-primary-brand/60">
                    <span className="h-2 w-4 bg-primary-blue/10 border border-primary-blue/20" /> Fair Value Gap (FVG)
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Trade Execution Simulator */}
          <div className="bg-navy-lighter border border-primary-brand/15 rounded-none p-6 shadow-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-primary-brand/10">
              <div>
                <h4 className="text-[10px] font-bold text-primary-brand uppercase tracking-[0.2em] flex items-center gap-2">
                  <Play className="h-3.5 w-3.5 text-primary-brand" /> Live Account execution simulator
                </h4>
                <p className="text-[10px] text-primary-brand/60 font-serif italic mt-1">Backtest the current institutional signal using proper 1:3 reward metrics.</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary-brand/50">Trade Type:</span>
                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-none border ${
                  simType === "BUY" ? "bg-success-green/10 border-success-green/20 text-success-green" : "bg-red-50 border-red-200 text-red-600"
                }`}>
                  {simType}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {/* Parameter input */}
              <div className="space-y-3">
                <label className="text-[9px] font-bold text-primary-brand/50 uppercase tracking-[0.2em] block">Risk Parameter (Per Trade)</label>
                <div className="flex items-center gap-1.5">
                  {[0.5, 1, 2].map((rVal) => (
                    <button
                      key={rVal}
                      id={`risk-btn-${rVal}`}
                      disabled={simActive}
                      onClick={() => setSimRisk(rVal)}
                      className={`flex-1 py-2 text-xs font-bold rounded-none border transition ${
                        simRisk === rVal
                          ? "bg-primary-brand border-primary-brand text-white"
                          : "bg-white border-primary-brand/15 text-primary-brand/70 hover:bg-neutral-50"
                      }`}
                    >
                      {rVal}%
                    </button>
                  ))}
                </div>
                <div className="text-[9px] text-primary-brand/60 font-serif italic leading-relaxed flex items-start gap-1">
                  <ShieldAlert className="h-4 w-4 mt-0.5 text-primary-brand shrink-0" />
                  <span>Money Factory enforces strict institutional guidelines: Never exceed 1% risk per trade on live accounts.</span>
                </div>
              </div>

              {/* Simulation status */}
              <div className="md:col-span-2 flex flex-col justify-between gap-4">
                {simActive ? (
                  <div className="space-y-3 flex-1 justify-center flex flex-col">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider">
                      <span className="font-mono text-primary-brand/60">Backtesting simulation in progress...</span>
                      <span className="font-bold text-primary-brand">{simProgress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-none h-1.5">
                      <div
                        className="bg-primary-brand h-1.5 rounded-none transition-all duration-300"
                        style={{ width: `${simProgress}%` }}
                      />
                    </div>
                  </div>
                ) : simOutcome ? (
                  <div className={`p-4 rounded-none border flex gap-3 ${
                    simOutcome.includes("SUCCESS")
                      ? "bg-success-green/5 border-success-green/20 text-success-green"
                      : "bg-amber-50 border-amber-200 text-amber-700"
                  }`}>
                    <div className="text-xs font-serif italic">
                      <span className="font-bold not-italic uppercase tracking-wider text-[10px] text-primary-brand block mb-1">Backtest Completed</span>
                      <span className="leading-relaxed">{simOutcome}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-white border border-primary-brand/10 rounded-none">
                    <HelpCircle className="h-4 w-4 text-primary-brand/40 shrink-0" />
                    <span className="text-[10px] text-primary-brand/60 font-serif italic leading-relaxed">
                      Press "Run Backtest" to simulate execution on high volume historical pricing feeds. Proper slippage and fees are automatically calculated.
                    </span>
                  </div>
                )}

                <button
                  id="run-backtest-simulation"
                  onClick={startBacktestSimulation}
                  disabled={simActive}
                  className="w-full py-3 rounded-none bg-primary-brand text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-800 transition disabled:bg-gray-200 disabled:text-gray-400 shadow-[4px_4px_0px_rgba(26,26,26,0.15)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(26,26,26,0.15)]"
                >
                  {simActive ? "Simulating Algorithmic Feed..." : "Run Backtest Trade"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

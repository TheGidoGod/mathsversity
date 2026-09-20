(function () {
  const tools = {
    "5-1": ["Common-Denominator Fraction Stacker", "Adding & subtracting fractions", "Match the equivalent fraction.", "1/2 + 1/4 = ?", "3/4", ["2/4", "3/4", "4/4"]],
    "5-2": ["Overlapping Grid Fraction Multiplier", "Multiplying fractions", "Choose the product of the fractions.", "1/2 × 3/4 = ?", "3/8", ["1/4", "3/8", "3/4"]],
    "5-3": ["Pie-Group Converter", "Mixed numbers", "Convert the mixed number to an improper fraction.", "2 1/3 = ?", "7/3", ["5/3", "6/3", "7/3"]],
    "5-4": ["Decimal Point Shift Animator", "Decimal operations", "Multiply by 10 and move the decimal point.", "3.47 × 10 = ?", "34.7", ["0.347", "34.7", "347"]],
    "5-5": ["Cuboid Volume Quiz", "Volume", "Find the volume of the cuboid.", "4 × 3 × 2 = ? cubic units", "24", ["9", "24", "48"]],
    "5-6": ["Angle-Sum Triangle Tearer", "Triangles", "Use the angle sum of a triangle.", "42° + 68° + ? = 180°", "70°", ["60°", "70°", "80°"]],
    "5-7": ["Triangle Classification Quiz", "Classifying triangles", "A triangle has sides 5, 5, and 8. What type is it?", "5, 5, 8", "isosceles", ["scalene", "isosceles", "equilateral"]],
    "5-8": ["Net-to-Solid Identification Quiz", "3D nets", "Which solid has six square faces?", "Six equal squares make a...", "cube", ["cube", "cone", "cylinder"]],
    "5-9": ["Trend Line Graph Plotter", "Data handling", "Which point continues the upward trend?", "2, 4, 6, ?", "8", ["7", "8", "10"]],
    "5-10": ["Level-the-Blocks Mean Visualizer", "Average", "Find the mean of the data.", "4, 6, 8, 10 → mean = ?", "7", ["6", "7", "8"]],
    "5-11": ["Spinner Probability Predictor", "Probability", "What is the probability of rolling an even number on a fair die?", "P(even)", "1/2", ["1/3", "1/2", "2/3"]],
    "6-1": ["Elevator Integer Walker", "Integers", "Move from −3 by 8 floors.", "−3 + 8 = ?", "5", ["−11", "5", "11"]],
    "6-2": ["Positive/Negative Token Canceller", "Adding & subtracting integers", "Cancel opposite tokens, then calculate.", "−7 + 12 = ?", "5", ["−5", "5", "19"]],
    "6-3": ["Sign-Rule Direction Flipper", "Multiplying & dividing integers", "Apply the sign rule.", "−6 × −4 = ?", "24", ["−24", "10", "24"]],
    "6-4": ["Ratio Scaler", "Ratio recipe", "Scale both parts by the same factor.", "3 : 5 scaled by 2 = ?", "6 : 10", ["5 : 7", "6 : 10", "9 : 25"]],
    "6-5": ["Cross-Multiplication Balance Scale", "Proportion", "Solve the proportion.", "3/5 = x/20", "12", ["8", "12", "15"]],
    "6-6": ["Cost-per-Item Scaler", "Unitary method", "Scale the cost from one item.", "4 notebooks cost ₹60. One costs ₹?", "15", ["12", "15", "20"]],
    "6-7": ["Mystery Box Variable Solver", "Introduction to algebra", "Isolate the variable.", "x + 9 = 17", "8", ["7", "8", "26"]],
    "6-8": ["Balance-Beam Equation Solver", "Linear equations", "Keep both sides balanced.", "3x = 21", "7", ["6", "7", "9"]],
    "6-9": ["Compound Shape Area Splitter", "Mensuration", "Split the shape and add the rectangle areas.", "Area: 6 × 4 + 2 × 3 = ?", "30", ["24", "30", "36"]],
    "6-10": ["Angle-Pair Matching Puzzle", "Angles", "Complementary angles add to 90°.", "38° + ? = 90°", "52°", ["42°", "52°", "62°"]],
    "6-11": ["Fraction Percentage Quiz", "Data handling", "Convert the fraction to a percentage.", "3/4 = ?", "75%", ["25%", "50%", "75%"]],
  };
  const key = document.body.dataset.tool;
  const tool = tools[key];
  const root = document.getElementById("toolApp");
  if (!tool || !root) return;
  let score = 0;
  const r = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const visualStyle = (question) => { let hash = 0; for (const char of question) hash = (hash * 31 + char.charCodeAt(0)) >>> 0; return `--visual-hue:${hash % 30}deg;--visual-tilt:${hash % 3 - 1}deg;--visual-scale:${0.96 + (hash % 5) / 100}`; };
  const round = () => {
    const rounds = {
      "5-1": () => { const d = r(3, 8), n = r(1, d - 1); return [`${n}/${d} + 1/${d} = ?`, `${n + 1}/${d}`, [`${n}/${d}`, `${n + 1}/${d}`, `${n + 2}/${d}`]]; },
      "5-2": () => { const a = r(1, 3), b = r(2, 4); return [`1/2 × ${b}/4 = ?`, `${b}/8`, [`${b}/4`, `${b}/8`, `${b}/2`]]; },
      "5-3": () => { const w = r(2, 5), d = r(2, 6); return [`${w} 1/${d} = ?`, `${w * d + 1}/${d}`, [`${w * d - 1}/${d}`, `${w * d + 1}/${d}`, `${w + 1}/${d}`]]; },
      "5-4": () => { const n = r(12, 89) / 10; return [`${n} × 10 = ?`, `${n * 10}`, [`${n / 10}`, `${n * 10}`, `${n * 100}`]]; },
      "5-5": () => { const a = r(2, 6), b = r(2, 5), c = r(2, 4), v = a * b * c; return [`${a} × ${b} × ${c} = ? cubic units`, `${v}`, [`${a * b}`, `${v}`, `${v + a}`]]; },
      "5-6": () => { const a = r(30, 60), b = r(30, 80), v = 180 - a - b; return [`${a}° + ${b}° + ? = 180°`, `${v}°`, [`${v - 10}°`, `${v}°`, `${v + 10}°`]]; },
      "5-7": () => { const equal = r(4, 8), other = r(9, 12); return [`A triangle has sides ${equal}, ${equal}, and ${other}. What type is it?`, "isosceles", ["scalene", "isosceles", "equilateral"]]; },
      "5-8": () => { const solids = [["Which solid has six square faces?", "cube", ["cube", "cone", "cylinder"]], ["Which solid has two triangular faces and three rectangular faces?", "triangular prism", ["cube", "triangular prism", "square pyramid"]], ["Which solid has one square base and four triangular faces?", "square pyramid", ["cube", "triangular prism", "square pyramid"]]]; return solids[r(0, solids.length - 1)]; },
      "5-9": () => { const n = r(2, 8); return [`${n}, ${n + 2}, ${n + 4}, ?`, `${n + 6}`, [`${n + 5}`, `${n + 6}`, `${n + 8}`]]; },
      "5-10": () => { const a = r(2, 8), b = a + 2, c = b + 2, d = c + 2, v = (a + b + c + d) / 4; return [`${a}, ${b}, ${c}, ${d} → mean = ?`, `${v}`, [`${v - 1}`, `${v}`, `${v + 1}`]]; },
      "5-11": () => { const sides = r(4, 8), favorable = sides / 2; return [`A fair spinner has ${sides} equal sections. ${favorable} are blue. P(blue) = ?`, "1/2", ["1/4", "1/2", "3/4"]]; },
      "6-1": () => { const a = -r(2, 9), b = r(5, 12), v = a + b; return [`${a} + ${b} = ?`, `${v}`, [`${v - 3}`, `${v}`, `${v + 3}`]]; },
      "6-2": () => { const a = -r(4, 9), b = r(8, 15), v = a + b; return [`${a} + ${b} = ?`, `${v}`, [`${v - 2}`, `${v}`, `${v + 2}`]]; },
      "6-3": () => { const a = r(3, 8), b = r(2, 6), v = a * b; return [`−${a} × −${b} = ?`, `${v}`, [`−${v}`, `${a + b}`, `${v}`]]; },
      "6-4": () => { const a = r(2, 6), b = r(3, 8), k = r(2, 4); return [`${a} : ${b} scaled by ${k} = ?`, `${a * k} : ${b * k}`, [`${a + k} : ${b + k}`, `${a * k} : ${b * k}`, `${a} : ${b * k}`]]; },
      "6-5": () => { const d = r(3, 8), x = r(2, 6), n = d * x; return [`${x}/${d} = x/${n}`, `${x}`, [`${x - 1}`, `${x}`, `${x + 2}`]]; },
      "6-6": () => { const count = r(3, 8), one = r(10, 30), total = count * one; return [`${count} notebooks cost ₹${total}. One costs ₹?`, `${one}`, [`${one - 5}`, `${one}`, `${one + 5}`]]; },
      "6-7": () => { const x = r(4, 15), n = r(3, 12); return [`x + ${n} = ${x + n}`, `${x}`, [`${x - 1}`, `${x}`, `${x + n}`]]; },
      "6-8": () => { const x = r(3, 9), n = r(2, 5); return [`${n}x = ${n * x}`, `${x}`, [`${x - 1}`, `${x}`, `${x + 2}`]]; },
      "6-9": () => { const a = r(3, 8), b = r(3, 7), c = r(1, 4), d = r(2, 5), v = a * b + c * d; return [`Area: ${a} × ${b} + ${c} × ${d} = ?`, `${v}`, [`${v - 4}`, `${v}`, `${v + 4}`]]; },
      "6-10": () => { const a = r(20, 70), v = 90 - a; return [`${a}° + ? = 90°`, `${v}°`, [`${v - 10}°`, `${v}°`, `${v + 10}°`]]; },
      "6-11": () => { const denominator = [2, 4, 5, 10][r(0, 3)], numerator = r(1, denominator - 1), percentage = Math.round(numerator / denominator * 100); return [`${numerator}/${denominator} = ?`, `${percentage}%`, [`${Math.max(0, percentage - 10)}%`, `${percentage}%`, `${Math.min(100, percentage + 10)}%`]]; },
    };
    return rounds[key]?.() || [tool[3], tool[4], tool[5]];
  };
  function graphic(question) {
    if (key === "5-4") { const n = question.match(/[\d.]+/g) || ["3.47", "10"]; return `<div class="digit-graphic"><b>${n[0]}</b><em>× ${n[1]} →</em><strong>${n[0] * 10}</strong></div>`; }
    if (key === "5-1") { const n = question.match(/\d+/g) || [1, 4, 1, 4]; const total = Number(n[1]); return `<div class="fraction-graphic">${Array(total).fill(0).map((_, i) => `<i class="${i < Number(n[0]) + 1 ? "filled" : ""}"></i>`).join("")}</div><small>${n[0]}/${n[1]} + ${n[2]}/${n[3]}</small>`; }
    if (key === "5-2") { const n = question.match(/\d+/g) || [1, 2, 3, 4]; return `<div class="fraction-grid-graphic">${Array(8).fill(0).map((_, i) => `<i class="${i < Number(n[2]) ? "filled" : ""}"></i>`).join("")}</div><small>1/2 × ${n[2]}/${n[3]}</small>`; }
    if (key === "5-3") { const n = question.match(/\d+/g) || [2, 3]; return `<div class="pie-group-graphic">${Array(Number(n[0])).fill('<i></i>').join("")}<i></i></div><small>${n[0]} whole pies + 1/${n[1]}</small>`; }
    if (key === "5-7") return '<svg viewBox="0 0 260 130"><path d="M40 110 L130 20 L220 110 Z"/><path d="M82 69 L92 79 M168 79 L178 69"/></svg><small>two equal sides</small>';
    if (key === "5-8") { const prism = question.includes("triangular"); const pyramid = question.includes("pyramid"); return prism ? '<div class="net-graphic"><i></i><i></i><i></i><i></i><i></i></div><small>triangular prism net</small>' : pyramid ? '<div class="net-graphic"><i></i><i></i><i></i><i></i><i></i></div><small>square pyramid net</small>' : '<div class="net-graphic"><i></i><i></i><i></i><i></i><i></i><i></i></div><small>cube net</small>'; }
    if (key === "5-5") { const n = question.match(/\d+/g) || [4, 3, 2]; return `<div class="cube-graphic">${Array(Number(n[0]) * Number(n[1])).fill('<i></i>').join("")}</div><small>${n.join(" × ")} layers</small>`; }
    if (key === "5-6") { const n = question.match(/\d+/g) || [42, 68, 70]; return `<svg viewBox="0 0 260 130"><path d="M35 105 L130 18 L225 105 Z"/><text x="36" y="122">${n[0]}°</text><text x="119" y="32">?</text><text x="204" y="122">${n[1]}°</text></svg>`; }
    if (key === "5-9") { const n = question.match(/\d+/g) || [2, 4, 6, 8]; return `<div class="graph-graphic"><i style="left:20px;bottom:${n[0] * 8}px"></i><i style="left:75px;bottom:${n[1] * 8}px"></i><i style="left:130px;bottom:${n[2] * 8}px"></i><i style="left:185px;bottom:${n[3] * 8}px"></i><b></b></div>`; }
    if (key === "5-10") { const n = question.match(/\d+/g) || [4, 6, 8, 10]; return `<div class="block-graphic">${n.map((v) => `<i style="height:${Number(v) * 9}px"></i>`).join("")}</div><small>mean = ${(n.reduce((a, b) => a + Number(b), 0) / n.length)}</small>`; }
    if (key === "6-1") { const n = question.match(/-?\d+/g) || ["-3", "8", "5"]; return `<div class="integer-graphic"><span>${n[0]}</span><b>+ ${n[1]}</b><strong>${n[2] || "?"}</strong></div>`; }
    if (key === "6-2") { const n = question.match(/−?\d+/g) || ["−7", "12", "5"]; return `<div class="token-graphic">${Array(Math.abs(Number(n[0].replace("−", "-")))).fill('<i>−</i>').join("")}${Array(Math.abs(Number(n[1]))).fill('<i>+</i>').join("")}<b>= ${n[2]}</b></div>`; }
    if (key === "6-3") { const n = question.match(/\d+/g) || [6, 4, 24]; return `<div class="sign-graphic"><b>−${n[0]} × −${n[1]}</b><strong>→ +${n[2]}</strong></div>`; }
    if (key === "6-4") { const n = question.match(/\d+/g) || [3, 5, 2]; return `<div class="ratio-graphic"><i style="width:${Number(n[0]) * 18}px"></i><i style="width:${Number(n[1]) * 18}px"></i><b>× ${n[2]}</b></div>`; }
    if (key === "6-5") { const n = question.match(/\d+/g) || [3, 5, 20]; return `<div class="balance-graphic"><i>${n[0]}</i><b></b><i>x / ${n[2]}</i></div>`; }
    if (key === "6-6") { const n = question.match(/\d+/g) || [4, 60]; return `<div class="unit-graphic"><i>₹${n[1]}</i><b>÷ ${n[0]}</b><i>₹${Number(n[1]) / Number(n[0])}</i></div>`; }
    if (key === "6-7") { const n = question.match(/\d+/g) || [9, 17]; return `<div class="equation-graphic"><i>x</i><b>+ ${n[0]}</b><strong>=</strong><i>${n[1]}</i></div>`; }
    if (key === "6-8") { const n = question.match(/\d+/g) || [3, 21]; return `<div class="balance-graphic"><i>${n[0]}x</i><b></b><i>${n[1]}</i></div>`; }
    if (key === "6-9") { const n = question.match(/\d+/g) || [6, 4, 2, 3]; return `<div class="area-graphic" style="width:${Number(n[0]) * 18}px;height:${Number(n[1]) * 14}px"><i style="width:${Number(n[2]) * 15}px;height:${Number(n[3]) * 12}px"></i><b style="left:${Math.round(Number(n[0]) * 55 / 100)}%"></b></div><small>${n[0]} × ${n[1]} + ${n[2]} × ${n[3]}</small>`; }
    if (key === "6-10") { const n = question.match(/\d+/g) || [38, 52]; return `<svg viewBox="0 0 260 130"><path d="M40 105 L210 105 M40 105 L125 35"/><text x="52" y="76">${n[0]}°</text><text x="138" y="96">?</text></svg>`; }
    if (key === "6-11") { const n = question.match(/\d+/g) || [3, 4]; const percentage = Math.round(Number(n[0]) / Number(n[1]) * 100); return `<div class="pie-chart-graphic" style="background:conic-gradient(#88a3ff 0 ${percentage}%, #e5ebff ${percentage}% 100%)"></div>`; }
    const charts = {
      "5-1": '<div class="fraction-graphic"><i></i><i></i><i class="filled"></i><i class="filled"></i><i class="filled"></i><i class="filled"></i></div><small>1/2 + 1/4</small>',
      "5-2": '<div class="fraction-grid-graphic">' + Array(8).fill('<i></i>').join("") + '</div><small>overlapping fractions</small>',
      "5-3": '<div class="pie-group-graphic"><i></i><i></i><i></i></div><small>2 whole pies + 1/3</small>',
      "5-4": '<div class="digit-graphic"><b>3</b><b>.</b><b>4</b><b>7</b><em>× 10 →</em></div>',
      "5-5": '<div class="cube-graphic">' + Array(12).fill('<i></i>').join("") + '</div><small>4 × 3 × 2 layers</small>',
      "5-6": '<svg viewBox="0 0 260 130" aria-label="triangle angle model"><path d="M35 105 L130 18 L225 105 Z"/><text x="36" y="122">42°</text><text x="119" y="32">?</text><text x="204" y="122">68°</text></svg>',
      "5-7": '<svg viewBox="0 0 260 130" aria-label="isosceles triangle"><path d="M40 110 L130 20 L220 110 Z"/><path d="M80 70 L90 80 M170 80 L180 70"/></svg>',
      "5-8": '<div class="net-graphic">' + Array(6).fill('<i></i>').join("") + '</div><small>six square faces</small>',
      "5-9": '<div class="graph-graphic"><i></i><i></i><i></i><i></i><b></b></div>',
      "5-10": '<div class="block-graphic"><i style="height:42px"></i><i style="height:66px"></i><i style="height:90px"></i><i style="height:114px"></i></div><small>level the mean</small>',
      "5-11": '<div class="spinner-graphic"><i></i><b>1/2</b></div>',
      "6-1": '<div class="integer-graphic"><span>−4</span><span>−3</span><span>−2</span><span>−1</span><strong>0</strong><span>1</span><span>2</span><span>3</span><span>4</span></div>',
      "6-2": '<div class="token-graphic"><i>−</i><i>+</i><i>−</i><i>+</i><b>→ 0</b></div>',
      "6-3": '<div class="sign-graphic"><b>− × −</b><strong>→ +</strong></div>',
      "6-4": '<div class="ratio-graphic"><i style="width:72px"></i><i style="width:120px"></i><b>× 2</b></div>',
      "6-5": '<div class="balance-graphic"><i>3</i><b></b><i>5</i></div>',
      "6-6": '<div class="unit-graphic"><i>₹60</i><b>÷ 4</b><i>₹15</i></div>',
      "6-7": '<div class="equation-graphic"><i>x</i><b>+</b><i>9</i><strong>=</strong><i>17</i></div>',
      "6-8": '<div class="balance-graphic"><i>3x</i><b></b><i>21</i></div>',
      "6-9": '<div class="area-graphic"><i></i><b></b></div>',
      "6-10": '<svg viewBox="0 0 260 130" aria-label="complementary angles"><path d="M40 105 L210 105 M40 105 L125 35"/><path d="M70 105 A30 30 0 0 0 58 82"/><text x="52" y="76">38°</text><text x="138" y="96">?</text></svg>',
      "6-11": '<div class="pie-chart-graphic"><i></i><b>75%</b></div>',
    };
    return charts[key] || "";
  }
  function render() {
    const [title, topic, intro] = tool;
    const [question, answer, options] = round();
    const visualVariant = r(0, 2);
    document.title = `${title} · Class ${key[0]} · Mathsversity`;
    root.innerHTML = `<div class="tool-head"><div><p class="eyebrow">CLASS ${key[0]} · ${topic.toUpperCase()}</p><h1>${title}</h1><p>${intro}</p></div><div class="score-pill"><span>Score</span><strong id="score">${score}</strong></div></div><div class="tool-board"><div class="prompt-card"><strong>${question}</strong><span>Select the answer after studying the model.</span></div><div class="quiz-graphic visual-${visualVariant}" style="${visualStyle(question)}">${graphic(question)}</div><div class="choice-row">${options.map((option) => `<button class="choice" type="button" data-answer="${option}">${option}</button>`).join("")}</div></div><div class="tool-actions"><button class="tool-btn" id="checkTool" type="button">Check answer</button><button class="tool-btn secondary" id="resetTool" type="button">New round</button><span class="feedback" id="feedback">Choose an answer.</span></div>`;
    document.querySelectorAll(".choice").forEach((button) => button.onclick = () => { document.querySelectorAll(".choice").forEach((item) => item.classList.remove("selected")); button.classList.add("selected"); });
    document.getElementById("checkTool").onclick = () => {
      const selected = document.querySelector(".choice.selected")?.dataset.answer;
      const feedback = document.getElementById("feedback");
      if (selected === answer) { score += 1; document.getElementById("score").textContent = score; window.mathsversityFreemium?.consumeHeart(); window.mathsversityCelebrate?.(); feedback.textContent = `Correct — ${answer}.`; feedback.className = "feedback good"; }
      else { feedback.textContent = selected ? "Not quite. Read the question and try again." : "Choose an answer first."; feedback.className = "feedback try"; }
    };
    document.getElementById("resetTool").onclick = render;
    window.mathsversityLibraries?.ready.then(() => window.MathJax?.typesetPromise?.([root]));
  }
  render();
})();

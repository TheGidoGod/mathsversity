(function () {
  const tools = {
    "7-1": ["Rational Number Line Quiz", "Rational numbers", "Place the rational number on the line.", "Which number lies between 1/2 and 1?", "3/4", ["1/4", "3/4", "5/4"], "numberline"],
    "7-2": ["Rational Number Operation Chains", "Operations on rationals", "Follow the operation chain.", "1/2 + 1/4 = ?", "3/4", ["1/4", "3/4", "1"], "fraction"],
    "7-3": ["Two-Step Equation Balance Solver", "Simple equations", "Undo operations in reverse order.", "2x + 3 = 11. x = ?", "4", ["3", "4", "7"], "balance"],
    "7-4": ["Parallel-Line Transversal Explorer", "Lines & angles", "Identify the matching angle pair.", "Corresponding angles are...", "equal", ["equal", "supplementary", "random"], "angles"],
    "7-5": ["Triangle Inequality Quiz", "Triangle properties", "Use the triangle inequality.", "Can 3, 4, 8 form a triangle?", "no", ["yes", "no", "only right"], "triangle"],
    "7-6": ["SSS/SAS/ASA Congruence Matcher", "Congruence", "Match the congruence criterion.", "Three matching sides gives...", "SSS", ["SSS", "SAS", "ASA"], "triangle"],
    "7-7": ["Percentage Fill Bar", "Percentage", "Connect the equivalent forms.", "25% as a fraction = ?", "1/4", ["1/5", "1/4", "1/2"], "percent"],
    "7-8": ["Shopkeeper Profit/Loss Simulator", "Profit & loss", "Compare cost price and selling price.", "CP ₹80, SP ₹100: profit = ?", "₹20", ["₹10", "₹20", "₹180"], "money"],
    "7-9": ["Coin & Dice Probability Lab", "Probability", "Read the probability space.", "P(rolling a 6) = ?", "1/6", ["1/2", "1/6", "5/6"], "probability"],
    "7-10": ["Bean Machine Distribution", "Probability", "Which result is most likely after many trials?", "The centre column is usually...", "tallest", ["shortest", "tallest", "empty"], "distribution"],
    "7-11": ["Sortable Data Stack Analyzer", "Statistics", "Find the middle value after sorting.", "Median of 2, 5, 7, 9, 10 = ?", "7", ["5", "7", "9"], "data"],
    "7-12": ["Rotational Symmetry Spinner", "Symmetry", "Count the matching turns.", "A square has rotational order...", "4", ["2", "4", "8"], "symmetry"],
    "8-1": ["Power Tower Builder", "Exponents & powers", "Read the base and exponent.", "2³ = ?", "8", ["6", "8", "9"], "power"],
    "8-2": ["Exponent Rule Combiner", "Laws of exponents", "Combine powers with the same base.", "x² × x³ = ?", "x⁵", ["x⁶", "x⁵", "2x⁵"], "power"],
    "8-3": ["Slope-Intercept Line Explorer", "Linear graphs", "Read m and c from the line.", "In y = 2x + 3, the slope is...", "2", ["2", "3", "5"], "line"],
    "8-4": ["Coordinate Plane Point Plotter", "Plotting points", "Read the point in the quadrant.", "Which point is in quadrant II?", "(−2, 3)", ["(2, 3)", "(−2, 3)", "(−2, −3)"], "plane"],
    "8-5": ["Cannonball Parabola Launcher", "Quadratic trajectories", "Identify the turning point of the path.", "A parabola opens...", "up or down", ["only left", "up or down", "in a circle"], "parabola"],
    "8-6": ["Multi-Step Equation Balance Solver", "Linear equations", "Simplify both sides first.", "2x + 4 = 14. x = ?", "5", ["4", "5", "9"], "balance"],
    "8-7": ["Algebra Tile Factoriser", "Factorisation", "Choose the factor pair.", "x² + 5x + 6 = ?", "(x+2)(x+3)", ["(x+1)(x+6)", "(x+2)(x+3)", "(x−2)(x−3)"], "tiles"],
    "8-8": ["Solid Volume Quiz", "Surface area & volume", "Count the dimensions of the cuboid.", "Volume of 2 × 3 × 4 = ?", "24", ["9", "24", "48"], "volume"],
    "8-9": ["Compound Interest Growth Animator", "Compound interest", "Read the growth pattern.", "₹100 at 10% for one year = ?", "₹110", ["₹101", "₹110", "₹120"], "growth"],
    "8-10": ["Proportion Graph Comparator", "Direct & inverse proportion", "Identify the inverse relationship.", "If x doubles, y in y = 12/x...", "halves", ["doubles", "halves", "stays 12"], "curve"],
    "8-11": ["Histogram Bin Builder", "Data handling", "Read the tallest interval.", "The tallest bin shows the...", "mode range", ["mean", "mode range", "outlier"], "histogram"],
    "8-12": ["Two-Dice Sum Probability Grid", "Probability", "Read the 6×6 outcome grid.", "Most likely dice sum = ?", "7", ["2", "7", "12"], "dice"],
  };
  const key = document.body.dataset.tool, tool = tools[key], root = document.getElementById("toolApp");
  if (!tool || !root) return;
  let score = 0;
  const visualStyle = (question) => { let hash = 0; for (const char of question) hash = (hash * 31 + char.charCodeAt(0)) >>> 0; return `--visual-hue:${hash % 30}deg;--visual-tilt:${hash % 3 - 1}deg;--visual-scale:${0.96 + (hash % 5) / 100}`; };
  const r = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = (items) => items[r(0, items.length - 1)];
  const round = () => {
    const rounds = {
      "7-1": () => { const d = r(3, 9), n = r(1, d - 1); return [`Which number lies between 0 and ${n}/${d}?`, `${n}/${d}`, [`-${n}/${d}`, `${n}/${d}`, `${d}/${n}`]]; },
      "7-2": () => { const a = r(1, 4), b = r(1, 4); return [`${a}/8 + ${b}/8 = ?`, `${a + b}/8`, [`${a + b - 1}/8`, `${a + b}/8`, `${a + b + 2}/8`]]; },
      "7-3": () => { const x = r(2, 9), a = r(2, 5), b = r(1, 8), total = a * x + b; return [`${a}x + ${b} = ${total}. x = ?`, `${x}`, [`${x - 1}`, `${x}`, `${x + 2}`]]; },
      "7-4": () => [pick(["Corresponding angles are...", "Alternate angles are..."]), "equal", ["equal", "supplementary", "random"]],
      "7-5": () => { const a = r(2, 6), b = r(3, 7), c = a + b + r(-1, 5); const possible = a + b > c; return [`Can ${a}, ${b}, ${c} form a triangle?`, possible ? "yes" : "no", ["yes", "no", "only right"]]; },
      "7-6": () => [pick(["Three matching sides gives...", "All three corresponding sides match: "]), "SSS", ["SSS", "SAS", "ASA"]],
      "7-7": () => { const p = pick([10, 20, 25, 50, 75]); const den = 100 / p; return [`${p}% as a fraction = ?`, `1/${den}`, [`1/${den + 1}`, `1/${den}`, `${p}/10`]]; },
      "7-8": () => { const cp = r(40, 90), profit = r(10, 30), sp = cp + profit; return [`CP ₹${cp}, SP ₹${sp}: profit = ?`, `₹${profit}`, [`₹${profit - 5}`, `₹${profit}`, `₹${cp + sp}`]]; },
      "7-9": () => { const face = r(2, 6); return [`P(rolling a ${face}) = ?`, "1/6", ["1/2", "1/6", "5/6"]]; },
      "7-10": () => [pick(["The centre column is usually...", "After many drops, the middle is..."]), "tallest", ["shortest", "tallest", "empty"]],
      "7-11": () => { const a = r(1, 4), nums = [a, a + 2, a + 5, a + 7, a + 9]; return [`Median of ${nums.join(", ")} = ?`, `${nums[2]}`, [`${nums[1]}`, `${nums[2]}`, `${nums[3]}`]]; },
      "7-12": () => { const n = pick([3, 4, 6]); return [`A regular polygon has rotational order...`, `${n}`, ["2", `${n}`, "8"]]; },
      "8-1": () => { const b = r(2, 5), e = r(2, 4), v = b ** e; return [`${b}^${e} = ?`, `${v}`, [`${b * e}`, `${v}`, `${v + b}`]]; },
      "8-2": () => { const a = r(2, 4), b = r(2, 5); return [`x^${a} × x^${b} = ?`, `x^${a + b}`, [`x^${a * b}`, `x^${a + b}`, `${a}x^${b}`]]; },
      "8-3": () => { const m = r(1, 5), c = r(1, 8); return [`In y = ${m}x + ${c}, the slope is...`, `${m}`, [`${m}`, `${c}`, `${m + c}`]]; },
      "8-4": () => ["Which point is in quadrant II?", "(−2, 3)", ["(2, 3)", "(−2, 3)", "(−2, −3)"]],
      "8-5": () => [pick(["A parabola opens...", "A quadratic graph can open..."]), "up or down", ["only left", "up or down", "in a circle"]],
      "8-6": () => { const x = r(3, 9), a = r(2, 5), b = r(1, 8), total = a * x + b; return [`${a}x + ${b} = ${total}. x = ?`, `${x}`, [`${x - 1}`, `${x}`, `${x + 2}`]]; },
      "8-7": () => ["x² + 5x + 6 = ?", "(x+2)(x+3)", ["(x+1)(x+6)", "(x+2)(x+3)", "(x−2)(x−3)"]],
      "8-8": () => { const a = r(2, 5), b = r(2, 6), c = r(2, 4), v = a * b * c; return [`Volume of ${a} × ${b} × ${c} = ?`, `${v}`, [`${a * b}`, `${v}`, `${v + c}`]]; },
      "8-9": () => { const p = r(100, 500), rate = pick([10, 20]); return [`₹${p} at ${rate}% for one year = ?`, `₹${p + p * rate / 100}`, [`₹${p + rate}`, `₹${p + p * rate / 100}`, `₹${p * 2}`]]; },
      "8-10": () => [pick(["If x doubles, y in y = 12/x...", "For inverse proportion, when x rises, y..."]), "halves", ["doubles", "halves", "stays 12"]],
      "8-11": () => [pick(["The tallest bin shows the...", "The interval with most data is the..."]), "mode range", ["mean", "mode range", "outlier"]],
      "8-12": () => [pick(["Most likely dice sum = ?", "The most common total from two dice is..."]), "7", ["2", "7", "12"]],
    };
    let candidate;
    do { candidate = rounds[key]?.() || [tool[3], tool[4], tool[5]]; } while (candidate[0] === round.lastQuestion);
    round.lastQuestion = candidate[0];
    return candidate;
  };
  const graphic = (kind, question) => {
    if (kind === "money") { const values = question.match(/₹\d+/g) || ["₹80", "₹100"]; return `<div class="money-graphic"><i>CP ${values[0]}</i><b>→</b><i>SP ${values[1]}</i></div>`; }
    if (kind === "probability") { const face = Number(question.match(/\d+/)?.[0] || 1); return `<div class="probability-graphic">${Array.from({length:6},(_,i)=>`<i class="${i + 1 === face ? "selected" : ""}">${i + 1}</i>`).join("")}</div><small>one highlighted outcome out of six</small>`; }
    if (kind === "numberline") { const value = question.match(/\d+\/\d+/)?.[0] || "3/4"; return `<div class="numberline-graphic"><i>0</i><i>1/2</i><b>${value}</b><i>1</i></div>`; }
    if (kind === "fraction") { const values = question.match(/\d+/g) || [1, 4, 1, 4]; return `<div class="fraction-graphic">${Array(8).fill(0).map((_, i) => `<i class="${i < Number(values[0]) + Number(values[1]) ? "filled" : ""}"></i>`).join("")}</div><small>${values[0]}/8 + ${values[1]}/8</small>`; }
    if (kind === "percent") { const value = question.match(/\d+/)?.[0] || "25"; return `<div class="percent-graphic"><i style="width:${value}%"></i><b>${value}%</b></div>`; }
    if (kind === "power") { const values = question.match(/\d+/g) || [2, 3, 8]; return `<div class="power-graphic"><b>${values[0]}</b><sup>${values[1]}</sup><strong>= ${values[2] || "x"}</strong></div>`; }
    if (kind === "balance") { const values = question.match(/\d+/g) || [2, 3, 11]; return `<div class="balance-graphic"><i>${values[0]}x + ${values[1]}</i><b></b><i>${values[2]}</i></div>`; }
    if (kind === "triangle") { const values = question.match(/\d+/g) || [3, 4, 8]; return `<svg viewBox="0 0 260 120"><path d="M35 100L130 20L225 100Z"/><text x="58" y="112">${values[0]}</text><text x="124" y="32">${values[1]}</text><text x="196" y="112">${values[2]}</text></svg>`; }
    if (kind === "data") { const values = question.match(/\d+/g) || [2, 5, 7, 9, 10]; return `<div class="data-graphic">${values.map((value) => `<i style="height:${Number(value) * 8}px"></i>`).join("")}</div><small>sorted data</small>`; }
    if (kind === "growth") { const values = question.match(/\d+/g) || [100, 10]; const first = Number(values[0]); return `<div class="growth-graphic">${[0,1,2,3].map((i) => `<i style="height:${Math.round(first * (1 + Number(values[1]) / 100) ** i / 4)}px"></i>`).join("")}</div><small>${values[1]}% growth</small>`; }
    if (kind === "line") { const match = question.match(/y = (\d+)x \+ (\d+)/); return `<div class="line-graphic"><i></i><b>y = ${match ? match[1] : 2}x + ${match ? match[2] : 3}</b></div>`; }
    if (kind === "volume") { const values = question.match(/\d+/g) || [2, 3, 4]; return `<div class="cube-graphic">${Array(Number(values[0]) * Number(values[1])).fill('<i></i>').join("")}</div><small>${values.join(" × ")} cubic units</small>`; }
    return ({
    numberline: '<div class="numberline-graphic"><i>−1</i><i>−1/2</i><b>0</b><i>1/2</i><i>1</i></div>', fraction: '<div class="fraction-graphic"><i></i><i class="filled"></i><i class="filled"></i><i></i></div>', balance: '<div class="balance-graphic"><i>x + 3</i><b></b><i>11</i></div>', angles: '<svg viewBox="0 0 260 120"><path d="M20 90H240M55 20L145 90M115 20L205 90"/><path d="M82 54L175 54" stroke-dasharray="6 5"/></svg>', triangle: '<svg viewBox="0 0 260 120"><path d="M35 100L130 20L225 100Z"/><text x="108" y="112">a+b&gt;c</text></svg>', percent: '<div class="percent-graphic"><i></i><b>25%</b></div>', money: '<div class="money-graphic"><i>CP ₹80</i><b>→</b><i>SP ₹100</i></div>', probability: '<div class="probability-graphic"><i></i><i></i><i></i><i></i><i></i><i></i></div>', distribution: '<div class="distribution-graphic"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>', data: '<div class="data-graphic"><i></i><i></i><i></i><i></i><i></i></div>', symmetry: '<div class="symmetry-graphic"><i></i><b></b><i></i></div>', power: '<div class="power-graphic"><b>2</b><sup>3</sup><strong>= 8</strong></div>', line: '<div class="line-graphic"><i></i><b></b></div>', plane: '<div class="plane-graphic"><b>y</b><i>(−2, 3)</i></div>', parabola: '<div class="parabola-graphic"><i></i></div>', tiles: '<div class="tiles-graphic"><i>x²</i><i>5x</i><i>6</i></div>', volume: '<div class="cube-graphic">' + Array(12).fill('<i></i>').join("") + '</div>', growth: '<div class="growth-graphic"><i></i><i></i><i></i><i></i></div>', curve: '<div class="curve-graphic"><i></i></div>', histogram: '<div class="histogram-graphic"><i></i><i></i><i></i><i></i><i></i></div>', dice: '<div class="dice-graphic">⚄ + ⚁ = ?</div>'
    }[kind] || "");
  };
  function render() {
    const [title, topic, intro,, , , kind] = tool;
    const [question, answer, options] = round();
    const visualVariant = r(0, 2);
    document.title = `${title} · Class ${key[0]} · Mathsversity`;
    root.innerHTML = `<div class="tool-head"><div><p class="eyebrow">CLASS ${key[0]} · ${topic.toUpperCase()}</p><h1>${title}</h1><p>${intro}</p></div><div class="score-pill"><span>Score</span><strong id="score">${score}</strong></div></div><div class="tool-board"><div class="prompt-card"><strong>${question}</strong><span>Study the visual model, then choose your answer.</span></div><div class="quiz-graphic visual-${visualVariant}" style="${visualStyle(question)}">${graphic(kind, question)}</div><div class="choice-row">${options.map((x) => `<button class="choice" type="button" data-answer="${x}">${x}</button>`).join("")}</div></div><div class="tool-actions"><button class="tool-btn" id="checkTool" type="button">Check answer</button><button class="tool-btn secondary" id="resetTool" type="button">New round</button><span class="feedback" id="feedback">Choose an answer.</span></div>`;
    document.querySelectorAll(".choice").forEach((button) => button.onclick = () => { document.querySelectorAll(".choice").forEach((item) => item.classList.remove("selected")); button.classList.add("selected"); });
    document.getElementById("checkTool").onclick = () => { if (window.mathsversityFreemium && !window.mathsversityFreemium.canPlay()) return window.mathsversityFreemium.showParentModal(); const selected = document.querySelector(".choice.selected")?.dataset.answer; const feedback = document.getElementById("feedback"); if (selected === answer) { score += 1; document.getElementById("score").textContent = score; window.mathsversityFreemium?.consumeHeart(); window.mathsversityCelebrate?.(); feedback.textContent = `Correct — ${answer}.`; feedback.className = "feedback good"; } else { feedback.textContent = selected ? "Not quite. Use the visual model and try again." : "Choose an answer first."; feedback.className = "feedback try"; } };
    document.getElementById("resetTool").onclick = render;
    window.mathsversityLibraries?.ready.then(() => window.MathJax?.typesetPromise?.([root]));
  }
  render();
})();

(function () {
  const tools = {
    "1-1": {
      grade: 1,
      index: 1,
      title: "Count the Critters",
      topic: "Counting 1-20",
      intro: "Tap every critter once and keep the running count steady.",
      render: countCritters,
    },
    "1-2": {
      grade: 1,
      index: 2,
      title: "Drag-the-Digit matching board",
      topic: "Number recognition",
      intro: "Match each numeral to the card with the same number of dots.",
      render: digitMatch,
    },
    "1-3": {
      grade: 1,
      index: 3,
      title: "Hop-the-Frog number line",
      topic: "Number line basics",
      intro: "Choose jumps that land the frog on the target number.",
      render: frogLine,
    },
    "1-4": {
      grade: 1,
      index: 4,
      title: "Base-10 block joiner",
      topic: "Addition to 10",
      intro: "Join two block groups and find the total.",
      render: blockJoiner,
    },
    "1-5": {
      grade: 1,
      index: 5,
      title: "Pop-and-Remove bubble subtractor",
      topic: "Subtraction to 10",
      intro: "Pop the bubbles that are taken away, then read what remains.",
      render: bubbleSubtract,
    },
    "1-6": {
      grade: 1,
      index: 6,
      title: "2D Shape Sorter",
      topic: "Shape recognition",
      intro: "Sort each shape into the matching shape bin.",
      render: shapeSorter,
    },
    "1-7": {
      grade: 1,
      index: 7,
      title: "Big vs Small ordering slider",
      topic: "Size and comparison",
      intro: "Put the objects in order from smallest to biggest.",
      render: sizeOrder,
    },
    "1-8": {
      grade: 1,
      index: 8,
      title: "What Comes Next? pattern builder",
      topic: "Patterns",
      intro: "Study the pattern and choose the next tile.",
      render: patternBuilder,
    },
    "1-9": {
      grade: 1,
      index: 9,
      title: "Giant Analog Clock",
      topic: "Time",
      intro: "Move the hour hand to show the target time.",
      render: simpleClock,
    },
    "1-10": {
      grade: 1,
      index: 10,
      title: "Coin Recognition Tray",
      topic: "Money basics",
      intro: "Drop each coin into the tray with its matching value.",
      render: coinRecognition,
    },
    "2-1": {
      grade: 2,
      index: 1,
      title: "Base-10 Block Builder",
      topic: "Place value",
      intro: "Build the target number using tens rods and ones blocks.",
      render: baseTenBuilder,
    },
    "2-2": {
      grade: 2,
      index: 2,
      title: "Hundreds-Tens-Ones Expander",
      topic: "Place value",
      intro: "Expand a three-digit number into hundreds, tens, and ones.",
      render: htoExpander,
    },
    "2-3": {
      grade: 2,
      index: 3,
      title: "Skip-Counting Number Line",
      topic: "Number line to 100",
      intro: "Choose the missing number in a skip-counting path.",
      render: skipCounting,
    },
    "2-4": {
      grade: 2,
      index: 4,
      title: "Carry-the-Ten animator",
      topic: "Addition with carrying",
      intro: "Regroup ten ones into a tens rod to finish the addition.",
      render: carryTen,
    },
    "2-5": {
      grade: 2,
      index: 5,
      title: "Borrow-a-Ten unbundler",
      topic: "Subtraction with borrowing",
      intro: "Break one ten into ten ones so the subtraction can happen.",
      render: borrowTen,
    },
    "2-6": {
      grade: 2,
      index: 6,
      title: "Greater-Than/Less-Than Balance",
      topic: "Comparing numbers",
      intro: "Compare the two sides and choose the correct sign.",
      render: compareBalance,
    },
    "2-7": {
      grade: 2,
      index: 7,
      title: "Non-Standard Ruler",
      topic: "Length measurement",
      intro: "Measure the object in paperclip units.",
      render: paperclipRuler,
    },
    "2-8": {
      grade: 2,
      index: 8,
      title: "Analog Clock - hour and minute hands",
      topic: "Time",
      intro: "Set both hands to match the target time.",
      render: minuteClock,
    },
    "2-9": {
      grade: 2,
      index: 9,
      title: "Coin Purse Adder",
      topic: "Money",
      intro: "Choose coins until the purse matches the target amount.",
      render: coinAdder,
    },
    "2-10": {
      grade: 2,
      index: 10,
      title: "Cut-in-Half Shape Splitter",
      topic: "Simple fractions",
      intro: "Pick the cut line that splits the shape into two equal halves.",
      render: halfSplitter,
    },
  };

  const key = document.body.dataset.tool;
  const tool = tools[key];
  const root = document.getElementById("toolApp");
  if (!tool || !root) return;

  let score = 0;

  function shell(board) {
    document.title = `${tool.title} · Class ${tool.grade} · Mathsversity`;
    root.innerHTML = `
      <div class="tool-head">
        <div>
          <p class="eyebrow">CLASS ${tool.grade} · ${tool.topic.toUpperCase()}</p>
          <h1>${tool.title}</h1>
          <p>${tool.intro}</p>
        </div>
        <div class="score-pill"><span>Score</span><strong id="score">${score}</strong></div>
      </div>
      <div class="tool-board">${board}</div>
      <div class="tool-actions">
        <button class="tool-btn" id="checkTool" type="button">Check answer</button>
        <button class="tool-btn secondary" id="resetTool" type="button">New round</button>
        <span class="feedback" id="feedback">Make your move.</span>
      </div>
    `;
    window.mathsversityLibraries?.ready.then(() => window.mathsversityEnhanceTool?.(root));
  }

  function setFeedback(message, good) {
    const el = document.getElementById("feedback");
    el.textContent = message;
    el.className = `feedback ${good ? "good" : "try"}`;
  }

  function award(message) {
    score += 1;
    document.getElementById("score").textContent = score;
    window.mathsversityFreemium?.consumeHeart();
    setFeedback(message, true);
    window.mathsversityCelebrate?.();
  }

  function bindCheck(check, reset) {
    document.getElementById("checkTool").onclick = () => {
      check();
    };
    document.getElementById("resetTool").onclick = reset || (() => tool.render());
  }

  function selectable(selector, single = true) {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("click", () => {
        if (single) document.querySelectorAll(selector).forEach((x) => x.classList.remove("selected"));
        el.classList.toggle("selected");
      });
    });
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sample(items) {
    return items[rand(0, items.length - 1)];
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function answerChoices(answer, min, max, count = 3) {
    const values = new Set([answer]);
    while (values.size < count) values.add(rand(min, max));
    return shuffle([...values]);
  }

  function countCritters() {
    const target = rand(6, 16);
    shell(`<div class="prompt-card"><strong>Count to ${target}</strong><span>Tap each critter once.</span></div><div class="critter-grid">${Array.from({ length: target }, (_, i) => `<button class="critter" type="button" aria-label="Critter ${i + 1}"><span class="critter-art critter-${i % 3}"></span></button>`).join("")}</div>`);
    document.querySelectorAll(".critter").forEach((c) => c.onclick = () => c.classList.add("tapped"));
    bindCheck(() => document.querySelectorAll(".critter.tapped").length === target ? award(`Yes. You counted all ${target}.`) : setFeedback("Some critters are still waiting.", false));
  }

  function digitMatch() {
    const pairs = shuffle(Array.from({ length: 9 }, (_, i) => i + 1)).slice(0, 4);
    const dotPairs = shuffle(pairs);
    const matched = new Set();
    shell(`<div class="prompt-card"><strong>Match numerals to dots</strong><span>Drag a numeral onto its dot card, or tap one of each.</span></div><div class="workspace"><div class="tile-grid">${shuffle(pairs).map((n) => `<button class="tile number" draggable="true" data-n="${n}">${n}</button>`).join("")}</div><div class="tile-grid">${dotPairs.map((n) => `<button class="tile dot" data-n="${n}"><span class="dots">${"•".repeat(n)}</span></button>`).join("")}</div></div>`);
    selectable(".number");
    selectable(".dot");
    document.querySelectorAll(".number").forEach((number) => {
      number.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", number.dataset.n));
    });
    document.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("dragover", (event) => event.preventDefault());
      dot.addEventListener("drop", (event) => {
        event.preventDefault();
        const value = event.dataTransfer.getData("text/plain");
        if (value === dot.dataset.n) {
          matched.add(value);
          dot.classList.add("matched");
          document.querySelector(`.number[data-n="${value}"]`)?.classList.add("matched");
          setFeedback(`${value} matched.`, true);
        } else {
          setFeedback("That numeral and dot card do not match.", false);
        }
      });
    });
    bindCheck(() => {
      const a = document.querySelector(".number.selected")?.dataset.n;
      const b = document.querySelector(".dot.selected")?.dataset.n;
      if (a && a === b) {
        matched.add(a);
        document.querySelector(`.number[data-n="${a}"]`)?.classList.add("matched");
        document.querySelector(`.dot[data-n="${a}"]`)?.classList.add("matched");
        matched.size === pairs.length ? award("Every numeral matches its dot card.") : setFeedback(`${a} matched. Keep going.`, true);
      } else if (matched.size === pairs.length) {
        award("Every numeral matches its dot card.");
      } else {
        setFeedback("Choose a numeral and the dot card with the same count.", false);
      }
    });
  }

  function frogLine() {
    let pos = rand(0, 4);
    const target = rand(pos + 3, 10);
    const draw = () => {
      document.getElementById("frogPos").textContent = pos;
      document.querySelector(".number-track").innerHTML = Array.from({ length: 11 }, (_, n) => `<div class="number-node ${n === pos ? "active" : ""}"><span>${n}</span><i></i></div>`).join("");
    };
    const start = pos;
    shell(`<div class="prompt-card"><strong>Hop from ${start} to ${target}</strong><span>Use jumps of 1 or 2.</span></div><div class="frog">frog at <strong id="frogPos">${start}</strong></div><div class="choice-row"><button class="frog-step" data-step="1">+1</button><button class="frog-step" data-step="2">+2</button><button class="frog-step" data-step="-1">-1</button></div><div class="number-track"></div>`);
    draw();
    document.querySelectorAll(".frog-step").forEach((b) => b.onclick = () => { pos = Math.max(0, Math.min(10, pos + Number(b.dataset.step))); draw(); });
    bindCheck(() => pos === target ? award("Perfect landing.") : setFeedback(`The frog is on ${pos}. Aim for ${target}.`, false), () => tool.render());
  }

  function blockJoiner() {
    const a = rand(1, 5);
    const b = rand(1, 10 - a);
    const sum = a + b;
    shell(`<div class="prompt-card"><strong>${a} blocks + ${b} blocks = ?</strong><span>Join the groups, then choose the sum.</span></div><div class="block-row">${Array.from({ length: a }, () => '<div class="one-block"></div>').join("")}<strong>+</strong>${Array.from({ length: b }, () => '<div class="one-block"></div>').join("")}</div><div class="choice-row">${answerChoices(sum, 2, 10).map((n) => `<button class="choice" data-answer="${n}">${n}</button>`).join("")}</div>`);
    selectable(".choice");
    bindCheck(() => Number(document.querySelector(".choice.selected")?.dataset.answer) === sum ? award(`Right. ${a} and ${b} join to make ${sum}.`) : setFeedback("Count both groups together.", false));
  }

  function bubbleSubtract() {
    const total = rand(5, 10);
    const take = rand(1, total - 1);
    const left = total - take;
    shell(`<div class="prompt-card"><strong>${total} - ${take} = ?</strong><span>Pop exactly ${take} bubbles.</span></div><div class="critter-grid">${Array.from({ length: total }, (_, i) => `<button class="bubble" type="button">${i + 1}</button>`).join("")}</div><div class="choice-row">${answerChoices(left, 1, 9).map((n) => `<button class="choice" data-answer="${n}">${n} left</button>`).join("")}</div>`);
    document.querySelectorAll(".bubble").forEach((b) => b.onclick = () => b.classList.toggle("popped"));
    selectable(".choice");
    bindCheck(() => document.querySelectorAll(".bubble.popped").length === take && Number(document.querySelector(".choice.selected")?.dataset.answer) === left ? award(`Yes. ${total} minus ${take} leaves ${left}.`) : setFeedback(`Pop ${take} bubbles and choose how many are left.`, false));
  }

  function shapeSorter() {
    const shapes = ["circle", "square", "triangle", "rectangle"];
    shell(`<div class="prompt-card"><strong>Sort the shapes</strong><span>Drag a shape into its bin, or tap shape then bin.</span></div><div class="workspace"><div class="tile-grid">${shuffle(shapes).map((s) => `<button class="shape ${s}" draggable="true" data-shape="${s}" aria-label="${s}"></button>`).join("")}</div><div class="bins">${shuffle(shapes).map((s) => `<div class="bin" role="button" tabindex="0" data-bin="${s}"><strong>${s}</strong></div>`).join("")}</div></div>`);
    let matched = new Set();
    selectable(".shape");
    document.querySelectorAll(".shape").forEach((shape) => {
      shape.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", shape.dataset.shape));
    });
    const sortInto = (shapeName, bin) => {
      const shape = document.querySelector(`.shape[data-shape="${shapeName}"]`);
      if (!shape) return;
      if (shapeName === bin.dataset.bin) {
        matched.add(shapeName);
        shape.disabled = true;
        shape.classList.add("matched");
        bin.classList.add("matched");
        bin.appendChild(shape);
        setFeedback(`${shapeName} sorted.`, true);
      } else setFeedback("That bin does not match the selected shape.", false);
    };
    document.querySelectorAll(".bin").forEach((bin) => bin.onclick = () => {
      const shape = document.querySelector(".shape.selected");
      if (!shape) return setFeedback("Pick a shape first.", false);
      sortInto(shape.dataset.shape, bin);
    });
    document.querySelectorAll(".bin").forEach((bin) => {
      bin.addEventListener("dragover", (event) => event.preventDefault());
      bin.addEventListener("drop", (event) => {
        event.preventDefault();
        sortInto(event.dataTransfer.getData("text/plain"), bin);
      });
    });
    bindCheck(() => matched.size === 4 ? award("All shapes are sorted.") : setFeedback(`${4 - matched.size} shape bins still need matches.`, false));
  }

  function sizeOrder() {
    const labels = shuffle(["A", "B", "C"]);
    const goal = Math.random() > 0.5 ? "grow" : "shrink";
    shell(`<div class="prompt-card"><strong>Make the row ${goal === "grow" ? "grow" : "shrink"} left to right</strong><span>Use the sliders so the objects go from ${goal === "grow" ? "smallest to biggest" : "biggest to smallest"}.</span></div><div class="slider-stack">${labels.map((label) => { const value = rand(1, 5); return `<label class="slider-line">${label}<input class="size-slider" data-label="${label}" type="range" min="1" max="5" value="${value}"><span><i class="slider-preview" style="--size:${24 + value * 8}px"></i></span></label>`; }).join("")}</div>`);
    document.querySelectorAll(".size-slider").forEach((slider) => {
      slider.addEventListener("input", () => {
        slider.closest(".slider-line").querySelector(".slider-preview").style.setProperty("--size", `${24 + Number(slider.value) * 8}px`);
      });
    });
    bindCheck(() => {
      const values = [...document.querySelectorAll(".size-slider")].map((slider) => Number(slider.value));
      const correct = goal === "grow" ? values[0] < values[1] && values[1] < values[2] : values[0] > values[1] && values[1] > values[2];
      correct ? award(`Nice. The row ${goal === "grow" ? "grows" : "shrinks"} in order.`) : setFeedback(`Adjust the sliders from ${goal === "grow" ? "smallest to biggest" : "biggest to smallest"}.`, false);
    });
  }

  function patternBuilder() {
    const colors = shuffle(["red", "blue", "green", "yellow"]).slice(0, 3);
    const patternTypes = [
      [colors[0], colors[1], colors[0], colors[1]],
      [colors[0], colors[0], colors[1], colors[0], colors[0], colors[1]],
      [colors[0], colors[1], colors[2], colors[0], colors[1]],
    ];
    const pattern = sample(patternTypes);
    const answer = pattern[pattern.length === 4 ? 0 : pattern.length === 6 ? 0 : 2];
    shell(`<div class="prompt-card"><strong>${pattern.join(", ")}, ?</strong><span>Choose the tile that continues the pattern.</span></div><div class="choice-row">${shuffle(colors).map((color) => `<button class="choice" data-answer="${color}">${color}</button>`).join("")}</div>`);
    selectable(".choice");
    bindCheck(() => document.querySelector(".choice.selected")?.dataset.answer === answer ? award(`Yes. ${answer} comes next.`) : setFeedback("Look for the repeating unit, then continue it.", false));
  }

  function simpleClock() {
    let hour = rand(1, 12);
    const target = rand(1, 12);
    if (hour === target) hour = hour === 12 ? 1 : hour + 1;
    shell(`<div class="prompt-card"><strong>Show ${target} o'clock</strong><span>Move the hour hand.</span></div>${clockMarkup()}<input id="hourRange" type="range" min="1" max="12" value="${hour}"><div class="choice-row"><span class="feedback">Hour: <strong id="hourRead">${hour}</strong></span></div>`);
    const render = () => {
      document.querySelector(".hour-hand").style.transform = `rotate(${hour * 30}deg)`;
      document.getElementById("hourRead").textContent = hour;
    };
    document.getElementById("hourRange").oninput = (e) => { hour = Number(e.target.value); render(); };
    render();
    bindCheck(() => hour === target ? award(`That shows ${target} o'clock.`) : setFeedback(`Move the short hand to ${target}.`, false));
  }

  function coinRecognition() {
    const coins = [1, 2, 5, 10];
    const target = sample(coins);
    shell(`<div class="prompt-card"><strong>Put the ${target} coin in the ${target} tray</strong><span>Drag the coin into its value tray, or tap coin then tray.</span></div><div class="coin-row">${shuffle(coins).map((n) => `<button class="coin" draggable="true" data-coin="${n}">${n}</button>`).join("")}</div><div class="choice-row">${shuffle(coins).map((n) => `<button class="choice tray" data-tray="${n}">${n} tray</button>`).join("")}</div>`);
    selectable(".coin");
    selectable(".tray");
    let dropped = false;
    document.querySelectorAll(".coin").forEach((coin) => coin.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", coin.dataset.coin)));
    document.querySelectorAll(".tray").forEach((tray) => {
      tray.addEventListener("dragover", (event) => event.preventDefault());
      tray.addEventListener("drop", (event) => {
        event.preventDefault();
        const value = event.dataTransfer.getData("text/plain");
        if (Number(value) === target && Number(tray.dataset.tray) === target) {
          dropped = true;
          tray.classList.add("matched");
          setFeedback(`The ${target} coin is in the ${target} tray.`, true);
        } else {
          setFeedback("That coin belongs in a different tray.", false);
        }
      });
    });
    bindCheck(() => dropped || (Number(document.querySelector(".coin.selected")?.dataset.coin) === target && Number(document.querySelector(".tray.selected")?.dataset.tray) === target) ? award(`The ${target} coin belongs in the ${target} tray.`) : setFeedback("Match the coin value to the tray label.", false));
  }

  function baseTenBuilder() {
    let tens = 0, ones = 0;
    const target = rand(11, 59);
    const targetTens = Math.floor(target / 10);
    const targetOnes = target % 10;
    shell(`<div class="prompt-card"><strong>Build ${target}</strong><span>Use tens rods and ones blocks.</span></div><div class="choice-row"><button class="choice add-ten">Add ten</button><button class="choice add-one">Add one</button></div><div class="block-row" id="blocks"></div><div class="feedback">Value: <strong id="value">0</strong></div>`);
    const draw = () => {
      document.getElementById("blocks").innerHTML = Array.from({ length: tens }, () => '<div class="ten-rod"></div>').join("") + Array.from({ length: ones }, () => '<div class="one-block"></div>').join("");
      document.getElementById("value").textContent = tens * 10 + ones;
    };
    document.querySelector(".add-ten").onclick = () => { if (tens < 5) tens++; draw(); };
    document.querySelector(".add-one").onclick = () => { if (ones < 9) ones++; draw(); };
    bindCheck(() => tens === targetTens && ones === targetOnes ? award(`${target} is ${targetTens} tens and ${targetOnes} ones.`) : setFeedback(`Build ${targetTens} tens and ${targetOnes} ones.`, false), () => tool.render());
  }

  function htoExpander() {
    const hundreds = rand(1, 4);
    const tens = rand(1, 8);
    const ones = rand(1, 9);
    const target = hundreds * 100 + tens * 10 + ones;
    const correct = `${hundreds * 100} + ${tens * 10} + ${ones}`;
    const choices = shuffle([
      correct,
      `${hundreds * 100} + ${tens} + ${ones * 10}`,
      `${hundreds * 10} + ${tens * 10} + ${ones}`,
    ]);
    shell(`<div class="prompt-card"><strong>Expand ${target}</strong><span>Choose the matching expanded form.</span></div><div class="block-row">${Array.from({ length: hundreds }, () => '<div class="hundred-block"></div>').join("")}${Array.from({ length: tens }, () => '<div class="ten-rod"></div>').join("")}${Array.from({ length: ones }, () => '<div class="one-block"></div>').join("")}</div><div class="choice-row">${choices.map((choice) => `<button class="choice" data-answer="${choice}">${choice}</button>`).join("")}</div>`);
    selectable(".choice");
    bindCheck(() => document.querySelector(".choice.selected")?.dataset.answer === correct ? award(`${target} expands to ${correct}.`) : setFeedback("Read hundreds first, then tens, then ones.", false));
  }

  function skipCounting() {
    const step = sample([2, 5, 10]);
    const start = step === 10 ? rand(1, 4) * 10 : rand(1, 5) * step;
    const missingIndex = rand(2, 4);
    const sequence = Array.from({ length: 6 }, (_, i) => start + i * step);
    const answer = sequence[missingIndex];
    const display = sequence.map((n, i) => i === missingIndex ? "?" : n).join(", ");
    shell(`<div class="prompt-card"><strong>${display}</strong><span>Skip count by ${step}.</span></div><div class="choice-row">${answerChoices(answer, Math.max(1, answer - step * 2), answer + step * 2).map((n) => `<button class="choice" data-answer="${n}">${n}</button>`).join("")}</div>`);
    selectable(".choice");
    bindCheck(() => Number(document.querySelector(".choice.selected")?.dataset.answer) === answer ? award(`Right. Add ${step} each time.`) : setFeedback(`The jumps are all the same size: ${step}.`, false));
  }

  function carryTen() {
    let carried = false;
    const a = rand(6, 9);
    const b = rand(5, 9);
    const total = a + b;
    const onesLeft = total - 10;
    shell(`<div class="prompt-card"><strong>${a} + ${b} has ${total} ones</strong><span>Carry ten ones into one tens rod.</span></div><div class="block-row" id="carryBlocks">${Array.from({ length: total }, () => '<div class="one-block"></div>').join("")}</div><button class="tool-btn secondary" id="carryBtn" type="button">Carry 10 ones</button>`);
    document.getElementById("carryBtn").onclick = () => {
      carried = true;
      document.getElementById("carryBlocks").innerHTML = '<div class="ten-rod"></div>' + Array.from({ length: onesLeft }, () => '<div class="one-block"></div>').join("");
      setFeedback(`Now you have 1 ten and ${onesLeft} ones.`, true);
    };
    bindCheck(() => carried ? award(`${a} + ${b} = ${total} after carrying.`) : setFeedback("Press carry 10 ones first.", false));
  }

  function borrowTen() {
    let borrowed = false;
    const tens = rand(2, 5);
    const ones = rand(0, 4);
    const take = rand(ones + 1, 9);
    const start = tens * 10 + ones;
    const answer = start - take;
    shell(`<div class="prompt-card"><strong>${start} - ${take}</strong><span>Borrow one ten so there are enough ones.</span></div><div class="block-row" id="borrowBlocks">${Array.from({ length: tens }, () => '<div class="ten-rod"></div>').join("")}${Array.from({ length: ones }, () => '<div class="one-block"></div>').join("")}</div><button class="tool-btn secondary" id="borrowBtn" type="button">Borrow 1 ten</button><div class="choice-row">${answerChoices(answer, Math.max(1, answer - 3), answer + 3, 2).map((n) => `<button class="choice" data-answer="${n}">${n}</button>`).join("")}</div>`);
    selectable(".choice");
    document.getElementById("borrowBtn").onclick = () => {
      borrowed = true;
      document.getElementById("borrowBlocks").innerHTML = Array.from({ length: tens - 1 }, () => '<div class="ten-rod"></div>').join("") + Array.from({ length: ones + 10 }, () => '<div class="one-block"></div>').join("");
      setFeedback(`Good. ${tens} tens ${ones} ones became ${tens - 1} tens ${ones + 10} ones.`, true);
    };
    bindCheck(() => borrowed && Number(document.querySelector(".choice.selected")?.dataset.answer) === answer ? award(`${start} - ${take} = ${answer}.`) : setFeedback(`Borrow first, then subtract ${take} ones.`, false));
  }

  function compareBalance() {
    shell(`<div class="prompt-card"><strong>47 ? 52</strong><span>Choose the sign that makes the comparison true.</span></div><div class="choice-row"><button class="choice" data-answer=">">&gt;</button><button class="choice" data-answer="<">&lt;</button><button class="choice" data-answer="=">=</button></div>`);
    selectable(".choice");
    bindCheck(() => document.querySelector(".choice.selected")?.dataset.answer === "<" ? award("47 is less than 52.") : setFeedback("Compare the tens first: 4 tens and 5 tens.", false));
  }

  function paperclipRuler() {
    shell(`<div class="prompt-card"><strong>Measure the pencil</strong><span>Each paperclip unit is one stripe.</span></div><div class="measure-bar" style="width:264px"></div><div class="choice-row">${[5, 6, 7].map((n) => `<button class="choice" data-answer="${n}">${n} paperclips</button>`).join("")}</div>`);
    selectable(".choice");
    bindCheck(() => document.querySelector(".choice.selected")?.dataset.answer === "6" ? award("The pencil is 6 paperclips long.") : setFeedback("Count each full paperclip stripe.", false));
  }

  function minuteClock() {
    let hour = 4, minute = 0;
    shell(`<div class="prompt-card"><strong>Show 4:30</strong><span>Set the hour and minute hands.</span></div>${clockMarkup()}<label>Hour <input id="hourRange" type="range" min="1" max="12" value="4"></label><label>Minute <input id="minuteRange" type="range" min="0" max="55" step="5" value="0"></label><div class="feedback">Time: <strong id="timeRead">4:00</strong></div>`);
    const render = () => {
      document.querySelector(".hour-hand").style.transform = `rotate(${hour * 30 + minute * 0.5}deg)`;
      document.querySelector(".minute-hand").style.transform = `rotate(${minute * 6}deg)`;
      document.getElementById("timeRead").textContent = `${hour}:${String(minute).padStart(2, "0")}`;
    };
    document.getElementById("hourRange").oninput = (e) => { hour = Number(e.target.value); render(); };
    document.getElementById("minuteRange").oninput = (e) => { minute = Number(e.target.value); render(); };
    render();
    bindCheck(() => hour === 4 && minute === 30 ? award("That shows 4:30.") : setFeedback("The minute hand should point to 6 for :30.", false));
  }

  function coinAdder() {
    let total = 0;
    const target = 18;
    shell(`<div class="prompt-card"><strong>Make 18</strong><span>Add coins to the purse.</span></div><div class="coin-row">${[1, 2, 5, 10].map((n) => `<button class="coin add-coin" data-coin="${n}">${n}</button>`).join("")}</div><div class="prompt-card"><strong>Purse total: <span id="coinTotal">0</span></strong><span>Target: ${target}</span></div>`);
    document.querySelectorAll(".add-coin").forEach((b) => b.onclick = () => { total += Number(b.dataset.coin); document.getElementById("coinTotal").textContent = total; });
    bindCheck(() => total === target ? award("Exact amount: 18.") : setFeedback(total > target ? "Too much. Start a new round and use fewer coins." : "Keep adding coins.", false), () => { total = 0; document.getElementById("coinTotal").textContent = total; });
  }

  function halfSplitter() {
    shell(`<div class="prompt-card"><strong>Which cut makes two equal halves?</strong><span>The rectangle needs two same-size parts.</span></div><div class="choice-row"><button class="choice" data-answer="middle">Vertical middle cut</button><button class="choice" data-answer="edge">Tiny edge cut</button><button class="choice" data-answer="corner">Corner snip</button></div><div class="measure-bar" style="width:240px"></div>`);
    selectable(".choice");
    bindCheck(() => document.querySelector(".choice.selected")?.dataset.answer === "middle" ? award("A middle cut makes two equal halves.") : setFeedback("Halves must be equal in size.", false));
  }

  function clockMarkup() {
    return `<div class="clock-face"><div class="hand hour-hand"></div><div class="hand minute-hand"></div><div class="clock-center"></div></div>`;
  }

  tool.render();
})();

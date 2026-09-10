function isNumberToken(token: string) { return /^\d+(?:\.\d+)?$/.test(token); }

export function calculateExpression(expression: string): number {
  const normalized = expression.replace(/,/g, "").replace(/\s+/g, "");
  if (!normalized || normalized.length > 200 || !/^[0-9+\-*/().^]+$/.test(normalized)) throw new Error("Unsupported calculation expression.");
  const tokens = normalized.match(/\d+(?:\.\d+)?|[()+\-*/^]/g) ?? [];
  if (tokens.join("") !== normalized) throw new Error("Invalid calculation expression.");
  const values: number[] = [], operators: string[] = [];
  const precedence: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
  const apply = () => {
    const op = operators.pop(); if (!op) throw new Error("Invalid calculation expression.");
    const b = values.pop(), a = values.pop(); if (a === undefined || b === undefined) throw new Error("Invalid calculation expression.");
    let result = 0;
    if (op === "+") result = a + b; else if (op === "-") result = a - b; else if (op === "*") result = a * b;
    else if (op === "/") { if (b === 0) throw new Error("Cannot divide by zero."); result = a / b; }
    else if (op === "^") result = Math.pow(a, b);
    if (!Number.isFinite(result)) throw new Error("Calculation overflowed."); values.push(result);
  };
  let expectValue = true;
  for (const token of tokens) {
    if (isNumberToken(token)) { if (!expectValue) throw new Error("Invalid calculation expression."); values.push(Number(token)); expectValue = false; continue; }
    if (token === "(") { if (!expectValue) throw new Error("Invalid calculation expression."); operators.push(token); continue; }
    if (token === ")") { if (expectValue) throw new Error("Invalid calculation expression."); while (operators.length && operators.at(-1) !== "(") apply(); if (operators.pop() !== "(") throw new Error("Mismatched parentheses."); expectValue = false; continue; }
    if (!(token in precedence)) throw new Error("Invalid calculation expression.");
    if (expectValue && token === "-") values.push(0); else if (expectValue) throw new Error("Invalid calculation expression.");
    while (operators.length && operators.at(-1) !== "(" && precedence[operators.at(-1)!] >= precedence[token]) apply();
    operators.push(token); expectValue = true;
  }
  if (expectValue) throw new Error("Invalid calculation expression.");
  while (operators.length) { if (operators.at(-1) === "(") throw new Error("Mismatched parentheses."); apply(); }
  if (values.length !== 1 || !Number.isFinite(values[0])) throw new Error("Invalid calculation expression.");
  return values[0];
}

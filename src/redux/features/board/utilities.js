export const getBoardCards = (numberOfCards) => {
  const colors = [
    "rgb(139,69,19)",
    "rgb(225,225,0)",
    "rgb(255,0,0)",
    "rgb(225,165,0",
    "rgb(34,139,34)",
    "rgb(128,0,128",
    "rgb(0,0,0)",
    "rgb(128,128,128)",
  ];

  const newer = [];
  while (newer.length !== numberOfCards) {
    const random = Math.floor(Math.random() * (numberOfCards / 2));
    if (newer.filter((data) => data === colors[random]).length < 2) {
      newer.push(colors[random]);
    }
  }

  return newer.map((color, index) => ({
    cardId: index,
    backgroundColor: "rgb(43, 120, 228)",
    alternativeBackground: color,
    flipped: false,
    matched: false,
  }));
};

export const formErrors = {
  OddNumber: "The product of row(s) * column(s) cannot be an odd number",
};

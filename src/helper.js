// helper for 16x16 Images
const adjustGrid = (field) => {
  return field * 16;
};

const controls = {
  ArrowUp: "MoveUp",
  ArrowRight: "MoveRight",
  ArrowDown: "MoveDown",
  ArrowLeft: "MoveLeft",
};

const controllsArray = Object.keys(controls);




import Icons from "../components/Icons";

export const updateOjectArray = (arr, id, newObject) => {
  var index = arr.findIndex((x) => x.id === id);
  if (index !== -1)
    return [
      ...arr.slice(0, index),
      { ...arr[index], ...newObject },
      ...arr.slice(index + 1),
    ];
};

export const formatNumber = (price) => {
  return Number(Math.round(price)).toLocaleString().split(",").join(".");
};
export const showStar = (numberStar) => {
  const stars = [];
  for (let i = 0; i < numberStar; i++) {
    stars.push({
      icon: Icons.IconStar,
    });
  }
  for (let i = 5; i > numberStar; i--) {
    stars.push({
      icon: Icons.IconEmptyStar,
    });
  }
  return stars;
};

const createArr = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (el, index) => start + index);
};

export const paginationArr = (totalItem, current, sibling = 1) => {
  const pageSize = import.meta.env.VITE_BASE_PAGINATION_SIZE;
  const paginations = Math.ceil(totalItem / pageSize);
  const length = sibling + 5;
  if (paginations <= length) return createArr(1, paginations);
  const isShowLeft = current - sibling > 2;
  const isShowRight = current + sibling < paginations - 1;
  if (isShowLeft && !isShowRight) {
    const rightStart = paginations - 4;
    const rightRange = createArr(rightStart, paginations);
    return [1, "DOTS", ...rightRange];
  }
  if (!isShowLeft && isShowRight) {
    const leftRange = createArr(1, 5);
    return [...leftRange, "DOTS", paginations];
  }

  const siblingLeft = Math.max(current - sibling, 1);
  const siblingRight = Math.min(current + sibling, paginations);
  if (isShowLeft && isShowRight) {
    const middleRange = createArr(siblingLeft, siblingRight);
    return [1, "DOTS", ...middleRange, "DOTS", paginations];
  }
};

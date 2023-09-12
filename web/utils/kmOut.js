// m to km conversion

const kmOut = (m) => {
  if (m < 1000) {
    return `${m.toFixed(1)}m`;
  } else {
    return `${(m / 1000).toFixed(1)}km`;
  }
};

export default kmOut;

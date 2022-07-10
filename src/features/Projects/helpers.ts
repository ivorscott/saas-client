interface Dict {
  [index: string]: any;
}

const sortBy = (key: string) => {
  return (a: Dict, b: Dict) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
};

export { sortBy };

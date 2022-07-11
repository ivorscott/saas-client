type SortBy = "asc" | "desc";

// Sorts values by given key in descending order unless ascending order is specified.
const orderBy = (values: any[], key: string, sortBy: SortBy = "desc") => {
  return values.sort((a, b) => {
    let fieldA, fieldB;

    try {
      // Assume it's a string.
      fieldA = a[key].toLowerCase();
      fieldB = b[key].toLowerCase();
    } catch {
      fieldA = a[key];
      fieldB = b[key];
    }

    if (sortBy === "desc") {
      return sortByDesc(fieldA, fieldB);
    } else {
      return sortByAsc(fieldA, fieldB);
    }
  });
};

const sortByDesc = (a: any, b: any) => {
  return a > b ? 1 : a < b ? -1 : 0;
};

const sortByAsc = (a: any, b: any) => {
  return a < b ? 1 : a > b ? -1 : 0;
};

export { orderBy };

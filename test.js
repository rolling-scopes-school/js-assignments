function getCommonDirectoryPath(pathes) {
  const allElementsSame = arr => arr.every(elem => elem === arr[0]);

  const allEqualInColumn = (arr, columnIndex) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][columnIndex] !== arr[0][columnIndex]) return false;
    }

    return true;
  };

  const roots = pathes.map(path => path[0]);

  if (!allElementsSame(roots)) return '';

  let path = '';

  const splitted = pathes.map(path => path.split('/'));

  console.log(splitted);

  for (let i = 0; i < pathes[0].length; i++) {
    if (allEqualInColumn(splitted, i)) {
      path += splitted[0][i] + '/';
    } else {
      return path;
    }
  }
}

console.log(
  getCommonDirectoryPath(['/web/images/image1.png', '/web/images/image2.png'])
);

function getRectangleString(width, height) {
  const createStrTemplate = (startSym, centerSym = '─') => {
    const closingSym = startSym === '┌' ? '┐' : startSym === '└' ? '┘' : '│';
    return startSym + centerSym.repeat(width - 2) + closingSym + '\n';
  };

  let result = '';

  result += createStrTemplate('┌');

  if (height === 1) return result;
  if (width !== 2) result += createStrTemplate('│', ' ').repeat(height - 2);

  result += createStrTemplate('└');

  return result;
}




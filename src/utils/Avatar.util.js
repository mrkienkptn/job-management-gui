export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  
  if (name === ''){
    return {
      children: ''
    }
  }
  const splitedName = name.split(' ')
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: splitedName.length > 1 
      ? `${splitedName[0][0]}${splitedName[1][0]}` 
      : `${splitedName[0][0]}`
  };
}
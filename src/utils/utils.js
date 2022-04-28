export const getClasses = classes =>
  classes
    .filter(item => item !== '')
    .join(' ')
    .trim();

export const handleKeyDown = (event, cb, value) => {
  if (event.key === 'Enter' || event.key === ' ') {
    cb(value);
  }
};

{
  module.exports = (() => {
    return {
      FLOAT: {
        name: 'FLOAT',
        operation: (value) => parseFloat(value)
      }
    };
  })();
}

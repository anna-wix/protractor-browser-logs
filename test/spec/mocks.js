
module.exports.console = (logs) => {

  function log(level) {
    return message => logs.push({level: {name: level}, message: message});
  }

  return {
    log  : log('INFO'),
    info : log('INFO'),
    error: log('SEVERE'),
    warn : log('WARNING'),
    debug: log('DEBUG')
  };

};

module.exports.browser = (logs, browserName) => {
  let Capabilities = new Map();
  return {
    getCapabilities() {
      return Promise.resolve(
        Capabilities.set('browserName', browserName || 'chrome')
      );
    },
    manage() {
      return {
        logs() {
          return {
            get(type) {
              return type === 'browser' ?
                Promise.resolve(logs.splice(0, logs.length)) :
                Promise.reject();
            }
          };
        }
      };
    }
  };
};

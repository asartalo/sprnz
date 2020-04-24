function scopeLog(log, scope) {
  const scoped = method => (...msgs) => log[method].call(log, scope, ...msgs);
  return {
    info: scoped('info'),
    error: scoped('error'),
  };
}

module.exports = scopeLog;

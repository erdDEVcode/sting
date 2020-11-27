interface Options {
  delayMs: number,
  executeImmediately?: boolean
}

export const doInterval = (fn: Function, { delayMs, executeImmediately }: Options) => {
  if (executeImmediately) {
    fn()
  }

  return setInterval(fn, delayMs)
}

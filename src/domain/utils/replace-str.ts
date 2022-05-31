const replacementRegEx = /\{\{(\w+)\}\}/gm

const replacer = (dict: Record<string, string>): (match: string, key: string) => string => (_, key) => {
  return dict[key] ?? key
}

export const replaceStr = (str: string, dict: Record<string, string>) => str
  .replace(replacementRegEx, replacer(dict))

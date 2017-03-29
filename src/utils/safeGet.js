export default function safeGet(obj, path, df) {
  function everyFn(step) {
		return !(step && (obj = obj[step]) === undefined);
	}

  if (!obj) { return df;}
	const steps = path
		      .replace(/\[/g, '.')
		      .replace(/]/g, '')
		      .split('.')
		      .filter(Boolean);
    
  return steps.every(everyFn) ? obj : df;
}

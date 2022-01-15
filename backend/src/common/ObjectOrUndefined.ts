export default function ObjectOrUndefined(validate, object) {
	if (validate != undefined) return object;
	return undefined;
}

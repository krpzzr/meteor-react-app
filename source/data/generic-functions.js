/**
 * @description: Erase all docs from a collection
 * @exampleInput: collection reference
 * @exampleOutput: true; error?
 * @pure: false; side-effects: writes to db
 * @hasPassingTests: false
 */
export function clear_collection(collection) {
  // const res = collection.rawCollection().deleteMany({});
  const res = collection.remove({});
  return res;
}

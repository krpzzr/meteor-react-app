export function pipe(valueBeingPiped, printInterimResults) {
  return {
    // eslint-disable-next-line fp/no-rest-parameters
    thru: function(...functionsToApplyOnValue) {
      // eslint-disable-next-line fp/no-let,fp/no-arguments
      // let interimResult = functionsToApplyOnValue[0](valueBeingPiped);
      let interimResult;
      if (printInterimResults) {devprint(interimResult);}
      // eslint-disable-next-line fp/no-nil
      functionsToApplyOnValue.map((fn, i) => {
        // Array.isArray([])
        // To fold return values we have to get 1st interim result first
        if (i === 0) {
          interimResult = fn(valueBeingPiped);
          return void 0;
        }
        // if (i === 0) {return void 0;}
        // eslint-disable-next-line fp/no-mutation
        return interimResult = pipe(fn(interimResult)).fold();
      });
      return interimResult;
    },
    fold: function() {
      return valueBeingPiped; //хер его знает, че он делает, но без него '.thru' не пашет...
    }
  };
}
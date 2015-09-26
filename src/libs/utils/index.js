import R from 'ramda';

const isNumber = R.allPass([R.compose(R.not, isNaN), R.is(Number)]);

const formatPercentage = (x) => Math.round(x*100) + "%";

const makeValidator = R.compose(R.allPass,
      R.map(R.compose(R.apply(R.propSatisfies), R.reverse)),
      R.toPairs);

const validateObject = (validations, obj) => R.allPass([R.is(Object), makeValidator(validations)], obj);

export default {
  isNumber,
  formatPercentage,
  validateObject: R.curry(validateObject)
};
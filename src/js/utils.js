
const filterByEq = (prop, value, arr) => (
    arr.filter(obj => obj[prop] === value)
);

const compose = (...args) => {
    return data =>
        args.reduceRight((value, func) => func(value), data);
};

const pipe = (...args) => {
    return data =>
        args.reduce((value, func) => func(value), data);
};

export { compose, pipe, filterByEq };
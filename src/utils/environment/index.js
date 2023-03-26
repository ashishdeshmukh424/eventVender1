const inDevelopment = () => {
  return process.env.NODE_ENV.includes('development');
};

const inQA = () => {
  return process.env.NODE_ENV.includes('qa');
};

const inStaging = () => {
  return process.env.NODE_ENV.includes('staging');
};

const inProduction = () => {
  return process.env.NODE_ENV.includes('prod');
};

export { inDevelopment, inQA, inStaging, inProduction };

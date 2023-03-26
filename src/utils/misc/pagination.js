import { parseNumber } from './numbers';

export const paginate = (query) => {
  if (!query) return;

  const page = query.page ? parseNumber(query.page) : 0;
  const pageSize = query.pageSize ? parseNumber(query.pageSize) : 25;

  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};
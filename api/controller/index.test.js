import { subDivisionController,  } from '../controller/index.js';

describe('subDivisionController', () => {

  const url = `http://localhost:8000/subdivision`

  it('should return an array of subdivision', () => {
    const url = new URL(url)
    const result = subDivisionController(url);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle sort parameters correctly', () => {
    const urlWithSortParams = new URL(`${url}?sort=name,nearMapImageDate&order:desc`)
    const result = subDivisionController(urlWithSortParams);
    expect(Array.isArray(result)).toBe(true);
  });

});



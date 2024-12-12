import { Repository } from '../types';
import {
  calculateMostForkedRepos,
  calculateMostStarredRepos,
  calculatePopularLanguages,
} from '../utils';

const mockRepositories: Repository[] = [
  {
    name: 'repo1',
    description: 'test repo 1',
    stargazerCount: 1000,
    forkCount: 500,
    url: 'https://github.com/test/repo1',
    languages: {
      edges: [
        { node: { name: 'javascript' }, size: 1000 },
        { node: { name: 'typescript' }, size: 500 },
      ],
    },
  },
  {
    name: 'repo2',
    description: 'test repo 2',
    stargazerCount: 2000,
    forkCount: 300,
    url: 'https://github.com/test/repo2',
    languages: {
      edges: [
        { node: { name: 'python' }, size: 800 },
        { node: { name: 'javascript' }, size: 400 },
      ],
    },
  },
  {
    name: 'repo3',
    description: 'test repo 3',
    stargazerCount: 3000,
    forkCount: 1000,
    url: 'https://github.com/test/repo3',
    languages: {
      edges: [
        { node: { name: 'typescript' }, size: 1200 },
        { node: { name: 'python' }, size: 300 },
      ],
    },
  },
];

describe('repository statistics calculations', () => {
  describe('calculateMostForkedRepos', () => {
    test('should return empty array for empty input', () => {
      const result = calculateMostForkedRepos([]);
      expect(result).toEqual([]);
    });

    test('should return top 5 most forked repositories', () => {
      const result = calculateMostForkedRepos(mockRepositories);
      expect(result).toEqual([
        { repo: 'repo3', count: 1000 },
        { repo: 'repo1', count: 500 },
        { repo: 'repo2', count: 300 },
      ]);
    });

    test('should sort repositories by fork count in descending order', () => {
      const result = calculateMostForkedRepos(mockRepositories);
      expect(result[0].count).toBeGreaterThanOrEqual(result[1].count);
      expect(result[1].count).toBeGreaterThanOrEqual(result[2].count);
    });
  });

  describe('calculateMostStarredRepos', () => {
    test('should return empty array for empty input', () => {
      const result = calculateMostStarredRepos([]);
      expect(result).toEqual([]);
    });

    test('should return top 5 most starred repositories', () => {
      const result = calculateMostStarredRepos(mockRepositories);
      expect(result).toEqual([
        { repo: 'repo3', stars: 3000 },
        { repo: 'repo2', stars: 2000 },
        { repo: 'repo1', stars: 1000 },
      ]);
    });

    test('should sort repositories by star count in descending order', () => {
      const result = calculateMostStarredRepos(mockRepositories);
      expect(result[0].stars).toBeGreaterThanOrEqual(result[1].stars);
      expect(result[1].stars).toBeGreaterThanOrEqual(result[2].stars);
    });
  });

  describe('calculatePopularLanguages', () => {
    test('should return empty array for empty input', () => {
      const result = calculatePopularLanguages([]);
      expect(result).toEqual([]);
    });

    test('should return empty array when no languages are present', () => {
      const repoWithNoLanguages: Repository[] = [
        {
          ...mockRepositories[0],
          languages: { edges: [] },
        },
      ];
      const result = calculatePopularLanguages(repoWithNoLanguages);
      expect(result).toEqual([]);
    });

    test('should return top 5 most used languages', () => {
      const result = calculatePopularLanguages(mockRepositories);
      expect(result).toEqual([
        { language: 'javascript', count: 2 },
        { language: 'typescript', count: 2 },
        { language: 'python', count: 2 },
      ]);
    });

    test('should count language occurrences correctly', () => {
      const result = calculatePopularLanguages(mockRepositories);
      const jsCount = result.find(
        (lang) => lang.language === 'javascript'
      )?.count;
      expect(jsCount).toBe(2);
    });
  });
});

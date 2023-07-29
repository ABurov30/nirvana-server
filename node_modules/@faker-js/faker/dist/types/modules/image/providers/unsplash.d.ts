import type { Faker } from '../../..';
/**
 * Module to generate links to random images on `https://source.unsplash.com/`.
 *
 * @deprecated Use `faker.image` instead.
 */
export declare class Unsplash {
    private readonly faker;
    constructor(faker: Faker);
    /**
     * Generates a new unsplash image url for a random supported category.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param keyword The image keywords to use.
     *
     * @deprecated Use `faker.image` instead.
     */
    image(width?: number, height?: number, keyword?: string): string;
    /**
     * Generates a new unsplash image url.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param category The category of the image to generate.
     * @param keyword The image keywords to use.
     *
     * @deprecated Use `faker.image` instead.
     */
    imageUrl(width?: number, height?: number, category?: string, keyword?: string): string;
    /**
     * Generates a new unsplash image url using the "food" category.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param keyword The image keywords to use.
     *
     * @deprecated Use `faker.image` instead.
     */
    food(width?: number, height?: number, keyword?: string): string;
    /**
     * Generates a new unsplash image url using the "people" category.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param keyword The image keywords to use.
     *
     * @deprecated Use `faker.image` instead.
     */
    people(width?: number, height?: number, keyword?: string): string;
    /**
     * Generates a new unsplash image url using the "nature" category.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param keyword The image keywords to use.
     *
     * @deprecated Use `faker.image` instead.
     */
    nature(width?: number, height?: number, keyword?: string): string;
    /**
     * Generates a new unsplash image url using the "technology" category.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param keyword The image keywords to use.
     *
     * @deprecated Use `faker.image` instead.
     */
    technology(width?: number, height?: number, keyword?: string): string;
    /**
     * Generates a new unsplash image url using the "objects" category.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param keyword The image keywords to use.
     *
     * @deprecated Use `faker.image` instead.
     */
    objects(width?: number, height?: number, keyword?: string): string;
    /**
     * Generates a new unsplash image url using the "buildings" category.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param keyword The image keywords to use.
     *
     * @deprecated Use `faker.image` instead.
     */
    buildings(width?: number, height?: number, keyword?: string): string;
}

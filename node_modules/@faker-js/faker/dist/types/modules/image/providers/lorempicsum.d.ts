import type { Faker } from '../../..';
/**
 * Module to generate links to random images on https://picsum.photos.
 *
 * @deprecated Use `faker.image.urlPicsumPhotos` instead.
 */
export declare class LoremPicsum {
    private readonly faker;
    constructor(faker: Faker);
    /**
     * Generates a new picsum photos image url.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param grayscale Whether to return a grayscale image. Default to `false`.
     * @param blur The optional level of blur to apply. Supports `1` - `10`.
     *
     * @deprecated Use `faker.image.urlPicsumPhotos` instead.
     */
    image(width?: number, height?: number, grayscale?: boolean, blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): string;
    /**
     * Generates a new picsum photos image url.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param grayscale Whether to return a grayscale image. Default to `false`.
     *
     * @deprecated Use `faker.image.urlPicsumPhotos` instead.
     */
    imageGrayscale(width?: number, height?: number, grayscale?: boolean): string;
    /**
     * Generates a new picsum photos image url.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param blur The optional level of blur to apply. Supports `1` - `10`.
     *
     * @deprecated Use `faker.image.urlPicsumPhotos` instead.
     */
    imageBlurred(width?: number, height?: number, blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): string;
    /**
     * Generates a new picsum photos image url.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param grayscale Whether to return a grayscale image. Default to `false`.
     * @param blur The optional level of blur to apply. Supports `1` - `10`.
     * @param seed The optional seed to use.
     *
     * @deprecated Use `faker.image.urlPicsumPhotos` instead.
     */
    imageRandomSeeded(width?: number, height?: number, grayscale?: boolean, blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, seed?: string): string;
    /**
     * Generates a new picsum photos image url.
     *
     * @param width The width of the image. Defaults to `640`.
     * @param height The height of the image. Defaults to `480`.
     * @param grayscale Whether to return a grayscale image. Default to `false`.
     * @param blur The optional level of blur to apply. Supports `1` - `10`.
     * @param seed The optional seed to use.
     *
     * @deprecated Use `faker.image.urlPicsumPhotos` instead.
     */
    imageUrl(width?: number, height?: number, grayscale?: boolean, blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, seed?: string): string;
}

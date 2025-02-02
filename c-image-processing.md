# Image file input and output

## Image data basics

An image consists of two-diemensional array of numbers. The color or gray shade displayed for a given picture element (pixel) depends on the number stored in the array for that pixel. The simplest type of image is black and white. It is a binary image since each pixel is either 0 or 1.

The next more complex type of image data is gray scale, where each pixel takes on a value between zero and the number of gray scales or gray levels that the scanner can record. These images appear like common black and white photographs. Most grayscale images today have 256 shades of gray. Human eye can distinguish about 40 shades of gray, so a 256-shade image looks like a photograph.

The most complex type of image is color. Color images are similar to gray scale except that there are three bands, or channels, corresponding to the colors red, green, and blue. Thus each pixel has three values associated with it. A color scanner uses red, green, and blue filters to produce those values.

The biggest problem with scanning images is file size. Most scanners can scan 300 dots per inch (dpi), so a 3x5 inch photograph at 300 dpi provides 900x1500 pixels. At eight bits per pixel, the image file is over 1,350,000 bytes.

## Image file I/O requirements

Image file I/O routines need to read and write image files in a manner that frees the programmer from worrying about details. The routines need to hide the underlying disk files.

Here is code sample that shows what a programmer would like to write when creating a routine. The first three lines declare the basic variables needed. Line 3 creates the output image to be just like the input image (same type and size). The output image is needed because the routines cannot write to an image file that does not exist. Line 4 reads the size of the input image. The height and width are necessary to allocate the image array. The allocation takes place in line 5. The size (height and width) does not matter to the programmer. Line 6 reads the image array from the input file. The type of input file (Tiff or BMP) does not matter. Line 7 is where the programmer calls the desired processing routine. Line 8 write the resulting image array to the output file, and line 9 frees the memory array allocated in line 5.

```c++
char *in_name, *out_name;
short **the_image;
long height, width;

create_image_file(in_name, out_name);
// Calls routeines to determine the specific file format and create files for those formats
get_image_size(in_name, &height, &width);
// Determines the specific file format and the size of the image to process. Size is needed to allocate image arrays and ro pass to processing routines. It also calls routines to read the image headers.
the_image = allocate_image_array(height, width);
// Creates memory for arrays of numbers
read_image_array(in_name, the_image);
// Calls routines that check the file format and call the read routines for those specific formats

    // You call and image processing routine. These routines will receive a pointer to an allocated array. They must also receive the size of the image or they cannot process through the numbers.

write_image_array(out_name, the_image);
// Calls routines that check the file format and call the write routines for those specific formats
free_image_array(the_image, height);
// Frees memory for arrays of numbers
```

This was a high-level I/O routine. These routines are the top-level of a family of routines. These hide the image file details from the programmer. The underlying routines do the specific work. This structure removes all the file I/O from the image processing routines. All routines receive an array of numbers and the size of the array. This improves the portability of the image processing routines. They do not depend on image formats or srouces.

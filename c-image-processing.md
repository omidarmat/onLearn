# Image file input and output

## Image data basics

An image consists of two-diemensional array of numbers. The color or gray shade displayed for a given picture element (pixel) depends on the number stored in the array for that pixel. The simplest type of image is black and white. It is a binary image since each pixel is either 0 or 1.

The next more complex type of image data is gray scale, where each pixel takes on a value between zero and the number of gray scales or gray levels that the scanner can record. These images appear like common black and white photographs. Most grayscale images today have 256 shades of gray. Human eye can distinguish about 40 shades of gray, so a 256-shade image looks like a photograph.

The most complex type of image is color. Color images are similar to gray scale except that there are three bands, or channels, corresponding to the colors red, green, and blue. Thus each pixel has three values associated with it. A color scanner uses red, green, and blue filters to produce those values.

The biggest problem with scanning images is file size. Most scanners can scan 300 dots per inch (dpi), so a 3x5 inch photograph at 300 dpi provides 900x1500 pixels. At eight bits per pixel, the image file is over 1,350,000 bytes.

## Image file I/O requirements

Image file I/O routines need to read and write image files in a manner that frees the programmer from worrying about details. The routines need to hide the underlying disk files.

Here is code sample that shows what a programmer would like to write when creating a routine. The first three lines declare the basic variables needed. Line 3 creates the output image to be just like the input image (same type and size). The output image is needed because the routines cannot write to an image file that does not exist. Line 4 reads the size of the input image. The height and width are necessary to allocate the image array. The allocation takes place in line 5. The size (height and width) does not matter to the programmer. Line 6 reads the image array from the input file. The type of input file (Tiff or BMP) does not matter. Line 7 is where the programmer calls the desired processing routine. Line 8 write the resulting image array to the output file, and line 9 frees the memory array allocated in line 5.

```c
char *in_name, *out_name;
short **the_image;
long height, width;

create_image_file(in_name, out_name);
// Calls routeines to determine the specific file format and create files for those formats
get_image_size(in_name, &height, &width);
// Determines the specific file format and the size of the image to process. Size is needed to allocate image arrays and ro pass to processing routines. It also calls routines to read the 'image headers'.
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

## TIFF

The goals of the TIFF specification are extensibility, portability, and revisability. TIFF must be extensible in the future. TIFF must be able to adapt to new types of images and data and must be portable between different computers, processors, and operating systems. TIFF must be revisable — it is not a read-only format. Software systems should be able to edit, process, and change TIFF files.

### Tags

TIFF stands for Tag Image File Format. Tag refers to the file's **basic structure**. A TIFF tag provides information about the image, such as its **width**, **length**, and **number of pixels**. Tags are organized in **tag directories**. Tag directories have no set length or number, since **pointers** lead from one directory to another. Here is a list of standard tags:

```
SubfileType
    Tag=255 (FF)    Type=short      N=1
    Indicates the kind of data in the subfile

ImageWidth
    Tag=256 (100)   Type=short      N=1
    The width (x or horizontal) of the image in pixels

ImageLength
    Tag=257 (101)   Type=short      N=1
    The length (y or height or vertical) of the image in pixels

RowsPerStrip
    Tag=278 (116)   Type=long       N=1
    The number of rows per strip
    The default is the entire image in one strip

StripOffsets
    Tag=273 (111)   Type=short or long      N=strips per image
    The byte offset for each strip

StripByteCounts
    Tag=279 (117)   Type=long       N=1
    The number of bytes in each strip

SamplesPerPixel
    Tag=277 (115)   Type=short      N=1
    The number of samples per pixel
    (1 for monochrome data, 3 for color)

BitsPerSample
    Tag=258 (102)   Type=short      N=SamplesPerPixel
    The number of bits per pixel. 2**BitsPerSample = # of gray levels
```

The right-hand column in the figure above shows the structure of each directory entry. Each entry contains a tag indicating **what type of information** the file holds, the **data type** of the information, the **length of the information,** and a pointer to the information or the information itself.

This is the strucutre of a TIFF file:

![tiff-structure](/images/cips/tiff-structure.png)

This is the beginning of a TIFF file:

![tiff-beginning](/images/cips/tiff-beginning.png)

The first 8 bytes of the file are the **header**. These 8 bytes have the same format on all TIFF files. The remainder of the file differs from image to image.

Bytes 0 and 1 tell whether the file stores numbers with the most significant byte (MSB) first, or least significant byte (LSB) first. This is alse called **byte order** as it is visible in the structure of the TIFF file. If bytes 0 and 1 are II (0x4949), then the LSB is first (predominant in the PC world). If the value is MM (0x4D4D) the MSB is first (predominant in the Macintosh world). These values are converted from hexadecimal to ASCII text (`49` translates to `I` and `4D` translates to `M`). Your software needs to read both formats.

Bytes 2 and 3 give the TIFF **version number**, which should be `42` (`0x2A`) in all TIFF images.

Bytes 4 to 7 give the **offset to the first Image File Directory (IFD)**. The first byte in the file has the offset 0. The offset in the example above is 8 (`08 00 00 00` hex translates to `8` decimal), so the IFD begins in byte 9 of the file.

> All offsets in TIFF indicate locations with respect to the beginning of the file.

### IFD

The **IFD** (Image File Directory) contains the number of directory entries and the directory entry themselves. The content of address 8 is 27 (`1B` translates to `27`), meaining the this file has 27 12-byte (count the bytes on each directory entry) directory entries. The **first 2 bytes** of the entry contain the **tag**, which tells **the type of information the entry contains**. These first two bytes in the figure above are `FF 00` which means `tag = 255`. This tag tells the **file type**. The next 2 bytes of the entry give the **data type of the information**. These two bytes in the example above are `03 00` which is `type = 3`, a short (2-byte unsigned integer). The next four bytes of the entry give the length of the information. This length is not in bytes, but rather in multiples of the data type. If the data type is a short and the length is one, the length is one short, or two bytes. An entry's final four bytes give either the value of the information or a pointer to the value. If the size of the information is four bytes or less, the information is stored here. If it is longer than four bytes, a pointer to it is stored. The information in direcoty entry zero is two bytes long and is stored here with a value of 1 (this value has no meaning for this tag).

As for the next two entries, the first entry has `tag = 256`. This is the image width of the image in number of columns. The type is short and the length of the value is one short, or two bytes. The value 600 means that there are 600 columns in the image. The second entry has `tag = 257`. This is the image length or height in number of rows. The type is short, the length is one, and the value is 602, meaning that the image has 602 rows.

You continue throught the directory entries until you reach the offset to the next IFD. If this offset is 0, as in the figure representing the beginning of a TIFF file, no more IFDs follow in the file.

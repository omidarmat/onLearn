- [Overview of image processing](#overview-of-image-processing)
  - [Definition of an image and a digital image](#definition-of-an-image-and-a-digital-image)
    - [Spatial data of an image](#spatial-data-of-an-image)
    - [Color data of an image](#color-data-of-an-image)
    - [Image color and resolution](#image-color-and-resolution)
    - [Image formats](#image-formats)
      - [JPEG](#jpeg)
      - [GIF](#gif)
      - [BMP](#bmp)
      - [PNG](#png)
      - [TIFF](#tiff)
    - [Image data types](#image-data-types)
      - [Binary image](#binary-image)
      - [Greyscale image](#greyscale-image)
      - [RGB (true-color) image](#rgb-true-color-image)
      - [Floating-point image](#floating-point-image)
- [Image processing in C](#image-processing-in-c)
  - [Opening and copying an image](#opening-and-copying-an-image)
    - [Refactoring the code into a modular code](#refactoring-the-code-into-a-modular-code)
- [Detailed theory (from cips book)](#detailed-theory-from-cips-book)
  - [Image data basics](#image-data-basics)
  - [Image file I/O requirements](#image-file-io-requirements)
  - [TIFF](#tiff-1)
    - [Tags](#tags)
    - [IFD](#ifd)

# Overview of image processing

## Definition of an image and a digital image

An **image** is a descrete representation of data possessing both **spatial** (layout) and **intensity** (color) information. Based on this definition, A **digital image** is a representation of a two-dimensional image using a finite number of points usually called **picture elements** or **pixels**.

### Spatial data of an image

In a shematic representation, a digital image is placed on a Cartesian 2D coordinates. Each pixel is represented by `I(m,n)` where `m` and `n` represent designate the rows and columns of the image respectively. The image starts at `I(0,0)` (top left corner) of the Cartesian 2D coordinates, and ends at `I(m,n)` (on the bottom right).

### Color data of an image

The simplest type of image data is for black and white images, which are also known as binary images, since each pixel is either 0 or 1. The next more complex type of image data is Greyscale, where each pixel can take a value between 0 and 255. Human eye can distinguish only 40 shades of grey. The most complex type of image data is for color images. Color images are similar to greyscale images, except that there are 3 bands in them related to colors red, green, and blue which is why they are also referred to as RGB images. Therefore each pixel in an RGB image has 3 values associated with it.

Image color can also be represented in HSV format, dividing image data into hue, saturation and value (or intensity) data.

### Image color and resolution

The size of 2D grid and data size stored for each individual pixel determines the **spatial resolution** and **color quantization** of an image. The **representational power** or **size** of an image is defined by its resolution. The resolution of an image source like a camera can be specified in terms of 3 quantities:

1. Spatial resolution: This is usually quoted as `C x R`, where `C` stands for column and `R` stands for row, define the number of pixels used to cover the visual space captured by the image. This relates to the sampling of the image signal and it is sometimes referred to as pixel or **digital resolution** of the image.
2. Temporal resolution: This is considered for continuous capturing systems such as video. This represents the number of images captured during a given time period. It is commonly quoted in `fps` or frames per second. In this system, each individual image is referred to as a **video frame**. For instance, commonly broadcast TV has 25fps, and higher fps is used for engineering purposes usually.
3. Bit resolution: This defines the number of possible intensity or color values that a pixel may have. It relates to the quantization of the image information. For instance, a binary image has just 2 colors (black or white). A greyscale image has 256 levels of grey, ranging from black to white. The bit resolution is commonly quoted as **the number of binary bits required for storage** at a given quantization level. For instance, binary is 2bit, greyscale is 8bit, and color is commonly 24bit. The range of values a pixel may take is often referred to as the **dynamic range** of the image.

### Image formats

There are many different image formats. Here we list some of them.

#### JPEG

JPEG stands for Joint Photographic Experts Group. This image format has lossy compression.

#### GIF

GIF stands for Graphics Interchange Format. It is limited to 256 colors, meaning that it is **8bit** in size. This image format has lossless compression.

#### BMP

BMP stands for Bit Map Picture. It is one of the basic formats in use. This image format has lossless compression. This is one of the main formats we are going to exeperiment with. So we will go deep into it.

This is the structure of an image data:

![image-file-data-structure](/images/cips/image-data-structure.png);

This is the BMP image format data structure respective to the general image structure as you see in the figure above:

![bmp-file-data-structure](/images/cips/bmp-data-structure.png)

And here is a table showing the offsets stored in the BMP header data:

![bmp-header-data](/images/cips/header-data-bmp.png)

This image shows that in order to access image **width**, **height**, and **number of bits per pixel** (also known as **bit depth**), you need to access offsets `18`, `22`, and `28` respectively. If bit depth is `<= 8` this means that the image contains a color table. The color table is a block of bytes listing the colors used in the image.

In conclusion, to get access to the complete image information you need to read 54 bytes image header, 1024 bytes color table, and then finally the pixel information.

#### PNG

PNG stands for Portable Network Graphics. It was designed to replace GIF. This image format has lossless compression.

#### TIFF

TIFF stands for Tagged Image File Format. These are generally highly flexible and adabtible. This image format can be either compressed or uncompressed.

### Image data types

The choice of image format can be largely determined not just by the image content, but also the actual image data type that is required for storage. We can classify images into 4 data types.

#### Binary image

Binary images are 2D arrays that assign one numeric value (0 or 1) to each pixel in the image. These are sometimes referred to as **logical images**. Black corresponds to `0` or _off_ or _backgorund_ pixel. White corresponds to `1` or _on_ or _foreground_ pixel.

#### Greyscale image

Greyscale images are 2D arrays that assign one numeric value to each pixel which is representative of the intensity. The pixel value range is bound by the bit resolution of the image, and such images are stored as **n-bit** integer with a given format.

#### RGB (true-color) image

RGB images are 3D arrays that assign 3 numeric values to each pixel, each value corresponding to red, green and blue.

#### Floating-point image

These images do not store integer color values. Instead, they store a floating-point number which, within a given range defined by floating-point precision of the image bit resolution, represent the intensity. They maybe commonly measured values in fields like medicine, science and other specialized fields. These images are commonly stored in the TIFF image format.

# Image processing in C

## Opening and copying an image

In order to open an image file you should define an input stream. Also, in order to create an output file, which would simply be a copy of the input image, you need to create an output stream. This is how you do it in C:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    return 0;
}
```

> Notice that `rb` and `wb` in `fopen` functions refer to "reading" and "writing".

You can then implement a check in the middle, so that if your program was, for any reason, unable to read the input file, it would send out an error message.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    if(streamIn == (FILE*)0) {
        printf("Unable to open file!\n");
    }

    return 0;
}
```

If the input image is read successfully, your program may continue by defining variables to store header data and the color table. You can read your image header from the `streamIn` variable now. You are going to do that using a loop and the `getc` function from the `stdlib.h` library.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    if(streamIn == (FILE*)0) {
        printf("Unable to open file!\n");
    }

    unsigned char header[54];
    unsigned char colorTable[1024];

    for(int i = 0; i < 54; i++) {
        header[i] = getc(streamIn);
    }

    return 0;
}
```

By reading the first 54 bytes of the input stream, we actually find out the values inside header.

> The `getc` function, according to IBM, reads a single character from the current stream position and advances the stream position to the next character.

Once you have the image header, you can extract the image width, height, and bit depth. You remember the offsets related to these?

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    if(streamIn == (FILE*)0) {
        printf("Unable to open file!\n");
    }

    unsigned char header[54];
    unsigned char colorTable[1024];

    for(int i = 0; i < 54; i++) {
        header[i] = getc(streamIn);
    }

    int width = *(int *)&header[18];
    int height = *(int *)&header[22];
    int bitDepth = *(int *)&header[28];

    return 0;
}
```

> Notice that we are using the casting technique in C programming to determine the type of the value stored in the address `&header[18]` as `int *`, meaning that `&header[18]` is an integer pointer, or a pointer that points to an integer value. We are then puttin another `*` behine the casting to say that we want the value stored at the address of the integer pointer, meaning that we want the integer value itself. It is somewhat complicated to wrap your head around this at fist sight.

Remember we said in the theories section that if the bit depth of an image is `<= 8` the image would have a color table. So we are going to read the color table based on this condition:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    if(streamIn == (FILE*)0) {
        printf("Unable to open file!\n");
    }

    unsigned char header[54];
    unsigned char colorTable[1024];

    for(int i = 0; i < 54; i++) {
        header[i] = getc(streamIn);
    }

    int width = *(int *)&header[18];
    int height = *(int *)&header[22];
    int bitDepth = *(int *)&header[28];

    if(bitDepth <= 8) {
        fread(colorTable, sizeof(unsigned char), 1024, streamIn);
    }

    return 0;
}
```

> According to IMB, The `fread` function, coming from the `stdio.h` library, reads up to `count` items of `size` length from the input `stream` and stores them in the given `buffer` (variable). The position in the file increases by the number of bytes read.
>
> ```c
> size_t fread(void *buffer, size_t size, size_t count, FILE *stream);
> ```

Once this is done, you can write the image header to your output file. This is done using the `fwrite` function, which is very similar to the `fread` function.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    if(streamIn == (FILE*)0) {
        printf("Unable to open file!\n");
    }

    unsigned char header[54];
    unsigned char colorTable[1024];

    for(int i = 0; i < 54; i++) {
        header[i] = getc(streamIn);
    }

    int width = *(int *)&header[18];
    int height = *(int *)&header[22];
    int bitDepth = *(int *)&header[28];

    if(bitDepth <= 8) {
        fread(colorTable, sizeof(unsigned char), 1024, streamIn);
    }

    fwrite(header, sizeof(unsigned char), 54, streamOut);

    return 0;
}
```

Then, you can go on and create a buffer to store the image data, which is the actual pixels. The size of this buffer will be determined by `height * width` value. Then you write the header into it, again, using the `fwrite` function. Then you need to write the color table, if it actually exists based on a check you just did previously:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    if(streamIn == (FILE*)0) {
        printf("Unable to open file!\n");
    }

    unsigned char header[54];
    unsigned char colorTable[1024];

    for(int i = 0; i < 54; i++) {
        header[i] = getc(streamIn);
    }

    int width = *(int *)&header[18];
    int height = *(int *)&header[22];
    int bitDepth = *(int *)&header[28];

    if(bitDepth <= 8) {
        fread(colorTable, sizeof(unsigned char), 1024, streamIn);
    }

    fwrite(header, sizeof(unsigned char), 54, streamOut);

    unsigned char buffer[height * width];

    fread(buffer, sizeof(unsigned char), (height * width), streamIn);

    if(bitDepth <= 8) {
        fwrite(colorTable, sizeof(unsigned char), 1024, streamOut);
    }

    return 0;
}
```

> Notice that the first parameter in `fread` determines the variable into which the read value will be stored. The first parameter in `fwrite` function determines the variable from which a value will be written to an output stream, which is inserted as the last parameter of the `fwrite`. The last parameter of the `fread` function determines the stream from which a data is going to be read and then stored in a variable which is defined as its first parameter.

After this, you can write the image data, so the pixel data, to the output file. You would finally, as the best practice, close both streams using the `fclose` function.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    if(streamIn == (FILE*)0) {
        printf("Unable to open file!\n");
    }

    unsigned char header[54];
    unsigned char colorTable[1024];

    for(int i = 0; i < 54; i++) {
        header[i] = getc(streamIn);
    }

    int width = *(int *)&header[18];
    int height = *(int *)&header[22];
    int bitDepth = *(int *)&header[28];

    if(bitDepth <= 8) {
        fread(colorTable, sizeof(unsigned char), 1024, streamIn);
    }

    fwrite(header, sizeof(unsigned char), 54, streamOut);

    unsigned char buffer[height * width];

    fread(buffer, sizeof(unsigned char), (height * width), streamIn);

    if(bitDepth <= 8) {
        fwrite(colorTable, sizeof(unsigned char), 1024, streamOut);
    }

    fwrite(buffer, sizeof(unsigned char), (height * width), streamOut);

    fclose(streamIn);
    fclose(streamOut);

    return 0;
}
```

You may also put a notification message at the end:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *streamIn = fopen("images/cameraman.bmp", "rb");
    FILE *streamOut = fopen("images/cameraman_copy.bmp", "wb");

    if(streamIn == (FILE*)0) {
        printf("Unable to open file!\n");
    }

    unsigned char header[54];
    unsigned char colorTable[1024];

    for(int i = 0; i < 54; i++) {
        header[i] = getc(streamIn);
    }

    int width = *(int *)&header[18];
    int height = *(int *)&header[22];
    int bitDepth = *(int *)&header[28];

    if(bitDepth <= 8) {
        fread(colorTable, sizeof(unsigned char), 1024, streamIn);
    }

    fwrite(header, sizeof(unsigned char), 54, streamOut);

    unsigned char buffer[height * width];

    fread(buffer, sizeof(unsigned char), (height * width), streamIn);

    if(bitDepth <= 8) {
        fwrite(colorTable, sizeof(unsigned char), 1024, streamOut);
    }

    fwrite(buffer, sizeof(unsigned char), (height * width), streamOut);

    fclose(streamIn);
    fclose(streamOut);

    printf("Success!\n");
    printf("Width: %d\n", width);
    printf("Height: %d\n", height);

    return 0;
}
```

### Refactoring the code into a modular code

# Detailed theory (from cips book)

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

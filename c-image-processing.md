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
  - [Image processing operations and techniques](#image-processing-operations-and-techniques)
    - [Image processing operations](#image-processing-operations)
      - [Low level operations](#low-level-operations)
      - [Mid level operations](#mid-level-operations)
      - [High level operations](#high-level-operations)
    - [Image processing techniques](#image-processing-techniques)
      - [Sharpening](#sharpening)
      - [Noise removal](#noise-removal)
      - [De-blurring](#de-blurring)
      - [Edge detection or edge extraction](#edge-detection-or-edge-extraction)
      - [Binarization](#binarization)
      - [Contrast enhancement](#contrast-enhancement)
      - [Object segmentation and labeling](#object-segmentation-and-labeling)
  - [Some terminology](#some-terminology)
    - [Image topology](#image-topology)
    - [Neighborhood](#neighborhood)
    - [Adjacency](#adjacency)
    - [Paths](#paths)
    - [Components](#components)
    - [Connectivity](#connectivity)
  - [Overview of machine vision systems](#overview-of-machine-vision-systems)
- [Image processing in C](#image-processing-in-c)
  - [Opening and copying an image](#opening-and-copying-an-image)
    - [Refactoring the code into a modular code](#refactoring-the-code-into-a-modular-code)
  - [Converting RGB to greyscale](#converting-rgb-to-greyscale)
  - [Image binarization](#image-binarization)
  - [Arithmetic and logical operations](#arithmetic-and-logical-operations)
    - [Arithmetic operations](#arithmetic-operations)
      - [Example: increasing image brightness](#example-increasing-image-brightness)
  - [Histogram and equalization](#histogram-and-equalization)
    - [Histogram equalization](#histogram-equalization)
    - [Create charts from `.dat` signal files](#create-charts-from-dat-signal-files)
      - [Setting up `gnuplot`](#setting-up-gnuplot)
      - [Plotting multiple signals](#plotting-multiple-signals)
    - [Create image histogram](#create-image-histogram)
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

## Image processing operations and techniques

There are several image processing techniques in order to perform image processing operations. First, let's learn about different operations.

### Image processing operations

There are 3 levels of image processing operations: low lever, mid level, heigh level.

#### Low level operations

These are primitive operations with both input and output of images. These include noise reduction, contrast enhancements, etc.

#### Mid level operations

These deal with extraction of attributes from images. These operations include edge extractions, contonur extractions, regions extractions, etc.

#### High level operations

These are mainly about analysis and interpretation of content of an image.

### Image processing techniques

Image processing has a wide range of techniques and algorithms which we are going to apply some of them here. Here is a list of some of the image processing techniques.

#### Sharpening

Sharpening is a technique by which the edges and fine details of an image are enhanced for human viewing.

#### Noise removal

Image processing filters can be used to reduce the amount of noise in an image before processing it any further. Depending on the type of noise, different noise removal techniques are used.

#### De-blurring

An image may appear blury due to different reasons, ranging from improper focusing of the lense to an insufficient shutter speed for fast moving objects.

#### Edge detection or edge extraction

Extracting edges from an image is a fundamental processing step used to separate object from one another before identifying their content.

#### Binarization

In many image processing analysis applications, it is often necessary to reduce the number of grey levels in a monochrome image to simplify and speed up its interpretation process. Reducing a greyscale image to only 2 levels of grey (black and white) is usually referred to as binarization.

#### Contrast enhancement

In order to improve an image for human viewing as well as make other image processing tasks (such as edge detection) easier, it is often necessary to enhance the contrast of an image.

#### Object segmentation and labeling

The task of segmentation and labeling within a scene is a prerequisite for things like object recognition and classification systems. Once the relevant objects have been segmented and labeled, their relevant features can be extracted and used to classify, compare, cluster or recognize the object in question.

## Some terminology

### Image topology

Image topology involves investigation of fundamental image properties using morphological operators.

### Neighborhood

Neighborhood refers to the pixels surrounding a given pixel. This is an important terminology since other terms will be defined based on this term.

### Adjacency

Two pixels `p` and `q` are 4-adjacent if they are 4-neighbors of each other and they are 8-adjacent if they are 8-neighbors of each other.

### Paths

A 4-path between two pixels `p` and `q` is a sequence of pixels starting with `p` and ending with `q` such that each pixel in the sequence is 4-adjacent to its predecessor in the sequence.

### Components

A component is a set of pixels connected to each otherx

### Connectivity

Connectivity is the existence of a path between two pixels.

## Overview of machine vision systems

This is an overview of a knowledge-based machine vision system. It contains various processes as we will explain each process briefly here.

![machine-vision-system](/images/cips/machine-vision-system.png)

For instance, imagine a system which should be used to recognize faces in images. so the **problem domain** is facial recognition. The **goal** is to be able to extract various features of the face, such as eyes, mouth, nose, etc. Now from the problem domain to the final result, there are multiple steps involved:

1. Acquisition: This process is in charge of acquiring one or more images containing a human face. This can be implemented using a camera and controlling the lighting conditions so as to ensure that the image will be suitable for further processing. The output of this process is a digital image that contains a view of the face.
2. Preprocessing: This process is designed to improve the quality of the image. Possible algorithms to be employed during this stage include **contrast improvement**, **brightness correction** and **noise removal**.
3. Segmentation: This process is responsible for **partitioning an image** into its main components, into relevant **foreground** and **background** objects. It produces at its output a number of **labeled regions** or sub-images. It is possible that in this particular case, segmentation will be performed at 2 levels: first stage would involve extracting the face from the original image, and second stage would deal with segmenting facial features within the face area.
4. Feature extraction: also known as **representation and description** block, consists of algorithms responsible for **encoding the image content** in a descriptive way. Typical features include measures of **color distribution**, **texture**, and **shape** of the most relevant objects within the image. These features are usually grouped into a **feature vector** that can then be used as a numerical indicator of the image content for the subsequent stages where such content would be recorgnized or classified.
5. Classification: Once the features of an image have been extracted and encoded into a feature vector, the next step is to use this k-dimensional numeric representation as an input to the classification stage or the **recognition and interpretation** as it is also known. At this point, image processing needs classical pattern recognition and benefits from many of its techniques such as minimum distance classifies, neural networks, etc. The ultimate goal of this block is to classify each individual facial feature.

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

We are now going to refactor the code above into twi separate functions which will be called inside the `main` function. These separate functions will be responsible for reading and writing image files. First, let's write the `imageReader` function.

```c
void imageReader(const char *imgName, int *_height, int *_width, int *_bitDepth, unsigned char *_header, unsigned char *_colorTable, unsigned char *_buffer) {
    int i;
    FILE *streamIn;

    streamIn = fopen(imgName, "rb");

    if(streamIn == (FILE *)0) {
        printf("Unable to read image!\n");
    }

    for(i = 0; i < 54; i++) {
        _header[i] = getc(streamIn);
    }

    *_width = *(int *)&_header[18];
    *_height = *(int *)&_header[22];
    *_bitDepth = *(int *)&_header[28];

    if(*_bitDepth <= 8) {
        fread(_colorTable, sizeof(unsigned char), 1024, streamIn);
    }

    fread(_buffer, sizeof(unsigned char), CUSTOM_IMG_SIZE, streamIn);
    fclose(streamIn);
}
```

Then the `imageWriter` function would be:

```c
void imageWriter(const char *imgName, unsigned char *header, unsigned char *colorTable, unsigned char *buffer, int bitDepth) {
    FILE *streamOut = fopen(imgName, "wb");
    fwrite(header, sizeof(unsigned char), 54, streamOut);

    if(bitDepth <= 8) {
        fwrite(colorTable, sizeof(unsigned char), 1024, streamOut);
    }

    fwrite(buffer, sizeof(unsigned char), CUSTOM_IMG_SIZE, streamOut);
    fclose(streamOut);
}
```

We are also going to define some constant variables using the `#define` directive. We are also going to add our function declarations to the beginning of the file. Finally, the `main` function would be written as:

```c
#include <stdio.h>
#include <stdlib.h>

#define BMP_HEADER_SIZE 53
#define BMP_COLOR_TABLE_SIZE 1024
#define CUSTOM_IMG_SIZE 1024*1024

void imageReader(const char *imgName, int *_height, int *_width, int *_bitDepth, unsigned char *_header, unsigned char *_colorTable, unsigned char *_buffer);

void imageWriter(const char *imgName, unsigned char *header, unsigned char *colorTable, unsigned char *buffer, int bitDepth);

int main() {
    int imgWidth, imgHeight, imgBitDepth;
    unsigned char imgHeader[BMP_HEADER_SIZE];
    unsigned char imgColorTable[BMP_COLOR_TABLE_SIZE];
    unsigned char imgBuffer[CUSTOM_IMG_SIZE];

    const char imgName[] = "images/man.bmp";
    const char newImgName[] = "images/man-copy.bmp";

    imageReader(imgName, &imgHeight, &imgWidth, &imgBitDepth, &imgHeader, &imgColorTable, &imgBuffer[0]);
    imageWriter(newImgName, imgHeader, imgColorTable, imgBuffer, imgBitDepth);

    printf("Success!\n");

    return 0;
}
```

Looking at the `imageReader()` function call in the `main` function, you can understand that we are **passing pointers** into it. These pointers point to the specific memory location where the actual values should be stored. So for example, we define a variable like `imgWidth` and then pass its pointer to the `imageReader()` function so it can find its location in memory and update its value. Also notice that the `imageReader()` function declaration includes all **arguments** as pointer variables. You might notice that the `imgName` variable is passed to the `imageReader` function without the asterisk `*` behind it. This is simply because `imgName` is an array variable which is treated by C as a pointer variable by default.

Also notice that none of the **variables passed** into the `imageWriter()` function are pointers with `&` behind them. They are kind of the values themselves. This is simply because, in this function, we no longer need to update a value at some specific location in memory. We are done updating values in memory. We now just want to write all the final values to another image file, so we don't need pointers any more, we just need the values. However, in the `imageWriter()` function declaration you can see the **arguments** defined as poinetrs, except the last one. This is because `imgName`, `imgHeader`, `imgColorTable`, and `imgBuffer` are array variables which are, again, treated as pointer variables by C, but `imgBitDepth` is not defined as a pointer. It is defined as the value of the `imgBitDept` itself, which is a single integer, and not an array.

## Converting RGB to greyscale

In order to implement the conversion of an RGB image to greyscale, you need to utilize the image reading and writing functionalities we created before. We are currently not going to use the refactored modular version of the reading and writing functionality for practice purposes.

There are 2 things worth mentioning here:

1. This time, the `buffer` that we define for the image data in our code is different than the buffer we defined for including image data of a greyscale image. For a color image, the buffer should include 3 layers of image data, making it a 2D array containig image data for each data band: red, green, blue.
2. To convert a color image (3 channels) to greyscale (1 channel) there is a conversion formula, where you multiply each channel by a particular constant and then put the same calculated value into the 3 channels:
   - Each pixel data in the _red_ channel: multiply by `0.3`
   - Each pixel data in the _green_ channel: multiply by `0.59`
   - Each pixel data in the _blue_ channel: multiply by `0.11`

Let's see what the code would look like:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  FILE* streamIn = fopen("images/lena-color.bmp", "rb");
  FILE* streamOut = fopen("images/lena-greyscale.bmp", "wb");

  unsigned char imgHeader[54];
  unsigned char colorTable[1024];

  if (streamIn == NULL) {
    printf("Unable to open image\n");
    return 1;
  }

  for (int i = 0; i < 54; i++) {
    imgHeader[i] = getc(streamIn);
  }

  fwrite(imgHeader, sizeof(unsigned char), 54, streamOut);

  int width = *(int*)imgHeader[18];
  int height = *(int*)imgHeader[22];
  int bitDepth = *(int*)imgHeader[28];

  if (bitDepth <= 8) {
    fread(colorTable, sizeof(unsigned char), 1024, streamIn);
    fwrite(colorTable, sizeof(unsigned char), 1024, streamOut);
  }

  int imgSize = height * width;
  unsigned char buffer[imgSize][3];

  for (int i = 0; i < imgSize; i++) {
    buffer[i][0] = getc(streamIn);
    buffer[i][1] = getc(streamIn);
    buffer[i][2] = getc(streamIn);

    int temp = 0;

    temp = (buffer[i][0] * 0.3) + (buffer[i][1] * 0.59) + (buffer[i][2] * 0.11);
    putc(temp, streamOut);
    putc(temp, streamOut);
    putc(temp, streamOut);
  }

  printf("Success!\n");

  fclose(streamIn);
  fclose(streamOut);

  return 0;
}
```

> Accoding to IBM, the `putc()` function converts `c` to `unsigned char` and then writes `c` to the output `stream` at the current position. The `putc` function comes from `stdio.h` library.
>
> ```c
> int putc(int c, FILE *stream);
> ```

> Notice how we read the image data related to each of the 3 channels at each byte. This is related to how image data is stored in color images. So in each pixel of the image there are 3 values associated with red, green, and blue. This means that when reading image data, at each byte, calling the `getc` function 3 times will give you data for each of the 3 channels for the same pixel.

## Image binarization

We are now going to see how we can implement code that converts a greyscale image into a binary image, where each pixel can have 2 values: either 1 or 0. We are first going to read the input image file and create the output image file:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  FILE* streamIn = fopen("images/lighthouse.bmp", "rb");
  FILE* streamOut = fopen("images/lighthouse_binary.bmp", "wb");

  if (streamIn == NULL) {
    printf("Unable to read image!\n");
    return 1;
  }

  unsigned char imgHeader[54];
  unsigned char colorTable[1024];

  for (int i = 0; i < 54; i++) {
    imgHeader[i] = getc(streamIn);
  }

  fwrite(imgHeader, sizeof(unsigned char), 54, streamOut);

  int width = *(int*)&imgHeader[18];
  int height = *(int*)&imgHeader[22];
  int bitDepth = *(int*)&imgHeader[28];
  int imgSize = width * height;

  if (bitDepth <= 8) {
    fread(colorTable, sizeof(unsigned char), 1024, streamIn);
    fwrite(colorTable, sizeof(unsigned char), 1024, streamOut);
  }

  unsigned char buffer[imgSize];

  fread(buffer, sizeof(unsigned char), imgSize, streamIn);

  return 0;
}
```

Up until this point, we have stored the pixel data of the image into the `buffer` variable and we can now perform the binarization process on the pixel data. We basically need to set a threshold such that if a pixel value is above it, the pixel value is converted to 1, otherwise to 0. To do this, we are going to insert some `#define` directives at the beginning of the file. We need 3: white (255), black (0), and in the final image white will be 1 and black will be 0.

```c
#include <stdio.h>
#include <stdlib.h>

#define WHITE 255
#define BLACK 0
#define THRESHOLD 150

int main() {
  FILE* streamIn = fopen("images/lighthouse.bmp", "rb");
  FILE* streamOut = fopen("images/lighthouse_binary.bmp", "wb");

  if (streamIn == NULL) {
    printf("Unable to read image!\n");
    return 1;
  }

  unsigned char imgHeader[54];
  unsigned char colorTable[1024];

  for (int i = 0; i < 54; i++) {
    imgHeader[i] = getc(streamIn);
  }

  fwrite(imgHeader, sizeof(unsigned char), 54, streamOut);

  int width = *(int*)&imgHeader[18];
  int height = *(int*)&imgHeader[22];
  int bitDepth = *(int*)&imgHeader[28];
  int imgSize = width * height;

  if (bitDepth <= 8) {
    fread(colorTable, sizeof(unsigned char), 1024, streamIn);
    fwrite(colorTable, sizeof(unsigned char), 1024, streamOut);
  }

  unsigned char buffer[imgSize];

  fread(buffer, sizeof(unsigned char), imgSize, streamIn);

  //   black and white converter
  for (int i = 0; i < imgSize; i++) {
    buffer[i] = (buffer[i] > THRESHOLD) ? WHITE : BLACK;
  }

  fwrite(buffer, sizeof(unsigned char), imgSize, streamOut);

  fclose(streamIn);
  fclose(streamOut);

  printf("Success!\n");

  return 0;
}
```

As you can see, the binarization algorithm is a simple process running through a loop, which goes over each pixel of the image and converts it to `1` if it is heigher than the defined threshold, or to `0` if it is less.

## Arithmetic and logical operations

We are going to discover how to perform arithmetic and logical operations on images. Let's beging by looking at arithmetic operations.

### Arithmetic operations

Arithmetic operations involving images are typically performed on a pixel-by-pixel basis, meaning the operation is independently applied to each pixel in the image. Given a 2D array `X`, and another 2D array `Y` of the same size, the resulting array `Z` is optained by calculating `X [operation] Y = Z` where `operation` can either be addition, subtraction, multiplication or division.

1. Addition: addition is used to blend the pixel content from two images or add a constant value to pixel values of an image. Adding the content of two monochrome images causes their content to blend. Adding a constant value to an image causes an increase or decrease in the image's overall brightness. This process is sometimes referred to as **additive image offset**. When adding two images you must be careful so that the addition result does not exceed the maximum pixel value for the data type being used. There are two ways of dealing with this overflow issue. We often use **normalization** or **truncation**. Normalization: consists of storing the intermediate result in a temporary variable `W`, and calculate an edge-resulting pixel value in `Z` using this normalization equation:

```
g = (Lmax / (fmax - fmin))(f - fmin)
```

Where `f` is the current pixel in the intermediate result array `W`. `Lmax` is the maximum poissible intensity, `g` is the curresponding in the output array, and `fmax` is the maximum pixel in `W`.

Take this image addition example:

![image-addition](/images/cips/image-addition.png)

This clearly shows that the `W` array has out of range values like 300, 320, 330. So we should normalize this array which contains values in the range [45, 350] to range [0, 255]. The result of normalization is stored in an array called `Z` like this:

![addition-normalization](/images/cips/addition-normalization.png)

Another method to force `W` to fall within the 8-bit range would be to truncate all values above 255 to 255. This means that any pixel with a value above 255 is simple represented by 255. This would result in another array like this:

![addition-truncation](/images/cips/addition-truncation.png)

2. Subtraction: this is often used to detect differences between two images. Such differences would be due to different factors such as artifical addition or removal of relevant content from the image, relative object motion between two frames of a video sequence, and many others. Subtracting a constant value from an image causes a decrease in its overall brightness, which is also referred to as _subtractive image offset_. When subtracting one image from another, or a constant from an image, you must be careful about the possibility of obtaining negative pixel values. There are 2 ways to deal with this issue. One is treating subtraction as an **absolute difference** which will always result in positive values proportional to the difference between the two original images without indicating which pixel was brighter or darker. The other way is truncating the result so that negative values become 0. Here is an example:

![subtraction](/images/cips/subtraction.png)

#### Example: increasing image brightness

In order to increase image brightness, we would have to add a constant value to all the pixels of the image. We should also keep an eye for pixel values that go beyond 255 and fix them at 255 if they do so.

```c
#include <stdio.h>
#include <stdlib.h>

#define BRIGHTNESS_FACTOR 50
#define MAX_COLOR 255

int main() {
  FILE* inStream = fopen("images/lena512.bmp", "rb");
  FILE* outStream = fopen("images/lena512_bright.bmp", "wb");

  if (inStream == NULL) {
    printf("Unable to read input image!");
  }

  unsigned char imgHeader[54];
  unsigned char colorTable[1024];

  for (int i = 0; i < 54; i++) {
    imgHeader[i] = getc(inStream);
  }

  fwrite(imgHeader, sizeof(unsigned char), 54, outStream);

  int width = *(int*)&imgHeader[18];
  int height = *(int*)&imgHeader[22];
  int bitDepth = *(int*)&imgHeader[28];
  int imgSize = height * width;

  if (bitDepth <= 8) {
    fread(colorTable, sizeof(unsigned char), 1024, inStream);
    fwrite(colorTable, sizeof(unsigned char), 1024, outStream);
  }

  unsigned char buffer[imgSize];

  fread(buffer, sizeof(unsigned char), imgSize, inStream);

//   This is the brightness increasing algorithm:
  int temp;

  for (int i = 0; i < imgSize; i++) {
    temp = buffer[i] + BRIGHTNESS_FACTOR;
    buffer[i] = (temp > MAX_COLOR) ? MAX_COLOR : temp;
  }

  fwrite(buffer, sizeof(unsigned char), imgSize, outStream);

  fclose(inStream);
  fclose(outStream);

  printf("Success!\n");

  return 0;
}
```

## Histogram and equalization

An image histogram is a plot of the relative **frequency of occurence** of each of the permitted pixel values in the image against the values themselves. If we normalize such frequency plot so that the total sum of all frequency entries over the permissible range is 1, we may treat the image historgam as a discrete probability density function which defines the likelihood of a given pixel value occuring within the image.

Visual inspection of an image histogram can reveal the basic contrast that is present in the image and any potential differences in the color distribution of the image foreground and the background scene component. For a simple greyscale image, the histogram can be constructed by simply counting the number of times each greyscale value (0 to 255) occures within the image.

Each spike within the historgam is incremented each time its value is encountered. In the histogram plot, the Y axix shows the number of times each value actually occures within the particular image, and the X axis shows the range of values within the image (0 to 255 for 8-bit greyscale images).

An image histogram can easily be constructed with a pseudo-code like this:

```
initialize all histogram array entries to 0

for each pixel I(i, j) within the image I
    histogram(I(i, j)) = histogram(I(i, j)) + 1
end
```

### Histogram equalization

Equalization causes a histogram with bins (vertical lines) groped closely together to spread out into a flat or equalized histogram. Notice that bins grouped together closely in histograms means that the image has poor contrast. Flatening the histogram makes the dark pixels apear darker and light pixels appear lighter.

> It is obvious that the histogram equalization process does not operate on the histogram itself. Rather, it uses the resort of one histogram to transform the original image that will have an equalized histogram.

Let's now take a look at histogram equalization equation:

```
b(x, y) = f[c(x, y)]

c: image with poor histogram
b: new image with improved histogram
f: transformation function
```

And this is the equation that shows the probability density function of a pixel value `a`:

```
p1(a) = (1 / Area1) * H1(a)

p1(a): probability of finding a pixel with the value "a" in the image
Area1: area or number of pixels in the image
H1(a): histogram of the image
```

### Create charts from `.dat` signal files

You first need to install the `gnuplot` package on Ubuntu or download and install it on your Windows machine. Then on Ubuntu, you will have to start the GNU Plot using the `gnuplot` command in the terminal.

```
gnuplot
```

#### Setting up `gnuplot`

After that, you need to move to the directory where your `.dat` file exists. You can do this using the `cd` command:

```
cd '/home/usr/c-image-processing/signals
```

If you are using the `gnuplot` for the first time, you first need to set the terminal for this package. You can use the `set terminal` command for this purpose. A list of available terminals will be printed out if you use the command with no options.

```
set terminal
<!-- lists all available terminals -->
```

To set a specific terminal, you just add its name in front of the command:

```
set terminal svg
```

You also need to redirect the output of the gnuplot, which is, by default, the STDOUT console display. You can redirect the output using this command:

```
set output 'chart.svg'
```

This will create an empty `chart.svg` file in the current working directory. Once you enter the `plot` command, the result will be inserted into this file. Notice that the `.svg` extension is written here since the selected terminal is `svg`.

You can now plot your signals using the `plot` signal followed by the name of your file inside `' '`:

```
plot 'input_signal.dat'
```

This will result in a chart in which data instances are reflected with points. If you want to create a linear representation of your data on the chart you can use `with lines` option at the end of the command:

```
plot 'input_signal.dat' with lines
```

> This does not seem to work well with the `svg` terminal in a `.svg` file. You would probably have to switch to the `canvas` terminal with a `.html` output file to be able to create this chart.

In order to change the color of the chart you can use `lc rgb` with the value you want inside `' '`.

```
plot 'input_signal.dat' with lines lc rgb 'red'
```

#### Plotting multiple signals

In order to create a chart with signal data coming from multiple files, you first would have to use the `reset` command:

```
reset
```

Then you need to set the default pallet size using the `set size` command:

```
set size 1,1
```

Then insert the `set multiplot` command:

```
set multiplot
```

You can now see that the `gnuplot` CLI has entered the `multiplot` state:

```
multiplot>
```

Then you need to set the size of each quadrant. Each quadrant is going to be `0.5` by `0.5`. To do this you can use this command:

```
set size 0.5,0.5
```

And you can now begin plotting. To do this, you first need to set the origin and then plot the signal you want. If you want to plot a signal at origin (0,0) you can use:

```
set origin 0,0
```

Now to plot a signal file you can use this command:

```
plot 'input_signal.dat' with lines lc rgb 'blue'
```

> At this stage you may not be able to see your results in the output file. This is probably something related to `gnuplot` running on Ubuntu. You need to exit the `multiplot` mode using the `unset multiplot`. Now you can open your output file and see the result.

As you can understand according to the steps above, your current chart is placed in the bottom left corner of the chart screen. The whole plot size is 1 by 1, but the current plot size is 0.5 by 0.5 at origin (0,0). You can now go on and create another chart next to this chart. For this, you need to set the origin for the new chart:

```
set origin 0.5,0
```

> Remember that in order for all of your charts appear in the output file, you need to plot them in the same session of `multiplot`. So if you `unset multiplot` and then come back, you will lose your previous charts in the output file, it would just be empty, and you would have to plot them all again. Plot all your charts in one single session of `multiplot`.

### Create image histogram

We are now going to write a C code to read an image and calculate its histogram. To do this, we will basically create a program which would produce a text file consisting of historgam data. Then the `gnuplot` library will create the chart for us. So we are again going to read an input image file, and produce a histogram text file at the end; there is no output file. Notice that we are going to use our previous modular code for reading the image. We are also going to write the function responsible for generating the histogram text file separate from the `main` function and name it `imgHistogram()`.

Let's see how would the `imgHistogram` function would look like:

```c
void imageHistogram(unsigned char* _imgData,
                    int imgRows,
                    int imgCols,
                    float histogram[]) {
  FILE* fptr = fopen("image_histogram.txt", "w");
  int x, y, i, j;
  long int ihist[255];
  long int sum;

  for (i = 0; i < 255; i++) {
    ihist[i] = 0;
  }

  sum = 0;

  for (y = 0; y < imgRows; y++) {
    for (x = 0; x < imgCols; x++) {
      j = *(_imgData + x + y * imgCols);
      ihist[j] = ihist[j] + 1;
      sum = sum + 1;
    }
  }

  for (i = 0; i < 255; i++) {
    histogram[i] = (float)ihist[i] / (float)sum;
  }

  for (i = 0; i < 255; i++) {
    fprintf(fptr, "\n%f", histogram[i]);
  }

  fclose(fptr);
}
```

We can now call this function in a `main` function like this:

```c
#include <stdio.h>
#include <stdlib.h>

#define BMP_HEADER_SIZE 54
#define BMP_COLOR_TABLE_SIZE 1024
#define CUSTOM_IMG_SIZE 512 * 512

float IMG_HISTOGRAM[255];

int main() {
  int imgWidth, imgHeight, imgBithDepth;
  unsigned char imgHeader[BMP_HEADER_SIZE];
  unsigned char colorTable[BMP_COLOR_TABLE_SIZE];
  unsigned char buffer[CUSTOM_IMG_SIZE];
  const char imgName[] = "images/lena512.bmp";

  imageReader(imgName, &imgHeight, &imgWidth, &imgBithDepth, &imgHeader[0],
              &colorTable[0], &buffer[0]);

  imageHistogram(&buffer[0], imgHeight, imgWidth, &IMG_HISTOGRAM[0]);

  return 0;
}
```

You should now see a file called `image_histogram.txt` produced by your program, containing the histogram data of the input image. You can now go to `gnuplot` console, move into the directory where your histogram file is located, and then use this command:

```
plot 'image_histogram.txt' with impluse
```

> Notice that `with impulse` is another option you can use in `gnuplot` in order to draw line charts.

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

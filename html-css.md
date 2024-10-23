- [**Introduction to HTML**](#introduction-to-html)
  - [**Anatomy of an HTML element**](#anatomy-of-an-html-element)
    - [**Attributes**](#attributes)
  - [**HTML Document Structure**](#html-document-structure)
    - [**Favicon**](#favicon)
      - [**Favicon for browsers**](#favicon-for-browsers)
      - [**Favicon for iOS**](#favicon-for-ios)
      - [**Favicon for Android**](#favicon-for-android)
- [**HTML elements**](#html-elements)
  - [**Text elements**](#text-elements)
    - [**Headings**](#headings)
    - [**Paragraphs**](#paragraphs)
    - [**Bold and Italic text**](#bold-and-italic-text)
      - [**Bold text**](#bold-text)
      - [**Italic text**](#italic-text)
    - [**Lists**](#lists)
      - [**Ordered list**](#ordered-list)
      - [**Unordered list**](#unordered-list)
    - [**Block quote**](#block-quote)
  - [**Images**](#images)
    - [**`src` and `alt`**](#src-and-alt)
    - [**`width` and `height`**](#width-and-height)
    - [**Image optimization**](#image-optimization)
  - [**Hyperlinks**](#hyperlinks)
  - [**Container elements**](#container-elements)
    - [**Page navigation element**](#page-navigation-element)
    - [**Header**](#header)
    - [**Article element**](#article-element)
    - [**Footer**](#footer)
    - [**Aside element**](#aside-element)
  - [**Button element**](#button-element)
  - [**Table element**](#table-element)
- [**HTML entities**](#html-entities)
- [**Introduction to CSS**](#introduction-to-css)
  - [**Anatomy of a CSS code**](#anatomy-of-a-css-code)
  - [**Different types of implementing CSS**](#different-types-of-implementing-css)
- [**CSS selectors**](#css-selectors)
  - [**Combining selectors**](#combining-selectors)
  - [**Descendant selector**](#descendant-selector)
  - [**Class and ID selectors**](#class-and-id-selectors)
    - [**ID selector**](#id-selector)
    - [**Class selector**](#class-selector)
    - [**Pseudo-class selector**](#pseudo-class-selector)
    - [**Pseudo-element selector**](#pseudo-element-selector)
    - [**Adjacent sibling selector**](#adjacent-sibling-selector)
- [**CSS theory**](#css-theory)
  - [**Conflicts between selectors**](#conflicts-between-selectors)
  - [**Inheritance and the universal selector**](#inheritance-and-the-universal-selector)
  - [**CSS box model**](#css-box-model)
    - [**Element height and width calculation**](#element-height-and-width-calculation)
      - [**Changing the default behavior**](#changing-the-default-behavior)
    - [**Global reset**](#global-reset)
    - [**Types of boxes**](#types-of-boxes)
    - [**Absolute positioning**](#absolute-positioning)
- [**Styling text**](#styling-text)
- [**General Stylings**](#general-stylings)
  - [**Background color**](#background-color)
  - [**Border**](#border)
  - [**Padding**](#padding)
  - [**Margin**](#margin)
  - [**Adding dimensions**](#adding-dimensions)
  - [**Centering the webpage**](#centering-the-webpage)
  - [**Stroke**](#stroke)
  - [**Box shadow**](#box-shadow)
  - [**Border radius**](#border-radius)
  - [**Transform**](#transform)
  - [**Cursor**](#cursor)
  - [**Styling a table**](#styling-a-table)
  - [**Background image**](#background-image)
  - [**Styling `<img />` elements**](#styling-img--elements)
  - [**Overflow**](#overflow)
  - [**Adding animation**](#adding-animation)
  - [**Smooth scrolling**](#smooth-scrolling)
  - [**Sticky navigation**](#sticky-navigation)
- [**Colors in CSS**](#colors-in-css)
- [**Building layouts**](#building-layouts)
  - [**Float layouts**](#float-layouts)
  - [**Flexbox layouts**](#flexbox-layouts)
    - [**Flexbox container properties**](#flexbox-container-properties)
    - [**Flexbox items properties**](#flexbox-items-properties)
  - [**CSS grid**](#css-grid)
    - [**CSS grid container properties**](#css-grid-container-properties)
    - [**CSS grid items properties**](#css-grid-items-properties)
  - [**Responsive design**](#responsive-design)
    - [**`rem` and `max-width`**](#rem-and-max-width)
    - [**Media queries**](#media-queries)
      - [**Media queries in practice**](#media-queries-in-practice)
      - [**How to select media queries breakpoints**](#how-to-select-media-queries-breakpoints)

# **Introduction to HTML**

HTML stands for Hyper-Text Markup Language. HTML is one of the core technologies of web along with CSS and JavaScript. HTML is a markup language that web developers use to structure and describe the entire content of any webpage.

Note that we call the HTML a markup language. However, HTML is not really a programmin language, but it is a markup language that we use to describe something, and in the case of HTML we use HTML elements that describe different types of content.

Browsers understand HTML and render HTML code as website.

## **Anatomy of an HTML element**

This is what an HTML element generally looks like:

```html
<p>Sample text</p>
```

An HTML element is usually made up of 3 parts:

1. Openning tag `<p>`: which is the name of the element wrapped between `< >`
2. Content: can be either a simple text or another element, which we call a child element.
3. Closing tag `</p>`: which is the name of the element wrapped between `</` and `>`.

> Some elements have only one tag which acts as both the openning and closing tags. These elements do not have any content, but they almost always have **attributes** in order to tell them what to do.

### **Attributes**

Attributes are pieces of data which we can use to describe elements. One of the common attributes used in HTML element is the `src` attribute.

## **HTML Document Structure**

Every HTML document needs to have a specific structure. An HTML file which is going to act as the main page of a website should be called `index.html`.

As the starting structure of this file, we should follow certain steps everytime.

1. **Doctype definition:** It is used to tell the browser that the document uses HTML.

```html
<!DOCTYPE html>
```

2. **`html`, `head` and `body` elements:**

Each and every HTML document needs to start with an `html` element. Then inside the `html` element we need one `head` element and a `body` element.

The `head` element are for things that are not visible on the webpage, such as page title, link to CSS files or other things. Then the `body` element is for all the elements that will be rendered visible on the page.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>The basic language of the web: HTML</title>
  </head>
  <body>
    <h1>The basic language of the web: HTML</h1>
  </body>
</html>
```

The `<html>` element accepts a very important attribute named `lang` which we should use to define the language that we are using for the HTML document.

```html
<html lang="en">
  <head></head>
  <body></body>
</html>
```

Another important attribute that should usually be included is `charset` which describes the character set that is used in the document. This is a piece of information that describes the document and therefore it should be placed in a `<meta />` element inside the `<head>` element.

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body></body>
</html>
```

> Note that the `<meta />` is another element that has no closing tag.

Another usecase of the `<meta />` tag is to add a description about the web page. It basically should include a short summary of our website's content. It is also the text that will appear for each of the search results in Google and other pages.

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="description"
      content="Omnifood is an AI-powered food subscription that will make you eat healthy again, 365 days per year."
    />
  </head>
  <body></body>
</html>
```

Another element that is usually used inside the `<head>` element is the `<title>` element which determines the main title of the whole webpage. This title is displayed in the browser tab.

```html
<head>
  <meta charset="UTF-8" />
  <title>Omnifood &mdash; Never cook again!</title>
</head>
```

### **Favicon**

Favicon is the icon that appears in the browser tab. There are some technical rules involved in implementing your own icon. We should consider Favicon for different things.

#### **Favicon for browsers**

First of all, you need to create PNG file for the logo of your webpage. This file is usually called `favicon.png`. You need to resize this image file to 64x64 pixels. Then you should insert it in a `<link />` tag inside the `<head>` element.

```html
<head>
  <!-- Browser -->
  <link rel="icon" href="img/favicon.png" />
</head>
```

There are ways of adding website as a favourite to iOS and Android devices. So we should provide an icon for this feature.

#### **Favicon for iOS**

For iOS devices we need PNG file usually called `apple-touch-icon.png`. Then we should resize this image to 118x118 pixels.

Then you include it in a `<link />` tag again.

```html
<head>
  <!-- Browser -->
  <link rel="icon" href="img/favicon.png" />
  <!-- iOS -->
  <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
</head>
```

#### **Favicon for Android**

For Android devices we need two PNG files with different dimensions, one with 192x192 pixels and another with 512x512 pixels.

For Android devices, the process of including the favicon in the HTML works a bit differently. You basically need to create a new file right in the root of your project directory. This file should be called `manifest.webmanifest`.

Inside this file, we write this code:

```json
{
  "icons": [
    { "src": "img/favicon-192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "img/favicon-512.png", "type": "image/png", "sizes": "512x512" }
  ]
}
```

Then you should refernce this file in your HTML file, using another `<link />` tag.

```html
<head>
  <link rel="icon" href="img/favicon.png" />
  <!-- iOS -->
  <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
  <!-- Androdi -->
  <link rel="manifest" href="manifest.webmanifest" />
</head>
```

# **HTML elements**

## **Text elements**

We now want to learn how to markup text.

### **Headings**

The goal of heading is to break up big blocks of text into logical sections and add a title to each section. There are 6 different levels of heading.

```html
<body>
  <h1>The basic language of the web: HTML</h1>
  <h2>The basic language of the web: HTML</h2>
  <h3>The basic language of the web: HTML</h3>
  <h4>The basic language of the web: HTML</h4>
  <h5>The basic language of the web: HTML</h5>
  <h6>The basic language of the web: HTML</h6>
</body>
```

> Each and every page on a website should only have one `<h1>` heading. You can have more and it does not violate any HTML rules, but regarding the SEO guidelines, it is good to have only one.

### **Paragraphs**

We use the generic `<p>` element to markup bigger blocks of text.

```html
<body>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quae harum
    quam! Doloribus, non modi. Necessitatibus nemo sit, harum laudantium
    perspiciatis quo. Minima officia assumenda nihil, placeat laborum esse
    debitis!
  </p>
</body>
```

### **Bold and Italic text**

There are special elements that we use to make a piece of text bold or italic.

#### **Bold text**

In order to make a text bold we can use `<b>` element.

```html
<p>Posted by <b>Omid Armat</b> on Monday</p>
```

> Using `<b>` element is not a good practice. It is an old HTML element and starting from HTML 5 we should use the `<strong>` element. This is because `<b>` does not have any meaning, while `<strong>` is a semantic HTML element that can be interpretted by search engines as an important piece of information.

```html
<p>Posted by <strong>Omid Armat</strong> on Monday</p>
```

#### **Italic text**

Here also we have two ways of making a text italic. The older way is to use the `<i>` element:

```html
<p>Posted by <i>Omid Armat</i> on Monday</p>
```

> The `<i>` element is not a good one to use. Instead, you should use the `<em>` element and browsers will interpret it as an emphasize. So again, this is a semantic HTML element.

```html
<p>Posted by <em>Omid Armat</em> on Monday</p>
```

### **Lists**

We are now going to learn to create lists with bullet points, which is also called an unordered list, and list with numbers, which is called an ordered list.

#### **Ordered list**

To create an ordered list you should use `<ol>` element, and for each list item you should use the `<li>` element.

```html
<ol>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ol>
```

#### **Unordered list**

To create an unordered list you should use `<ul>` element, and for each list item you should use the `<li>` element.

```html
<ul>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ul>
```

### **Block quote**

To create a block quote we use the `<blockquote>` HTML element that is usually used for marking up a testimonial in webpages.

```html
<blockquote>
  <p>Sample text for testimonial</p>
  <p>Author: Omid Armat</p>
  <p>Job: Junior developer</p>
</blockquote>
```

## **Images**

To insert an image into your webpage you need to use the `<img />` element. This element has no closing tag and therefore no contact.

### **`src` and `alt`**

The element accepts an **attribute** named `src` which tells the image tag where to find the image file that shold be displayed on the webpage. Another important attributes that you should always remember to insert into the `<img />` element is the `alt` attribute, which is used to describe what the image is about. This is done for several reasons:

1. By using the `alt` attribute we can tell search engines what the image is about.
2. Blind people that use screen readers can hear the value of this `alt` attribute and understand the image.

```html
<img src="post-img.jpg" alt="HTML code on a screen" />
```

> The address inserted into the `src` attribute of the image element should not necessarily be an address in the local directory of your project. It can be a URL address on the web.

> The value of the `alt` attribute is not displayed on the page unless the browser cannot load the image for any reason.

### **`width` and `height`**

We can specify the dimensions of the image loaded into the screen by using the corresponding attributes. However, we usually manage the dimesions of an image element using CSS.

```html
<img src="post-img.jpg" alt="HTML code on a screen" width="500" />
```

> Specifying only the `width` or the `height` attribute of the image will cause the browser to maintain the image's aspect ratio. If you specify both attributes you can override the aspect ratio and distort the image.

### **Image optimization**

You should consider optimizing the images you use in your webpage both in terms of **image dimensions** and **file size**.

The whole process, in summary, is that you start your web design process with a huge image, if accessible of course. After your design is complete, you should check the largest width that your images will ever have in the rendered design on the screen. For instance, you see that an image will never be appear with a width bigger than 188. You round it up to 200 and double it up to 400. Why? Because You should account for the high-density screens as they need 2 pixels of the image to display 1 pixel in the design. So you go ahead and resize the image to have a width of 400 pixels. This was the first step of image optimization process.

In the next step, you need to compress the image. There are many tools you can use. You can use the _Squoosh.app_ website to do it online. Then you place the image in your webpage. It is recommended to use the `webp` format for `png` images. However, you should consider browser support for the `webp` format since not all Safari browsers can display it. In order to fix this, you can use a trick with HTML.

You should insert a `<picture>` element where you want your image to appear in the HTML code. Then inside this element, you should define two `<source />` tags, each pointing to a separate image file, one to the `webp` image, and the other to the `png` image. You also need to insert the `<img />` tag itself as a fallback option. This way, the browser will decide based on the two `<source />` elements which format it can load best.

```html
<picture>
  <source srcset="img/hero.webp" type="image/webp" />
  <source srcset="img/hero.png" type="image/png" />

  <img src="img/hero.webp" class="hero-img" alt="Woman enjoying food" />
</picture>
```

## **Hyperlinks**

Links are actually the elements that enable the internet to be a worldwide web. We can devide links in 2 categories:

1. Links to another page of the same website
2. Links to somewhere outside the website

Both these types are created in the exact same way in HTML, but there are still some particularities that you should be aware of. To insert a hyperlink, we need to use the `<a>` element. This element accepts as content the text that should act as the link and also be displayed on the webpage. We should also define the `href` attribute for this element that as its value will hold the actual URL address that we want the link to guide the user to:

```html
<a href="https://developer.mozilla.org/en-US/">MDN web docs</a>
```

> This makes the link open in the same tab of the browser. If you need to make it so that the link is opened in a new tab, you need to insert the `target` attribute and give it `_blank` as value.

```html
<a href="https://developer.mozilla.org/en-US/" target="_blank">MDN web docs</a>
```

For the first scenario, where we use a link to another page in the same website, you should first create the other page of your website in your file structure. So for example, we create a `blog.html` file, and then include a link to this page in the homepage which corresponds to the `index.html` file.

```html
<!-- index.html file -->
<a href="blog.html">Blog</a>

<!-- blog.html file -->
<a href="index.html">Home</a>
```

> Inserting a `#` symbol as the value for the `href` attribute causes the anchor element to act as a link, but it does not lead to anywhere.

> What makes an `<a>` element really a link, is the `href` attribute. This actually enable us differentiate between regular anchor elements and link anchor elements and use this difference in styling these links in CSS.

## **Container elements**

By using HTML container elements we can give our webpage's content a logical structure. It is not a good practice to simply insert content elements one after another. We should always wrap related HTML elements together into one container element. There are several container elements available, but we should always keep in mind to use elements that match our logical purpose.

Using container elements does not make any visual difference in the webpage, but it is a good practice to use these since they can help a lot in managing your content and also to improve the SEO of the webpage.

### **Page navigation element**

We usually group all the links at the top of a webpage into a `<nav>` element.

```html
<nav>
  <a href="blog.html">Blog</a>
  <a href="shop.html">Shop</a>
  <a href="products.html">Products</a>
</nav>
```

### **Header**

We usually group navigation, logo, and other stuff that should always appear at the top of the webpage into a `<header>` element.

```html
<header>
  <h1>The code magazine</h1>
  <nav>
    <a href="blog.html">Blog</a>
    <a href="shop.html">Shop</a>
    <a href="products.html">Products</a>
  </nav>
</header>
```

> The header element should not necessarily be used for top part of the whole webpage, but it can also be used as the top part of any smaller unit of content in the page. For instance, the title of a blog post, the initial image, and the text representing the writer's name can all be grouped into the `<header>` element.

### **Article element**

In a webpage that displays blog posts, we usually wrap all the elements that are related to the main part of the article in an `<article>` element.

```html
<article>
  <h2>Post title</h2>
  <p>Post text content</p>
  <img src="post-img.jpg" />
</article>
```

### **Footer**

The content that comes at the very end of a webpage and that is repeated in all pages of a website is usually wrapped in a `<footer>` element.

```html
<footer>
  <p>Copyright &copy; 2024 by Omid Armat</p>
</footer>
```

> The `<footer>` element can also accept simple text as content without inserting any child element.

### **Aside element**

The `<aside>` element is usually used for some secondary information that somehow completes the information in the main part of the page. We usually use this element to render sidebars, but since it is just a container element, it should not necessarily be used that way.

```html
<aside>
  <p>Related articles</p>
  <ul>
    <li><a href="#">article 1</a></li>
    <li><a href="#">article 2</a></li>
    <li><a href="#">article 3</a></li>
  </ul>
</aside>
```

## **Button element**

The `<button>` element is usually used when you want to add some functionality for the user. The button element accepts as content the text that should be displayed inside the button. It also accepts a couple of attributes.

```html
<button></button>
```

## **Table element**

In order to create a table in HTML, you use the `<table>` element. Then for each table row we use the `<tr>` element inside the `<table>`. Finally inside each `<tr>` element we use one `<td>` element for placing table data in each cell.

```html
<table>
  <tr>
    <td>Chair</td>
    <td>The laid back</td>
    <td>The worker bee</td>
    <td>The chair 4/2</td>
  </tr>
  <tr>
    <td>Width</td>
    <td>80cm</td>
    <td>60cm</td>
    <td>220cm</td>
  </tr>
  <tr>
    <td>Depth</td>
    <td>70cm</td>
    <td>65cm</td>
    <td>80cm</td>
  </tr>
</table>
```

However, this will simply put the table data right next to each other in a table with no visible styles. You should use CSS to style the table and make its cells and borders visible. Refer to [styling a table](#styling-a-table).

We also have `<thead>` and `<tbody>` elements for a table. To tell HTML that the first row of the table is actually the table head, we wrap the first `<tr>` element in a `<thead>` element and change the `<tr>` elemtns inside to `<th>` elements. We then wrap the rest of the rows in a `<tbody>` element. We can also mark the first element of each row as a table head element.

```html
<table>
  <thead>
    <tr>
      <th>Chair</th>
      <th>The laid back</th>
      <th>The worker bee</th>
      <th>The chair 4/2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Width</th>
      <td>80cm</td>
      <td>60cm</td>
      <td>220cm</td>
    </tr>
    <tr>
      <th>Depth</th>
      <td>70cm</td>
      <td>65cm</td>
      <td>80cm</td>
    </tr>
  </tbody>
</table>
```

This will make the `<th>` elements appear bold in the webpage. They will also be automatically centered horizontally in their cells.

# **HTML entities**

HTML entities are basically some symbols that we can insert them into our HTML text elements using a special syntax that always starts with `&` and ends with a `;`. There are whole tables provided on the web, providing you with a list of HTML entities that you can use.

For instance, the copyright symbol can be inserted into your text like:

```html
<p>Copyright &copy; 2024 by Omid Armat</p>
```

# **Introduction to CSS**

CSS stands for Cascading Style Sheet. It is another core technology of the web. We use HTML to describe the content of the page. On the other hand, we use CSS to describe the visual style and the presentation of the content that we wrote in HTML.

HTML consists of countless elements to insert content into the webpage, and CSS consists of countless properties that we use to format HTML content.

## **Anatomy of a CSS code**

Take this sample CSS code as an example:

```css
h1 {
  color: blue;
  text-align: center;
  font-size: 20px;
}
```

1. **Selector:** a CSS code always starts with a selector. In this example, `h1` is the selector. This makes the styles to be applied to all `h1` elements on the page.
2. **Style declaration**: each line of styles mentioned in the example above are called style declaration which consists of a **property** and a **value** for that property. So for instance, `font-size` is the property and `20px` is the value.
3. **Declaration block:** all style declarations together make up the declaration block. A declaration block always starts with `{` and ends with `}`.
4. **CSS rule**: the selector and the declaration block is called a CSS rule.

## **Different types of implementing CSS**

There are 3 places where we can write CSS.

1. **Inline CSS:** To insert inline CSS, you should use the `style` attribute on any element that you want to style. This attribute accepts a string of a style declaration.

```html
<p style="color: blue">Related articles</p>
```

> Inline styles should never be used for many reasons that you are aware of.

2. **Internal CSS:** To insert internal CSS, you go to the `<head>` element of your HTML document, and in there, you declare a `<style>` element. Inside the `<style>` element you can write the regular syntax of a CSS rule like the example mentioned above.

```html
<head>
  <meta charset="UTF-8" />
  <title>The basic language of the web</title>
  <style>
    h1 {
      color: blue;
      text-align: center;
      font-size: 20px;
    }
  </style>
</head>
```

> This is a better way of implementing CSS, but there is yet another better way. If you have a lot of CSS code this will make the HTML file unmanagable.

3. **External CSS:** In this way of implementing CSS, you create a new file in your project directoy, for instance, `style.css`. Then we need a way of connecting the HTML file to the CSS file. This is done by inserting a `<link />` element in the `head` element of the HTML document.

```html
<head>
  <meta charset="UTF-8" />
  <title>The basic language of the web</title>
  <link href="style.css" rel="stylesheet" />
</head>
```

# **CSS selectors**

Selectors help us manage the specificity of applying styles to elements. We can select multiple elements together. We can also select elements by their element name, their class names, their IDs, etc.

## **Combining selectors**

We can select multiple HTML elements to declarte certain styles that want to be applied to all of them.

```css
h1,
h2,
h3,
h4,
p {
  font-family: sans-serif;
}
```

## **Descendant selector**

This selector is used when you want to select elements that are child elements to another parent element. Take this example:

```css
header p {
  font-size: 16px;
}
```

This selector will select all the `<p>` elements that are children of the `<header>` element.

> Using the descendant selector like the example above, which the selector basically reflects the HTML structure is not a good practice. This can lead to problems. If you include another `<header>` element in another component, the styles applied to the `<p>` element will also be applied in that component while you don't want this. This is where you can give names to HTML elements by using class names or IDs.

## **Class and ID selectors**

### **ID selector**

In order to give an HTML element an ID you should insert it as an attribute to the element:

```html
<p id="author">Post text content</p>
```

To select this `<p>` element using its ID you can use this CSS syntax:

```css
#author {
  font-size: 16px;
}
```

> IDs are unique among all HTML elements in a document. You are not allowed to repeat this ID in another element. If you need to use a name multiple times for elements, you should use classes. In real-world applications, you almost never use IDs for HTML elements. Instead, you use classes in order to maintain the ability of developing your UI futher in the future.

### **Class selector**

In order to give an HTML element a class name you should insert it as an attribute to the element:

```html
<p class="author">Post text content</p>
```

> You can give an HTML element multiple class names by placing a space between them.

```html
<p class="author name">Omid Armat</p>
<p class="author age">31</p>
```

To select this element using its class name you can use this CSS syntax:

```css
.author {
  font-size: 16px;
}

.related {
  list-style: none;
}
```

> If the name that you are giving to an HTML element consists of more than one word, it is a convention to write them with a dash in between. For instance, `author-active`.

> **IMPORTANT** | If you select an element multiple times using the element selector, the class selector and the ID selector, you might ask which CSS rule will apply? Refer to [conflicts between selectors](#conflicts-between-selectors).

### **Pseudo-class selector**

Here is a list of pseudo-classes available in CSS:

- `:first-child`
- `:last-child`
- `:nth-child(2)`
- `:nth-child(odd)`
- `:nth-child(even)`
- `:link`: only used for `<a>` elements that have the `href` attribute.
- `:visited`: only used for `<a>` elements that are previously visited. In real-world applications, we usually use the same CSS rules for `:visited` and `:link` pseudo-classes.
- `:hover`: used to style elements while they are hovered by the mouse.
- `:active`: used to style elements while they are being clicked by the user. Once the user release the click on their mouse, the styling disappears. We usually use the same CSS rules for the `:hover` and `:active` pseudo-class selectors.

In CSS there is a way to select the first of a list of identical elements. For instance, when you have multiple `<li>` elements as a list, you can select only the first one by using the `:first-child` pseudo-class:

```css
li:first-child {
  font-size: 24px;
}
```

This pseudo-class selector applies to all the `<li>` elements that appear first in any available list of `<li>` elements.

> **IMPORTANT** | The `:first-child` pseudo-class selector only selects the target element if it actually is the first child. So, in the example above, if for any reason you are placing an `<img />` element before the first `<li>` element, then the first `<li>` element will no longer be the first child. The `<img />` element is now the first child. So the pseudo-class selector above will not apply anymore.

### **Pseudo-element selector**

Here is a list of pseudo-elements available in CSS:

- `::first-letter`
- `::first-line`
- `::after` and `::before`: the `::after` creates a pseudo-element that will automatically be the very first child of the selected element. The `::before` creates pseudo-element that will automatically be the very last child of the selected element. These pseudo-elements requires the `content` property to be set to a string, even an empty one.

Pseudo-elements are elements that don't exist in HTML but we can select and style in CSS. some common examples are the first letter or the first line of a paragraph or some other text. Pseudo-elements start with `::` in CSS syntax.

```css
h1::first-letter {
  font-style: normal;
}

h1 {
  position: relative;
}

h1::after {
  content: "TOP";
  background-color: #ffe70e;
  font-weight: bold;
  display: inline-block;
  padding: 5px 10px;
  position: absolute;
  top: -15px;
  right: -25px;
}
```

> By default, any pseudo-element is an inline element. So in order to make the box model apply normally to it but not to create a line break, we should set the `display` property of it to `inline block`.

### **Adjacent sibling selector**

A sibling element is an element that is a part of the same parent element. Now an adjacent sibling of an element is the element that appears right after it. This selector syntax includes using `+` between elements.

```css
h3 + p {
  color: red;
}
```

# **CSS theory**

## **Conflicts between selectors**

Conflicts between selectors happens when multiple CSS selctors, and therefore multiple CSS rules, apply to the exact same element. Let's learn how CSS behaves in situations like this.

When this situation happens, all styles or **all CSS rules actually apply**. However, if there are **duplicate CSS declarations** among these CSS rules, then CSS behvaes according to the **priority** that it gives to different selectors. Here is a descending list of priorities:

1. Declarations marked with `!important`: you place the keyword at the end of a CSS declaration.
2. Inline styles
3. ID selector (`#`)
4. Class selector (`.`) and pseudo-class selector (`:`)
5. Element selector
6. Universal selector (`*`)

> If there are multiple selectors of the same type, for instance multiple ID selectors, then the last rule that appears in the code will be applied to the element.

## **Inheritance and the universal selector**

Inheritance is a mechanism by which some CSS properties get their values inherited from parent elements to child elements. This mechanism is utilized when we want to apply some styles to the whole webpage.

```css
body {
  font-family: sans-serif;
}
```

Not all CSS properties are inherited. Mostly the ones related to text styling are inherited. Many other CSS properties are not inherited. For instance, if you add a `border-top` property to the `<body>` element, it will not be applied to all the elements inside it. Here is a list of some CSS properties related to text that get inherited:

- `font-family`
- `font-size`
- `font-weight`: accepts both keywords (such as `bold`) and numbers (given by the font family)
- `font-style`
- `color`
- `line-height`
- `letter-spacing`
- `text-align`
- `text-transform`
- `text-shadow`
- `list-style`

Keep in mind that inherited properties can be very easily over-written by rules mentioned later in the code or by selectors with higher priorities.

Now you might ask what if you want to apply a CSS rule to all the elements on your page while that CSS rule does not get inherited? This is where the universal selector comes to play. The universal selector selects every single element on the page. The universal selector is almost always used to implement a [global reset](#global-reset) to the [CSS box model](#css-box-model).

```css
* {
}
```

## **CSS box model**

The CSS box model defines how elements are displayed on a webpage and how they are sized. In the CSS box model, each and every element on the webpage is considered a rectangular box. This rectangular box can have **content**, **border**, **space inside (padding)** and **space outside (margin)**.

1. **Content:** the actual content of the element, which can be text, images, a table, etc. We can specify both the width and the height of the content area with specific CSS properties.
2. **Border:** border is technically inside the element.
3. **Padding:** the invisible white space between the content and the border. Padding is also inside the element.
4. **Margin:** the invisible white space outside the element, which is used to create space between elements on the page.

**Fill area:** area that gets filled with **backgroung color** or **background image**.

### **Element height and width calculation**

We can specify the height and the width of the content area. If we choose not to define them, the box model will imply them based on the box model. However, the implied height and width are not the final sizes of the element since the border and the padding are also taken into account. So thhis is how the final dimensions of the element are calculated by default in the box mode:

Final element width = left border + left padding + width + right padding + right border

Final element height = top border + top padding + height + bottom padding + bottom border

As you see, the margin is not calculated in this default behavior. However, we can change this default behavior becasue it does not make sense.

#### **Changing the default behavior**

In order to change the default behavior of the CSS box model so that the values given to `height` and `width` properties of an element would simply specify the entire dimensions of that element, we can use the `box-sizing` property of the element ane set it to `border-box`. This way the final element width is determined by the `width` property that we set in CSS rules.

In order to apply this to all elements in the page, we use the universal selector in CSS:

```css
* {
  box-sizing: border-box;
}
```

### **Global reset**

The global reset is a technique used almost in all CSS code bases in order to make the process of adding white spaces to the elements easier. This technique involves using the universal selector and setting all the margins and paddings to zero.

```css
* {
  box-sizing: border-box
  margin: 0;
  padding: 0;
}
```

This piece of code is always written at the beginning of a CSS file. Note that the universal selector is easily overwritten by all other selectors.

### **Types of boxes**

In CSS we consider different elements as 2 different types of boxes:

1. Inline box: these are boxes that only occupy the space that they need for their content. They cause no line breaks after themselves. The CSS box model applies in a different way to these elements; `height` and `width` do not apply. `padding` and `margin` are only applied horizontally.

HTML elements that are considered inline boxes by CSS are:

- `a`
- `img`
- `strong`
- `em`
- `button`

You can set the box type of a block-level element to inline by using the `display` property.

```css
p {
  display: inline;
}
```

1. Block-level box: these are boxes that occupy all the space that they can (no matter the content) and they create line breaks after them. The box model applies to these boxes as we learned.

HTML elements that are considered block-level by CSS are:

- `body`
- `main`
- `header`
- `footer`
- `section`
- `nav`
- `aside`
- `div`
- `h1` to `h6`
- `p`
- `ul` and `ol` and their `li`s

You can set the box type of an inline element to block-level by using the `display` property.

```css
strong {
  display: block;
}
```

> The `<section>` element is usually used as a very generic part of any HTML document. It is a common practice to separate different sections of your webpage using the `<section>` element.

3. Inline-block box: they look inline from the outside, but behaves like block-level on the inside. So they occupy the space they need for their content, and therefore they don't create line breaks after themselves. However, the CSS box model applies as we learned. So height and width are applied, and margins and paddings are applied in all directions. There are no HTML element that is by default an inline-block box, but you can set the box type of an element to inline-block by using the `display` property:

```css
a {
  display: inline-block;
}
```

### **Absolute positioning**

In CSS there are a couple of different positioning modes but the more important ones are **normal flow** and **absolute positioning**.

1. Normal flow: it is the default mode of positioning elements on the page. We can also achieve the normal flow by setting the `position` property of an element to `relative`. In this case, elements are laid out according to their order in the HTML code.
2. Absolute positioning: this allows us to absolutely position elements anywhere in our page. This is achieved by setting the `position` property of an element to `absolute`. In this case the element is removed from the normal flow. It completely loses any impact on surrounding elements, and it can even overlap them. In order to actually position an absolutely positioned element, we can use the `top`, `left`, `right` and `bottom` properties. This poisitioning is calculated in relation to a relatively positioned container element. Of course, by default, this absolute positioning will be in relation to the viewport.

As an example, imagine we want a like button to remain always in the same position when we scroll up or down in the page. This is where we need to position the button absolutely.

```html
<body>
  <div>
    <!-- main elements of the page -->
  </div>
  <button>Like</button>
</body>
```

Now to position the button element absolutely we should do this:

```css
body {
  position: relative;
}

button {
  position: absolute;
  top: 0;
  left: 0;
}
```

> The `position: relative` property should always be set on a parent element of the absolutely positioned element. This parent element should not necessarily be a direct parent.

Absolute positioning is also used when you need to place a child element at the very center (horizontally or vertically) of the parent container element. In this case, you may think that setting the `top` property of the child element to 50% will place it correcly as you wish, but it won't. This is becasue CSS will center the top of the child element in the parent container. So you should manually compensate for the child element's dimensions. To do this you should use the `transform` property and use the `translate` CSS function to move the element 50% of its own dimension.

```css
.btn {
  position: absolute;
  top: 50%; /* in relation to the parent element */
  left: 0;
  transform: translate(-50%, -50%); /* in relation to the element itself */
}
```

# **Styling text**

Here is a list of CSS properties that are used to style texts.

```css
p {
  color: blue;
  font-size: 26px;
  font-family: sans-serif;
  /* you cannot simply use a font family that you have installed on your computer. Because that would not work for other users that come to your page from other computers  */
  text-transform: uppercase;
  font-style: italic;
  line-height: 1.5;
  /* line height will be 1.5 times the font size  */
  text-align: center;
  /* centers the text inside its parent element */
  font-weight: bold;
  text-decoration: none;
  text-decoration: underline dotted orange;
  /* text decoration is usually used to style <a> elements which are underlined by default. This is a shorthand property for multiple other CSS properties: text-decoration-line, text-decoration-style, and text-decoration-color.  */
  letter-spacing: 0.5px;
  /* defines the space between letters. This property is not set using the 'rem' unit since it is a very small dimension */
}
```

> When you style a `<p>` element just like the example above, all other text elements that exist inside this `<p>` element will **inherit** the styles you declared unless you delare styles for them specifically. For instance, if you have a `<strong>` element inside the `<p>` element, the text inside the `<strong>` element will follow the styles declarations that you made for the `<p>` element which is the parent element. Read more by referring to [Inheritance and the universal selector](#inheritance-and-the-universal-selector)

# **General Stylings**

In order to understand the behavior of CSS properties mentioned here you need a good understanding of the [CSS box model](#css-box-model).

## **Background color**

In order to give any block element a background color you should use the `background-color` CSS property:

```css
.main-header {
  background-color: #f7f7f7;
}
```

## **Border**

To apply a border to a container element you can use the `border` CSS property. this property accepts first the width of the border line, second the style of the border line, and third the color of the border.

```css
.aside {
  border: 5px solid #1098ad;
}
```

> The border property can simply be set to `none` in case you don't want any borders around the element.

CSS `border` property is a shorthand property for multiple other CSS properties that can define the width, the style, and the color of the border separately. But we usually go with the shorthand version.

In case you want the border to be applied only to one side of the element:

```css
.aside {
  border-top: 5px solid #1098ad;
}
```

## **Padding**

The padding property accepts a numeric value with a unit. It can also receive four different numeric values defining the padding on each side of the element, starting from the top padding and rotating clockwise.

```css
.main-header {
  padding: 20px;
  /* This will give 20px padding to all sides of the element */

  padding: 20px 40px;
  /* This will give 20px padding to top and bottom, and 40px to left and right */
}
```

> This is a shorthand property for `padding-top`, `padding-right`, `padding-bottom` and `padding-left`.

## **Margin**

In order to create white space between one element and another we use the margin property.

```css
.main-header {
  margin: 20px;
  /* This is a shorthand property that behvaes in the exact same way as the padding property.  */
}
```

> Margins and paddings are almost always set based on a **global reset** applied to the CSS box model.

## **Adding dimensions**

Using the `width` and `height` properties, we can set the dimensions of the element. But there is a point to remember here. For instance, when we set the height of an element to `80px` in the box model's default behavior, then the actual hight of the element will not be `80px`. The actual height of the element will be calculated based on the content, the padding on top and bottom and the border on top and bottom. In order to get rid of this unreasonable default behavior [more about this later...]

We can add dimensions to image elements by using the `width` and `height` properties.

```css
.post-img {
  width: 800px;
}
```

> Specifing only one of the width or height properties will automatically preserve the image's aspect ratio and determine image's height based on that.

> You can use the `%` as the unit of numeric values passed into the width and height properties. The percentage would then mean the percentage of the parent container's width or height. If the parent container of an image occupies the whole width of the screen, then the image would resize itself based on the percentage we set as its width or height. This brings us to the realm of building **responsive UIs**.

You can set the dimensions of an element using the `vw` and `vh` units which stand for **viewport width** and **viewport height** respectively.

```css
header {
  height: 100vh;
  /* This will make the header to occupy 100% of the viewport height */
  width: 100vw;
  /* This will make the header occupy 100% of the viewport width. This unit is rarely used, becasue container elements are usually block elements and therefore they almost always occupy the entire width of the page */
}
```

## **Centering the webpage**

In order to center the whole content of our webpage, we should first wrap all elements that exist in the `<body>` element into another container element, usually a `<div>`. Then we define the `<div>` element's width and margin. In this trick, we set the margin on right and left of the container element to `auto`.

```css
.container {
  width: 700px;
  margin: 0 auto;
  /* Using this technique with the margin property requires the container to have a specified width */
}
```

## **Stroke**

The `stroke` property is used for SVG vector graphics that are inserted into the HTML code, usually as icons. It accepts a color value.

```css
.icon {
  stroke: #087f5b;
}
```

## **Box shadow**

The `box-shadow` property is a shorthand that receives first, the horizontal offset, second the vertical offset, third the amount of shadow blur, and finally the color and transparency of the shadow defined using the RGBA notation.

```css
.item {
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.1);
}
```

> If you want to add a border to the inside of a button or link element, there is no way of doing it with the `border` porperty. Instead, you can use the `box-shadow` property with the `inset` keyword.

```css
.btn {
  background-color: #fdf2e9;
  box-shadow: inset 0 0 0 3px #fff;
}
```

## **Border radius**

This property is used to make the corners of a container box round. This property accetps a number with a unit as value.

```css
.img {
  border-radius: 28px;
}
```

Setting the border radius to `50%` will make an square element fully round as a circle.

```css
.btn {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
```

## **Transform**

This property is used for many different things. One use case is to scale elements.

```css
img {
  transform: scale(2);
  /* This will double the current size of the element. Scaling elements may cause them to overlap other elements. */
}
```

## **Cursor**

In order to change the shape of the mouse cursor as it hovers over an element, you use the `cursor` property on the element.

```css
.btn {
  cursor: pointer;
}
```

## **Styling a table**

Remember the table example we mentioned in the HTML section:

```html
<table>
  <thead>
    <tr>
      <th>Chair</th>
      <th>The laid back</th>
      <th>The worker bee</th>
      <th>The chair 4/2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Width</th>
      <td>80cm</td>
      <td>60cm</td>
      <td>220cm</td>
    </tr>
    <tr>
      <th>Depth</th>
      <td>70cm</td>
      <td>65cm</td>
      <td>80cm</td>
    </tr>
  </tbody>
</table>
```

We can style the whole `<table>` element to center it in the page and also give it a background color along with many other styles.

```css
table {
  width: 800px;
  background-color: red;
  margin: 0 auto;
  border: 1px solid #343a40;
  /* This will add a border around the whole table */
}
```

In order to add borders between all the rows and columns, we can select all the table elements, which is the `<td>` and `<th>` elements, and add a border to them:

```css
th,
td {
  border: 1px solid #343a40;
  text-align: left;
  /* We usually align the text in all cells to left. Remember that <th> elements are centered automatically */
}
```

However, this will add duplicate borders and we can use the `border-collapse` property on the `<table>` element to remove duplicates.

```css
table {
  border-collapse: collapse;
}
```

> If you add background color to a table row, you will see empty lines between the row cells which are the space reserved for cell borders. This happens even if you don't specify any border for the table or the cells. So you might always need to set the `border-collapse` property of the `<table>` element to `collapse`.

In order to style the table head, we can simply select the `<tr>` element inside the `<thead>`. We apply formatting to a table row.

```css
thead tr {
  background-color: #087f5b;
  color: #fff;
}
```

In order to give all table columns the same width we can set the `width` property on all the `<th>` elements of the `<thead>`. For instance, if you have a table with 4 columns, you can do this:

```css
thead th {
  width: 25%;
}
```

In order to add a zebra stripe as the background of table rows, we can use CSS pseudo-class selectors. We basically select the odd rows and even ones and give them different background colors.

```css
tbody tr:nth-child(odd) {
  background-color: green;
}

tbody tr:nth-child(even) {
  background-color: blue;
}
```

## **Background image**

In order to insert an image as the background of a container element we use the `background-image` property and use the `url()` function which receives the image file address. This address can be either the file address in relation to the current CSS file, or it can be an actual web URL.

```css
header {
  background-imge: url(hero.jpg);
}
```

Setting only the background image property is usually not enough since the image's dimensions would not normally fit inside the container element. We can then use CSS properties like `background-size` property to position the image.

```css
header {
  background-image: url(hero.jpg);
  background-size: cover;
  /* This will make the image always cover the container element no matter how the screen dimensions change.  */
}
```

We can also add a color overlay on the image in case there are some text on the image that we want to make more visible. The `background-image` property can actually accept multiple layers of graphics.

```css
header {
  background-imge: linear-gradient(to right, red, blue) url(hero.jpg);
}
```

> This will place the linear gradient over the image.

So the linear gradient function accepts first the direction of the gradient which can be defined in different ways. One way is to use the `to` keyword along with the direction mentioned as `right`, `top`, etc. Another way is to...

The second and the third arguments passed into the linear gradient function are the colors that will make up the gradient.

## **Styling `<img />` elements**

You may sometimes need to manipulate the appearance of an image in order to make it match visually with your webpage design. This might include removing the color from logo images, changing the opacity, changing contrast or brightness, blurring and many more. To do all these things you need the `filter` property applied to the image element itself. This property can accept many different CSS functions to do the things mentioned above.

```css
.image {
  filter: grayscale(100%);
  /* This will make the image fully black and white. In case you want logos to be all gray, you can use the brightness function along with the opacity property */
  filter: brightness(0);
  opacity: 50%;
  /* Brightness of 0 will make the image full dark black. Then the 50% opacity will make it gray */
}
```

## **Overflow**

This property determines whether the overflowing content of a container element will be out of reach or they will somehow be managed to include them in the container element. This property can be responsible for activating the **scroll** feature on a container element if it set to `scroll` on the container element.

In special cases however, simply setting the `overflow` property to `scroll` is not enough. Imagine a list of elements arranged vertically in a flexbox container. If you set the `overflow` property to `scroll` in the container element, the default behavior of the flexbox will be to shrink the elements as much as necessary in order to fit all the elements inside the container's height. However, we might not want them to shrink. Then we would have to set the `flex-shrink` property on all the flexbox items to stop this behavior.

```css
.container {
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.flex-item {
  flex-shrink: 0;
}
```

This will now activate the scroll feature on the container.

The `overflow` property can also accept the `hidden` keyword as value. This will make the overflowing items hidden and out of reach.

## **Adding animation**

In order implement a smooth animation we use the `transition` property. This can have many use cases, but we will now study one example.

If we want to apply an animation on the hover effect of a button, we apply the `transition` property on the button in the state before being hovered. The transition property can accept multiple values that describe the animation settings, but we should at least define 2 of them. First, we specify that on which CSS properties we want the transition to apply. If you are changing two CSS properties on hover and you want the animation to be applied on both of them, you can simply insert `all`. Then you need to give the transition property a duration. Usually `0.3s` is good. We can insert a third value which defines the type of the animation.

```css
.btn:link,
.btn:visited {
  transition: all 0.3s;
}

.btn:hover,
.btn:active {
  background-color: orange;
  color: #fff;
}
```

> Remember to always set the `transition` property on the original state of the element.

## **Smooth scrolling**

In order to implement a feature that enables the user to move to a specific section on the page by clicking on one of the link in the navigation bar, you should first specify an ID attribute on the section.

```html
<a href="#cta">Start eating well</a>
<section id="cta"></section>
```

This is good, but what if we want to implement a 'smooth' scrolling? If you only want to account for Google Chrome and Firefox browsers, you don't need any JavaScript to do it. You just need to introduce a CSS declaration in the `html` element selector of your CSS file:

```css
html {
  scroll-behavior: smooth;
}
```

But in order to account for other browsers like Safari, you need to type some JavaScript code. So in JavaScript, you first need to select all links on your page.

```js
const allLinks = document.querySelectorAll("a:link");
```

This will basically return a `NodeList` of all links on your page. You can then attach an event listener to each of them. The callback function that you define in an event listener has access to the event object. You only use the event object to prevent the default behavior of links when their are clicked. Then you read the `href` attribute of the link element that is clicked in order to implement the scrolling destination. We actually want one scrolling to go the top of the page, and one scrolling to each section.

```js
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if(href==='#') window.scrollTo({
      top: 0,
      behavior: 'smooth';
    })

    // Scroll down to each section
    if(href!== '#' && href.startsWith('#'))
    const sectionEl = document.querySelector(href);
  sectionEl.scrollIntoView({ behavior: 'smooth'})
  });
});
```

## **Sticky navigation**

In some projects you might want to implement a navigation bar that sticks to the top of the viewport no matter how far the user scorlls down the page. To make this technique work, it is a good practice to give a fixed height to the navigation container which is usually a header element.

```css
.header {
  height: 9.6rem;
}
```

In order to achieve such an effect you should use a combination of CSS and JavaScript. What you should do is to first, define a specific class that creates the sticky navigation effect, and then apply or remove this class on or from the navigation element.

However, applying the `position: fixed` declaration to the navigation will take it out of the flow of the HTML document and therefore a part of the hero section that was right after the navigation bar previously, is now positioned under the navigation bar. But this is not what we want. So we need to compensate for the height of the navigation bar and add some margin to the top of the hero section once the navigation bar becomes sticky. So you should also define a separate CSS rule for the hero section that makes the conpensation, but you want this rule to be applied only if the sticky effect is applied. What you should do is to give the sticky class to the `<body>` element which contains the `<header>` element which contains the navigation bar in it. Then apply the CSS rules for sticky navigation effect to the header element only if the parent element (`<hedaer>`) has the `sticky` effect attached to it. Then you can also add the compensation CSS rule only if the parent element (`<header>`) has the sticky class attached to it.

```css
.sticky .header {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
}

.sticky .section-hero {
  margin-top: 9.6rem;
}
```

Then we would add this class to the body element or remove from it.

```html
<body class="sticky">
  <header class="header">
    <nav></nav>
  </header>
  <section class='section-hero'>
</body>
```

So you want the sticky class attached to the body element once the hero section is scrolled over and gone out of the viewport. What you should do in JavaScript is to utilize the **Intersection Observer** to make your application observe the position of an specific element on your page.

The intersection observer object, which we usually store in a variable as written below, receives a callback function and an object of options. The callback function is responsible for the action that should be performed as soon as the observer notices something about the element that it should observe.

In this example, we want the observer to observe the hero section and make the navigation bar sticky as soon as the hero section moves out of the viewport.

The object of options should contain a `root` property which determines where the target element should be observed or not. This property should be set to `null` when we want to observe the element through the viewport. Then we define a `threshold` property which determines at which visible amount of the target section, the observer should execute its callback funciton. If we set this to zero, it means that the callback function of the observer will only be executed when 0% of the target section is visible in the viewport. Setting it to 1 will make the callback function be executed when 100% of the target element is visible in the viewport.

We can then define the callback function. The callback function has access to an array of `entries`. It basically receives an entry for each `threshold` value. Since we only have 1 value for the threshold, we will only receive the 1st element of the entries array which will be `entries[0]`.

> The `threshold` can receive multiple values.

The entry that we receive an `IntersectionObserverEntry` object that contains a lot of properties. Among all of them, you should look for `isIntersecting` property which will be `false` as soon as the target element moves out of the viewport. While it is inside the viewport, this property will hold `true`. We can use this property to implement the action of attaching the `sticky` class to the navigation bar.

You may also need to make the sticky effect apply just a little bit sooner than the 0 threshold. You can actually define a `rootMargin` property in the object of options and set to a pixel amount and that will do the job. Tha amount is usually set to be equal to the fixed height that you defined earlier for the navigation bar.

Then you also need to implement a scenario for removing the sticky navigation. You just need to add another condition to the callback function.

```js
const sectionHeroEl = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroEl);
```

# **Colors in CSS**

There are 2 different ways of defining colors in CSS.

1. **RGB or RGBA notation**

```css
p {
  /* RGB notation */
  color: rgb(244, 179, 63);

  /* RGBA notation (A stands for Alpha) */
  color: rgba(244, 179, 63, 0.7);
}
```

2. **Hexadecimal notation**

```css
p {
  color: #f4b33f;
}
```

We can use special CSS functions in order to style colors more creatively. For instance, we can use the `linear-gradient()` CSS function as the value for the `background-image` property. Refer to [background-image](#background-image) CSS porperty.

# **Building layouts**

Layouts is the way text, images, and other content is places and arranged on a webpage. Layout gives a page a visual structure, into which we place our content.

Building a layout means arrangin page elements into a visual structure, instead of simply having them placed on after another (normal flow).

There are basically 2 types of layout:

1. Page layout: laying out the elements inside a webpage
2. Component layout: page layouts are made up of components. Components themselves need to have some kind of layout, because they are also made up of smaller piece of content. Now let's learn the 3 ways of creating layouts in CSS.

## **Float layouts**

The old way of building layouts of all sizes, using the `float` CSS property. They are still used but they are getting outdated fast.

## **Flexbox layouts**

Modern way of laying out elements in a 1-dimensional row without using floats. These are perfect for component layouts.

The main idea behind flexbox is that empty space inside a container element can be automatically divided by its child elements.

Flexbox makes it easy to automatically align items to one another inside a parent container, both horizontally and vertically.

Flexbox solves common problems such as vertical centering and creating equal-height columns.

A flexbox layout is applied to a container element in terms of CSS rules application.

```css
.container {
  display: flex;
}
```

This will arrange all direct children inside the container element side-by-side along the **main axis**. The other prependicular axis is called **cross axis**, along which we can arrange flexbox items using the `flex-direction` property.

We can now specify some CSS properties for the flexbox container and for the flexbox items.

Horizontally, each flexbox item would occupy the space necessary for their content. However, vertically, all the flex items would be as tall as the tallest element.

### **Flexbox container properties**

```css
.container {
  display: flex;
  gap: 20px;
  /* Specifies the space between flexbox items inside the container */
  align-items: center;
  /* This defines the vertical alignment of flexbox items inside the container. It can accept flex-start, flex-end, stretch, baseline */
  justify-content: center;
  /* This defines the horizontal alignment of flexbox items inside the continer. It can accept flex-start, flex-end, center, space-between, space-around, space-evenly */
  flex-direction: row;
  /* Specifies the axis along which the flexbox items are arranged. It accepts row-reverse, column, column-reverse */
  flex-wrap: wrap;
  /* This allows items to wrap into a new line if they are too large. It also accepts wrap, wrap-reverse */
  align-content: stretch;
  /* This only applies when there are multiple lines. It also accepts flex-start, flex-end, center, space-between, space-arround */
}
```

> In special cases, the `<body>` element can be set to act as a flexbox container in order to center an element inside it.

### **Flexbox items properties**

```css
.flex-item {
  align-self: auto;
  /* This overwrites align-items for individual flexbox items */
  flex-grow: 0;
  /* This allows an element to grow. 0 means no, 1 and more means yes. If the content and dimensions of flexbox items arrange them in a way that free space is available inside the container, then setting grow to 1 will allow the element to grow and use the available free space. Otherwise, items will only occupy the space they need for their content. Setting grow to different values for individual flexbox items will allow them to grow and occupy different portions of the free space */
  flex-shrink: 1;
  /* This allows an element to shrink. 0 means no, 1 and more means yes. If the content and dimensions of the flexbox items is set in a way that pushes them out of the flexbox container, setting the shrink property to 1 will allow items with smaller content to shrink in order to fit the elements into the flexbox container as mush as possible */
  flex-basis: 100px;
  /* Also accepts auto. Defines an item's width, instead of the width property. This is not a rigid value. If an element cannot fit into the value set for it, it will grow */
  flex: 0 1 auto;
  /* Recommended shorthand for flex-grow, flex-shrink, and flex-basis */
  order: 0;
  /* Controles order of items. -1 makes item first, 1 makes it last */
}
```

> Flexbox can also be used on an element with only one child element in case you need to center the child in the parent container. Using flexbox makes this process very easy. You simply set the parent container's `flex` property to `flex`, and then set both `align-items` and `justify-content` properties to `center`.

```css
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## **CSS grid**

Designed for laying out elements in a fully-fledged 2-dimensional grid. This is perfect for page layouts and complex components.

The main idea behind CSS grid is that we divide a container element into rows and columns that can be filled with its child elements.

In two dimensional contexts, CSS grid allows us to write less nested HTML and easier-to-read CSS.

CSS grid is not meant to replace flexbox. Instead, they work perfectly together.

A CSS grid layout is applied to a container element in terms of CSS rules application. Then we should specify how many columns the grid should have. the rows are almost always created by the content itself.

```css
.container {
  display: grid;
  grid-template-columns: 250px 150px;
}
```

This will create 2 columns in the grid container, one with 250px width, and another with 150px width. Now if you have more than 2 grid items, they will automatically be arranged in subsequent rows.

Each row in a CSS grid will have the height of the tallest grid item in that row. So the height of different rows in a CSS grid may not be the same. We can however set the number of rows and their height explicitely. However, this is not a normal practice:

```css
.container {
  display: grid;
  grid-template-columns: 250px 150px;
  grid-template-rows: 300px 200px;
}
```

In CSS grid we have a **row axis** and **column axis**. **Grid lines** are imaginary lines that seperate rows and columns. Grid lines are labled with numbers which we can use to place a grid item exactly in a specific place in the grid. Intersection of grid lines create the **grid cells** where the grid items are placed.

The `fr` unit is almost always used with the CSS grid and many other layout features of CSS. `fr` stands for fraction. Setting the size of a column in CSS grid to `1fr` will allow the column to fill up all the available space.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* The 2 columns  will occupy the same width of the available space */
  grid-template-columns: 2fr 1fr;
  /* The column with 2fr will occupy twice the width of the other column with 1fr */
  grid-template-columns: 1fr 1fr 1fr auto;
  /* The forth column will occupy only the width that it needs for its content. */
  grid-template-columns: repeat(4, 1fr);
  /* The same as writing 1fr four times */
}
```

### **CSS grid container properties**

```css
.container {
  display: grid;
  grid-template-columns: 250px 150px;
  /* To stablish the grid row and column tracks. One length unit for each track is required. Any unit can be used. The new 'fr' unit is used to fill unused space. */
  gap: 30px;
  /* Defines gap both horizontally and vertically */
  column-gap: 30px;
  /* Defines gap between columns */
  row-gap: 50px;
  /* Defines gap between rows */
  justify-items: stretch;
  /* To align items horizontally inside cells. Also accepts start, center, end */
  align-items: stretch;
  /* To align items vertically inside cells. Also accepts start, center, end */
  justify-content: start;
  /* To align grid tracks horizontally inside grid container. Only applies if container is larger than the grid. Also accepts center, end. Not very important. */
  align-content: start;
  /* To align grid tracks vertically inside grid container. Only applies if container is larger than the grid. Also accepts center, end. Not very important. */
}
```

### **CSS grid items properties**

```css
.grid-item {
  grid-column: 1 / 3;
  grid-column: 1 / span 2;
  grid-column: 1 / -1;
  /* To place a grid item into a specific grid cell or across multiple cells, based on grid line numbers. The 'span' keyword followed by the number of columns across which the item should be spanned can be used. -1 always refer to the last grid line. */
  grid-row: 2 / 4;
  /* To place a grid item into a specific grid cell, based on grid line numbers. The 'span' keyword followed by the number of columns across which the item should be spanned can be used. -1 always refer to the last grid line. */
  justify-self: stretch;
  /* To overwrite justify-items and align-items of the grid container for grid items. Also accepts start, center, end */
  align-self: stretch;
  /* To overwrite justify-items and align-items of the grid container for grid items. Also accepts start, center, end */
}
```

## **Responsive design**

We need to think about responsive design from the very beginning of any project.

Responsive design is a technique to make a webpage adjust its layout and visual style to any possible screen size. In practice, this means that responsive design makes websites usable on all devices.

Responsive web design is a set of practices, not a separate technology. It is just CSS.

There are 4 big ingredients to responsive design:

1. **Fluid layouts:** to allow webpage to adapt to the current viewport width (or even height). This involves using `%` or `vw` or `vh` instead of `px` for elements that should adapt to viewport (usually for layout). You may also always need to use the `max-width` property instead of `width`.
2. **Responsive units:** Use `rem` unit instead of `px` for most lengths. This makes it easy to scale the entire layout down or up automatically. One helpful trick here is to set `1rem` to `10px` for easy calculations.
3. **Flexible images:** by default, images don't scale automatically as we change the viewport, so we need to fix that. Alwaays use `%` for image dimensions together with the `max-width` property.
4. **Media queries:** brings all other ingredients together. This is used to change CSS styles on certain viewport widths called breakpoints. You almost always write media queries at the end of designing a full page.

### **`rem` and `max-width`**

By setting the `width` property to a specific value (`1000px`) on a container element, you actually fix the element's width regardless of the space available in the viewport. So if the viewport becomes smaller, the element would retain its width and the browser will automatically activate a horizontal scroller to show the element. But this is not a good thing in web design. To fix this we can use the `max-width` property.

By setting the `max-width` property to a specific value (`1000px`) on a container element, you actually allow the element to occupy the specified width if there is enough space in the viewport. However, if the viewport changes so that there is not enough space, the element will shrink in width in order to fit into the viewport.

The `rem` unit stands for Root Element's font size. The root of the document is the `<html>` element which is the parent element of all other elements. If we don't define any font size on the `<html>` element, then 1rem equals to the default font size, which is 16px if the user does not change it.

It might seem strange to define length based on font size. But it is the strength of the `rem` unit. We can simply change the font size on the `<html>` element and that will automatically change all the dimensions specified in our page respectively.

In order to use the `rem` unit with easier calculations we set the font size on the HTML element to 10px. Now 1rem is 10px.

```css
html {
  font-size: 10px;
}
```

This enables us to simply change the font size on the HTML element on different breakpoints of the **media queries**.

However, this is not a good way to implement such a technique. This way we won't respect the user's definition of the browser's font size. In order to take the user's preference into account, we should define the font size of the HTML element with a percentage value of 62.5%. This value comes from dividing 10 by 16.

```css
html {
  font-size: 62.5%;
}
```

We would then change this percentage on different breakpoints of the media query.

### **Media queries**

Working with media queries can work with `max-width` property in desktop-first strategies, and with `min-width` property in mobile-first strategies.

Let's say that we want to apply certain styles for the range between 0 and 600 pixels. We then write in the CSS file:

```css
@media (max-width: 600px) {
}
```

This media query checks if the screen width is between 0 and 600 pixels, and if it is then all the styles in this media query will work. After 600 pixels it will stop working. So we can create more media queries.

Now we define another media query for the range between 0 and 1200 pixels.

```css
@media (max-width: 1200px) {
}
```

Inside these media queries we overwrite some specific parts of the global CSS, so the code that is outside of any media query.

Now you might ask if we have a screen width of 400 pixels, which media query will apply? Both queries will apply because both are true. What will happen to conflicting CSS declarations? The one that appears last in the code is the one that will apply.

#### **Media queries in practice**

In order to make media queries actually work on our page, you need to include a `<meta />` tag in the `<head>` element of our HTML document.

```html
<meta name="viewport" content="width=device-width" , initial-scale="1.0" />
```

Without this line of code, responsive design will not work on mobile devices, because browsers on mobile devices will, by default, zoom the webpage until it fits the screen. But we don't want this. Therefore we will have to include this line of code in our HTML file.

What we do in practice to implement media queries is that, first you create a new file dedicated to writing media queries. So in the CSS folder of your project, create a `queries.css` file. Then you would also have to link it to your HTML document using another `<link />` tag inside the `<head>` element.

```html
<link rel="stylesheet" href="css/queries.css" />
```

Now inside this new file you can create a media query and then inside it, you select an element an give it CSS declarations.

There is one very important thing to remember about the responsive unit of `rem` in media queries. They do not respond to the `font-size: 62.5%` that we set for the `html` element. **So `rem` and `em` do not depend on HTML font size in media queries. Instead, `1rem` equals `16px`**. When we create media queries, we should take this point into account when targetting breakpoints. For instance, if you want to set a breakpoint on 1350 pixels, you should divide it by 16, and then mention the value with `em`.

```css
@media (max-width: 84em) {
  /* This media query will apply to (84*16) 1344px width */
  .section-hero {
    max-width: 120rem;
    /* This rem inside the media query has nothing to do with the em that we used to target a breakpoint. So here, 1rem still equals 10px. */
    background-color: orange;
  }

  .heading-primary {
    font-size: 4.4rem;
  }
}

@media (max-width: 75em) {
  html {
    font-size: 56.25%;
  }

  .section-hero {
    border: 20px dashed blue;
    background-color: green;
  }
}
```

> Note that if the screen width goes below 600 pixels, the `background-color: green` will be applied by overwriting the background color defined in the 1200 pixels media query.

Remember that at some point in managing media queries you are very likely to end up manipulating the HTML font size. If so, feel free to do it, because we actually changed the value of 1rem to use it right here.

#### **How to select media queries breakpoints**

Breakpoints are the viewport widths at which we want our design to change. The best strategy to select breakpoints is to consider the screen widths where our design breaks down. Taking this factor into account will actually make our design ready for any screen width.

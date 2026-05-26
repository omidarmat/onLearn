# Working with real map graphical data

Now that you have the dataset and Mapshaper CLI installed, you can do the entire workflow from the terminal.

I'll assume your downloaded dataset contains something like:

```txt
ne_10m_coastline.shp
ne_10m_coastline.dbf
ne_10m_coastline.shx
```

and you're inside that directory.

## Step 1: Verify Mapshaper works

Run:

```bash
mapshaper -v
```

You should see a version number.

---

## Step 2: Crop to the Persian Gulf region

Run:

```bash
mapshaper ne_10m_coastline.shp \
  -clip bbox=45,22,60,32 \
  -o gulf-clipped.shp
```

What those numbers mean:

```txt
bbox=west,south,east,north

45  → western Iraq/Kuwait
22  → southern Oman/UAE area
60  → eastern Strait of Hormuz
32  → northern Iran coast
```

This should keep approximately:

- Iraq
- Kuwait
- Iran southern coast
- Saudi eastern coast
- Qatar
- Bahrain
- UAE
- Oman near Hormuz

---

## Step 3: Inspect before exporting

Generate a quick preview SVG:

```bash
mapshaper gulf-clipped.shp \
  -proj wgs84 \
  -o format=svg preview.svg
```

Open it:

```bash
xdg-open preview.svg
```

If the crop is too large or too small, adjust the bounding box.

Examples:

Slightly tighter:

```bash
mapshaper ne_10m_coastline.shp \
  -clip bbox=47,23,58,31 \
  -o gulf-tight.shp
```

Slightly wider:

```bash
mapshaper ne_10m_coastline.shp \
  -clip bbox=44,21,61,33 \
  -o gulf-wide.shp
```

---

## Step 4: Simplify geometry

Raw coastline data contains many thousands of points.

For a landing-page illustration:

```bash
mapshaper gulf-clipped.shp \
  -simplify 5% keep-shapes \
  -o gulf-simple.shp
```

`keep-shapes` prevents coastlines from collapsing or becoming distorted.

You can experiment:

```bash
-simplify 10%
```

for more minimal geometry.

For your use case I would start at:

```txt
5–8%
```

---

## Step 5: Export directly to SVG

```bash
mapshaper gulf-simple.shp \
  -proj wgs84 \
  -o format=svg gulf.svg
```

You now have:

```txt
gulf.svg
```

---

## Step 6: Extract the SVG path

Open the SVG:

```bash
code gulf.svg
```

or:

```bash
nano gulf.svg
```

You'll see something similar to:

```svg
<path d="M503,211L506,213C512,215..." />
```

Copy only the `d` value:

```tsx
<path d="M503,211L506,213C512,215..." fill={seaColor} stroke={borderColor} />
```

and replace the placeholder Gulf path in your React component.

---

You can also do everything in a single command:

```bash
mapshaper ne_10m_coastline.shp \
  -clip bbox=45,22,60,32 \
  -simplify 5% keep-shapes \
  -proj wgs84 \
  -o format=svg gulf.svg
```

For your PGSS hero, that one-liner is probably enough.

# Extending the crop

To extend the crop toward the **north-west** (more Iraq, Kuwait, and northeastern Saudi Arabia) while keeping the eastern Strait of Hormuz framing mostly unchanged, increase:

- **west** → smaller value
- **north** → larger value

Try this:

```bash
mapshaper ne_10m_coastline.shp \
  -clip bbox=43,22,60,34 \
  -simplify 5% keep-shapes \
  -o format=svg gulf-expanded.svg
```

Compared to the previous:

```txt
Old:  45,22,60,32
New:  43,22,60,34
```

Changes:

```txt
West:  45 → 43   (+ more Iraq/Kuwait/Saudi)
North: 32 → 34   (+ more northern land area)
East:  60 → 60   (unchanged)
South: 22 → 22   (unchanged)
```

If you want a framing even closer to your reference images (with Kuwait/Basra feeling less crowded against the edge), I would also test:

```bash
mapshaper ne_10m_coastline.shp \
  -clip bbox=42,21.5,60,34 \
  -simplify 5% keep-shapes \
  -o format=svg gulf-hero.svg
```

This gives:

```txt
West: 42
South: 21.5
East: 60
North: 34
```

That usually creates a more balanced hero composition because:

- Iraq gets breathing room
- Kuwait isn't pinned to the edge
- Saudi Arabia gains more land mass
- the Persian Gulf still dominates the frame
- Hormuz remains visible

For your PGSS hero, I would start with the second one (`42,21.5,60,34`). It tends to match the visual proportions of your example images more closely.

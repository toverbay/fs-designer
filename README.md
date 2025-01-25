# FS Designer

Web-based 2D designer application. It currently draws rectangles! Yay!

- [ ] Add other shapes (ellipse, triangle, star, etc)
- [ ] Add path shapes (like svg path element)
- [ ] Group/ungroup shapes
- [ ] Change the order of shapes (move forward/backward, move to front/back)
- [ ] Select shapes (hit-testing)
- [ ] Scale, rotate, translate shapes (drag handles)
- [ ] Zoom/pan the workspace
- [ ] Show the origin in the workspace
- [ ] Rulers on the top and left side of the workspace for x and y coordinates
- [ ] Import SVGs
- [ ] Import rasters
- [ ] WebGL? WebCPU?

I'll be adding much more to this list as I progress.

  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist
          # if you need a custom cname, define:
          # cname: www.example.com

https://toverbay.github.io/fs-designer/

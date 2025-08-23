# Ani-Relayer

<img width="1280" height="800" alt="hero" src="https://github.com/user-attachments/assets/f1b5de22-3036-4220-841a-a4512dcecc9b" />

## Getting Started
## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

## Sequence Diagram - MV3 flow

<img width="862" height="1460" alt="Untitled" src="https://github.com/user-attachments/assets/c2357379-01b9-495b-9bae-18960f9ab804" />
